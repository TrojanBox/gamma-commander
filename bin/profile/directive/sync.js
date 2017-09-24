let execSync = require('child_process').execSync;
let config = require('../../../conf/core.conf');
let ProfileManage = require('../module/profile-manage');

module.exports = () => {
    let pm = new ProfileManage(config.user.profile);
    let profile = pm.getDefaultProfile();
    let profileInfo = pm.getProfileInfo(profile);
    let date = new Date();
    let message = 'sync ' + date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();

    try {
        console.log('');
        console.log('正在同步配置信息...');
        console.log('');
        try {
            execSync(`cd ${profileInfo.workDir} && git add .`);
            execSync(`cd ${profileInfo.workDir} && git commit -m "${message}"`);
        } catch (e) {}

        execSync(`cd ${profileInfo.workDir} && git pull`);
        execSync(`cd ${profileInfo.workDir} && git push`);

        console.log('');
    } catch (e) {
        console.log(e.message);
    }
};