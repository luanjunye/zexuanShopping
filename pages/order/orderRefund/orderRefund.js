// pages/orderReturn/index.js
Page({
  data: {
    productName: String,
    productMeta: String,
    productImg: String,
  },


  onLoad: function(options) {
    let order = wx.getStorageSync('currOrder');
    console.log(order);
    this.setData({
      productName: '商品名称'
    })
  },


  // 跳转退款
  toOrderRefundMoney() {
    wx.navigateTo({
      url: '/pages/order/orderRefundMoeny',
    })
  },

  // 跳转退货
  toOrderRefundGoods() {
    wx.navigateTo({
      url: '/pages/order/orderRefundGoods',
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