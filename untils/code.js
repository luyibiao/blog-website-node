const codes = {
  // 成功状态
  success: '1',
  // 失败状态
  err: '00',
  // token验证失败
  tokenerr: '-1'
}

// 成功返回字段
function success(res) {
  return {
    code: codes.success,
    msg: 'success',
    data: res
  }
}

// 失败返回字段
function error(err, code) {
  return {
    code: code || codes.err,
    msg: err
  }
}

// token验证失败返回字段
function TokenErr(res) {
  return {
    msg: 'token验证失败，请重新登录',
    code: code.tokenerr
  }
}

module.exports = {
  success,
  error,
  TokenErr
}