
const { mine: sql } = global.$sql('mine')

// 增加个人说明
async function addMine(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.profile) {
    res.json(global.$resultFn.resultErr('个人简介不能为空'))
    return
  }
  if (!params.content) {
    res.json(global.$resultFn.resultErr('内容不能为空'))
    return
  }
  if (params.logoPath) {
    // const u = await global.$overall.freameuUploadImg(params.logoPath, params.logonName).catch(e => {
    //   res.json(global.$resultFn.resultErr(e))
    // })
    const a = params.logoPath.split('/') || []
    params.avatar = global.$overall.HOST_NAME + '/images/' + a[a.length - 1]

  }
  const arr = [
    'description', 'profile', 'content', 'avatar'
  ]
  global.$db.query(sql.add(params, arr), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

// 查询关于我
function queryMine(req, res) {
  global.$db.query(sql.query, (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess(result))
    }
  })
  return
}

// 修改关于我
async function updateMine(req, res) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.profile) {
    res.json(global.$resultFn.resultErr('个人简介不能为空'))
    return
  }
  if (!params.content) {
    res.json(global.$resultFn.resultErr('内容不能为空'))
    return
  }
  if (params.logoPath) {
    // const u = await global.$overall.freameuUploadImg(params.logoPath, params.logonName).catch(e => {
    //   res.json(global.$resultFn.resultErr(e))
    // })
    // params.avatar = u.url
    const a = params.logoPath.split('/') || []
    params.avatar = global.$overall.HOST_NAME + '/images/' + a[a.length - 1]
  }
  if (!params.logoPath && !params.avatar) {
    params.avatar = ''
  }
  const arr = [
    'description', 'profile', 'content', 'avatar'
  ]
  global.$db.queryArgs(sql.update(params, arr), [params.id], (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

module.exports = {
  addMine,
  queryMine,
  updateMine
}
