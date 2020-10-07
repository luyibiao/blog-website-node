let model = require('../model/user.js');
let uthelper = require('../untils/formatData')
const token = require('../token/token')

let api = {
  getUser(req, res, next) {
    model.getUser(result => {
      const r = uthelper.formatRes(result)
      console.log(r)
      if (!r.data.id) {
        r.msg = '账号不存在',
        r.code = '-2'
      } else {
        r.token = token.createToken({
          id: r.data.id
        })
      }
      res.json(r)
    }, req)
  }
}

module.exports = api