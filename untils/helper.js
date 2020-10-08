
function getValue(opt, ...args) {
  if (!opt || !opt.body) return []
  args = args || []
  return args.map(v => opt.body[v])
}

// 格式化数据
function formatRes(res, isformatObj = true) {
  if (!res) return {}
  if (isformatObj) {
    return {
      ...res[0] || {}
    }
  }
  return {
    list: res
  }
}

module.exports = {
  getValue,
  formatRes
}