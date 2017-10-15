require('colors');
const EastMoneyFund = require('../module/fund-manage/fund.eastmoney.com/index');
const InitLogin = require('../module/fund-manage/fund.eastmoney.com/action/init-login');
const Invest = require('../module/fund-manage/fund.eastmoney.com/action/invest');
let i18n = require('i18next').createInstance().init(require('../language'));

module.exports = (pm, args) => pm.editProfileFileToJSON(async data => {

    data['userInfo'] = data['userInfo'] || {};
    data['cookies'] = data['cookies'] || [];

    let emf = new EastMoneyFund({headless: true});

    console.log(i18n.t('directive.invest.check'));

    let initLogin = await emf.exec(new InitLogin(data['cookies']));
    if (!initLogin.status) throw new Error(i18n.t('directive.invest.login'));

    console.log(i18n.t('directive.invest.query'));

    let invest = await emf.exec(new Invest(data['userInfo'].username, data['userInfo'].password, ...args.params));
    if (invest.status) {
        console.log(i18n.t('directive.invest.success'));
    } else {
        console.log(i18n.t('directive.invest.error'));
    }
    emf.quit();

}, ['fund', 'conf.json']);