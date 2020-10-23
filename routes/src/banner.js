const model = require('../../model/banner')

global.$router.post('/addbanner', function(req, res, next) {
  model.addBanner(req, res, next)
})

module.exports = global.$router