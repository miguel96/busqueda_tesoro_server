const { waterfall } = require('async');
const googleApis = require('googleapis');
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const Mongo = require('./lib/Mongo');
const config = require('./config');
const login = require('./routes/login');
const GoogleAuth = require('./lib/GoogleAuth');
const LoginManager = require('./lib/LoginManager');

const app = express();


app.use('/login', login);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

waterfall([
  // 1. Init mongo connection
  (next) => {
    MongoClient.connect(config.mongodb.mongo_uri, next);
  },

  // 2. Connect to db
  (client, next) => {
    next(null, client.db('users', {}));
  },

  // 3. Init app
  (db, next) => {
    app.listen(3000, err => next(err, db));
  },

  // 4. Set collection and GoogleAuth into app
  (db, next) => {
    const mongo = new Mongo(db.collection(config.mongodb.collection));
    const googleAuth = new GoogleAuth(googleApis);
    const loginManager = new LoginManager(googleAuth, mongo);
    app.set('mongo', mongo);
    app.set('googleAuth', googleAuth);
    app.set('loginManager', loginManager);
    next();
  },
], (err) => {
  if (err) {
    console.log(err);
    process.exit(err.code || 1);
  }
  console.log('Server running');
});

