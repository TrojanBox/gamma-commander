require('colors');
const EastMoneyFund = require('../module/fund-manage/fund.eastmoney.com/index');
const InitLogin = require('../module/fund-manage/fund.eastmoney.com/action/init-login');
const Asset = require('../module/fund-manage/fund.eastmoney.com/action/asset');
let i18n = require('i18next').createInstance().init(require('../language'));
let table = require(gamma.rootdir + '/components/util/table');

module.exports = (pm, args) => pm.editProfileFileToJSON(async data => {

    data['userInfo'] = data['userInfo'] || {};
    data['userInfo']['asset'] = data['userInfo']['asset'] || {};
    data['cookies'] = data['cookies'] || [];

    let emf = new EastMoneyFund({headless: true});

    console.log(i18n.t('directive.asset.check'));

    let initLogin = await emf.exec(new InitLogin(data['cookies']));
    if (!initLogin.status) throw new Error(i18n.t('directive.asset.login'));

    console.log(i18n.t('directive.asset.query'));

    let invest = await emf.exec(new Asset(data['userInfo'].username, data['userInfo'].password, ...args.params));
    if (invest.status) {
        data['userInfo']['asset'] = invest.data.asset;
        let result = [];
        for (let i in invest.data.asset) if (invest.data.asset.hasOwnProperty(i)) {
            result.push([i18n.t('directive.asset.fundInfo.' + i), invest.data.asset[i]]);
        }
        console.log(table.table(result));
    } else {
        console.log(i18n.t('directive.asset.error'));
    }
    emf.quit();

}, ['fund', 'conf.json']);