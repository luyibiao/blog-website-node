const express = require('express');
const router = express.Router()
const loadRoute = require('./routes')


global.$blogRouter = router

module.exports = loadRoute