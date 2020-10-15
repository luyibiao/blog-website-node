
let model = require('../../model/overall.js');

global.$router.post('/queryArticleType', function(req, res, next) {
  model.queryArticleType(req, res, next)
})


module.exports = global.$router