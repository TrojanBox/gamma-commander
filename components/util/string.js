"use strict";

/**
 * 字符串补全
 * @param str
 * @param width
 * @returns {string}
 */
function pad(str, width) {
    var len = Math.max(0, width - str.length);
    return str + new Array(len + 1).join(' ');
}

/**
 * 取得字符串最大宽度
 * @param {Array} parseList
 * @return {number}
 */
function max(parseList) {
    return parseList.reduce((max, option) => Math.max(max, option.length), 0);
}

module.exports = {
    pad: pad,
    max: max
};