const dotenv = require('dotenv')
const fs = require('fs')
const path = require('path')

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/private.key'))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, '../keys/public.key'))

dotenv.config()

module.exports = {
  APP_HOST,
  APP_PORT,
  MYSQL_PORT,
  MYSQL_HOST,
  MYSQL_USER,
  MYSQL_PASSWORD,
  ALIOSS_REGION,
  ALIOSS_ACCESSKEYID,
  ALIOSS_ACCESSKEYSECRET,
  ALIOSS_BUCKET,
  WX_APPID,
  WX_SECRET,
  WX_MSG_TOKEN,
  WX_MSG_EncodingAESKey
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;