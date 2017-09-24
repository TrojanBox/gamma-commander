let path = require('path');

let storagePath = path.join(process.env.HOME, '.GammaStorage') + path.sep;

module.exports = {

    /** 注册的命令 */
    registerCommander: 'gamma',

    /** 存储地址 */
    storagePath: storagePath,

    /** 核心目录缓存地址 */
    commandCachePath: path.join(storagePath, 'cache', 'core') + path.sep,

    /** user */
    user: {
        gitStorage: '',
        profile: path.join(storagePath, 'user', 'profile.json')
    }
};