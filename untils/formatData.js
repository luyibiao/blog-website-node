// 格式化数据
function formatRes(res, isformatObj = true) {
  if (!res) return {}
  if (res.code == '00') return res
  if (isformatObj && res.data.length) {
    res.data = res.data[0]
    return res
  } else {
    res.data = {
      list: res.data
    }
    return res
  }
}

module.exports = {
  formatRes: formatRes
}