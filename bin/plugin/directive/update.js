let i18n = require('i18next').createInstance().init(require('../language'));
let spawnSync = require('child_process').spawnSync;
let path = require('path');

module.exports = (pm, args) => {
    pm.editProfileFileToJSON(data => {
        data['plugins'] = data['plugins'] || [];

        console.log();
        for (let i in data['plugins']) if (data['plugins'].hasOwnProperty(i)) {
            let plugin = data['plugins'][i];
            console.log(i18n.t('installing'));
            let s = spawnSync('npm', ['install', plugin, '--save']);
            if (s.status === 0) {
                try {
                    require(path.join(plugin, 'declare.js'));
                    console.log(plugin + ' ' + i18n.t('installSuccess'));
                } catch (e) {
                    console.log(i18n.t('installFailParseError'));
                    spawnSync('npm', ['remove', plugin]);
                }
            } else {
                console.log(i18n.t('installFail'));
            }
        }

    }, ['plugin', 'install-plugin.json']);
};