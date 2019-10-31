const API_BASE_URL = 'http://192.168.0.176:8081/freeterapi/';
// const API_BASE_URL = 'https://shop.zexuanchuanmei.com/freeterapi/';
// const API_BASE_URL = 'https://shop.zexuanshipin.com/freeterapi/';

module.exports = {
  //首页
  IndexUrlBanner: API_BASE_URL + 'index/bannerlist', //首页banner图
  IndexUrlQuick: API_BASE_URL + 'index/categoryindex', //首页快捷频道
  IndexUrlOrder: API_BASE_URL + 'index/goodsindex', //首页全部商品
  IndexUrlFreight: API_BASE_URL + 'login/yunfei',//满多少包邮和运费多少
  //二级商品页
  SecondIndexUrlCommodity: API_BASE_URL + 'goods/page', //二级商品页
  //个人中心
  MineUrlLogin: API_BASE_URL + 'login/login', //个人中心登陆
  MineUrlBackground: API_BASE_URL + 'icon/background', //个人中心背景图
  MineUrlIconFirst: API_BASE_URL + 'icon/first', //个人中心第一排icon
  MineUrlIconSecond: API_BASE_URL + 'icon/second', //个人中心第二排icon
  MineUrlIconThird: API_BASE_URL + 'icon/third', //个人中心第三排icon
  MineUrlIconFourth: API_BASE_URL + 'icon/fourth', //个人中心第四排icon
  //购物车
  CartPage: API_BASE_URL + 'cart/page', //查询购物车
  CartSave: API_BASE_URL + 'cart/save/json', //添加购物车
  CartDelete: API_BASE_URL + 'cart/delete',//删除购物车
  //地址管理
  AddressPage: API_BASE_URL + 'address/page', //地址管理
  AddressSave: API_BASE_URL + 'address/save/json', //添加新地址
  AddressUpdate: API_BASE_URL + 'address/update/json', //添加新地址
  AddressDelete: API_BASE_URL + 'address/delete', //删除地址
  //商品详情页
  CommodityDetails: API_BASE_URL + 'goods/info', //商品详情页
  SpecificationsDetails: API_BASE_URL + 'goods/selectspecification',//规格详情
  EvaluateList: API_BASE_URL + 'goods/goodsappraise',//评价列表
  EvaluateListInfo: API_BASE_URL + 'goods/selectAppraise',//评价类型数量
  ProductInCart: API_BASE_URL + 'goods/goodscount',//查询对应商品在购物车的数量
  // 订单
  OrderConfirm: API_BASE_URL + 'order/confirm/goods', //  确认收货
  OrderRemove: API_BASE_URL + 'order/deleteorder', //  删除订单
  OrderProduct: API_BASE_URL + 'order/bayinfo', // 从商品详情进入 确认订单
  OrderSave: API_BASE_URL + 'order/save/order', //  生成订单
  OrderCartSave: API_BASE_URL + 'order/save/all', //  从购物车添加
  OrderRefund: API_BASE_URL + 'order/refund', //  退款
  OrderRefundExpressNo: API_BASE_URL + 'order/addexpressno', //  填写退货的快递单号
  OrderList: API_BASE_URL + 'order/page', //  订单列表，分布查询   GET
  OrderDetail: API_BASE_URL + 'order/info', //  订单详情
  OrderPackage: API_BASE_URL + 'order/selectcourier', //  订单快递查询 参数：shippingNo   GET

  OrderRefundReason: API_BASE_URL + 'returnreason/list', //  订单退款原因 参数:type: 1, 2   GET 

  // 支付
  // 'https://shop.zexuanchuanmei.com/freeter-api/' 
  Pay: API_BASE_URL + 'wx/wechatPay', // 微信支付请求接口  POST: orderId
  // 发票
  ApplicationInvoice: API_BASE_URL + 'invoice/save/json',//申请发票
  InvoiceList: API_BASE_URL + 'invoice/list',//获取发票基本信息

  // 客服二维码
  Service: API_BASE_URL + 'icon/customer',// 获取二维码图片
};
