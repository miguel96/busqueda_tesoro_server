const { waterfall } = require('async');
const uuid = require('uuid-v4');

const createUserFromGoogle = userFromGoogle => ({
  _id: uuid(),
  createdAt: new Date(),
  name: userFromGoogle.displayName,
  googleId: userFromGoogle.id_str,
  progresoHistoria: [{ idHistoria: '1', pistasCompletadas: [{ idPista: '1', fechaCompletada: new Date() }], inicioHistoria: new Date() }],
  oauth: userFromGoogle.oauth,
});

const getAndroidUser = userInfo => ({
  _id: userInfo._id,
  googleId: userInfo.googleId,
  progresoHistoria: userInfo.progresoHistoria,
});

class LoginManager {
  constructor(googleAuth, mongo) {
    this.googleAuth = googleAuth;
    this.mongo = mongo;
  }

  processAndroidLogin(authCode, cb) {
    console.log(`AuthCode is:${authCode}`);
    waterfall([
      // 1. Get Token and user info from google
      (next) => {
        this.googleAuth.getUserAndToken(authCode, next);
      },

      // TODO: Check if user exists
      // 2- Save user on mongo
      (googleUserInfo, next) => {
        console.log('exit from google');
        const userInfo = createUserFromGoogle(googleUserInfo);
        this.mongo.saveUser(userInfo, err => next(err, userInfo));
      },
    ], (err, userInfo) => {
      if (err) {
        cb(err);
      } else {
        cb(null, getAndroidUser(userInfo));
      }
    });
  }

  processAndroidLoginGoogleId(googleId, cb) {
    console.log(`User google id is:${googleId}`);
    this.mongo.getUserWithByGoogleId(googleId, (err, user) => cb(err, user));
  }

  processWebLogin(loginInfo, cb) {
    this.mongo.saveUser(loginInfo, cb);
  }
}

module.exports = LoginManager;
