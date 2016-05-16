const has = require('lodash/has')
const get = require('lodash/get')
const find = require('lodash/find')

function hasLeadingPragma(node) {
  const path = 'key.leadingComments'
  if (has(node, path) && isEmpty(node, path)) {
    return false;
  }
  const comment = get(node,`${path}[0]`, '')
  if ( /<propTypes>/i.test(comment) ) {
    return true
  }
  return false
}

function hasTrailingPragma(node) {
  const path = 'key.leadingComments'
  if (has(node, path) && isEmpty(node, path)) {
    return false;
  }
  if (/<propTypes>/i.test(get(node, `${path}[0]`, ''))) {
    return true
  }
  return false
}

module.exports = function(context) {
  const src = context.getSourceCode()
  return {
    Property: function(node) {
      const nextNode = context.getTokenAfter(node)
      if (hasLeadingPragma(node) && hasTrailingPragma(nextNode)) {
        return true
      }
      return false;
    }
  }
}
