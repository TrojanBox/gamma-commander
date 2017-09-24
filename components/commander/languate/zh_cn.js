module.exports = {
    translation: {

        error: '错误：',
        version: '版本：',
        author: '作者：',
        page: '主页：',
        used: '使用方式: {{command}} [参数] [值 ...]',
        nullInput: '请通过添加参数 -h 或 --help 查看当前命令的帮助文档。',
        nullParameter: '错误：找不到相关指令 {{param}}。',


        params: {
            help: '查看命令相关帮助',
            version: '查看命令版本信息',
            author: '查看作者信息'
        },

        // 解析器，简单实现一下，之后有时间在重写
        command: {
            parseName: '命令',
            parseDescription: '使加载器支持基本的 command <params> [params] 参数支持。',
            nullParameter: '{{param}} 后的参数不能为空。'
        },
        parameter: {
            parseName: '参数',
            parseDescription: '使加载器支持基本的 -option <params> [params], --option-name <params> [params] 参数支持。',
            nullParameter: '{{param}} 后的参数不能为空。'
        }
    }
};