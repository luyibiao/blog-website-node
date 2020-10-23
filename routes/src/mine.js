const model = require('../../model/mine.js')

global.$router.post('/addmine', function(req, res, next) {
  model.addMine(req, res, next)
})

global.$router.post('/querymine', function(req, res, next) {
  model.queryMine(req, res, next)
})

global.$router.post('/updatemine', function(req, res, next) {
  model.updateMine(req, res, next)
})

module.exports = global.$router