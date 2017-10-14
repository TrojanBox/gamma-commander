module.exports = {
    lng: process.env.LANGUAGE.toLowerCase(),
    fallbackLng: ['zh_cn'],
    resources: {
        zh_cn: require('./zh_cn')
    }
};