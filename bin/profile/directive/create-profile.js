let execSync = require('child_process').execSync;
let path = require('path');
let ProfileManage = require('../module/profile-manage');
let config = require('../../../conf/core.conf');
let fs = require('fs');

module.exports = args => {

    // 将项目检出到目标地址
    let gitStorage = config.user.gitStorage + args.params[0];
    let targetPath = path.join(config.storagePath, 'user', 'profile', args.params[0]);
    let pm = new ProfileManage(config.user.profile);

    console.log('');
    console.log('正在检出用户配置文件...');
    console.log('');

    // 判断项目是否已经存在
    if (fs.existsSync(targetPath)) {
        console.log('检出失败：该用户的配置信息已经存在，如果需要重新检出，请使用 --remove-profile 参数移除用户配置文件。');
        console.log('');
        return false;
    }

    try {
        execSync(`git clone ${gitStorage} ${targetPath}`);
        pm.addProfile(args.params[0], JSON.stringify({
            userInfo: {
                username: args.params[1],
                password: args.params[2]
            },
            remote: gitStorage,
            workDir: targetPath,
        }));
        pm.write();
        console.log('');
        console.log('检出成功，现在您可以通过 user 命令来管理您的配置信息了。 :-)');
        console.log('');
    } catch(err) {
        console.log('');
        console.log('检出失败：' + err.message);
        console.log('');
    }
};