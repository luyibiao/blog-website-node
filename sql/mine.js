const mysql = require('mysql')


function addSql(params, keys) {
  let s = 'insert into mine set '
  keys.map((v, index) => {
    if (params[v]) {
      s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
    }
  })
  return s
}

function update(params, keys) {
  let s = `update mine set `
  keys.filter(v => (params[v] !== undefined && params[v] !== null)).map((v, index) => {
    s += `${index === 0 ? '' : ','}${v} = ${mysql.escape(params[v])}`
  })
  s += ` where id = ?`
  return s
}

const sql = {
  add: function(params, keys) {
    return addSql(params, keys) 
  },
  query: 'select * from mine',
  update: function(params, keys) {
    return update(params, keys)
  }
}

module.exports = sql