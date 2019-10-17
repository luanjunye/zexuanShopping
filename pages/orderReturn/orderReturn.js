// pages/orderReturn/index.js
Page({
  data: {
    packageListArray: ['顺丰','韵达','中通','中通'],
    productName: String,
    productMeta: String,
    productImg: String,
    returnReason: String,
    returnPackageId: '73147861342',
    returnPackageCompany: 0,
    returnPrice: Number,
    returnComment: String,
    returnEvidencePic: Array
  },

  bindPickerChange: function(e) {
    console.log( e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  onLoad: function(options) {

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