
const { banner: sql } = global.$sql('banner')

// 增加轮播图
async function addBanner(req, res, next) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.logoPath) {
    res.json(global.$resultFn.resultErr('图片不能为空'))
    return
  }
  if (params.type == 1 && !params.article_id) {
    res.json(global.$resultFn.resultErr('跳转文章不能为空'))
    return
  }
  if(params.type == 2 && !params.url) {
    res.json(global.$resultFn.resultErr('外联不能为空'))
    return
  }
  if (params.logoPath) {
    // const u = await global.$overall.freameuUploadImg(params.logoPath, params.logonName).catch(e => {
    //   res.json(global.$resultFn.resultErr(e))
    // })
    const a = params.logoPath.split('/') || []
    params.imgUrl = global.$overall.HOST_NAME + '/images/' + a[a.length - 1]
    // params.imgUrl = u.url
  }
  const arr = [
    'article_id', 'type', 'imgUrl', 'url'
  ]
  global.$db.query(sql.add(params, arr), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(e))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
  return
}

// 查询轮播图
function queryBanner(req, res, next) {
  global.$db.query(sql.query(), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(e))
    } else {
      // const arr = result.filter(v => (v.type == 2) || (v.type == 1 && v.article_id))
      res.json(global.$resultFn.resultSuccess(result, false))
    }
  })
  return
}

// 修改轮播图单个数据
async function upadteBanner(req, res, next) {
  const params = global.$overall.getReqParamsAll(req)
  if (!params.logoPath && !params.imgUrl) {
    res.json(global.$resultFn.resultErr('图片不能为空'))
    return
  }
  if (params.type == 1 && !params.article_id) {
    res.json(global.$resultFn.resultErr('跳转文章不能为空'))
    return
  }
  if(params.type == 2 && !params.url) {
    res.json(global.$resultFn.resultErr('外链不能为空'))
    return
  }
  if (!params.id) {
    res.json(global.$resultFn.resultErr('id不能为空'))
    return
  }
  if (params.logoPath) {
    // const u = await global.$overall.freameuUploadImg(params.logoPath, params.logonName).catch(e => {
    //   res.json(global.$resultFn.resultErr(e))
    // })
    // params.imgUrl = u.url
    const a = params.logoPath.split('/') || []
    params.imgUrl = global.$overall.HOST_NAME + '/images/' + a[a.length - 1]
  }
  const arr = [
    'article_id', 'type', 'imgUrl', 'url'
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

// 查询单个详情
function queryBannerDetail(req, res, next) {
  global.$db.queryArgs(sql.queryDetail(), global.$overall.getArgs(req, 'id'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess(result))
    }
  })
  return
}

// 删除轮播
function deleteBanner(req, res, next) {
  global.$db.queryArgs(sql.delete(), global.$overall.getArgs(req, 'id'), (err, result) => {
    if (err) {
      res.json(global.$resultFn.resultErr(err))
    } else {
      res.json(global.$resultFn.resultSuccess({}))
    }
  })
}

module.exports = {
  addBanner,
  queryBanner,
  upadteBanner,
  queryBannerDetail,
  deleteBanner
}