
var api = require('../../controller/user');

global.$router.post('/login', function(req, res, next) {
  api.getUser(req, res, next)
})


module.exports = global.$router