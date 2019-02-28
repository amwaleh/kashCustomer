const withCSS = require('@zeit/next-css')

module.exports = withCSS({
  target: 'serverless',
  webpack (config) {
    config.externals = {
      'sqlite3': 'sqlite3',
      'mariasql': 'mariasql',
      'mssql': 'mssql',
      'mysql': 'mysql',
      'oracle': 'oracle',
      'strong-oracle': 'strong-oracle',
      'oracledb': 'oracledb',
      'pg': 'pg',
      'pg-query-stream': 'pg-query-stream'
    }
  
    config.node = { fs: "empty" , net: "empty", tls:"empty"};
    config.module.rules.push({
      test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
      use: {
        loader: 'url-loader',
        options: {
          limit: 8192,
          publicPath: '/_next/static/',
          outputPath: 'static/',
          name: '[name].[ext]'
        }
      }
    })


    return config
  }
})
