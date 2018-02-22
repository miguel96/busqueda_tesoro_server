const config = {
  oauth: {
    client_id: '32419272019-eo3oq9osfilg6io936k329jj63qep3rq.apps.googleusercontent.com',
    project_id: 'busqueda-tesoro',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '4Gd0VEnMZqanZik6W1OdkVyR',
    redirect_uris: ['http://localhost:3000/login/callback'],
    javascript_origins: ['http://localhost:3000'],
    scopes: [
      'https://www.googleapis.com/auth/plus.me',
    ],
  },
  mongodb: {
    mongo_uri: 'mongodb://localhost:27017/btesoro',
    collection: 'users',
  },
};
module.exports = config;
