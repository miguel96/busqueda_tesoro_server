const { waterfall } = require('async');
const config = require('../config');

class GoogleAuth {
  constructor(googleapis) {
    const { auth, plus } = googleapis;
    this.auth = auth;
    this.plus = plus('v1');
    this.oauth2Client = new this.auth.OAuth2(
      config.oauth.client_id,
      config.oauth.client_secret,
      config.oauth.redirect_uris[0],
    );
  }

  getUserAndToken(authCode, cb) {
    waterfall([
      // 1. Exchange google authCode by token
      (next) => {
        console.log("Asking google with"+authCode);
        this.oauth2Client.getToken(authCode, next);
      },

      // 2.Get User info
      (token, next) => {
        console.log("out google");
        this.oauth2Client.setCredentials(token);
        this.plus.people.get({
          userId: 'me',
          auth: this.oauth2Client,
          json: true,
        }, (err, resp) => {
          if (err) {
            next(err);
          } else {
            console.log("Out google auth");
            next(null, { ...resp.data, oauth: { token } });
          }
        });
      },
    ], cb);
  }
}
module.exports = GoogleAuth;
