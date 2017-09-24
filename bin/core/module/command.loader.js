let fs = require('fs');
let path = require('path');
let config = require('../../../conf/core.conf');
let rfs =require('../../../components/util/fs');

/**
 * 加载命令列表
 * @param cacheFile 缓存文件名
 * @param commandPath 命令目录
 * @param commandBlackList 命令黑名单
 * @param callable 回调地址
 */
function loadCommandList(cacheFile, commandPath, commandBlackList, callable) {
    let cacheListFilePath = path.join(config.commandCachePath, cacheFile + '.cache');
    let commandList = {};
    if (!fs.existsSync(cacheListFilePath)) {
        let list = fs.readdirSync(commandPath);
        list.map((command) => {
            if (commandBlackList.reduce((_, value) => command === value, 0)) return ;
            let cmdSettings = require(path.join(path.join(commandPath, command), 'declare'));
            commandList[command] = {subCommand: path.join(commandPath, command), cmdSettings: cmdSettings};
        });
        // 如果目录不存在，创建它
        if (!fs.existsSync(config.commandCachePath)) rfs.mkdirsSync(config.commandCachePath);
        // 创建缓存
        fs.writeFileSync(cacheListFilePath, JSON.stringify(commandList));
    } else {
        let info = fs.readFileSync(cacheListFilePath);
        commandList = JSON.parse(info.toString());
    }
    for (let i in commandList) callable(commandList[i].cmdSettings, commandList[i].subCommand);
}

/**
 * 加载命令列表
 * @param cacheFile 缓存文件名
 * @param pluginList 命令目录
 * @param commandBlackList 命令黑名单
 * @param callable 回调地址
 */
function loadPluginList(cacheFile, pluginList, commandBlackList, callable) {
    let cacheListFilePath = path.join(config.commandCachePath, cacheFile + '.cache');
    let commandList = {};
    if (!fs.existsSync(cacheListFilePath)) {
        pluginList.map((command) => {
            if (commandBlackList.reduce((_, value) => command === value, 0)) return ;
            try {
                let cmdSettings = require(path.join(command, 'declare.js'));
                commandList[command] = {subCommand: command, cmdSettings: cmdSettings};
            } catch (e) {}
        });
        // 如果目录不存在，创建它
        if (!fs.existsSync(config.commandCachePath)) rfs.mkdirsSync(config.commandCachePath);
        // 创建缓存
        fs.writeFileSync(cacheListFilePath, JSON.stringify(commandList));
    } else {
        let info = fs.readFileSync(cacheListFilePath);
        commandList = JSON.parse(info.toString());
    }
    for (let i in commandList) callable(commandList[i].cmdSettings, commandList[i].subCommand);
}

module.exports = {
    loadCommandList: loadCommandList,
    loadPluginList: loadPluginList
};