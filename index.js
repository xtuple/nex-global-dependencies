'use strict';

var _ = require('lodash');
var nex = require('nex-api');
var proc = require('child_process');
var log = require('npmlog');
var colors = require('colors');

var handler = module.exports = new nex.Handler('globalDependencies');

/**
 * @override
 */
handler.do = function (pkg) {
  _.each(pkg[this.field], function (version, name) {
    log.info('npm install -g', nex.id(version, name));
    proc.spawnSync('npm', [ 'install', '-g', nex.id(version, name) ]);
  }, this);
};

/**
 * @override
 */
handler.undo = function (pkg) {
  _.each(pkg[this.field], function (version, name) {
    log.info('npm uninstall', nex.id(version, name));
    proc.spawnSync('npm', [ 'uninstall', '-g', nex.id(version, name) ]);
  }, this);
};
