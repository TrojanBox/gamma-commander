let path = require('path');
let aliasConf = require(gamma.rootdir + '/conf/alias.conf');
let commandLoader = require(gamma.rootdir + '/bin/core/module/command.loader');
let pm = undefined;
try { pm = require(gamma.rootdir + '/interface/profile'); } catch (e) {}
let commandPath = path.join(__dirname, '..', '..');

/**
 * 取得命令列表
 * @returns {*}
 */
module.exports = () => {
    // 加载注册的命令
    commandLoader.loadCommandList('core', commandPath, ['core'], (cmdSettings, subCommand) => {
        if (cmdSettings.alias) {
            for (let i in cmdSettings.alias) if (cmdSettings.alias.hasOwnProperty(i)) {
                aliasConf[i] = cmdSettings.alias[i];
            }
        }
    });

    // 加载插件的命令
    if (pm !== undefined) {
        let pluginList = pm.getProfileFileToJSON(['plugin', 'install-plugin.json']).plugins || [];
        commandLoader.loadPluginList('plugin', pluginList, [], (cmdSettings, subCommand) => {
            if (cmdSettings.alias) {
                for (let i in cmdSettings.alias) if (cmdSettings.alias.hasOwnProperty(i)) {
                    aliasConf[i] = cmdSettings.alias[i];
                }
            }
        });
    }

    return aliasConf;
};