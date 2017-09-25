"use strict";

let pm = require(gamma.rootdir + '/interface/profile');
let i18n = require('i18next').createInstance().init(require('./language'));
let Commander = require(gamma.rootdir + '/components/commander/index');
let declareFile = require('./declare');

module.exports = (argv) => {

    let commander = new Commander().setConf(declareFile);

    commander.declare('install <plugin-name>', i18n.t('add'));
    commander.declare('update',  i18n.t('update'));
    commander.declare('remove <plugin-name>', i18n.t('remove'));
    commander.declare('list', i18n.t('pluginList'));

    commander.implement('install', args => require('./directive/add')(pm, args));
    commander.implement('update', args => require('./directive/update')(pm, args));
    commander.implement('remove', args => require('./directive/remove')(pm, args));
    commander.implement('list', args => require('./directive/list')(pm, args));

    commander.listen(argv.argv);
};
