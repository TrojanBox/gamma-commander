"use strict";

let i18n = require('i18next').createInstance().init(require('./language'));
let Commander = require('../../components/commander');
let declareFile = require('./declare');

module.exports = (argv) => {

    let commander = new Commander().setConf(declareFile);

    commander.declare('run <name>', i18n.t('run'));
    commander.declare('-l, --alias-list', i18n.t('aliasList'), true);

    commander.implement('run', args => require('./directive/run')(args));
    commander.implement('--alias-list', args => require('./directive/list')(args));

    commander.listen(argv.argv);
};
