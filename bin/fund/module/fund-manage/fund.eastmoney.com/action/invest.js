const selenium = require('selenium-webdriver');
const sleep = require('sleep.async');

/**
 * 登录管理器
 */
class Invest {

    constructor(username, password, code, money) {
        this.driver = undefined;
        this.code = code;
        this.money = money;
        this.password = password;
    }

    /**
     * 设置管理器
     * @param manage
     * @returns {Invest}
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
        let result = await this.invest();

        if (result)
            return new Promise(t => t(this.manage.genReturn(true)));
        else
            return new Promise(t => t(this.manage.genReturn(false)));
    }

    async open() {
        await this.driver.get('https://trade.1234567.com.cn/MyAssets/default');
    }

    /**
     * 登录
     * @returns {Promise<Boolean>} 登录是否成功
     */
    async invest() {
        let url = 'https://trade.1234567.com.cn/FundtradePage/default2.aspx?fc=' + this.code;
        await this.driver.get(url);
        await sleep(1000);
        await this.driver.findElement(selenium.By.id('ctl00_body_amount')).sendKeys(this.money);
        await sleep(100);
        await this.driver.findElement(selenium.By.id('ctl00_body_btnSp1')).click();
        await sleep(100);
        this.driver.executeScript("__doPostBack('ctl00$body$lkbOK_diatxt','')");
        await sleep(2000);
        this.driver.findElement(selenium.By.id('ctl00_body_txtPaypwd')).sendKeys(this.password);
        await sleep(2000);
        this.driver.findElement(selenium.By.id('ctl00_body_btnSp2')).click();
        await sleep(2000);
        let result = await this.driver.findElement(selenium.By.css('.cbox .rst_body .doing .h1')).getText();
        return '申请受理成功' === result;
    }

}

module.exports = Invest;