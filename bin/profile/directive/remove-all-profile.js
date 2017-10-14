let path = require('path');
let ProfileManage = require('../module/profile-manage');
let config = require('../../../conf/core.conf');
let rfs = require('../../../components/util/fs');
let fs = require('fs');

module.exports = args => {

    let targetPath = path.join(config.storagePath, 'user', 'profile');
    let pm = new ProfileManage(config.user.profile);
    pm.removeAllProfile();

    console.log('  正在移除所有用户配置的文件...');

    if (rfs.rmdirsSync(targetPath)) {
        pm.write();
        console.log('  已成功移除该所有用户的配置信息。');
    } else {
        console.log('  移除失败：请检查权限是否正确。');
    }
};