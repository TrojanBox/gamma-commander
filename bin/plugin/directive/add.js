let i18n = require('i18next').createInstance().init(require('../language'));
let spawnSync = require('child_process').spawnSync;
let path = require('path');

module.exports = (pm, args) => {
    pm.editProfileFileToJSON(data => {
        data['plugins'] = data['plugins'] || [];
        console.log();
        console.log('  ' + i18n.t('installing'));
        let s = spawnSync('npm', ['install', args.params[0], '--save']);
        if (s.status === 0) {
            try {
                require(path.join(args.params[0], 'declare.js'));
                data['plugins'].push(args.params[0]);
                console.log('  ' + i18n.t('installSuccess'));
                console.log('');
            } catch (e) {
                console.log('  ' + i18n.t('installFailParseError'));
                console.log('');
                spawnSync('npm', ['remove', args.params[0]]);
            }
        } else {
            console.log('  ' + i18n.t('installFail'));
            console.log('');
        }
    }, ['plugin', 'install-plugin.json']);
};