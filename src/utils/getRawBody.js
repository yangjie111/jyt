const getRbody = require('raw-body')

function getRawBody(ctx) {
  return getRbody(ctx.req, {
    length: ctx.request.length,
    limit: '1mb',
    encoding: ctx.request.charset || 'utf-8'
  })
}

module.exports = getRawBody