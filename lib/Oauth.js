const { auth, plus } = require('googleapis');
const config = require('../config/config');
// const request = require('request');
const { waterfall } = require('async');

const { OAuth2 } = auth;

const oauth2Client = new OAuth2(config.oauth.client_id, config.oauth.client_secret, config.oauth.redirect_uris[0]);
const myPlus = plus('v1');
// generate a url that asks permissions for Google+ and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/plus.me',
];


const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',

  // If you only need one scope you can pass it as a string
  scope: scopes,
  redirect_uri: 'http://localhost:3000/login/callback',

  // Optional property that passes state parameters to redirect URI
  // state: 'foo',
});
const generateAuthUrl = () => url;
const getUserInfo = (token, cb) => {
  oauth2Client.setCredentials(token);
  waterfall([
    // 1. Get user info
    (next) => {
      myPlus.people.get({
        userId: 'me',
        auth: oauth2Client,
      }, next);
    },
    // 2. Save user info and token into db
    (resp, next) => {
      console.log(next);
      // console.log(resp.data);
      next(resp.data);
    },
  ], (err, res) => cb(err, res));
};
const readUserInfoFromDb = (token, mongo, cb) => {
  console.log(token);
  cb(null, { id: 1, name: 'Existing user' });
};
const decodeToken = (code, mongo, cb) => {
  waterfall([
    // 1. Get token
    (next) => {
      oauth2Client.getToken(code, (err, token) => next(err, token));
    },
    // 2. If is first users login we call get User info
    (token, next) => {
      if (token.refresh_token) {
        getUserInfo(token, next);
      } else {
        readUserInfoFromDb(token, mongo, next);
      }
    },
  ], (err, userInfo) => {
    console.log(cb);
    cb(err, { name: userInfo.displayName, id: userInfo.id });
  });
};

module.exports = { generateAuthUrl, decodeToken };
