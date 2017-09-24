"use strict";

require('./boot');

let i18n = require('i18next').createInstance().init(require('./language'));
let Command = require('../../components/commander/index');
let path = require('path');
let commandPath = path.join(__dirname, '..');
let pluginPath = path.join(gamma.rootdir, 'plugins');
let commandLoader = require('./module/command.loader');
let helperDirective = require('./directive/helper');

let commander = new Command();
commander.setConf({
    title: 'System Tools',
    version: '1.0.0034',
    author: 'justwe9517',
    homepage: 'http://git.oschina.net/mypi/system-tools',
    description: i18n.t('commanderDescription')
});

// 声明
commander.declare('-r, --refresh-cache', i18n.t('refreshCache'), true);
commander.declare('--develop-loader-document', i18n.t('developLoaderDocument'), true);
commander.declare('--develop-command-document', i18n.t('developCommandDocument'), true);
commander.declare('--develop-enable-debug', i18n.t('developEnableDebug'), true);
commander.declare('-L, --alias-list', i18n.t('aliasList'), true);
commander.declare('install', i18n.t('install'), true);
commander.declare('run <command>', i18n.t('run'), true);
commander.declare('alias <name>', i18n.t('alias'), true);

// 加载注册的命令
commandLoader.loadCommandList('core', commandPath, ['core'], (cmdSettings, subCommand) => {
    commander.declare(cmdSettings.option, cmdSettings.description);
    if (cmdSettings.option) commander.implement(cmdSettings.name, args => require(path.join(subCommand))(args))
});

// 加载插件的命令
commandLoader.loadCommandList('plugin', pluginPath, [], (cmdSettings, subCommand) => {
    commander.declare(cmdSettings.option, cmdSettings.description + ' [P]');
    if (cmdSettings.option) commander.implement(cmdSettings.name, args => require(path.join(subCommand))(args))
});

// 安装
commander.implement('install', args => require('./directive/install')(args));

// 别名
commander.implement('alias', args => require('./directive/alias')(args));
commander.implement('run', args => require('./directive/run')(args));
commander.implement('--alias-list', args => require('./directive/alias-list')(args));
commander.implement('--refresh-cache', args => require('./directive/refresh-cache')(args));

// 增加开发文件
commander.implement('--develop-loader-document', args => require('./directive/develop-loader-document')(args));
commander.implement('--develop-command-document', args => require('./directive/develop-command-document')(args));

// 扩充帮助信息
commander.implement('ExampleHelper', helperDirective, true);

commander.listen(process.argv);
