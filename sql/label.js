
const sql = {
  addLabelSql: 'insert into label set label=?',
  queryAll: function(key, req) {
    const s1 = `select * from label ` + global.$overall.relyOn(key, req) + 'ORDER BY create_time desc limit ?, ?'
    const s2 = `;select count(*) from label ` + global.$overall.relyOn(key, req, false)
    return s1 + s2 
  },
  // 修改 
  update: 'update label set label = ? where id = ?',
  delete: 'delete from label where id = ?'
}

module.exports = sql