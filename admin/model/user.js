const { user: userSql } = global.$sql('user')
const token = require('../token/token')

function getUser(req, res) {
  global.$db.queryArgs(userSql.loginSql, global.$overall.getArgs(req, 'account', 'password'), function(err, result) {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
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