"use strict";

let Commander = require(gamma.rootdir + '/components/commander/index');
let declareFile = require('./declare');
let helperDirective = require('./directive/helper');

module.exports = (argv) => {

    let commander = new Commander().setConf(declareFile);

    commander.declare('-i, --install', '安装 Vundle 管理器');
    commander.declare('-d, --download-config', '下载设置');
    commander.declare('-u, --upload-config', '上传设置');

    commander.implement('--install', args => require('./directive/install')(args));
    commander.implement('--download-config', args => require('./directive/download-config')(args));
    commander.implement('--upload-config', args => require('./directive/upload-config')(args));

    commander.implement('ExampleHelper', helperDirective, true);

    commander.listen(argv.argv);
};
