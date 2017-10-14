let path = require('path');
let ProfileManage = require('../module/profile-manage');
let config = require('../../../conf/core.conf');
let rfs = require('../../../components/util/fs');
let fs = require('fs');

module.exports = args => {

    let targetPath = path.join(config.storagePath, 'user', 'profile', args.params[0]);
    let pm = new ProfileManage(config.user.profile);
    pm.removeProfile(args.params[0]);

    console.log('  正在移除用户配置文件...');

    // 检查用户配置文件是否存在
    if (!fs.existsSync(targetPath)) {
        console.log('  移除失败：该用户的配置信息不存在。');
        return false;
    }

    if (rfs.rmdirsSync(targetPath)) {
        pm.write();
        console.log('  已成功移除该用户的配置信息。');
    } else {
        console.log('  移除失败：请检查权限是否正确。');
    }
};