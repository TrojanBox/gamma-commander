require('colors');
const EastMoneyFund = require('../module/fund-manage/fund.eastmoney.com/index');
const InitLogin = require('../module/fund-manage/fund.eastmoney.com/action/init-login');
const Login = require('../module/fund-manage/fund.eastmoney.com/action/login');
let i18n = require('i18next').createInstance().init(require('../language'));

module.exports = (pm, args) => pm.editProfileFileToJSON(async data => {

    data['userInfo'] = data['userInfo'] || {};
    data['cookies'] = data['cookies'] || [];

    let emf = new EastMoneyFund({headless: true});

    console.log(i18n.t('directive.login.check'));

    let initLogin = await emf.exec(new InitLogin(data['cookies']));
    if (initLogin.status) {
        console.log(i18n.t('directive.login.login'));
    } else {
        console.log(i18n.t('directive.login.loginExpire'));
        let login = await emf.exec(new Login(data['userInfo'].username, data['userInfo'].password));
        if (login.status) {
            data['cookies'] = await login.data.cookies();
            console.log(i18n.t('directive.login.success'));
        } else {
            console.log(i18n.t('directive.login.error'));
        }
    }
    emf.quit();

}, ['fund', 'conf.json']);