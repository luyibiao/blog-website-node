// 全局方法文件

// sql占位符获取
function getArgs(opt, ...args) {
  if (!opt || !opt.body) return []
  args = args || []
  return args.map(v => opt.body[v])
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

// 传入mysqp分页参数设置
function setPagination(req) {
  /**
   * @param pageIndex(当前页)
   * @param pageSize(一页多少条)
   */
  let [pageIndex, pageSize] = getArgs(req, 'pageIndex', 'pageSize')
  pageSize = parseInt(pageSize)
  pageIndex = parseInt(pageIndex) * pageSize
  return [pageIndex, pageSize]
}

module.exports = {
  getArgs,
  formatRes,
  setPagination
}