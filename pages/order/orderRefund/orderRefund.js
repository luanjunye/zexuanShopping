// pages/orderReturn/index.js
Page({
  data: {
    goods: []
  },


  onLoad: function(options) {
    let order = wx.getStorageSync('currOrder');
    console.log(order);
    this.setData({
      goods: order.list
    })
  },



  // 跳转退款
  toOrderRefundMoney() {
    wx.navigateTo({
      url: '/pages/order/orderRefundMoney/orderRefundMoney',
    })
  },

  // 跳转退货
  toOrderRefundGoods() {
    wx.navigateTo({
      url: '/pages/order/orderRefundGoods/orderRefundGoods',
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
