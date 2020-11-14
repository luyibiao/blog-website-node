const {article, article_type: articleTypeSql } = global.$sql('article', 'article_type')

// 获取全部文章列表
function getArticleList(req, res) {
  const pagesList = global.$overall.setPagination(req)
  req.body.status = 'LINE'
  const arrs = [
     'type', 'status', 'child_type', 'hot_comments'
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

// 获取热门文章
// function getHotArticle(req, res) {}

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

// 拿文章类型
function queryArticleType(req, res) {
  global.$db.query(articleTypeSql.queryArticleType, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    
    res.json(global.$resultFn.resultSuccess(result, false))
    return
  })
  return
}

module.exports = {
  getArticleList,
  queryArticleDetail,
  queryArticleType
}