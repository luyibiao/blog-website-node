const fs = require('fs')
const jwt = require('jsonwebtoken')

// // 获取签发 JWT 时需要用的密钥
// const privateKey = fs.readFileSync('./private.key')
// // 获取验证 JWT 时需要用的公钥
// const publicKey = fs.readFileSync('./public.key')

const keys = `MIIEowIBAAKCAQEAu7LrbOIVFYa1IJwSUFru6B3DVtGK60i9AIy+lAE1MUuQPrux
E8E/AmnYm+mLCcJimkf43f54eUslZ54x6toq0aNRD8WGk27oGcM5CWzhIEVLITXj
lq94qXsAKQ04cpt4J8YdAjq7L1es9JPdGfl5P6Usp0pb4YfqyGwFRZe3/Ag1MAKo
kLJBHvcwJs/ZU6yWiC31xx1SC6TQoQJKQMUDJuQDl07LbuZYSAijz79/IzbYeXJR
Fo7Wcj1DOV+srTbmUr1UNInSHiVxTbYI14eg4SgOgZpwTQXAkLOLMseWdoyrfLQW
AI5VdsVKVoarZdStJzlVylRp4ORlQrjW8jgnrwIDAQABAoIBAGN5EuOFfX8HAP7j
N6F2T56cB2X/bwv6ZI/iBy4Q5cvWK//TIKlDhM0Wo0EdqB3n8rGo6u9baSV++bfM
UtAQBxlK4C7nk8aWxFLC73tbRIQBtStIj/DP1bacBR28b+ntEuShTcZcsc8JPBPy
OP8HA4cDVoLiGYeQrJDDDpgvK8ZY+kgEd4A2HPC5S5LHVXPIxz8s9NS9cpYJbsdU
sWEWHXJGPIgVvNMO7tHFxu52Yhyeup7CTt0BFiwbTrETAFHj5UQ6XEtslClGSqcd
JY7dZhkoeQgZrE0J+dPQicWuY7t8VB0lM7/eWOSix9XGq5LSb6DTzApdqv4hbEQA
octklKECgYEA62WFYcip8sdGHH5TlKMzCBKVZISrHrrkYG2INSrCsuQvnN2Vljfd
ey5JTMYqSWKF1huLepZPnYTSZ0Vul6b/A31/Lic5HrxvP6WGnhg52RK+e253hKBg
5U761sr7oNyYXAgFJI3jt80EIUGmSlXirOOYtxZPio9MVzhiKiUx+k0CgYEAzCCl
yh9oaWqaboYdzaxjxpha1IbrBr24abWPL9fkbb2XfML24R+3JxjybbzMuNdMctzR
mSbxkgugYSdgfNtCmDX6mXbjFhszM7Xd5E4gbb8mmks48P2lbMzzqKenzYy+3F+I
0K89Bbc7Cg+6XaGbAigQrZN8nzHlk8OpVPEQb+sCgYBF0VCkVg4CEhS7csR7e4Qx
SsHAlJDkhm4iI5qYmlwxDvkIP7iUW3F3jZz0BnqYVX54qKbP7zEh+TkmpDNPC5rr
gBduqveIJD+i0weAcJMHzUVt+q+8SI00th40AvRrG8Kc2UwdMXBvHYGyE3Ss65hV
yxOKijWBVUtBO1nyQiH2qQKBgHpbh4Vk1j16PR/LHMpQb253nNqQFQlxZ71Vq4LO
Morlfoy2gS3oyOySs5678StLQvQHEUxwX5Vfir8xz1CITZ7XnGOpM+3oWATDG0Li
4eVnE0ihlnw+To6tO9D4zkkT+MQ4L9aHdFicwLMDQn8lg7kDMxwYsDbsveSZAEN+
TJAJAoGBAJ6yysMK3O4HwtiHb59t6O/77EWiojk+QPl0pjzMGZliAQ3H+EtxTUpp
/zeYEdpmDYTw42rx1EMvaDGNuzeGLnCa7u4LU6JGyAnEirl1HyJ5004Vsuih+9Ko
aIzQHrPI3qlPvLTc+mFdPYRC6C5gfv8MqFTN4KVwT/Plzt+qcrGs`

// 创建token
function createToken() {
  return token = jwt.sign({ name: 11 }, 'aaa');
}

// 验证 Token
function verifyToken(token) {
  // 验证 Token
  jwt.verify(token, keys, (err, decoded) => {
    if (err) {
      console.log(121212)
      return false
    } 
    return true
  })
}

module.exports = {
  createToken,
  verifyToken
}

