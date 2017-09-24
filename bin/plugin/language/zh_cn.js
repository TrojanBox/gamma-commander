require('colors');

module.exports = {
    translation: {
        install: '安装插件',
        update: '批量安装/更新插件',
        remove: '移除插件',
        pluginList: '已添加插件列表',
        notFoundPlugin: '找不到可用的插件。',
        hasProblemPlugin: '你的插件列表中存在问题插件，请尝试使用 plugin update 更新它们。',

        installing: '正在安装...',
        installSuccess: '安装完成。',
        installFail: '安装失败，请检查插件是否存在。',
        installFailParseError: '无法完成安装，插件解析失败，操作正在回滚。',

        removing: '正在移除...',
        removeSuccess: '移除完成。',
        removeFailNoPlugin: '你没有安装此插件，无需移除。',

        list: {
            command: '命令名称',
            pluginName: '插件名称',
            description: '描述',
            status: '插件状态',
            pluginStatus: {
                install: '已安装',
                uninstall: '未安装/错误'
            }
        }
    }
};