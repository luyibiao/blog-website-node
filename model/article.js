var db = require('../config/index.js');
const sql = require('../sql/article')

// 增加文章
function add(req, res) {
  const params = global.$overall.getReqParams(req, 'label')
  db.query(sql.add, (err, result) => {

  })
}
