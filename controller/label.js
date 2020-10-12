let model = require('../model/label.js');
// let uthelper = require('../untils/formatData')
// const token = require('../token/token')

let api = {
  addLabel(req, res, next) {
    model.addLabel(req, res)
  },
  updateLabel(req, res, next) {
    model.updateLabel(req, res)
  },
  queryLabel(req, res, next) {
    model.queryLabel(req, res)
  },
  deleteLabel(req, res, next) {
    model.deleteLabel(req, res)
  },
}

module.exports = api