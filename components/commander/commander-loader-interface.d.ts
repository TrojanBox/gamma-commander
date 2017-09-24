/**
 * 命令加载器接口
 */
declare interface CommanderLoaderInterface {

    /**
     * 处理默认命令行参数
     * @param argv 命令行参数数组
     */
    constructor(argv: Array<string>);

    /**
     * 返回加载器名称
     */
    getParseName(): string;

    /**
     * 返回加载器处理的解析列表
     * 此方法会在所有 parse() 方法调用完成后被调用
     * 主要用来处理由 Commander.declare() 方法中的命令定义
     */
    getParseList(): Array<{
        [flagName: string]: {
            indexed: Array<string>,
            rule: Array<{
                param: string,
                type: string
            }>,
            command: string
        }
    }>;

    /**
     * 处理命令定义
     * 此方法会在 Commander.declare() 执行后调用
     * 也就是说如果 Commander.declare() 被多次执行后此命令也会被多次执行
     * @param option
     * @param description
     * @param alone
     */
    parse(option: string, description: string, alone: boolean): this;

    /**
     * 命令监听
     * 只会在 Commander.listen() 方法调用后执行一次
     * 方法只返回命令中匹配的参数，一个生命周期内只会被调用一次
     * 当返回的结果中有匹配参数时，会由 Commander 进行事件分发
     * 通过 Commander.implement() 方法监听被分发的事件
     *
     * TIPS:
     *   Commander 对象对 EventEmitter.on() 方法进行了简单的封装并重新命名为 implement()
     *   监听可以使用 Commander.implement() 方法，也可以使用 Commander.on() 方法
     */
    listen(): {
        [flagName: string]: {
            indexed: Array<string>,
            params: Array<string>,
            alone: boolean
        }
    };
}