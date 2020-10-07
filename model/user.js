var userSql = require('../sql/user.js');
var db = require('../config/index.js');

function getUser(callback, req) {
  console.log(req.path, 'mmmm')
  db.query(userSql.selectAll, function(result) {
    callback(result)
  })
}

module.exports = {
  getUser: getUser
}