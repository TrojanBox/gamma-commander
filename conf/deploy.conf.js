"use strict";

var path = require('path');
var sourceProjectDir = './';

module.exports = {
    otouzi: {
        sftp: {
            release: {
                host: 'api.otouzi.com',
                port: 22,
                username: 'root',
                password: 'Otouzi2016!!'
            },
            debug: {
                host: 'debug.otouzi.com',
                port: 22,
                username: 'root',
                password: 'Otouzi2016!!'
            }
        },
        sourcePath: {
            'dev-pc-v2': {
                path: path.join(sourceProjectDir, 'public', 'static', 'dev-pc-v2')
            },
            'pc-v2': {
                path: path.join(sourceProjectDir, 'public', 'static', 'pc-v2')
            },
            'dev-app-v3': {
                path: path.join(sourceProjectDir, 'public', 'static', 'dev-app-v3')
            },
            'app-v3': {
                path: path.join(sourceProjectDir, 'public', 'static', 'app-v3')
            }
        },
        targetPath: {
            'debug:8114': {
                env: 'debug',
                path: '/data/3c/next.otouzi.com/next-pc-otouzi/public/static'
            },
            'debug:8115': {
                env: 'debug',
                path: '/data/3c/next.otouzi.com:8115/next-pc-otouzi/public/static'
            },
            'release:www': {
                env: 'release',
                path: '/data/www/next.otouzi.com/new.otouzi/public/static'
            },
            'release:release': {
                env: 'release',
                path: '/data/www/release.next.otouzi.com/new.otouzi/public/static'
            }
        }
    }
};