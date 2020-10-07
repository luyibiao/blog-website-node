const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const filePath = path.join(__dirname, './private.key')
const ppath = path.join(__dirname, './public.key')

const arrs = [
  filePath,
  ppath
]

let list = []
arrs.map(v => {
  fs.readFile(v, 'utf-8', function(err, data) {
    list.push(data)
  })
})

// 创建token
function createToken() {
 // 获取签发 JWT 时需要用的密钥
 return jwt.sign({ name: 11 }, list[0], { algorithm: 'RS256' })
}

// 验证 Token
function verifyToken(token) {
  // 验证 Token
  return new Promise((reslove, reject) => {
    jwt.verify(token, list[1], (err, decoded) => {
      if (err) {
        reject(err)
        return
      } 
      console.log(7878787)
      reslove(decoded)
    })
  })
}

module.exports = {
  createToken,
  verifyToken
}


