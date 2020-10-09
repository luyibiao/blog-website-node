
const codes = {
  // 成功状态
  success: '1',
  // 失败状态
  err: '00',
  // token验证失败
  tokenerr: '-1',
  // 未查找到用户
  nouser: '-2'
}

// 成功返回字段
function success(res, isformatObj) {
  return {
    code: codes.success,
    msg: 'success',
    data: global.$formatRes(res, isformatObj)
  }
}

// 失败返回字段
function error(err, code) {
  return {
    code: code || codes.err,
    msg: err || '请求失败'
  }
}

// token验证失败返回字段
function TokenErr() {
  return {
    msg: 'token验证失败，请重新登录',
    code: codes.tokenerr
  }
}

// 未找到用户
function nouser() {
  return {
    msg: '未找到用户',
    code: codes.nouser
  }
}

const results = {
  // 成功
  resultSuccess: function(res, isformatObj = true) {
    return success(res, isformatObj)
  },
  // 失败
  resultErr: function(err, code) {
    return error(err, code)
  },
  // token验证失败
  resultTokenErr: function() {
    return TokenErr()
  },
  // 未找到用户
  resultNouser: function() {
    return nouser()
  }
}

module.exports = {
  results,
  codes
}