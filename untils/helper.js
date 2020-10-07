function getValue(opt, key) {
  if (!opt) return
  const info = opt.body
  return info[key]
}

module.exports = {
  getValue
}