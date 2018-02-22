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

  generateAuthUrl() {
    return this.oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: config.oauth.scopes,
      redirect_uri: config.oauth.redirect_uris[0],
    });
  }

  decodeToken(code, cb) {
    this.oauth2Client.getToken(code, (err, token) => cb(err, token));
  }

  getUserInfo(token, cb) {
    const { oauth2Client } = this;
    oauth2Client.setCredentials(token);
    this.plus.people.get({
      userId: 'me',
      auth: oauth2Client,
      json: true,
    }, (err, resp) => cb(err, resp.data));
  }
}
module.exports = GoogleAuth;
