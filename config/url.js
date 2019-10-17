const API_BASE_URL = 'http://192.168.0.174:8081/freeter-api/';
module.exports = {
  IndexUrlBanner: API_BASE_URL + 'index/bannerlist', //首页banner图
  IndexUrlQuick: API_BASE_URL + 'index/categoryindex', //首页快捷频道
  IndexUrlOrder: API_BASE_URL + 'index/goodsindex',//首页全部商品
  IndexUrlLogin:API_BASE_URL + 'login/login',//登陆
};