
var api = require('../../controller/user');



global.$router.post('/login', function(req, res, next) {
  api.getUser(req, res, next)
  // res.send('respond with a 11111');
})

// router.get('/login', function(req, res, next) {
//   res.send('respond with a resourcesdfgdgfdgfdgfgfd');
// })

module.exports = global.$router