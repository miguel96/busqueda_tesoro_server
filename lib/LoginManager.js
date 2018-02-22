const { waterfall } = require('async');

const createUserFromGoogle = (userFromGoogle, token) => {
  const { id, displayName } = userFromGoogle;
  return {
    _id: id,
    name: displayName,
    oauth: token,
  };
};
class LoginManager {
  constructor(googleAuth, mongo) {
    this.googleAuth = googleAuth;
    this.mongo = mongo;
  }

  registerUser(token, cb) {
    waterfall([
      // 1. Get users info from google
      (next) => {
        this.googleAuth.getUserInfo(token, (err, info) => next(err, info));
      },

      // 2. Save users google info and token on db
      (googleInfo, next) => {
        this.mongo.saveUser(createUserFromGoogle(googleInfo, token));
        next();
      },
    ], cb);
  }
  loginUser(token, cb) {
    this.mongo.getUser(token, cb);
  }
  processLogin(code, cb) {
    waterfall([
      // 1. Decode google token
      (next) => {
        this.googleAuth.decodeToken(code, next);
      },
      // 2. Call register or login
      (token, next) => {
        if (token.refresh_token) {
          this.registerUser(token, next);
        } else {
          this.loginUser(token, next);
        }
      },
    ], cb);
  }

  processWebLogin(loginInfo, cb) {
    console.log('here');
    console.log(loginInfo);
    this.mongo.saveUser(loginInfo, cb);
  }
}

module.exports = LoginManager;
