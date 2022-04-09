const app = require('./app');
const config = require('./app/config/app_config')
require('./app/database')
require('./utils/getAccessToken')

app.listen(config.APP_PORT, () => console.log(`服务器${config.APP_PORT}端口启动成功`))
