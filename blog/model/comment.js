const unicode = require('../../untils/unicode')

const { comment } = global.$sql('comment')

// 发送图形验证码
function sendImgCode(req, res) {
  var svgCaptcha = require('svg-captcha');
  var code = svgCaptcha.create();
  code.text = code.text.toLowerCase()
  code.text = unicode.stringEncode(code.text)
  res.send(global.$resultFn.resultSuccess({
    img: code.data,
    text: code.text
  }));
}

// 添加评论
function addComment(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  const arr = [
    'article_id', 'user_id', 'comment_content'
  ]
  global.$db.query(comment.addComment(params, arr), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

// 获取评论列表
function queryComments(req, res) {
  const arrs = ['article_id']
  const pagesList = global.$overall.setPagination(req)
  global.$db.queryArgs(comment.query(arrs, req), pagesList, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      const pageParams = global.$overall.getPagination(pagesList[0], pagesList[1], result[1])
      const js = global.$resultFn.resultSuccess(result[0], false)
      js.data = {
        ...js.data,
        ...pageParams
      }
      res.json(js)
    }
    return
  })
  return
}

module.exports = {
  sendImgCode,
  addComment,
  queryComments
}