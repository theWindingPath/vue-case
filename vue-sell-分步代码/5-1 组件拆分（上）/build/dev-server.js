var path = require('path')
var express = require('express')
var webpack = require('webpack')
var config = require('../config')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing' ?
  require('./webpack.prod.conf') :
  require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()

// 从data.json里读取数据
var appData = require('../data.json');
var seller = appData.seller; // 定义商家数据，放到seller上
var goods = appData.goods;
var ratings = appData.ratings;

// 编写路由
var apiRouters = express.Router(); // 定义路由

// 写一些接口
apiRouters.get('/seller', function (req, res) { // get请求，有一个回调函数，两个参数req、res
  // 服务端收到请求后，会给json数据
  res.json({ // 返回数据长这样
    errno: 0, // 数据是正常的用errno: 0 标识
    data: seller
  });
});

apiRouters.get('/goods', function (req, res) { // get请求，有一个回调函数，两个参数req、res
  // 服务端收到请求后，会给json数据
  res.json({ // 返回数据长这样
    errno: 0, // 数据是正常的用errno: 0 标识
    data: goods
  });
});

apiRouters.get('/ratings', function (req, res) { // get请求，有一个回调函数，两个参数req、res
  // 服务端收到请求后，会给json数据
  res.json({ // 返回数据长这样
    errno: 0, // 数据是正常的用errno: 0 标识
    data: ratings
  });
});

// 调用app的use方法
app.use('/api', apiRouters);

var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({
      action: 'reload'
    })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:' + port + '\n')
})
