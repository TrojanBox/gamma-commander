"use strict";

let pm = require(gamma.rootdir + '/interface/profile');
let i18n = require('i18next').createInstance().init(require('./language'));
let Commander = require(gamma.rootdir + '/components/commander/index');
let declareFile = require('./declare');

module.exports = (argv) => {

    let commander = new Commander().setConf(declareFile);

    commander.declare('-l, --login', i18n.t('login'));
    commander.declare('-r, --recommend', i18n.t('recommend'));
    commander.declare('-i, --invest <fund-code> <money>', i18n.t('invest'));
    commander.declare('-a, --asset', i18n.t('asset'));

    commander.implement('--login', args => require('./directive/login')(pm, args));
    commander.implement('--recommend', args => require('./directive/recommend')(pm, args));
    commander.implement('--invest', args => require('./directive/invest')(pm, args));
    commander.implement('--asset', args => require('./directive/asset')(pm, args));

    commander.listen(argv.argv);
};
