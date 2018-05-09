const { waterfall } = require('async');
const uuid = require('uuid-v4');

const createUserFromGoogle = userFromGoogle => ({
  _id: uuid(),
  createdAt: new Date(),
  name: userFromGoogle.displayName,
  googleId: userFromGoogle.id,
  progresoHistoria: [{ idHistoria: '1', pistasCompletadas: [{ idPista: '1', fechaCompletada: new Date() }], inicioHistoria: new Date() }],
  oauth: userFromGoogle.oauth,
});

const getAndroidUser = userInfo => ({
  _id: userInfo._id,
  googleId: userInfo.googleId,
  progresoHistoria: userInfo.progresoHistoria,
});

class LoginManager {
  constructor(googleAuth, users, log) {
    this.googleAuth = googleAuth;
    this.users = users;
    this.log = log;
  }

  processAndroidLogin(authCode, cb) {
    this.log.info(`AuthCode is:${authCode}`);
    waterfall([
      // 1. Get Token and user info from google
      (next) => {
        this.log.debug('Get google user and token');
        this.googleAuth.getUserAndToken(authCode, next);
      },

      // TODO: Check if user exists
      // 2- Save user on mongo
      (googleUserInfo, next) => {
        this.log.info('Save user');
        const userInfo = createUserFromGoogle(googleUserInfo);
        this.users.saveUser(userInfo, err => next(err, userInfo));
      },
    ], (err, userInfo) => {
      if (err) {
        this.log.error(err);
        cb(err);
      } else {
        cb(null, getAndroidUser(userInfo));
      }
    });
  }

  processAndroidLoginGoogleId(googleId, cb) {
    this.log.info(`User google id is:${googleId}`);
    this.users.getUserByGoogleId(googleId, (err, user) => cb(err, user));
  }

  processWebLogin(loginInfo, cb) {
    this.log.debug(`Web login${loginInfo}`);
    this.users.saveUser(loginInfo, cb);
  }

  processAuto(cb) {
    this.log.debug('Auto login');
    this.users.getAutoLogin(cb);
  }
}

module.exports = LoginManager;
