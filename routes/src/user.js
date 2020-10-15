
let model = require('../../model/user.js');

global.$router.post('/login', function(req, res, next) {
  model.getUser(req, res, next)
})


module.exports = global.$router