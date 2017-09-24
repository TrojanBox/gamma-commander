"use strict";

let path = require('path');
let aliasConf = require('../../../conf/alias.conf');
let string = require('../../../components/util/string');
let commandLoader = require('../module/command.loader');

let commandPath = path.join('..', '..');
let commandBlackList = ['core'];

/**
 * 命令别名
 * @param argv
 */
module.exports = (argv) => {

    console.log('');
    console.log('  别名列表');
    console.log('');

    let aliasList = [];
    commandLoader.loadCommandList(['core'], commandPath, commandBlackList, (cmdSettings) => {
        if (cmdSettings.alias) {
            for (let i in cmdSettings.alias) if (cmdSettings.alias.hasOwnProperty(i)) {
                aliasConf[i] = cmdSettings.alias[i];
            }
        }
    });

    commandLoader.loadCommandList(['plugin'], commandPath, commandBlackList, (cmdSettings) => {
        if (cmdSettings.alias) {
            for (let i in cmdSettings.alias) if (cmdSettings.alias.hasOwnProperty(i)) {
                aliasConf[i] = cmdSettings.alias[i];
            }
        }
    });

    for (let i in aliasConf) if (aliasConf.hasOwnProperty(i)) aliasList.push(i);

    if (aliasList.length <= 0) {
        console.log('    暂无定义的别名列表。');
    } else {
        let width = string.max(aliasList) + 4;
        for (let a in aliasConf) if (aliasConf.hasOwnProperty(a)) {
            console.log('    ' + string.pad(a, width) + ' ' + aliasConf[a].description);
        }
    }
    console.log('');
};