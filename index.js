const { waterfall } = require('async');
const firebase = require('firebase-admin');
const serviceAccount = require('./config/serviceKey');
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const Logger = require('./lib/Logger');
const config = require('./config');
const login = require('./routes/login');
const users = require('./routes/users');
const historias = require('./routes/historias');
const LoginManager = require('./lib/LoginManager');
const UsersManager = require('./lib/UsersManager');
const HistoriasManager = require('./lib/HistoriasManager');


const app = express();
const log = new Logger(config.logger);
const compression = require('compression');

app.use('/login', login);
app.use('/users', users);
app.use('/historias', historias);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(compression());

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://busqueda-tesoro.firebaseio.com',
});


waterfall([
  // 1. Init mongo connection
  (next) => {
    MongoClient.connect(config.mongodb.mongo_uri, next);
  },

  // 2. Init app
  (client, next) => {
    app.listen(config.port, err => next(err, client));
  },
], (err, client) => {
  if (err) {
    log.info(err);
    process.exit(err.code || 1);
  }

  const db = client.db('btesoro');
  const usersManager = new UsersManager(db.collection('users'), log);
  const loginManager = new LoginManager(firebase, usersManager, log);
  const historiasManager = new HistoriasManager(db.collection('historias'), log);
  app.set('loginManager', loginManager);
  app.set('usersManager', usersManager);
  app.set('historiasManager', historiasManager);
  log.info('Server running');
});
