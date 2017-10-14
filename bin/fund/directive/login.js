require('colors');
const EastMoneyFund = require('../module/fund-manage/fund.eastmoney.com/index');
const InitLogin = require('../module/fund-manage/fund.eastmoney.com/action/init-login');
const Login = require('../module/fund-manage/fund.eastmoney.com/action/login');
let i18n = require('i18next').createInstance().init(require('../language'));
let path = require('path');
let string = require(gamma.rootdir + '/components/util/string');

module.exports = (pm, args) => pm.editProfileFileToJSON(async data => {

    data['userInfo'] = data['userInfo'] || {};
    data['cookies'] = data['cookies'] || [];

    let emf = new EastMoneyFund({headless: true});

    console.log(i18n.t('directive.asset.check'));

    let initLogin = await emf.exec(new InitLogin(data['cookies']));
    if (initLogin.status) {
        console.log(i18n.t('directive.asset.login'));
    } else {
        console.log(i18n.t('directive.asset.loginExpire'));
        let login = await emf.exec(new Login(data['userInfo'].username, data['userInfo'].password));
        if (login.status) {
            data['cookies'] = await login.data.cookies();
            console.log(i18n.t('directive.asset.success'));
        } else {
            console.log(i18n.t('directive.asset.error'));
        }
    }
    emf.quit();

}, ['fund', 'conf.json']);