"use strict";

let i18n = require('i18next').createInstance().init(require('../language'));
let path = require('path');
let aliasConf = require('../module/alias-list')();
let commandPath = path.join('..', '..');
let pm = undefined;
try { pm = require(gamma.rootdir + '/interface/profile'); } catch (e) {}

/**
 * 命令别名
 * @param argv
 */
module.exports = (argv) => {
    let aliasKey = argv.params[0];
    if (!aliasConf[aliasKey]) throw new Error(i18n.t('runC.notFoundAlias', {alias: aliasKey}));
    let aliasValue = aliasConf[aliasKey].command || undefined;
    let commandNPath = path.join(commandPath, aliasValue[0]);
    let aliasValueClone = aliasValue.concat();
    aliasValueClone.unshift('alias');
    require(commandNPath)({
        argv: aliasValueClone,
        params: aliasValue.splice(1)
    });
};