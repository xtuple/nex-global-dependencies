'use strict';

var _ = require('lodash');
var nex = require('nex-api');
var proc = require('child_process');

var handler = module.exports = new nex.Handler('globalDependencies');

/**
 * @override
 */
handler.do = function (pkg) {
  _.each(pkg.globalDependencies, function (version, name) {
    this.log.info('npm install', nex.id(version, name));
    proc.spawnSync('npm', [ 'install', '-g', nex.id(version, name) ]);
  });
};

/**
 * @override
 */
handler.undo = function (pkg) {
  _.each(pkg.globalDependencies, function (version, name) {
    this.log.info('npm uninstall', nex.id(version, name));
    proc.spawnSync('npm', [ 'uninstall', '-g', nex.id(version, name) ]);
  });
};
