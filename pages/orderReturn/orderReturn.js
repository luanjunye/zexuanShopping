// pages/orderReturn/index.js
Page({
  data: {
    packageListArray: ['顺丰', '韵达', '中通', '中通'],
    reasonArray: ['不喜欢/效果差', '质量问题', '材料与商品描述不符', '大小尺寸与商品描述不符', '卖家发错货', '收到商品少件或破损'],

    productName: String,
    productMeta: String,
    productImg: String,
    returnReason: 0,
    returnPackageId: '73147861342',
    returnPackageCompany: 0,
    returnPrice: Number,
    returnComment: String,
    returnEvidencePic: Array
  },

  // 处理 reason picker
  handleReasonPickerChange: function(e) {
    this.setData({
      returnReason: e.detail.value
    });
  },


  // 处理 packageArray picker
  handlePackagePickerChange: function (e) {
    this.setData({
      returnPackageCompany: e.detail.value
    });
  },

  // 处理 input 数据双向绑定
  handleInputChange: function(e) {
    let targetData = e.currentTarget.dataset.modal;
    let currentValue = e.detail.value;
    this[targetData] = currentValue;
    console.log(this[targetData])
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
