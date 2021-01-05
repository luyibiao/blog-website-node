
const { article_type: sql } = global.$sql('article_type')

// 判断名称是否已存在
function checkArticleType(req, res) {
  return new Promise((resolve, reject) => {
    const params = global.$overall.getReqParamsAll(req)
    global.$db.queryArgs(sql.quertExitArticle, global.$overall.getArgs(req, 'name', 'code'), (e, result) => {
      const instance = result[0] || {}
      if (instance.id == params.id || !result[0]) {
        resolve(true)
      } else {
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
    const params = global.$overall.getReqParamsAll(req)
    const arr = ['name', 'code', 'route_url', 'side_column']
    global.$db.query(sql.addArticleType(params, arr) , err => {
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
    const arrs = ['name', 'route_url', 'side_column']
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

// 根据一级栏目code查询二级栏目
function queryTypeOrSecondsType(req, res) {
  global.$db.queryArgs(sql.queryTypeOrSecondsType, global.$overall.getArgs(req, 'articletype_code') , (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
      return
    }
    res.json(global.$resultFn.resultSuccess(result, false))
  })
  return 
}

// 增加侧边栏目
function addSideColumn(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.column_name) {
    res.json(global.$resultFn.resultErr('栏目名称为空'))
    return
  }
  if (!params.code) {
    res.json(global.$resultFn.resultErr('栏目code为空'))
    return
  }
  const arrs = [
    'column_name', 'code'
  ]
  global.$db.query(sql.addSideColum(params, arrs), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

// 获取侧边栏 
function querySideColumn(req, res) {
  global.$db.query(sql.querySideColumn, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess(result, false))
    }
  })
  return
}

// 删除侧边栏
function deleteSideCoulmn(req, res) {
  global.$db.queryArgs(sql.deleteSideCoulmn, global.$overall.getArgs(req, 'id'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

// 修改侧边栏
function updateSideColumn(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.column_name) {
    res.json(global.$resultFn.resultErr('栏目名称为空'))
    return
  }
  const arr = [
    'column_name'
  ]
  global.$db.queryArgs(sql.updateSideColumn(params, arr), global.$overall.getArgs(req, 'id'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

module.exports = {
  queryArticleType,
  addArticleType,
  deleteArticleType,
  updateArticleType,
  addSecondsArticleType,
  deleteSecondsArticle,
  querySecondsArticleType,
  updateSecondsArticle,
  queryTypeOrSecondsType,
  addSideColumn,
  querySideColumn,
  deleteSideCoulmn,
  updateSideColumn
}