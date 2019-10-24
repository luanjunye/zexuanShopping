// pages/orderReturn/index.js

const util = require('./../../../utils/util.js');
const api = require('./../../../config/url.js');

Page({
  data: {
    order: Object,
    goods: [],
    expressInfo: Object,
    lastExpressInfo: Object,
  },


  onLoad: function(options) {
    let order = wx.getStorageSync('currOrder');
    console.log(order);
    this.setData({
      order: order,
      goods: order.list
    });
    // 获取快递信息
    this.getPackageInfo(order.expressNo);
  },

  // 获取快递信息
  getPackageInfo(packageId) {
    let that = this;
    util.request(api.OrderPackage, {
      shippingNo: packageId
    }, "GET").then(res => {
      if (res.code === 0) {
        let info = JSON.parse(res.courierInfo);
        console.log(info);
        let lastInfo = info.list.length > 0 ? info.list[info.list.length - 1] : null;
        that.setData({
          expressInfo: info,
          lastExpressInfo: lastInfo
        })
      }
    })
  },


  // 跳转物流信息页面
  goToShippingInfoPage() {
    console.log(this.data.order);
    wx.navigateTo({
      url: '/pages/ucenter/express/express?expressno=' + this.data.order.expressNo,
    })
  },



  onReady: function() {

  },

  onShow: function() {

  },

  onHide: function() {

  },

  onUnload: function() {

  },

  onPullDownRefresh: function() {

  },

  onReachBottom: function() {

  },

  onShareAppMessage: function() {

  }
})
