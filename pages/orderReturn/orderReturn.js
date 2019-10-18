// pages/orderReturn/index.js
Page({
  data: {
    packageListArray: ['-- 请选择 --', '顺丰', '韵达', '中通', '中通'],
    reasonArray: ['不喜欢/效果差', '质量问题', '材料与商品描述不符', '大小尺寸与商品描述不符', '卖家发错货', '收到商品少件或破损'],

    productName: String,
    productMeta: String,
    productImg: String,
    returnReason: 0,
    returnPackageId: '73147861342',
    returnPackageCompany: 0,
    returnPrice: Number,
    returnComment: String,
    returnEvidencePic: [],
    packagePanelShowed: false,
  },

  // 删除当前图片
  removeCurrentPic(e){
    let index = e.currentTarget.dataset.index;
    let tmpPicArray = this.data.returnEvidencePic;
    tmpPicArray.splice(index, 1);
    this.setData({ returnEvidencePic: tmpPicArray })
  },

  // 预览图片
  showCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let that = this;
    if (that.data.returnEvidencePic.length < 1) {
      return 
    } else {
      wx.previewImage({
        urls: [that.data.returnEvidencePic[index]],
      })
    }
  },


  // 图片选择
  imgPickerTaped() {
    let that = this;
    wx.chooseImage({
      count: 9,
      success: function(res) {
        if (res.tempFilePaths.length > 0) {
          let choosenPicPaths = [];
          res.tempFilePaths.forEach(item => {
            choosenPicPaths.push(item)
          })
          that.setData({
            returnEvidencePic: choosenPicPaths.concat(that.data.returnEvidencePic)
          })
        }
      }
    })
  },

  // 确认退货
  returnConfired() {
    console.log(this.data);
    wx.showToast({
      title: '成功提交',
    })
  },

  // 显示 快递修改面板
  showPackagePanel(e) {
    this.setData({
      packagePanelShowed: true
    })
  },

  // 处理 input,picker 数据双向绑定
  handleModalChange: function(e) {
    let name = e.currentTarget.dataset.modal;
    let value = e.detail.value;
    let dataMap = {};
    dataMap[name] = value;
    this.setData(dataMap);
    // console.log(name, ':', this.data[name]) // 显示 page 内 data 的实际数据
  },

  // 退货面板 确定时
  reasonPanelClicked: function(e) {
    if (!this.data.returnPackageId) {
      wx.showToast({
        icon: 'none',
        title: '请填写快递单号'
      })
    } else if (this.data.returnPackageCompany === 0) {
      wx.showToast({
        icon: 'none',
        title: '未选择快递公司'
      })
    } else {
      this.packagePanelHide();
    }
  },

  // 退货信息面板操作方法
  packagePanelHide: function() {
    this.setData({
      packagePanelShowed: false
    })
  },
  packagePanelShow: function() {
    this.setData({
      packagePanelShowed: true
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