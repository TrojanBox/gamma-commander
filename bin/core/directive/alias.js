"use strict";

let aliasConf = require('../../../conf/alias.conf');
let path = require('path');
let commandLoader = require('../module/command.loader');
let commandPath = path.join('..', '..');
let commandBlackList = ['core'];

/**
 * 命令别名
 * @param argv
 */
module.exports = (argv) => {

    commandLoader.loadCommandList(commandPath, commandBlackList, (cmdSettings) => {
        if (cmdSettings.alias) {
            for (let i in cmdSettings.alias) if (cmdSettings.alias.hasOwnProperty(i)) {
                aliasConf[i] = cmdSettings.alias[i];
            }
        }
    });

    let aliasKey = argv.params[0];
    if (!aliasConf[aliasKey]) throw new Error('别名 ' + aliasKey + ' 不存在。');
    let aliasValue = aliasConf[aliasKey].command || undefined;
    let commandNPath = path.join(commandPath, aliasValue[0]);
    let aliasValueClone = aliasValue.concat();
    aliasValueClone.unshift('alias');
    require(commandNPath)({
        argv: aliasValueClone,
        params: aliasValue.splice(1)
    });
};