"use strict";

var isEmptyObject = function (e) {
    for (let t in e) return !1;
    return !0
};

module.exports = {
    isEmptyObject: isEmptyObject
};