"use strict";

function charLength(option) {
    let len = 0;
    for (let i = 0; i < option.length; i++) if (option.charCodeAt(i) > 127 || option.charCodeAt(i) === 94) {
        len += 2;
    } else {
        len++;
    }
    return len;
}

/**
 * 字符串补全
 * @param str
 * @param width
 * @returns {string}
 */
function pad(str, width) {
    let len = Math.max(0, width - (() => charLength(str))(str));
    return str + new Array(len + 1).join(' ');
}

/**
 * 取得字符串最大宽度
 * @param {Array} parseList
 * @return {number}
 */
function max(parseList) {
    return parseList.reduce((max, option) => Math.max(max, (() => charLength(option))(option)), 0);
}

module.exports = {
    pad: pad,
    max: max
};