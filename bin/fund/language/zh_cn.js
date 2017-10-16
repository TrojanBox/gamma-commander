require('colors');

module.exports = {
    translation: {
        login: '登陆',
        recommend: '查找推荐基金',
        invest: '投资',
        asset: '查看我的资产信息',
        directive: {
            asset: {
                check: '正在检查账户状态...',
                login: '检查完成，请先登录。',
                query: '检查完成，正在查询资产信息...',
                error: '查询失败。',
                fundInfo: {
                    totalAssets: '总资产',
                    finance: '理财金总资产',
                    financeEstimateDayIncome: '理财金当日预估收益',
                    fund: '基金总资产',
                    fundEstimateTotalIncome: '基金持仓预计总收益'
                }
            },
            invest: {
                check: '正在检查账户状态...',
                login: '检查完成，请先登录。',
                query: '检查完成，正在投资...',
                success: '申请受理成功。',
                error: '订单处理失败。',
            },
            login: {
                check: '正在检查账户状态...',
                login: '当前状态已登录，成功刷新 Cookies 信息。',
                loginExpire: '登录状态过期，正在重新登录...',
                success: '登录成功。',
                error: '登录失败，请检查网络或用户名密码是否正确。'
            },
            recommend: {
                find: '正在查找推荐基金...',
                empty: '暂无推荐基金',
                fundName: '基金名称',
                fundCode: '基金代码',
                fundUrl: '地址'
            }
        }
    }
};