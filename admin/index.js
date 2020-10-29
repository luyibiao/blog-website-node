const express = require('express');
const loadRoute = require('./routes')
const router = express.Router()
const token = require('./token/token')


// 获取传过来的token值
function getCookie(req) {
  return cookies = req.cookies ? req.cookies.token || '' : ''
}

const rouArrs = [
  '/user/login', '/type/queryArticleType'
]
// token检验
router.use((req, res, next) => {
  if (rouArrs.includes(req.originalUrl)) {
    next()
  } else {
    token.verifyToken(getCookie(req)).then(res => {
      // 解密成功，将token赋值给req
      req.decoded = res
      next()
    }).catch(e => {
      // token验证失败
      res.json(global.$resultFn.resultTokenErr())
    })
  }
})

global.$router = router

module.exports = loadRoute