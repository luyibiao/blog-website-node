let model = require('../model/upload.js');
// let uthelper = require('../untils/formatData')
// const token = require('../token/token')

let api = {
  upload(req, res, next) {
    model.upload(req, res)
  }
}

module.exports = api