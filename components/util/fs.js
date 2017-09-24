let fs = require('fs');
let path = require('path');

//递归创建目录 异步方法
function mkdirs(dirname, mode, callback) {
    fs.exists(dirname, function (exists) {
        if (exists) {
            callback();
        } else {
            mkdirs(path.dirname(dirname), mode, function () {
                fs.mkdir(dirname, mode, callback);
            });
        }
    });
}

//递归创建目录 同步方法
function mkdirsSync(dirname, mode) {
    if (fs.existsSync(dirname)) {
        return true;
    } else {
        if (mkdirsSync(path.dirname(dirname), mode)) {
            fs.mkdirSync(dirname, mode);
            return true;
        }
    }
}

/**
 * 删除多级目录
 * @param targetPath
 * @returns {boolean}
 */
function rmdirsSync(targetPath) {
    try {
        let files = [];
        if (fs.existsSync(targetPath)) {
            files = fs.readdirSync(targetPath);
            files.forEach(function (file, index) {
                let curPath = targetPath + "/" + file;
                if (fs.statSync(curPath).isDirectory()) { // recurse
                    if (!rmdirsSync(curPath)) return false;
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(targetPath);
        }
    } catch (e) {
        console.error("remove director fail! path=" + targetPath + " errorMsg:" + e);
        return false;
    }
    return true;
}

module.exports = {
    mkdirs: mkdirs,
    mkdirsSync: mkdirsSync,
    rmdirsSync: rmdirsSync
};