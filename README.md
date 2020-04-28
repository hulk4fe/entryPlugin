# entry-webpack-plugin
entry webpack plugin
本插件目的是帮助程序根据环境自动切分webpack的入口

## 安装

````bash
npm install --save-dev entry-webapck-plugin
````

## 使用

`package.json`
````javascript
  scripts: {
    "build:debug": "webpack --config webpack.config.js --debug",
    "build": "webpack --config webpack.config.js"
  }
````

`webpack.config.js`
````javascript
  var EntryWebpackPlugin = require('entry-webpack-plugin'); 
  const argv = require('yargs')
      .describe('debug', 'debug 环境') // use 'webpack --debug'
      .argv;
  module.exports = {
    plugins: [
      new EntryWebpackPlugin({enable: argv.debug, filter: ['vendor'], entry: "entry.js"})
    ]
  } 
````

## 参数说明
````javascript
/**
 * entry-webpack-plugin是控制打包entry的插件
 * @param {Object} options 
 * @param {Boolean} options.enable 是否启用功能
 * @param {Array} options.filter 需要过滤的entry
 * @param {string} options.entry 需要新增的自定义entry路径
 * @author me-hotel
 */
````


