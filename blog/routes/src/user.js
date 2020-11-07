const user = require('../../model/user')

global.$blogRouter.post('/sendCode', (req, res, next) => {
  user.sendCode(req, res, next)
})

global.$blogRouter.post('/checkBlogLogin', (req, res, next) => {
  user.checkBlogLogin(req, res, next)
})

module.exports = global.$blogRouter