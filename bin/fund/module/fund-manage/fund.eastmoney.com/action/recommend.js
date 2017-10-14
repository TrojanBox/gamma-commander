const selenium = require('selenium-webdriver');
const sleep = require('sleep.async');

/**
 * 登录管理器
 */
class Recommend {

    constructor() {
        this.driver = undefined;
    }

    /**
     * 设置管理器
     * @param manage
     * @returns {Recommend}
     */
    setManage(manage) {
        this.manage = manage;
        return this;
    }

    /**
     * 执行
     * @returns {Promise.<void>}
     */
    async exec() {
        this.driver = this.manage.driver;
        await this.open();
        let list = await this.getList();
        return new Promise(t => t(this.manage.genReturn(true, 200, {
            fundList: async () => list
        })));
    }

    async open() {
        await this.driver.get('http://fund.eastmoney.com/daogou/#dt0;ft;rsz_100,1y_100,3y_100,6y_100,jn_100,1n_100,2n_100;sd;ed;pr;cp;rt;tp;rk;se;nx;sc3n;stdesc;pi1;pn20;zfdiy;shlist');
        return new Promise(t => t(this));
    }

    /**
     * 登录
     * @returns {Promise<Boolean>} 登录是否成功
     */
    async getList() {
        let result = [];
        let fundNames = await this.driver.findElements(selenium.By.css('#fund_list td[class=fname] > a'));
        let fundCodes = await this.driver.findElements(selenium.By.css('#fund_list td[class=fname] > span'));
        for (let i in fundNames) if (fundNames.hasOwnProperty(i)) {
            let name = await fundNames[i].getText();
            let code = await fundCodes[i].getText();
            result.push({name: name, code: code, url: 'http://fund.eastmoney.com/' + code + '.html'});
        }
        return new Promise(t => t(result));
    }

}

module.exports = Recommend;