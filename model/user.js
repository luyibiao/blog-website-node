var userSql = require('../sql/user.js');
var db = require('../config/index.js');
var token = require('../token/token')

function getUser(req, res) {
  db.queryArgs(userSql.loginSql, global.$getArgs(req, 'account', 'password'), function(err, result) {
    if (err) {
      global.$resultFn.resultErr(err)
    } else {
      let r = global.$resultFn.resultSuccess(result)
      if (!r.data.id) {
        r = global.$resultFn.resultNouser()
      } else {
        r.data.token = token.createToken({
          id: r.data.id
        })
      }
      res.json(r)
    }
    return 
  })
}

module.exports = {
  getUser: getUser
}