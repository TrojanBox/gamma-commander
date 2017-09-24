"use strict";

const Commander = require('../const').Commander;
const i18n = require('i18next').init(require('../languate'));

/**
 * 命令加载处理器
 * 使加载器支持基本的 -option <params> [params], --option-name <params> [params] 参数支持。
 */
class Command {

    /**
     * 默认构造器
     * @param argv
     */
    constructor(argv) {
        this.argv = argv;
        this.optionList = [];
        this.optionLength = 0;
        this.optionNameMapping = [];
        this.optionString = [];
        this.parseName = i18n.t('command.parseName');
        this.parseDescrition = i18n.t('command.parseDescription');
    }

    /**
     * 取得解析器名称
     * @returns {string}
     */
    getParseName() {
        return this.parseName;
    }

    /**
     * 取得解析列表
     * @returns {{}|*}
     */
    getParseList() {
        return this.optionList;
    }

    /**
     * 解析命令
     * @param option
     * @param description
     * @param alone
     * @returns {Command}
     */
    parse(option, description, alone) {
        alone = alone === undefined;
        if (!option.match(/^[\d\w][\d\w-]+/g)) return this;
        this.optionNameMapping.push(option);
        let optionInfo = command(option);
        this.optionString.push(option);
        for (let i in optionInfo.indexed) if (optionInfo.indexed.hasOwnProperty(i))
            this.optionNameMapping[optionInfo.indexed[i]] = this.optionLength;
        this.optionList[this.optionLength] = {
            optionInfo: optionInfo,
            description: description,
            alone: alone
        };
        this.optionLength++;
        return this;
    }

    /**
     * 监听命令
     * @returns {{}}
     */
    listen() {
        let childParams = this.argv.concat();
        childParams[1] = this.argv[2];
        childParams.splice(1, 1);

        let cmdGroup = {};
        let argvClone = this.argv.concat();
        let life = false;
        argvClone.splice(0, 2);
        let argvCursor = 0;
        for (let pc in argvClone) if (argvClone.hasOwnProperty(pc)) {
            let param = argvClone[pc].match(/^[\d\w][\d\w-]+/g);
            let paramList = [];
            if (param && this.optionNameMapping[param] !== undefined) {
                cmdGroup[param] = {params: []};
                life = true;
                let rule = this.optionList[this.optionNameMapping[param]].optionInfo.rule;
                let alone = this.optionList[this.optionNameMapping[param]].alone;
                let indexed = this.optionList[this.optionNameMapping[param]].optionInfo.indexed;
                if (rule.length > 0) {
                    for (let r in rule) if (rule.hasOwnProperty(r)) {
                        let targetParam = argvClone[argvCursor + 1 + r * 1];
                        // 截断操作，如果参数存在 -- - 开头的截断操作
                        if (targetParam !== undefined && targetParam.match(/^--?[\d\w]+/g)) targetParam = undefined;
                        if (targetParam === undefined && rule[r].type === Commander.REQUIRED_PARAM) {
                            throw new Error(i18n.t('command.nullParameter', {param: param}));
                        } else {
                            paramList.push(targetParam || '');
                        }
                    }
                } else paramList = argvClone.splice(1);   // 如果命令中没有定义参数的话，默认接受所有参数

                // 包装监听
                indexed.forEach(value => cmdGroup[value] = {
                    indexed: indexed,
                    params: paramList,
                    alone: alone
                });
            }
            argvCursor++;
        }
        return cmdGroup;
    }
}

/**
 * 命令解析处理
 * @param option
 * @returns {{indexed: Array, rule: Array}}
 */
let command = function (option) {
    let indexed = [];
    let paramIndexed = [];
    let result = [];
    let child = option.split(' ');
    let cursor = 0;
    for (let c in child) if (child.hasOwnProperty(c) && child[c] !== '') {
        let nameParam = child[c].match(/^[\d\w][\d\w-]+/g);
        let requiredParam = child[c].match(/^<[\d\w-]+>$/g);
        let optionalParam = child[c].match(/^\[[\d\w-]+?\]$/g);
        if (nameParam) indexed.push(child[c]);
        if (requiredParam) {
            result.push({param: requiredParam[0], type: Commander.REQUIRED_PARAM});
            paramIndexed.push(requiredParam[0]);
            cursor++;
        }
        if (optionalParam) {
            result.push({param: optionalParam[0], type: Commander.OPTIONAL_PARAM});
            paramIndexed.push(optionalParam[0]);
            cursor++;
        }
    }

    let commandString = indexed.join('') + ' ' + paramIndexed.join(' ');
    return {
        indexed: indexed,
        rule: result,
        command: commandString
    };
};


module.exports = Command;