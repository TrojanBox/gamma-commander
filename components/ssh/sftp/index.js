"use strict";

var SFtpClient = require('ssh2').Client;
var util = require('util');
var path = require('path');
var fs = require('fs');
var Directory = require('../../directory');

/**
 * 文件上传
 * @param config {{host: string, port: int, username: string, password: string, privateKey: string, publicKey: string, sourcePath: string, targetPath: string}}
 * @param callable
 */
var fileUpload = function (config, callable) {
    config = config || {};
    let sourcePathConf = config.sourcePath || undefined;
    let targetPathConf = config.targetPath || undefined;
    let sftpClient = new SFtpClient();
    var list = {};

    let gc = () => {
        let state = true;
        for (let i in list) if (list.hasOwnProperty(i)) {
            if (!list[i]) {
                state = false;
                break;
            }
        }
        if (state) sftpClient.end();
    };

    sftpClient.on('ready', err => {
        if (err) throw new err;
        sftpClient.sftp((err, sftp) => {
            if (err) throw new err;
            Directory.scanFiles(sourcePathConf, (filepath, stat) => {
                list[filepath] = false;
                let relFilename = filepath.split(sourcePathConf)[1];
                let targetPath = relFilename ? path.join(targetPathConf, relFilename).replace(/\\/g, '/') : undefined;
                sftp.mkdir(path.dirname(targetPath), (err) => {
                    // if (err) return false;
                    sftp.fastPut(filepath, targetPath, (err) => {
                        if (err) {
                            console.log(filepath + ' < - >' + targetPath);
                            throw err;
                        }
                        callable(filepath, targetPath);
                        list[filepath] = true;
                        gc();
                    });
                });
            });
        });
    });
    sftpClient.connect(config);
};

module.exports = {
    fileUpload: fileUpload
};