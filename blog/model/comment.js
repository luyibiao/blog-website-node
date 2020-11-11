const unicode = require('../../untils/unicode')
// 发送图形验证码
function sendImgCode(req, res) {
  var svgCaptcha = require('svg-captcha');
  var code = svgCaptcha.create();
  code.text = code.text.toLowerCase()
  code.text = unicode.stringEncode(code.text)
  res.send(global.$resultFn.resultSuccess({
    img: code.data,
    text: code.text
  }));
}

module.exports = {
  sendImgCode
}