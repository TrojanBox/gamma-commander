"use strict";

/**
 * 高阶贝塞尔曲线 - 通用公式
 * 使用矩阵计算，性能低
 */
var math = require('../../util/math');
var mathJs = require('mathjs');

/**
 * 计算矩阵中的值
 * @param k
 * @param i
 * @param j
 * @returns {number}
 */
var matrixVS = function (k, i, j) {
    if (i < j) return 0;
    let one = Math.pow(-1, math.subtract(i, j));
    let two = math.combinatorialNumber(j, math.subtract(k, 1));
    let three = math.combinatorialNumber(math.subtract(i, j), math.subtract(math.subtract(k, 1), j));
    return math.multiply(math.multiply(one, two), three);
};

function Matrix(number) {
    if (typeof number == 'number') {
        this.matrix = [];
        this.length = number;
        for (var x = 0; x < number; x++) {
            for (var y = 0; y < number; y++) {
                this.matrix.push(x == y ? 1 : 0);
            }
        }
    } else {
        if (number instanceof Array) {
            this.length = Math.sqrt(number.length) | 0;
            this.matrix = number;
        }
    }
    return this;
}

Matrix.prototype = {
    // 矩阵相乘
    multiply: function (matrix) {
        if (this.length == matrix.length) {
            var i, j, k, s, container = Array(this.length * this.length);
            for (i = 0; i < this.length; i++) {
                for (j = 0; s = 0, j < this.length; j++) {
                    for (k = 0; k < this.length; k++) {
                        s += matrix.matrix[k * this.length + j] * this.matrix[i * this.length + k];
                    }
                    container[i * this.length + j] = s;
                }
            }
            this.matrix = container;
        }
        return this;
    },
    toArray: function () {
        return this.matrix;
    }
};

/**
 * 创建贝塞尔矩阵
 * @param k
 */
var createBezierMatrix = function (k) {
    var result = [];
    for (let j = 0; j < k; j++) {
        for (let i = 0; i < k; i++) {
            let key = i % k;
            if (result[key] == undefined) result[key] = [];
            result[key].push(matrixVS(k, i, j));
        }
    }
    return result;
};

/**
 * 创建贝塞尔时间矩阵
 * @param t
 * @param k
 */
var createBezierTimeMatrix = function (t, k) {
    var result = [1];
    for (let i = 0; i < k; i++) {
        result.push(Math.pow(t, 1 + i));
    }
    return result;
};

var createBezier = function (options) {
    let t = options.t || 0;
    let p = options.p || [];
    let pLength = options.p.length;
    let timeMatrix = createBezierTimeMatrix(t, pLength - 1);
    let tableMatrix = createBezierMatrix(pLength);

    return mathJs.multiply(mathJs.multiply(timeMatrix, tableMatrix), p);
};
var re = [];
for (let i = 0; i <= t; i+=0.01) re.push(createBezier({t: i, p: [[0, 100], [100, 0], [100, 0], [100, 100]]}));
console.log(re);