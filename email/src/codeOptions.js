module.exports = function(code) {
  return {
    subject: '验证登录',
    text: '您的验证码为 ' + code + ' 有效时间为5分钟'
  }
}