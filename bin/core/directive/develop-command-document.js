"use strict";

var fs = require('fs');
var path = require('path');

module.exports = () => {
    fs.readFile(path.join(__dirname, '..', 'doc', 'develop-command-document.md'), 'utf-8', function (err, content) {
        if (err) throw err;
        console.log(content);
    });
};