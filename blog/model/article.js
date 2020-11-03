const {article, label: labSql, banner: bannerSql } = global.$sql('article', 'label', 'banner')
const sendEmail = require('../../untils/email')

// 拿文章列表
function getArticleList(req, res) {
  // 创建一个邮件对象
  var mail = { 
    // 主题
    subject: '你好',
    // 收件人
    // to: 'zhang.zheng@hb-cloud.cn',
    to: '1739717921@qq.com',
    text: '第一篇九七个人博客推送'
    
    // 邮件内容，HTML格式
    // text: '点击激活：xxx' //可以是链接，也可以是验证码
  };

  const pagesList = global.$overall.setPagination(req)
  const arrs = [
    'title', 'create_time', 'type', 'author', 'status', 'child_type', 'hot_comments', 'topping'
  ]

  global.$db.queryArgs(article.query(req, arrs), pagesList, (err, result) => {
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
      return
    }
  })
  return
}

// 拿推荐文章列表
// function get

// 获取文章详情
function queryArticleDetail(req, res) {
  global.$db.queryArgs(article.quertyDetail(), global.$overall.getArgs(req, 'id'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess(result))
    }
  })
  return
}

module.exports = {
  getArticleList,
  queryArticleDetail
}