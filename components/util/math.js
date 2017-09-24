"use strict";

/**
 * 高精度加法
 * @param num1
 * @param num2
 * @returns {number}
 */
var add = (num1, num2) => {
    var baseNum, baseNum1, baseNum2;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
};

/**
 * 高精度减法
 * @param num1
 * @param num2
 * @returns {number}
 */
var subtract = (num1, num2) => {
    var baseNum, baseNum1, baseNum2;
    var precision;// 精度
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
    return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision) * 1;
};

/**
 * 高精度乘法
 * @param num1
 * @param num2
 * @returns {number}
 */
var multiply = (num1, num2) => {
    var baseNum = 0;
    try {
        baseNum += num1.toString().split(".")[1].length;
    } catch (e) {
    }
    try {
        baseNum += num2.toString().split(".")[1].length;
    } catch (e) {
    }
    return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum).toString();
};

/**
 * 高精度除法
 * @param num1
 * @param num2
 * @returns {number}
 */
var divide = (num1, num2) => {
    var baseNum1 = 0, baseNum2 = 0;
    var baseNum3, baseNum4;
    try {
        baseNum1 = num1.toString().split(".")[1].length;
    } catch (e) {
        baseNum1 = 0;
    }
    try {
        baseNum2 = num2.toString().split(".")[1].length;
    } catch (e) {
        baseNum2 = 0;
    }
    baseNum3 = Number(num1.toString().replace(".", ""));
    baseNum4 = Number(num2.toString().replace(".", ""));
    return (baseNum3 / baseNum4) * Math.pow(10, baseNum2 - baseNum1).toString();
};

/**
 * 阶乘
 * @param num
 * @returns {number}
 */
var fact = function (num) {
    if (num < 0) {
        return -1;
    } else if (num === 0 || num === 1) {
        return 1;
    } else {
        return (num * fact(num - 1));
    }
};

/**
 * 组合数
 * @param n
 * @param m
 * @returns {number}
 */
var combinatorialNumber = function (n, m) {
    return divide(fact(m), multiply(fact(n), fact(subtract(m, n))));
};

module.exports = {
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    fact: fact,
    combinatorialNumber: combinatorialNumber
};