const fs = require("fs");

const path = require("path");

const isProduction = process.env.NODE_ENV === "production";

const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  // outputDir: "../big-screen-server/src/main/resources/static",
  outputDir: "bigScreen/static",
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // assetsDir: "static",
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径
  // indexPath: './',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    config.entry("index").add("babel-polyfill").end();
    // 配置别名
    config.resolve.alias.set("@", path.resolve(__dirname, "src"));
    // 修改标题
    config.plugin("html").tap((args) => {
      args[0].title = "指挥系统";
      return args;
    });
    // 生产环境配置
    if (isProduction) {
      // 删除预加载
      config.plugins.delete("preload");
      config.plugins.delete("prefetch");
      // 压缩代码
      config.optimization.minimize(true);
      // 分割代码
      config.optimization.splitChunks({
        chunks: "all",
      });
    }
  },
  configureWebpack: (config) => {
    if (isProduction) {
      // 为生产环境修改配置...
      let optimization = {
        minimizer: [
          new TerserPlugin({
            parallel: 4, // 并行打包
            terserOptions: {
              warnings: false,
              compress: {
                drop_debugger: true,
                drop_console: true,
              },
            },
          }),
        ],
      };
      Object.assign(config, { optimization });
    } else {
      // 为开发环境修改配置...
    }
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {},
    // 启用 CSS modules for all css / pre-processor files.
    requireModuleExtension: true,
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  devServer: {
    port: 9999, // 端口
    open: false, // 自动开启浏览器
    compress: false,
    host: "0.0.0.0",
    overlay: {
      warnings: true,
      errors: true,
    },
    // 本地设置https
    // https: {
    //     key: fs.readFileSync(
    //         path.join(__dirname, 'certs', 'ssl.key')
    //     ),
    //     cert: fs.readFileSync(
    //         path.join(__dirname, 'certs', 'ssl.crt')
    //     ),
    // },
    proxy: {
      /* '/ers': {
        target: "http://10.100.10.109:8080/",
        ws: false,
        changeOrigin: true,
        bypass: function (req, res, proxyOptions) {
          if (req.headers.accept.indexOf('html') !== -1) {
            console.log('Skipping proxy for browser request.')
            console.log('res', res)
            console.log('req', req)
            return '/index.html'
          }
        }
        // pathRewrite: { // 路径重写，
        //   '^/pmsadm': '/' // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
        // }
      }, */
      //"/ers":{ target: "http://10.100.10.109:8080/", changeOrigin: true },
      "/login": {
        // target: "http://localhost:8080",
        target: "http://10.100.100.112/",				// 后端接口代理
        ws: false,
        changeOrigin: true
      },
      "/isAuthed": { target: "http://10.100.100.112/portal/", changeOrigin: true },
      "/api/statisticsPic": { target: "http://10.100.100.112:8080", changeOrigin: true },
      // "/contingencyplans/drp": { target: "http://130.120.2.149:8080", changeOrigin: true ,  pathRewrite:{'^/contingencyplans/drp':'/drp'}},
      // "/": { target: "http://10.100.10.96/8080", changeOrigin: true },
      // "/drp": { target: "http://130.120.2.149:8080/", changeOrigin: true },
      // "/isAuthed": { target: "http://10.100.100.112/portal/", changeOrigin: true },
      "/doc": { target: "http://10.100.100.112/", changeOrigin: true },
      "/": { target: "http://10.100.100.112/", changeOrigin: true },
      /* "/": { target: "http://gzzn.ipowersoft.net:8672", changeOrigin: true }, */
    },
  },
};
