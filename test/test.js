/* global describe, it, before, beforeEach */

require('chai').should();

process.env.NODE_ENV = 'testing';

var fs = require('fs');
var loader = require('../');

describe('config.loader', function() {


  describe('#loader', function() {

    var config;

    before(function() {
      config = loader(__dirname + '/config', { dir: true });
    });

    it('should be a instance of ConfigLoader', function() {

      config.should.be.an.instanceof(loader.ConfigLoader);
    });

    it('should set parameters to loader properties', function() {

      config.dir.should.be.equal(__dirname + '/config');
      config.opts.dir.should.be.true();
    });
  });

  describe('#getEnvFileName', function() {
    it('should return path/env/filename when this.opts.dir is true', function() {

      var config = loader(__dirname + '/config', { dir: true });

      config.getEnvFileName('database').should.be.equal(
        __dirname + '/config/' +  process.env.NODE_ENV + '/database');
    });

    it('should return path/filename.env when this.opts.dir is falsy', function() {

      var config = loader(__dirname + '/config', { dir: false });

      config.getEnvFileName('database').should.be.equal(
        __dirname + '/config/database.' + process.env.NODE_ENV);
    });
  });

  describe('dir mode', function() {
    describe('#load', function() {

      var config;

      before(function() {
        config = loader(__dirname + '/config', { dir: true });
      });

      beforeEach(function() {
        if (fs.existsSync(__dirname + '/config/testing/app.js')) {
          fs.unlinkSync(__dirname + '/config/testing/app.js');
        }

        try {
          if (require.resolve(__dirname + '/config/testing/app')) {
            delete require.cache[require.resolve(__dirname + '/config/testing/app')];
          }
        } catch (e) {}
      });

      it('should return production config when NODE_ENV=production', function() {

        process.env.NODE_ENV = 'production';

        var appConfig = config.load('app');

        appConfig.debug.should.be.true();
      });

      it('should return merged config when NODE_ENV=otherenv', function() {

        process.env.NODE_ENV = 'testing';

        fs.writeFileSync(__dirname + '/config/testing/app.js', 'module.exports = { debug :false };');

        var appConfig = config.load('app');

        appConfig.debug.should.be.false();
      });

      it('should return production config when NODE_ENV=otherenv & env config not found', function() {

        process.env.NODE_ENV = 'testing';

        var appConfig = config.load('app');

        appConfig.debug.should.be.true();
      });


    });
  });

  describe('.env mode', function() {

    var config;

    before(function() {
      config = loader(__dirname + '/config', { dir: false });
    });

    beforeEach(function() {
      if (fs.existsSync(__dirname + '/config/app.testing.js')) {
        fs.unlinkSync(__dirname + '/config/app.testing.js');
      }

      try {
        if (require.cache[require.resolve(__dirname + '/config/app.testing')]) {
          delete require.cache[require.resolve(__dirname + '/config/app.testing')];
        }
      } catch (e) {}
    });

    describe('#load', function() {
      it('should return production config when NODE_ENV=production', function() {

        process.env.NODE_ENV = 'production';

        var appConfig = config.load('app');

        appConfig.debug.should.be.true();
      });

      it('should return merged config when NODE_ENV=otherenv', function() {

        process.env.NODE_ENV = 'testing';

        fs.writeFileSync(__dirname + '/config/app.testing.js', 'module.exports = { debug :false };');

        var appConfig = config.load('app');

        appConfig.debug.should.be.false();
      });

      it('should return production config when NODE_ENV=otherenv & env config not found', function() {

        process.env.NODE_ENV = 'testing';

        var appConfig = config.load('app');

        appConfig.debug.should.be.true();
      });
    });
  });

});
