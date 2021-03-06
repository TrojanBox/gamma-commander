let i18n = require('i18next').createInstance().init(require('../language'));
let spawnSync = require('child_process').spawnSync;

module.exports = (pm, args) => {
    pm.editProfileFileToJSON(data => {
        data['plugins'] = data['plugins'] || [];
        let indexOf = data['plugins'].indexOf(args.params[0]);
        if (indexOf === -1) {
            console.log(i18n.t('removeFailNoPlugin'));
            return false;
        }

        console.log(i18n.t('removing'));
        let s = spawnSync('npm', ['remove', args.params[0]]);
        if (s.status === 0) {
            data['plugins'].splice(indexOf, 1);
            console.log(i18n.t('removeSuccess'));
        } else {
            console.log(i18n.t('removeFailNoPlugin'));
        }
    }, ['plugin', 'install-plugin.json']);
};