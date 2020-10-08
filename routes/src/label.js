
var api = require('../../controller/label');

global.$router.post('/addLabel', function(req, res, next) {
  api.addLabel(req, res, next)
})


module.exports = global.$router