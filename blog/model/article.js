const {article, article_type: articleTypeSql } = global.$sql('article', 'article_type')

// 获取全部文章列表
function getArticleList(req, res) {
  const pagesList = global.$overall.setPagination(req)
  const params = global.$overall.getReqParamsAll(req)
  const { timeType } = params
  req.body.status = 'LINE'
  const arrs = [
     'type', 'status', 'child_type', 'hot_comments', 'recommend'
  ]

  global.$db.queryArgs(article.query(req, arrs, timeType), pagesList, (err, result) => {
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

// 随便看看
function queryRandowArticle(req, res) {
  global.$db.query(article.queryRandowArticle(), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess(result, false))
    return
  })
  return
}

// 获取文章子类型
function queryArticleChildType(req, res) {
  const params = global.$overall.getArgs(req, 'code') 
  global.$db.queryArgs(articleTypeSql.qertSecondsCodeType, params,  (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess(result))
    return
  })
  return
}

// 设置观看数
function setWatchNum(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  const arrs = [
    'num', 'ip_address'
  ]
  global.$db.queryArgs(article.updateWatchNum(params, arrs), [params.article_id],  (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess({}))
    return
  })
  return
}

// 查询上一条
function queryUpArticle(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  global.$db.queryArgs(article.queryUpArticle(), [params.id],  (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess(result))
    return
  })
  return
}

// 查询下一条
function queryNextArticle(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  global.$db.queryArgs(article.queryNextArticle(), [params.id],  (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess(result))
    return
  })
  return
}



module.exports = {
  getArticleList,
  queryArticleDetail,
  queryArticleType,
  queryRandowArticle,
  queryArticleChildType,
  setWatchNum,
  queryUpArticle,
  queryNextArticle
}