

const mysql = require('mysql')

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
      str += `${index === 0 && 'where '}${index > 0 ? 'and ' : ''}${v} = ${mysql.escape(params[v])}`
    }
  })

  // 开启了分页， 传参需要在最后
  if (ispage) {
    str += ' limit ?, ?'
    // str += ` ${i ? 'and' : 'where '} id > ? limit ?`
  }
  return str
}

const sql = {
  addLabelSql: 'insert into label set label=?',
  queryAll: function(key, req) {
    const s1 = `select * from label ` + relyOn(key, req)
    const s2 = `;select count(*) from label ` + relyOn(key, req, false)
    return s1 + s2 
  }
}

module.exports = sql