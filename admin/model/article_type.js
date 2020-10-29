
const { article_type: sql } = global.$sql('article_type')

// 查询文章类型
function queryArticleType(req, res) {
  global.$db.query(sql.queryArticleType, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess(result, false))
    return
  })
  return
}

// 增加文章类型
function addArticleType(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  global.$db.queryArgs(sql.quertExitArticle, global.$overall.getArgs(req, 'name', 'code'), (e, result) => {
    if (!result[0]) {
      global.$db.queryArgs(sql.addArticleType, global.$overall.getArgs(req, 'name', 'code') , err => {
        if (err) {
          res.json(global.$resultFn.resultErr(err))
          return
        }
        res.json(global.$resultFn.resultSuccess({}))
      })
    } else {
      const instance = result[0]
      if (instance.name === params.name) {
        res.json(global.$resultFn.resultErr('名称已存在'))
      } else {
        res.json(global.$resultFn.resultErr('code已存在'))
      }
    }
  })
  return
}

// 删除栏目
function deleteArticleType(req, res) {
  global.$db.queryArgs(sql.deleteArticleType, global.$overall.getArgs(req, 'id') , err => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess({}))
  })
}

// 增加二级栏目
function addSecondsArticleType(req, res) {
  
  const params = global.$overall.getReqParamsAll(req)
  const arrs = [
    'name', 'code', 'articletype_id', 'articletype_code', 
  ]
  global.$db.query(sql.addSecondsArticleType(params, arrs), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
}

module.exports = {
  queryArticleType,
  addArticleType,
  deleteArticleType,
  addSecondsArticleType
}