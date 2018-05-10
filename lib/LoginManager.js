const { waterfall } = require('async');


class LoginManager {
  constructor(firebase, users, log) {
    this.firebase = firebase;
    this.users = users;
    this.log = log;
  }

  processAndroidLogin(authToken, cb) {
    this.log.info(`AuthCode is:${authToken}`);
    waterfall([
      // 1. Verify token
      (next) => {
        this.log.debug('Verify token');
        this.firebase.auth().verifyIdToken(authToken)
          .then(res => next(null, res))
          .catch(err => next(err));
      },

      // 2. Check if user exists
      (user, next) => {
        this.users.getUser(user.uid, (err, mongoUser) => {
          if (err || !mongoUser) {
            next(err || 'NO_EXIST');
          } else {
            next(null, mongoUser);
          }
        });
      },
    ], (err, userInfo) => {
      if (err) {
        this.log.error(err);
        cb(err);
      } else {
        cb(null, userInfo);
      }
    });
  }

  registerUser(user, cb) {
    this.users.saveUser(user, cb);
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
