let i18n = require('i18next').createInstance().init(require('./language'));
let ProfileManage = require(gamma.rootdir + '/bin/profile/module/profile-manage');
let config = require(gamma.rootdir + '/conf/core.conf');
let pm = new ProfileManage(config.user.profile);

if (pm.getDefaultProfile().length === 0) throw Error(i18n.t('notConfiguredDefaultProfile'));
if (pm.getProfileInfo(pm.getDefaultProfile()) === false) throw Error(i18n.t('defaultProfileLose'));

module.exports = pm;