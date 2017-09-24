"use strict";

var fs = require('fs');
var path = require('path');

/**
 * 扫描目录中的所有文件
 * @param dir
 * @param callable
 * @param fileNum
 */
var scanFiles = function (dir, callable, fileNum) {
    fileNum = fileNum || 0;
    fs.readdir(dir, (err, list) => {
        if (err) throw new err;
        for (let i in list) if (list.hasOwnProperty(i)) {
            let filepath = path.join(dir, list[i]);
            fs.stat(filepath, (err, stat) => {
                if (stat.isDirectory()) {
                    scanFiles(filepath, callable, fileNum);
                } else {
                    fileNum++;
                    callable(filepath, stat, fileNum);
                }
            });
        }
    });
};

module.exports = {
    scanFiles: scanFiles
};