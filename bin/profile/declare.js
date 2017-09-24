"use strict";

module.exports = {
    title: '配置管理',
    name: 'profile',
    option: 'profile',
    description: '配置管理，通过 git 服务器来同步您的配置信息',
    author: 'TrojanBox',
    version: '1.0.1',
    homepage: 'http://git.oschina.net/mypi/system-tools',
    alias: {
        'sync': {
            description: '同步 profile 配置',
            command: ['profile', '--sync']
        }
    }
};
