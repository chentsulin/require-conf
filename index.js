var assign = require('object-assign');

/**
 * ConfigLoader constructor.
 *
 * @class
 * @param  {string} configDir - path of config directory
 * @param  {object} opts - options
 */
function ConfigLoader(configDir, opts) {
  this.dir = configDir;
  this.opts = opts || {};
}

/**
 * Retrieve filename via env.
 *
 * @param  {string} name - filename exclude ext.
 * @return {string}
 */
ConfigLoader.prototype.getEnvFileName = function(name) {

  var env = process.env.NODE_ENV;

  return this.opts.dir ? this.dir + '/' + env + '/' + name
                       : this.dir + '/' + name + '.' + env
                       ;
};

/**
 * Load Specify env merged config file.
 *
 * @param  {string} name - filename exclude ext.
 * @return {object}
 */
ConfigLoader.prototype.load = function(name) {

  var env = process.env.NODE_ENV
    , productionConfig = require(this.dir + '/' + name);

  if (env === 'production') {
    return productionConfig;
  }

  try {
    var filename = this.getEnvFileName(name)
      , envConfig = require(filename);

    return assign({}, productionConfig, envConfig);

  } catch (e) {
    return productionConfig;
  }
};

/**
 * Create a ConfigLoader.
 *
 * @param  {string} configDir - path of config directory
 * @param  {object} opts - options
 * @return {ConfigLoader}
 */
function createLoader(configDir, opts) {
  return new ConfigLoader(configDir, opts);
}

exports = module.exports = createLoader;

exports.ConfigLoader = ConfigLoader;
