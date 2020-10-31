const home = require('../../model/home')

global.$blogRouter.post('/queryBaner', (req, res, next) => {
  home.queryBaner(req, res, next)
})

module.exports = global.$blogRouter