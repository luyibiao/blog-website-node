let model = require('../model/label.js');
// let uthelper = require('../untils/formatData')
// const token = require('../token/token')

let api = {
  addLabel(req, res, next) {
    model.addLabel(req, res)
  }
}

module.exports = api