const dev = require('./dev');
const prod = require('./prod');

const cfg = process.env.STATUS === 'production' ? prod : dev;

module.exports = cfg;
