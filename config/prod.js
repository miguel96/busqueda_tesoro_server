const config = {
  oauth: {
    client_id: '32419272019-fpqrvjusrrafc8kuaa0rkekus7ek7crh.apps.googleusercontent.com',
    project_id: 'busqueda-tesoro',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '-6REQvBz2Rf7FD_QQViobQFr',
    redirect_uris: ['http://ec2-18-219-238-107.us-east-2.compute.amazonaws.com:3000/login/callback'],
    javascript_origins: ['http://ec2-18-219-238-107.us-east-2.compute.amazonaws.com:3000'],
    scopes: [
      'https://www.googleapis.com/auth/plus.me',
    ],
  },
  mongodb: {
    mongo_uri: 'mongodb://localhost:27017/btesoro',
    collection: 'users',
  },
  port: 3000,
};
module.exports = config;
