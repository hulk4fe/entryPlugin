/**
 * entry-webpack-plugin是控制打包entry的插件
 * @param {Object} options 
 * @param {Boolean} options.enable 是否启用功能
 * @param {Array} options.filter 需要过滤的entry
 * @param {string} options.entry 需要新增的自定义entry路径
 * @author me-hotel
 */

function entryPlugin(options) {
  this.options = Object.assign({
      filter: [],
      enable: false
  }, options);
  if (typeof this.options.filter === 'string') {
      this.options.filter = [this.options.filter];
  }
}

entryPlugin.prototype.apply = function(compiler) {
  const enable = this.options.enable;
  let pathEntry = this.options.entry;
  const that = this;
  const pluginFunction = (entry) => {
      if (enable) {
          if (typeof entry === 'string') {
             entry = [pathEntry, entry];
          } else if (Object.prototype.toString.call(entry) === '[object Array]') {
             entry.unshift(pathEntry);
          } else if (typeof entry === 'object') {
              for (let key in entry) {
                  if (that.options.filter.indexOf(key) < 0) {
                      if (Object.prototype.toString.call(entry[key]) === '[object Array]') {
                         entry[key].unshift(pathEntry);
                      } else if (typeof entry[key] === 'string') {
                         entry[key] = [pathEntry, entry[key]];
                      }
                  }
              }
          }
      }
  }

  if (compiler.hooks) {
      compiler.hooks.entryOption.tap({ name: 'entryPlugin' }, pluginFunction);
  } else {
      compiler.plugin('entry-option', pluginFunction);
  }
};

module.exports = entryPlugin;
