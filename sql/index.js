module.exports = function(...args) {
  args = args || []
  const result = {}
  args.map(v => {
    result[v] = require('./src/' + v)
  })
  return result
}