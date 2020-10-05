var express = require('express');
var router = express.Router();
var api = require('../controller/user');
let vv = require('./aa')

router.get('/login', function(req, res, next) {
  console.log( 111111)
  api.getUser(req, res, next)
  
  // res.send('respond with a 11111');
})

// router.get('/login', function(req, res, next) {
//   res.send('respond with a resourcesdfgdgfdgfdgfgfd');
// })

module.exports = router