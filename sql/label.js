


// 拼接条件查询语句sql语句
function relyOn(key, req, ispage = true) {
  key = key || []
  const params = req.body
  // 提取
  let str = ``
  let i = false
  key.filter(v => v !=='pageIndex' && v !== 'pageSize' ).map((v, index) => {
    if (params[v]) {
      i = true
      str += `${index === 0 && 'where '}${index > 0 ? 'and ' : ''}${v} = ?`
    }
  })

  // 开启了分页， 传参需要在最后
  if (ispage) {
    str += ` ${i ? 'and' : 'where '} id > ? limit ?`
  }
  return str
}

const sql = {
  addLabelSql: 'insert into label set label=?',
  queryAll: function(key, req) {
    return `select * from label ` + relyOn(key, req)
  }
}

module.exports = sql