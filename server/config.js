const config = {
  DEPLOY: process.env.BNB_ENV,
};

switch (config.DEPLOY) {

  case 'localhost':
  default:
<<<<<<< HEAD:config.js
    config.SERVER_URL = 'http://localhost:3000' ,
    config.SECRETS = require('./secrets.json')
=======
    config.SERVER_URL = 'http://localhost:8080',
    config.SECRETS = require('./secrets-sample.json')
>>>>>>> 9a847e4f061e48c9cc86c8a73240e55ba1e814aa:server/config.js
    break
}

module.exports = config;
