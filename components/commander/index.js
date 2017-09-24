"use strict";

const i18n = require('i18next').init(require('./languate'));
let EventEmitter = require('events').EventEmitter;
let path = require('path');
let string = require('../util/string');
let ParameterLoader = require('./loader/parameter');
let CommandLoader = require('./loader/command');
let object = require('../util/object');

/**
 * Command
 * @extends EventEmitter
 */
class Command extends EventEmitter {

    /**
     * @extends EventEmitter
     */
    constructor() {
        super();
        this.loaders = [];
        this.declareList = [];              // 命令声明列表
        this.parseList = [];                // 解析列表
        this.listenList = [];               // 监听列表
        this.__register();
    }

    /**
     * 处理加载器
     * @param loader 添加加载器对象
     * @returns {Command}
     */
    loadLoader(loader) {
        this.loaders.push(loader);
        return this;
    }

    /**
     * 设置命令信息
     * @param conf
     * @returns {Command}
     */
    setConf(conf) {
        this.config = conf || {};
        return this;
    }

    /**
     * 声明
     * @param option 声明语句
     * @param description 语句描述
     * @param alone boolean 独立命令，检索完该命令后停止检索
     * @returns {Command}
     */
    declare(option, description, alone) {
        this.declareList.push({option: option, description: description, alone: alone});
        return this;
    }

    /**
     * 实现
     * @param eventName 设置监听事件
     * @param callable 设置监听回调，如果不设置或设置为 false 则清除对应事件的全部监听事件
     * @param clearEvent 清除对应事件的全部监听事件
     */
    implement(eventName, callable, clearEvent) {
        clearEvent = clearEvent || false;
        if (callable === false || callable === undefined) this.removeAllListeners(eventName);
        if (clearEvent) this.removeAllListeners(eventName);
        this.on(eventName, callable || function () {});
    }

    /**
     * 监听
     * @param argv 命令数组
     * @returns {boolean}
     */
    listen(argv) {

        // 处理加载器
        this.argv = argv;
        this.loadLoader(new CommandLoader(argv));
        this.loadLoader(new ParameterLoader(argv));
        this.commandHeader = path.basename(this.argv[1]);
        let emptyLock = true;
        let continueLock = true;
        let all = {};
        let childArgv = this.argv.concat().splice(0, 1);

        try {
            // 处理加载器解析器
            for (let d in this.declareList) if (this.declareList.hasOwnProperty(d)) {
                for (let l in this.loaders) if (this.loaders.hasOwnProperty(l)) {
                    this.loaders[l].parse(this.declareList[d].option, this.declareList[d].description, this.declareList[d].alone);
                }
            }

            // 设置加载器监听
            for (let i in this.loaders) if (this.loaders.hasOwnProperty(i)) {
                let parseInfo = {};
                let cmdParse = this.loaders[i].listen(argv);
                parseInfo[this.loaders[i].getParseName()] = this.loaders[i].getParseList();
                this.parseList = this.parseList.concat(parseInfo);
                this.listenList = this.listenList.concat(cmdParse);
                if (!object.isEmptyObject(cmdParse)) break;
            }

            // 处理监听
            this.listenList.forEach((value) => {
                for (let roi in value) if (value.hasOwnProperty(roi)) {
                    emptyLock = false;
                    childArgv = childArgv.concat([argv[2]]);
                    all[roi] = value[roi].params;
                    this.emit(roi, {argv: childArgv.concat(value[roi].params), params: value[roi].params});
                    if (value[roi].alone && this.argv[2] === roi) continueLock = false;  // 当命令参数第一次命中后，停止监听，防止触发多次监听事件
                }
            });

            // 当存没有传递参数时执行
            if (emptyLock) this.emit('NullParameter', argv);

            // 当不存在孤独终老命令时执行
            if (!emptyLock && continueLock) this.emit('Continue', {argv: childArgv.concat(argv), params: all});

            // 当存在混合命令时执行
            if (emptyLock && !continueLock) this.emit('Continue', {argv: childArgv.concat(argv), params: all});

            this.emit('Argv', {argv: childArgv.concat(argv), params: all});
        } catch (e) {
            console.log('');
            if (process.argv.indexOf('--develop-enable-debug') !== -1) {
                console.log(e);
            } else {
                console.log('  ' + i18n.t('error') + e.message);
            }
            console.log('');
        }
    }

    __pushVersionEcho() {
        // 输出作者和版本信息
        console.log('');
        if (this.config.version) console.log('  ' + i18n.t('version') + this.config.version);
        console.log('');
    }

    __pushAuthorEcho() {
        console.log('');
        if (this.config.author) console.log('  ' + i18n.t('author') + this.config.author);
        if (this.config.homepage) console.log('  ' + i18n.t('page') + this.config.homepage);
        console.log('');
    }

    /**
     * 推送默认帮助回显
     * @private
     */
    __pushHelpEcho() {

        // 计算参数占用的最大宽度
        let optionList = [];
        this.parseList.forEach((parseInfo, key) => {
            for (let parseName in parseInfo) if (parseInfo.hasOwnProperty(parseName)) {
                let nodeInfo = parseInfo[parseName];
                for (let i in nodeInfo) if (nodeInfo.hasOwnProperty(i)) {
                    optionList.push(nodeInfo[i].optionInfo.command);
                }
            }
        });
        let commandWidth = optionList.reduce((max, option) => Math.max(max, option.length), 0);

        // 输出标题
        if (this.config.title) {
            console.log('');
            console.log('  ' + this.config.title);
        }

        // 输出使用方式
        console.log('');
        console.log('  ' + i18n.t('used', {command: this.commandHeader}) + '  ');

        // 输出描述
        if (this.config.description) {
            console.log('  ' + this.config.description);
        }

        // 输出帮助
        this.parseList.forEach((parseInfo, key) => {
            for (let parseName in parseInfo) if (parseInfo.hasOwnProperty(parseName)) {
                let nodeInfo = parseInfo[parseName];
                if (nodeInfo.length <= 0) continue;
                console.log('');
                console.log('  ' + parseName + '：');
                console.log('');
                for (let i in nodeInfo) if (nodeInfo.hasOwnProperty(i)) {
                    console.log('    '
                        + string.pad(nodeInfo[i].optionInfo.command, commandWidth)
                        + '    '
                        + nodeInfo[i].description);
                }
            }
        });

        this.emit('ExampleHelper');
    }

    /**
     * 注册
     * @private
     */
    __register() {
        this.declare('-h, --help', i18n.t('params.help'), true);
        this.declare('-V, --version', i18n.t('params.version'), true);
        this.declare('--author', i18n.t('params.author'), true);
        this.implement('--help', () => this.__pushHelpEcho());
        this.implement('--version', () => this.__pushVersionEcho());
        this.implement('--author', () => this.__pushAuthorEcho());
        this.implement('NullParameter', (argv) => {
            console.log('');
            if (argv[2] === undefined) {
                console.log('  ' + i18n.t('nullInput'));
            } else {
                console.log('  ' + i18n.t('nullParameter', {param: argv[2]}));
            }
            console.log('');
        });
        this.implement('ExampleHelper', () => console.log(''));
    }
}

module.exports = Command;