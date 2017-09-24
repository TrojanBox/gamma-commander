"use strict";

let fs = require('fs');
let path = require('path');

module.exports = () => {
    fs.readFile(path.join(__dirname, '..', 'doc', 'helper.md'), 'utf-8', function (err, content) {
        if (err) throw err;
        console.log(content);
    });
};