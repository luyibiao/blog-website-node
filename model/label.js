var db = require('../config/index.js');
const sql = require('../sql/label')

function addLabel(req, res) {
  db.queryArgs(sql.addLabelSql, global.$getArgs(req, 'label'), (err, result) => {
    if (err) {
      global.$resultFn.resultErr(err)
    } else {
      res.json({
        code: '1',
        msg: 'success'
      })
    }
  })
}

module.exports = {
  addLabel
}