const selenium = require('selenium-webdriver');
const sleep = require('sleep.async');

/**
 * 登录管理器
 */
class Asset {

    constructor() {
        this.driver = undefined;
    }

    /**
     * 设置管理器
     * @param manage
     * @returns {Asset}
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
        await sleep(4000);
        let result = await this.asset();
        return new Promise(t => t(this.manage.genReturn(true, 200, {
            asset: result
        })));
    }

    async open() {
        await this.driver.get('https://trade.1234567.com.cn/MyAssets/default');
    }

    async asset() {
        let result = {};
        result['totalAssets'] = await this.driver.findElement(selenium.By.id('all_value')).getText();
        result['finance'] = await this.driver.findElement(selenium.By.id('TiantianCashBag_value')).getText();
        result['financeEstimateDayIncome'] = await this.driver.findElement(selenium.By.id('dayunit')).getText();
        result['fund'] = await this.driver.findElement(selenium.By.id('fundProductTotalAsset')).getText();
        result['fundEstimateTotalIncome'] = await this.driver.findElement(selenium.By.id('fundProductTotalAssetProfit')).getText();
        return new Promise(t => t(result));
    }
}

module.exports = Asset;