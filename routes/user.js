var express = require('express');
var router = express.Router();
var api = require('../controller/user');

router.post('/login', function(req, res, next) {
  
  api.getUser(req, res, next)
  
  // res.send('respond with a 11111');
})

// router.get('/login', function(req, res, next) {
//   res.send('respond with a resourcesdfgdgfdgfdgfgfd');
// })

module.exports = router