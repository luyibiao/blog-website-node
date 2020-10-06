const fs = require('fs')
const jwt = require('jsonwebtoken')


// 签名算法
module.exports = function(payload = {
  name: 'admin',
  admin: true,
  exp: 1200000
}) {
  // 获取签发 JWT 时需要用的密钥
  const privateKey = fs.readFileSync('./private.key')
  
  // 签发 Token
  const tokenRS256 = jwt.sign(payload, privateKey, { algorithm: 'RS256' })
  
  // 获取验证 JWT 时需要用的公钥
  const publicKey = fs.readFileSync('./public.key')
  
  // 验证 Token
  jwt.verify(tokenRS256, publicKey, (err, decoded) => {
    if (err) {
      return
    } 
    console.log(decoded)
  })
}

