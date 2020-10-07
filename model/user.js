var userSql = require('../sql/user.js');
var db = require('../config/index.js');
const helpers = require('../untils/helper')

function getUser(callback, req) {
  db.queryArgs(userSql.loginSql, [helpers.getValue(req, 'account'), helpers.getValue(req, 'password')], function(result) {
    callback(result)
  })
}

module.exports = {
  getUser: getUser
}