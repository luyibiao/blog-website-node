
const {article: sql, label: labSql, banner: bannerSql } = global.$sql('article', 'label', 'banner')

function check(params, res) {
  if (params.check) return true
  if (!params.title) {
    res.json(global.$resultFn.resultErr('标题不能为空'))
    return false
  }
  if (!params.author) {
    res.json(global.$resultFn.resultErr('作者不能为空'))
    return false
  }
  if (!params.contentdesc) {
    res.json(global.$resultFn.resultErr('文章简介不能为空'))
    return false
  }
  if (!params.content) {
    res.json(global.$resultFn.resultErr('文章内容不能为空'))
    return false
  }
  return true
}

// 增加标签使用次数 
function addLabelNum(arr = []) {
  arr.map(v => {
    global.$db.queryArgs(labSql.query, [v.id], (err, result) => {
      const num = ++ result[0].use_num  
      global.$db.queryArgs(labSql.updateNum, [num, v.id], (e, r) => {})
    })
  })
}

// 增加文章
async function add(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!check(params, res)) return
  if (params.logoPath) {
    const u = await global.$overall.freameuUploadImg(params.logoPath, params.logonName).catch(e => {
      res.json(global.$resultFn.resultErr(e))
    })
    params.logo = u.url
  }
  const arrs = [
    'title', 'author', 'label', 'content', 'contentdesc', 'type', 'status', 'logo'
  ]
  global.$db.query(sql.add(params, ...arrs), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      addLabelNum(JSON.parse(params.label || '[]'))
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

// 查询文章
async function query(req, res) {
  const pagesList = global.$overall.setPagination(req)
  const arrs = [
    'title', 'create_time', 'type', 'author', 'status', 'hot_comments', 'topping'
  ]
  global.$db.queryArgs(sql.query(req, arrs), pagesList, (err, result) => {
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

// 修改文章内容
async function update(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!check(params, res) ) return
  if (!params.id) {
    res.json(global.$resultFn.resultErr('文章id为空'))
    return
  }
  if (params.logoPath) {
    const u = await global.$overall.freameuUploadImg(params.logoPath, params.logonName).catch(e => {
      res.json(global.$resultFn.resultErr(e))
    })
    params.logo = u.url
  }
  if (!params.logoPath && !params.logo) {
    params.logo = ''
  }
  const arrs = [
    'title', 'author', 'label', 'content', 'contentdesc', 'type', 'status', 'logo', 'hot_comments', 'topping', 'id'
  ]
  global.$db.queryArgs(sql.update(params, ...arrs), [params.id], (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      addLabelNum(JSON.parse(params.label || '[]'))
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
}

// 查询文章详情
function quertyDetail(req, res) {
  global.$db.queryArgs(sql.quertyDetail(), global.$overall.getArgs(req, 'id'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess(result))
    }
  })
}

// 删除文章
function deleteDetail(req, res) {
  const ids = global.$overall.getArgs(req, 'id')
  global.$db.queryArgs(sql.deleteDetail(), ids, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      // 将banner表中的关联文章数据也删掉
      global.$db.queryArgs(bannerSql.deleteArticle(), ids, function() {})
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
}

module.exports = {
  add,
  query,
  update,
  quertyDetail,
  deleteDetail
}
