
  加载器开发手册

  项目目录介绍

    ./command                     此目录中存放着所有的命令，每个文件夹代表一条子命令
    ./components                  业务逻辑存放位置
    ./conf                        程序、命令配置文件

  加载器

    用于处理指令，并将执行解析成执行的程序。
    指令解析被存放在 ./components/commander/loader 文件夹中。
    如果要自定义加载器需要实现如下方法

    /**
     * 默认构造器
     * @param argv 接受多个参数数组，如 process.argv
     */
    constructor(argv: array)

    /**
     * 取得解析器名称
     * @returns {string}
     */
    getParseName(): string

    /**
     * 取得解析列表
     * @returns {{}|*}
     */
    getParseList(): array

    /**
     * 解析命令
     * @param option
     * @param description
     * @param alone
     * @returns {Command}
     */
    parse(option: string, description: string, alone: boolean): this

    /**
     * 监听命令
     * @returns {{}}
     */
    listen(): object
