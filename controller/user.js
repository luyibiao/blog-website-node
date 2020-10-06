let model = require('../model/user.js');
let uthelper = require('../untils/formatData')

let api = {
  getUser(req, res, next) {
    model.getUser(result => {
      res.json(uthelper.formatRes(result))
    })
  }
}

module.exports = api