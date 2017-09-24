let fs = require('fs');
let path = require('path');
let rfs = require('../../../components/util/fs');

class ProfileManage {

    constructor(filePath) {
        this.path = filePath;
        this.profile = {'default': '', 'list': {}};
        if (fs.existsSync(filePath)) this.profile = JSON.parse(fs.readFileSync(filePath));
    }

    /**
     * 设置默认 profile
     * @param profile
     * @returns {boolean}
     */
    setDefaultProfile(profile) {
        if (this.profile['list'][profile] === undefined) return false;
        this.profile['default'] = profile;
        return true;
    }

    /**
     * 获取默认 profile
     * @returns {string}
     */
    getDefaultProfile() {
        return this.profile['default'];
    }

    /**
     * 取得配置信息
     * @param profile
     * @returns {Object}
     */
    getProfileInfo(profile) {
        if (this.profile['list'][profile] === undefined) return false;
        return JSON.parse(this.profile['list'][profile]);
    }

    /**
     * 添加配置信息
     * @param profile
     * @param config
     * @returns {boolean}
     */
    addProfile(profile, config) {
        if (this.profile['list'][profile] !== undefined) return false;
        this.profile['list'][profile] = config;
    }

    /**
     * 移除某个 profile
     * @param profile
     * @returns {boolean}
     */
    removeProfile(profile) {
        delete this.profile['list'][profile];
        return true;
    }

    /**
     * 移除全部 profile
     * @returns {boolean}
     */
    removeAllProfile() {
        this.profile['list'] = {};
        return true;
    }

    /**
     * 写入
     * @returns {boolean}
     */
    write() {
        if (!fs.existsSync(this.path) && !rfs.mkdirsSync(path.join(this.path, '..'))) return false;
        return fs.writeFileSync(this.path, JSON.stringify(this.profile));
    }
}

module.exports = ProfileManage;