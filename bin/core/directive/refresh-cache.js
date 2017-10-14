let fs = require('fs');
let rfs = require('../../../components/util/fs');
let config = require('../../../conf/core.conf');

module.exports = () => {
    if (fs.existsSync(config.commandCachePath)) {
        rfs.rmdirsSync(config.commandCachePath);
        rfs.mkdirsSync(config.commandCachePath);
    }
    console.log('缓存已经刷新。');

};