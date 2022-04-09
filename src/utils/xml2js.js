const xml2js = require('xml2js')

function parseXML(xml) {
  return new Promise((resolve, reject) => {
    xml2js.parseString(xml, { trim: true, explicitArray: false, ignoreAttrs: true }, function (err, result) {
      if (err) {
        return reject(err)
      }
      resolve(result.xml)
    })
  })
}

module.exports = parseXML