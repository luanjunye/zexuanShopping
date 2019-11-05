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
      url: '/pages/order/orderRefundMoney/orderRefundMoney?refund=money',
    })
  },

  // 跳转退货退款
  toOrderRefundGoods() {
    wx.navigateTo({
      url: '/pages/order/orderRefundMoney/orderRefundMoney?refund=goods',
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
