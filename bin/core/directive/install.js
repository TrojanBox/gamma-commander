let os = require('os');
let exec = require('child_process').exec;
let path = require('path');
let config = require('../../../conf/core.conf');

module.exports = () => {
    let dispatcherPath = path.join(__dirname, '..', '..', '..', 'index.js');
    let targetPath;
    switch (os.platform()) {
        case 'linux':
            // targetPath = '/usr/bin/' + config.registerCommander;
            targetPath = '~/bin/' + config.registerCommander;
            exec("echo '#!/bin/sh\nnode " + dispatcherPath + " $@' > " + targetPath + ' && chmod 777 ' + targetPath, function (err, sto) {
                if (err) {
                    console.log('');
                    console.log('  在向 ' + targetPath + ' 写入数据时出现问题，需要 root 权限。');
                    console.log('');
                } else {
                    console.log('');
                    console.log('  操作成功。');
                    console.log('');
                }
            });
            break;
        case 'win32':
            targetPath = path.join('C:', 'Windows', 'System32', config.registerCommander + '.bat');
            exec("echo @echo off ^&^& node " + dispatcherPath + " ^%^* > " + targetPath, function (err, sto) {
                if (err) {
                    console.log('');
                    console.log('  在向 ' + targetPath + ' 写入数据时出现问题，需要 Administrator 权限。');
                    console.log('');
                } else {
                    console.log('');
                    console.log('  操作成功。');
                    console.log('');
                }
            });
            break;
        default:
            console.log('');
            console.log('  INSTALL 命令尚不支持您的操作系统。');
            console.log('');
            break;
    }
};
