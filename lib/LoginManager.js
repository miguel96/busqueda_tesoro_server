const { waterfall } = require('async');
const uuid = require('uuid-v4');

const createUserFromGoogle = userFromGoogle => ({
  _id: uuid(),
  createdAt: new Date().getDate,
  google: userFromGoogle,
});

class LoginManager {
  constructor(googleAuth, mongo) {
    this.googleAuth = googleAuth;
    this.mongo = mongo;
  }

  processAndroidLogin(authCode, cb) {
    waterfall([
      // 1. Get Token and user info from google
      (next) => {
        this.googleAuth.getUserAndToken(authCode, next);
      },

      // 2- Save user on mongo
      (userInfo, next) => {
        this.mongo.saveUser(createUserFromGoogle(userInfo), next);
      },
    ], err => cb(err));
  }

  processWebLogin(loginInfo, cb) {
    this.mongo.saveUser(loginInfo, cb);
  }
}

module.exports = LoginManager;
