let pm = require(gamma.rootdir + '/interface/profile');
let fs = require('fs');
let path = require('path');
let rfs = require(gamma.rootdir + '/components/util/fs');

module.exports = () => {

    let dp = pm.getProfileInfo(pm.getDefaultProfile());
    let vimPath = path.join(dp.workDir, 'vim');
    let vimFilePath = path.join(dp.workDir, 'vim', '.vimrc');
    let homeVimFilePath = path.join(process.env['HOME'], '.vimrc');

    console.log('');
    if (!fs.existsSync(vimPath) && !rfs.mkdirsSync(vimPath)) {
        console.log('  操作失败：目录创建失败，请检查权限。');
        console.log('');
        return false;
    }

    if (!fs.existsSync(homeVimFilePath)) {
        console.log('  操作失败：找不到 vim 配置文件。');
        console.log('');
        return false;
    }

    try {
        let resource = fs.readFileSync(homeVimFilePath);
        fs.writeFileSync(vimFilePath, resource);
        console.log('  操作成功：配置文件已经写入 Profile 中。');
    } catch (e) {
        console.log(e.message);
    }

    console.log('');

};