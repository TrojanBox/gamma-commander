const selenium = require('selenium-webdriver');
const sleep = require('sleep.async');

/**
 * 登录管理器
 */
class InitLogin {

    constructor(cookies) {
        this.driver = undefined;
        this.cookies = cookies;
    }

    /**
     * 设置管理器
     * @param manage
     * @returns {InitLogin}
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
        await this.setCookies();
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
     * 设置登录信息
     * @returns {Promise<this>}
     */
    async setCookies() {

        for (let i in this.cookies) if (this.cookies.hasOwnProperty(i)) {
            try {
                await this.driver.manage().addCookie(this.cookies[i]);
            } catch (e) {}
        }
        return new Promise(t => t(this));
    }

    /**
     * 登录
     * @returns {Promise<Boolean>} 登录是否成功
     */
    async login() {
        await this.driver.get('https://trade.1234567.com.cn/MyAssets/default');
        await sleep(4000);
        let currentUrl = await this.driver.getCurrentUrl();
        if (currentUrl === 'https://login.1234567.com.cn/login')
            return new Promise(t => t(false));
        else
            return new Promise(t => t(true));
    }

}

module.exports = InitLogin;