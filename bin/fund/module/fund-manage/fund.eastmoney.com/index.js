let path = require('path');
let selenium = require('selenium-webdriver');
let firefox = require('selenium-webdriver/firefox');

/**
 * 基金管理
 */
class FundManage {

    /**
     * 初始化浏览器对象
     */
    constructor(profile = {}) {
        this.options = new firefox.Options();
        this.builder = new selenium.Builder();
        if (profile.headless) this.options.headless();
        this.builder.forBrowser('firefox').setFirefoxOptions(this.options);
        this.driver = this.builder.build();
    }

    /**
     * 执行动作
     * @param action
     * @returns {Promise.<{status: boolean, code: (number), data: Object}>}
     */
    async exec(action) {
        action.setManage(this);
        return await action.exec();
    }

    /**
     * 退出环境
     * @returns {*|promise.Thenable.<void>}
     */
    async quit() {
        return this.driver.quit();
    }

    /**
     * 生成返回消息
     * @param status
     * @param code
     * @param data
     * @returns {{status: boolean, code: (number), data: Object}}
     */
    genReturn(status = true, code, data = {}) {
        if (status)
            return {status: true, code: code || 200, data: data};
        else
            return {status: false, code: code || 500, data: data};
    }
}

module.exports = FundManage;