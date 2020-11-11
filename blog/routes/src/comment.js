const comment = require('../../model/comment')

global.$blogRouter.post('/sendimgcode', (req, res, next) => {
  comment.sendImgCode(req, res, next)
})


module.exports = global.$blogRouter