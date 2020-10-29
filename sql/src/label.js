
const sql = {
  addLabelSql: 'insert into label set label=?',
  queryAll: function(key, req) {
    const s1 = `select * from label ` + global.$overall.relyOn(key, req) + ' ORDER BY create_time desc limit ?, ?'
    const s2 = `;select count(*) from label ` + global.$overall.relyOn(key, req)
    return s1 + s2 
  },
  query: 'select use_num from label where id = ?',
  // 修改 
  update: 'update label set label = ? where id = ?',
  updateNum: 'update label set use_num = ? where id = ?',
  delete: 'delete from label where id = ?',
  // 设为热门
  updateHot: 'update label set hot = ? where id = ?'
}

module.exports = sql