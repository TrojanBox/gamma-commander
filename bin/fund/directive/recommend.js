require('colors');
const EastMoneyFund = require('../module/fund-manage/fund.eastmoney.com/index');
const Recommend = require('../module/fund-manage/fund.eastmoney.com/action/recommend');
let i18n = require('i18next').createInstance().init(require('../language'));
let table = require(gamma.rootdir + '/components/util/table');

module.exports = (pm, args) => pm.editProfileFileToJSON(async data => {
    let emf = new EastMoneyFund({headless: true});

    data['lastContext'] = data['lastContext'] || {};
    data['lastContext']['fundList'] = data['lastContext']['fundList'] || [];

    console.log(i18n.t('directive.recommend.find'));

    let recommend = await emf.exec(new Recommend());
    if (recommend.status) {
        let fundList = await recommend.data.fundList();
        if (fundList.length <= 0) {
            console.log(i18n.t('directive.recommend.empty'));
        } else {
            let show = [
                [
                    i18n.t('directive.recommend.fundName'),
                    i18n.t('directive.recommend.fundCode'),
                    i18n.t('directive.recommend.fundUrl')
                ]
            ];
            for (let i in fundList) if (fundList.hasOwnProperty(i)) {
                data['lastContext']['fundList'].push([fundList[i].name, fundList[i].code, fundList[i].url]);
                show.push([fundList[i].name, fundList[i].code, fundList[i].url]);
            }
            console.log(table.table(show));
        }
    }
    emf.quit();

}, ['fund', 'conf.json']);