let config = require('../../../conf/core.conf');
let ProfileManage = require('../module/profile-manage');

module.exports = args => {
    let pm = new ProfileManage(config.user.profile);
    args.params[0] = args.params[0].split('//')[1];
    if (pm.setDefaultProfile(args.params[0])) {
        console.log('  操作已经完成。');
    } else {
        console.log('  设置失败：在配置文件中找不到相应的 profile 信息。');
    }
    pm.write();
};