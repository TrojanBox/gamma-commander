"use strict";

let string = require(gamma.rootdir + '/components/util/string');
let aliasConf = require('../module/alias-list')();
let pm = undefined;
try { pm = require(gamma.rootdir + '/interface/profile'); } catch (e) {}

/**
 * 命令别名
 * @param argv
 */
module.exports = (argv) => {

    console.log('');
    console.log('  别名列表');
    console.log('');

    let aliasList = [];

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