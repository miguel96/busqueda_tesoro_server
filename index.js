const { waterfall } = require('async');
const googleApis = require('googleapis');
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const Logger = require('./lib/Logger');
const config = require('./config');
const login = require('./routes/login');
const users = require('./routes/users');
const historias = require('./routes/historias');
const GoogleAuth = require('./lib/GoogleAuth');
const LoginManager = require('./lib/LoginManager');
const UsersManager = require('./lib/UsersManager');
const HistoriasManager = require('./lib/HistoriasManager');


const app = express();
const log = new Logger(config.logger);

app.use('/login', login);
app.use('/users', users);
app.use('/historias', historias);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

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
  const googleAuth = new GoogleAuth(googleApis, log);
  const usersManager = new UsersManager(db.collection('users'), log);
  const loginManager = new LoginManager(googleAuth, usersManager, log);
  const historiasManager = new HistoriasManager(db.collection('historias'), log);
  app.set('googleAuth', googleAuth);
  app.set('loginManager', loginManager);
  app.set('usersManager', usersManager);
  app.set('historiasManager', historiasManager);
  log.info('Server running');
});
