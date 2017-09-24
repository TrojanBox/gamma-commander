let config = require('../../../conf/core.conf');

module.exports = {
    translation: {
        commanderDescription: '命令管理，命令描述前有 * 的表示为内部命令。',
        refreshCache: '刷新缓存，如果无法调用新添加的命令可以尝试刷新缓存',
        developLoaderDocument: '查看加载器相关文档',
        developCommandDocument: '查看命令相关开发文档',
        developEnableDebug: '开启调试模式',
        aliasList: '查看已经定义的命令别名',
        install: '*安装 ' + config.registerCommander + ' 命令到全局环境',
        run: '运行脱离上下文的命令',
        alias: '*使用已经定义的命令别名'
    }
};