
const EastMoneyFund = require('./fund.eastmoney.com/index');
const InitLogin = require('./fund.eastmoney.com/action/init-login');
const Login = require('./fund.eastmoney.com/action/login');

let a = async () => {
    let emf = new EastMoneyFund({headless: false});
    try {

        let initLogin = await emf.exec(new InitLogin(JSON.parse('[{"name":"st_pvi","value":"84109114786863","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":false},{"name":"st_si","value":"77188736010849","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":false},{"name":"FundTradeLoginUser","value":"9m1rJ1neon3o0RYOyPgZcbg9EJOjH1T+kMGe6R1uvFfnZjno4l7UZlHMoTwoebIynUnEO3ut","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":true},{"name":"fund_trade_cn","value":"9BiRedEl8Kk9bpnSoOBpyN3Y0ZtighoCBFUc0BBunZjiPfEm/4UmEmNZ6wOmMlYEVieOCrjoi3QIg0spB6NTHKiq/UPB3/EohkyyAU9L9SIFWj6cgo4=","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":true},{"name":"fund_trade_name","value":"9vkTByiNWnNEf8+Oc3gYUp08tdUj1ySNLQzp6nvUnmuEPj3lYzMFS2HAYTTAgUYyQhgfuCM7","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":true},{"name":"fund_trade_gps","value":"1","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":true},{"name":"ftoken","value":"892cebf50bfaadff9793979fa060b022","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":false},{"name":"VipLevel","value":"0","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":false},{"name":"TradeLoginToken","value":"36ddc9835809437baf063142cba0b738","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":true},{"name":"UTOKEN","value":"9BiRedEl8Kk9bpnSoOBpyN3Y0ZtighoCBFUc0BBunZjiPfEm/4UmEmNZ6wOmMlYEVieOCijJ/zBo3Gu1yQY+HHgQBCH1+hHuAlynsZ/XqOyLLddce+Q=","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":true},{"name":"LToken","value":"acde59072afe443080dd6d3cf596803e","path":"/","domain":".1234567.com.cn","expiry":null,"secure":false,"httpOnly":true},{"name":"ASP.NET_SessionId","value":"mujcmhfm1qbapynkfp03sqxc","path":"/","domain":"trade.1234567.com.cn","expiry":null,"secure":false,"httpOnly":true}]')));
        console.log(initLogin.status);


        // let login = await emf.exec(new Login('130624199511200236', '5Ai402497875'));
        // if (login.status) {
        //     let cookie = await login.data.cookies();
        //     console.log(JSON.stringify(cookie));
        // }
    } catch (e) {
        console.log(e.message);
    }
    emf.quit();
};
a();


module.exports = () => {

};