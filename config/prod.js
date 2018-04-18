const config = {
  oauth: {
    client_id: '32419272019-fpqrvjusrrafc8kuaa0rkekus7ek7crh.apps.googleusercontent.com',
    project_id: 'busqueda-tesoro',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://accounts.google.com/o/oauth2/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_secret: '-6REQvBz2Rf7FD_QQViobQFr',
    redirect_uris: ['https://gymkhana-server.herokuapp.com//login/callback'],
    javascript_origins: ['gymkhana-server.herokuapp.com/3000'],
    scopes: [
      'https://www.googleapis.com/auth/plus.me',
    ],
  },
  mongodb: {
    mongo_uri: `mongodb+srv://miguel:${process.env.MONGO_PASS}@gymkhana-zdcel.mongodb.net/btesoro`,
    collections: {
      usersCollection: 'users',
    },
  },
  port: process.env.PORT || 3000,
  logger: {
    name: 'Busqueda del tesoro',
    verbosity: 3,
  },
};
module.exports = config;
