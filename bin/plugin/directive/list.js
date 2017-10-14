require('colors');
let i18n = require('i18next').createInstance().init(require('../language'));
let path = require('path');
let string = require(gamma.rootdir + '/components/util/string');

module.exports = (pm, args) => {

    pm.editProfileFileToJSON(data => {

        data['plugins'] = data['plugins'] || [];
        if (data['plugins'].length <= 0) {
            console.log("  " + i18n.t('notFoundPlugin'));
            return false;
        }

        // 处理插件信息
        let pluginCommandList = [];
        let pluginNameList = [];
        let pluginDescriptionList = [];
        let pluginList = {};
        let pluginStatusList = {};
        let uninstallStatus = false;
        for (let i in data['plugins']) if (data['plugins'].hasOwnProperty(i)) {
            pluginNameList.push(data['plugins'][i]);
            try {
                let plugin = require(path.join(data['plugins'][i], 'declare.js'));
                pluginCommandList.push(plugin.name);
                pluginDescriptionList.push(plugin.description);
                pluginList[data['plugins'][i]] = plugin;
                pluginStatusList[data['plugins'][i]] = true;
            } catch (e) {
                pluginStatusList[data['plugins'][i]] = false;
                uninstallStatus = true;
            }
        }

        // 处理展示信息
        let pluginCommand = i18n.t('list.command');
        let pluginName = i18n.t('list.pluginName');
        let pluginDescription = i18n.t('list.description');
        let pluginStatus = i18n.t('list.status');
        let pluginCommandListTmp = pluginCommandList.concat([pluginCommand]);
        let pluginNameListTmp = pluginNameList.concat([pluginName]);
        let pluginDescriptionListTmp = pluginDescriptionList.concat([pluginDescription]);

        let pluginCommandMax = string.max(pluginCommandListTmp) + 6;
        let pluginNameMax = string.max(pluginNameListTmp) + 6;
        let pluginDescriptionMax = string.max(pluginDescriptionListTmp) + 6;
        let pluginStatusMax = string.max([uninstallStatus ? i18n.t('list.pluginStatus.uninstall') : i18n.t('list.pluginStatus.install')]);

        console.log(string.pad(pluginName, pluginNameMax)
            + string.pad(pluginCommand, pluginCommandMax)
            + string.pad(pluginDescription, pluginDescriptionMax)
            + pluginStatus);

        let pluginMax = pluginCommandMax + pluginNameMax + pluginDescriptionMax + pluginStatusMax;
        let pluginX = '';
        for (let i = 0; i < pluginMax; i++) pluginX += '-';
        console.log(pluginX);

        for (let i in pluginNameList) if (pluginNameList.hasOwnProperty(i)) {
            if (pluginStatusList[pluginNameList[i]]) {
                let pluginName = string.pad(pluginNameList[i], pluginNameMax);
                let pluginCommand = string.pad(pluginList[pluginNameList[i]].name, pluginCommandMax);
                let pluginDescription = string.pad(pluginList[pluginNameList[i]].description, pluginDescriptionMax);
                let pluginStatus = i18n.t('list.pluginStatus.install').green;
                console.log(pluginName + pluginCommand + pluginDescription + pluginStatus);
            } else {
                let pluginName = string.pad(pluginNameList[i], pluginNameMax);
                let pluginCommand = string.pad('--', pluginCommandMax);
                let pluginDescription = string.pad('--', pluginDescriptionMax);
                let pluginStatus = i18n.t('list.pluginStatus.uninstall').red;
                console.log(pluginName + pluginCommand + pluginDescription + pluginStatus);
            }
        }

        if (uninstallStatus) {
            console.log(i18n.t('hasProblemPlugin').yellow);
        }

    }, ['plugin', 'install-plugin.json']);
};