let model = require('../model/user.js');

let api = {
  getUser(req, res, next) {
    model.getUser(result => {
      res.json(result)
      console.log(result, 22222)
    })
  }
}

module.exports = api