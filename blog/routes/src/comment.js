const comment = require('../../model/comment')

global.$blogRouter.post('/sendimgcode', (req, res, next) => {
  comment.sendImgCode(req, res, next)
})

// 增加评论
global.$blogRouter.post('/addComment', (req, res, next) => {
  comment.addComment(req, res, next)
})

//  查询评论列表
global.$blogRouter.post('/queryComments', (req, res, next) => {
  comment.queryComments(req, res, next)
})


module.exports = global.$blogRouter