const API_BASE_URL = 'http://192.168.0.174:8081/freeter-api/';
module.exports = {
  IndexUrlBanner: API_BASE_URL + 'index/bannerlist', //首页banner图
  IndexUrlQuick: API_BASE_URL + 'index/categoryindex', //首页快捷频道
  IndexUrlOrder: API_BASE_URL + 'index/goodsindex',//首页全部商品
  SecondIndexUrlCommodity: API_BASE_URL + 'goods/page',//二级商品页
  MineUrlLogin:API_BASE_URL + 'login/login',//个人中心登陆
  MineUrlBackground: API_BASE_URL + 'icon/background',//个人中心背景图
  MineUrlIconFirst: API_BASE_URL + 'icon/first',//个人中心第一排icon
  MineUrlIconSecond: API_BASE_URL + 'icon/second',//个人中心第二排icon
  MineUrlIconThird: API_BASE_URL + 'icon/third'//个人中心第三排icon
};