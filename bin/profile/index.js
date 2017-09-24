"use strict";

let Commander = require('../../components/commander');
let declareFile = require('./declare');
let helperDirective = require('./directive/helper');

module.exports = (argv) => {

    let commander = new Commander().setConf(declareFile);

    commander.declare('-C, --clone-profile <origin>', '克隆一个用户配置文件');
    commander.declare('-S, --set-default-profile <origin>', '设置用户');
    commander.declare('-s, --sync', '同步账户设置');
    commander.declare('--remove-profile <origin>', '移除一个用户的配置文件');
    commander.declare('--remove-all-profile', '移除所有用户的配置文件');

    commander.implement('--clone-profile', args => require('./directive/create-profile')(args));
    commander.implement('--sync', args => require('./directive/sync')(args));
    commander.implement('--set-default-profile', args => require('./directive/set-default-profile')(args));
    commander.implement('--remove-profile', args => require('./directive/remove-profile')(args));
    commander.implement('--remove-all-profile', args => require('./directive/remove-all-profile')(args));

    commander.implement('ExampleHelper', helperDirective, true);

    commander.listen(argv.argv);
};
