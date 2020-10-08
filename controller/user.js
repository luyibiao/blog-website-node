let model = require('../model/user.js');
// let uthelper = require('../untils/formatData')
// const token = require('../token/token')

let api = {
  getUser(req, res, next) {
    model.getUser(req, res)
  }
}

module.exports = api