
var api = require('../../controller/label');

global.$router.post('/addLabel', function(req, res, next) {
  api.addLabel(req, res, next)
})

global.$router.post('/list', function(req, res, next) {
  api.queryLabel(req, res, next)
})


module.exports = global.$router