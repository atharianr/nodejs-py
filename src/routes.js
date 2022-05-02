const cobaPost = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/cobapost',
    handler: cobaPost,
  },
];

module.exports = routes;
