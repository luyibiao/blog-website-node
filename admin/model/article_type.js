
const { article_type: sql } = global.$sql('article_type')

// 判断名称是否已存在
function checkArticleType(req, res) {
  return new Promise((resolve, reject) => {
    const params = global.$overall.getReqParamsAll(req)
    global.$db.queryArgs(sql.quertExitArticle, global.$overall.getArgs(req, 'name', 'code'), (e, result) => {
      if (!result[0]) {
        resolve(true)
      } else {
        const instance = result[0]
        if (instance.name === params.name) {
          res.json(global.$resultFn.resultErr('名称已存在'))
        } else {
          res.json(global.$resultFn.resultErr('code已存在'))
        }
        reject(result[0])
      }
    })
  })
}

// 判断一级栏目下二级栏目是否存在
function checkArticleExit(req, res) {
  return new Promise((resolve, reject) => {
    const params = global.$overall.getReqParamsAll(req)
    global.$db.queryArgs(sql.querySecondsExit, global.$overall.getArgs(req, 'articletype_id' ,'code', 'name'), (e, result) => {
      if (!result[0]) {
        resolve(true)
      } else {
        const instance = result[0]
        if (instance.name === params.name) {
          res.json(global.$resultFn.resultErr('名称已存在'))
        } else {
          res.json(global.$resultFn.resultErr('code已存在'))
        }
        reject(result[0])
      }
    })
  })
}

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
async function addArticleType(req, res) {
  const isExit = await checkArticleType(req, res)
  if (isExit) {
    global.$db.queryArgs(sql.addArticleType, global.$overall.getArgs(req, 'name', 'code') , err => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
        return
      }
      res.json(global.$resultFn.resultSuccess({}))
    })
  }
  return
}

// 删除一级栏目
function deleteArticleType(req, res) {
  global.$db.queryArgs(sql.deleteArticleType, global.$overall.getArgs(req, 'id') , err => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    const arr = [
      '',
      ...global.$overall.getArgs(req, 'id')
    ]
    global.$db.queryArgs(sql.deleteSecondsArticle(), arr, function() {})
    res.json(global.$resultFn.resultSuccess({}))
  })
  return
}

// 修改一级栏目
async function updateArticleType(req, res) {
  const isExit = await checkArticleType(req, res)
  if (isExit) {
    const params = global.$overall.getReqParamsAll(req)
    const arrs = ['name']
    global.$db.queryArgs(sql.updateArticleType(params, arrs), global.$overall.getArgs(req, 'id') , err => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
        return
      }
      res.json(global.$resultFn.resultSuccess({}))
    })
  }
  return 
}

// 增加二级栏目
async function addSecondsArticleType(req, res) {
  const isExit = await checkArticleExit(req, res)
  if (isExit) {
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
  return 
}

// 删除二级栏目
function deleteSecondsArticle(req, res) {
  const arr = [
    ...global.$overall.getArgs(req, 'id'),
    ''
  ]
  global.$db.queryArgs(sql.deleteSecondsArticle(), arr , err => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess({}))
  })
  return
}

// 查询二级栏目
function querySecondsArticleType(req, res) {
  global.$db.query(sql.querySecondsArticleType, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess(result, false))
    return
  })
  return
}

// 修改二级栏目
async function updateSecondsArticle(req, res) {
  const isExit = await checkArticleExit(req, res)
  if(isExit) {
    const params = global.$overall.getReqParamsAll(req)
    const arrs = ['name']
    global.$db.queryArgs(sql.updateSecondsArticle(params, arrs), global.$overall.getArgs(req, 'id') , err => {
      if (err) {
        res.json(global.$resultFn.resultErr(err))
        return
      }
      res.json(global.$resultFn.resultSuccess({}))
    })
  }
}

module.exports = {
  queryArticleType,
  addArticleType,
  deleteArticleType,
  updateArticleType,
  addSecondsArticleType,
  deleteSecondsArticle,
  querySecondsArticleType,
  updateSecondsArticle
}