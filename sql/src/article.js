const mysql = require('mysql')

function getTime(s, req) {
  const create_time = global.$overall.getReqParams(req, 'create_time').create_time
  if (!create_time) return ``
  let s1 = `date(create_time) between '${create_time}' and '${create_time}' `
  if (s) {
    return s1
  } else {
    return `where ${s1}`
  }
}

function addSQL(params, keys) {
  let s = `insert into article set `
  keys.map((v, index) => {
    s += `${index === 0 ? '' : ','}${v}=${mysql.escape(params[v])}`
  })
  return s
}

function query(key, req, time = 'create_time') {
  const s = global.$overall.relyOn(key, req, true)
  const s0 = `select * from article ` + s + getTime(s, req)
  const s1 = s0 + ` ORDER BY ${time} desc limit ?, ?`
  const s2 = `;select count(*) from article ` + s + getTime(s, req)
  return s1 + s2 
}

function update(params, keys) {
  let s = `update article set `
  keys.filter(v => (params[v] !== undefined && params[v] !== null)).map((v, index) => {
    s += `${index === 0 ? '' : ','}${v} = ${mysql.escape(params[v])}`
  })
  s += ` where id = ?`
  return s
}

const sql = {
  // 新增文章
  add: function(params, ...keys) {
    return addSQL(params, keys)
  },
  // 查询文章
  query: function(req, keys, time) {
    return query(keys, req, time)
  },
  // 修改文章
  update: function(params, ...keys) {
    return update(params, keys)
  },
  // 查询文章详情
  quertyDetail: function() {
    return `select * from article where id = ?` 
  },
  // 删除文章
  deleteDetail: function() {
    return `delete from article where id = ?`
  },
  // 随机获取数据
  queryRandowArticle(nums = 4) {
    console.log(6666)
    return `SELECT * FROM article ORDER BY RAND() LIMIT ${nums}`
  }
}

module.exports = sql