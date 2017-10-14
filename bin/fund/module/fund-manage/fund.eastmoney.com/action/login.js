const selenium = require('selenium-webdriver');
const sleep = require('sleep.async');

/**
 * 登录管理器
 */
class Login {

    constructor(username, password) {
        this.driver = undefined;
        this.username = username;
        this.password = password;
    }

    /**
     * 设置管理器
     * @param manage
     * @returns {Login}
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
        await this.setLoginInfo();
        let result = await this.login();
        if (result) {
            return new Promise(t => t(this.manage.genReturn(true, 200, {
                cookies: async () => await this.driver.manage().getCookies()
            })));
        } else {
            return new Promise(t => t(this.manage.genReturn(false)));
        }
    }

    /**
     *
     * @returns {Promise<this>}
     */
    async open() {
        await this.driver.get('https://login.1234567.com.cn/login');
        return new Promise(t => t(this));
    }

    /**
     * 设置登录信息
     * @returns {Promise<this>}
     */
    async setLoginInfo() {
        await this.driver.findElement(selenium.By.id('tbname')).sendKeys(this.username);
        await this.driver.findElement(selenium.By.id('tbpwd')).sendKeys(this.password);
        return new Promise(t => t(this));
    }

    /**
     * 登录
     * @returns {Promise<Boolean>} 登录是否成功
     */
    async login() {
        await this.driver.findElement(selenium.By.className('submit')).click();
        await sleep(4000);
        let currentUrl = await this.driver.getCurrentUrl();
        if (currentUrl === 'https://login.1234567.com.cn/login')
            return new Promise(t => t(false));
        else
            return new Promise(t => t(true));
    }

}

module.exports = Login;