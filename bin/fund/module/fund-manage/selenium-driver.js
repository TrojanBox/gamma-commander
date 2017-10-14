let selenium = require('selenium-webdriver');
let firefox = require('selenium-webdriver/firefox');

let options = new firefox.Options();
let builder = new selenium.Builder();
// options.headless();
builder.forBrowser('firefox').setFirefoxOptions(options);
let driver = builder.build();

module.exports = {
    selenium: selenium,
    options: options,
    driver: driver
};