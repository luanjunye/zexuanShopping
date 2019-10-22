// pages/orderReturn/index.js
Page({
  data: {
    reasonArray: ['-- 请选择 --','多拍/拍错/不想要', '快递一直未到', '未按约定时间发货', '快递无跟踪记录', '其它'],
    packageStatus: ['-- 请选择 --' ,'未收到货','已收到货'],

    freight: Number,
    productName: String,
    productMeta: String,
    productImg: String,
    returnReasonId: 0,
    packageStatusId: 0,
    returnPrice: Number,
    returnComment: String,
    returnEvidencePic: [],
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

          // 组合数组
          let finalPicArray = that.data.returnEvidencePic.concat(choosenPicPaths);
          
          // 新旧图片数量
          let oldPicCount = that.data.returnEvidencePic.length;
          let newPicCount = res.tempFilePaths.length;

          if (oldPicCount + newPicCount > 5){
            wx.showToast({
              icon: 'none',
              title: '最多上传5张凭证',
            });
            finalPicArray.splice(4,finalPicArray.length - 5);
          } else {
          }

          // 绑定数据
          that.setData({
            returnEvidencePic: finalPicArray
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
