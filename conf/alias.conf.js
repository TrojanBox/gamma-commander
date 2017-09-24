"use strict";

module.exports = {
    'deploy-copy-pcv2-to-debug8114': {
        description: '部署静态资源到远程服务器',
        command: ['deploy', '--project-name', 'otouzi', '--source-name', 'dev-pc-v2', '--target-name', 'debug:8114']
    }
};