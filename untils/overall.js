// 全局方法文件

const mysql = require('mysql')

// sql占位符获取
function getArgs(opt, ...args) {
  if (!opt || !opt.body) return []
  args = args || []
  return args.map(v => opt.body[v])
}

// 请求参数获取
function getReqParams(opt, ...keys) {
  if (!opt || !opt.body) return {}
  const params = opt.body
  let result = {}
  keys.map(v => {
    result[v] = params[v] || ''
  })
  return result
}


// 请求结果格式化
function formatRes(res, isformatObj = true) {
  if (!res) return {}
  if (Array.isArray(res)) {   
    if (isformatObj) {
      return {
        ...res[0] || {}
      }
    }
    return {
      list: res
    }
  } else {
    return JSON.stringify(res) === '{}' ? {} : {...res}
  }
}

// 拼接条件查询语句sql语句
function relyOn(key, req, ispage = true) {
  key = key || []
  const params = req.body
  // 提取
  let str = ``
  key.filter(v => v !=='pageIndex' && v !== 'pageSize' ).map((v, index) => {
    if (params[v]) {
      str += `${index === 0 && 'where '}${index > 0 ? 'and ' : ''}${v} = ${mysql.escape(params[v])}`
    }
  })
  return str
}

// 传入mysqp分页参数设置
function setPagination(req) {
  /**
   * @param pageIndex(当前页)
   * @param pageSize(一页多少条)
   */
  let [pageIndex = 0, pageSize = 10] = getArgs(req, 'pageIndex', 'pageSize')
  pageSize = parseInt(pageSize)
  pageIndex = parseInt(pageIndex) * pageSize
  return [pageIndex, pageSize]
}

// 派发分页参数设置
function getPagination(pageIndex, pageSize, total) {
  return {
    // 当前页数
    pageIndex: (pageIndex / pageSize) + 1  ,
    // 当前要查的条数
    pageSize,
    // 总条数
    total: getTotal(total),
    // 总页数
    countPage: Math.ceil(getTotal(total) / pageSize)
  }
}

function getTotal(t) {
  t = t || []
  if (!t.length) return 0
  return Object.values(t[0])[0]
}

module.exports = {
  getArgs,
  getReqParams,
  formatRes,
  setPagination,
  getPagination,
  relyOn
}