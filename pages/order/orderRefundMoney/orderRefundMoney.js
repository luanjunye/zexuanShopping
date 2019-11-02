// pages/orderReturn/index.js

const util = require('./../../../utils/util.js');
const api = require('./../../../config/url.js');
const uploadImage = require('./../../../utils/fileUpload.js');

const maxCountPics = 5;

Page({
  data: {
    packageStatus: ['-- 请选择 --', '未收到货', '已收到货'],
    reasonArray: [],
    order: Object,

    goods: [],
    freight: Number,
    productName: String,
    productMeta: String,
    productImg: String,
    returnReasonId: 0,
    packageStatusId: 0,
    returnComment: String,
    returnEvidencePic: [],
  },

  // 删除当前图片
  removeCurrentPic(e) {
    let index = e.currentTarget.dataset.index;
    let tmpPicArray = this.data.returnEvidencePic;
    tmpPicArray.splice(index, 1);
    this.setData({
      returnEvidencePic: tmpPicArray
    })
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
      count: 5,
      compressed: ['compressed'],
      success: function(res) {
        let hasReachMaxCountOfUploadPic = false; // 是否达到最大上传数量，在上传最后提示用

        // 新旧图片数量
        let oldPicCount = that.data.returnEvidencePic.length;
        let newPicCount = res.tempFilePaths.length;
        console.log(oldPicCount, newPicCount);

        if (oldPicCount + newPicCount > maxCountPics) {
          hasReachMaxCountOfUploadPic = true
          res.tempFilePaths.splice(maxCountPics - oldPicCount, oldPicCount + newPicCount - maxCountPics); // 去掉第二次选择多于5张的图片
        }

        console.log(hasReachMaxCountOfUploadPic)

        // 路径参数
        let tempFilePaths = that.data.returnEvidencePic;
        let nowTime = util.formateDate(new Date(), 'yyyy-MM-dd');
        let evidenceFinalUrls = [];

        res.tempFilePaths.forEach((item, index) => {
          //显示消息提示框
          wx.showLoading({
            title: '上传中' + (index + 1) + '/' + tempFilePaths.length,
            mask: true
          })
          //上传图片
          uploadImage(item, 'images/' + nowTime + '/',
            function(result) {
              let tempLastPicArray = that.data.returnEvidencePic;
              tempLastPicArray.push(result);
              that.setData({
                returnEvidencePic: tempLastPicArray
              })
              console.log("======上传成功图片地址为：", result);
              wx.hideLoading();
              console.log(index);

              // 每次上传完成后，查看是否为最后一张要上传的图，如果是，就显示达到最大上传数量的提示，不能写到结尾，因为异步
              if (hasReachMaxCountOfUploadPic){
                wx.showToast({
                  icon: 'none',
                  title: `最多上传${maxCountPics}张凭证`,
                });
              }
            },
            function(result) {
              console.log("======上传失败======", result);
              wx.hideLoading()
            }
          )
        })
      }
    })
  },


  // 切换收货状态，请求数据
  switchPackageStatus(e) {
    let index = e.detail.value;
    this.setData({
      packageStatusId: Number(index)
    });
    let that = this;
    util.request(api.OrderRefundReason, {
      type: index,
    }, "GET").then(function(res) {
      if (res.code === 0) {
        let tempReasonArray = [];
        res.data.forEach(item => {
          tempReasonArray.push(item.content);
        })
        that.setData({
          reasonArray: tempReasonArray
        })
      }
    })

  },


  // 确认退货
  returnConfired() {
    console.log(this.data.packageStatusId);
    if (this.data.packageStatusId === 0) {
      wx.showToast({
        icon: 'none',
        title: '请先选择是否收到货'
      })
    } else {
      let requestData = {
        id: this.data.order.id, // 订单ID
        type: this.data.packageStatusId, // 是否收到货
        returnReason: this.data.reasonArray[this.data.returnReasonId], // 退货退款原因
        url: this.data.returnEvidencePic // 图片列表
      };

      util.request(api.OrderRefund, requestData, "POST").then(function(res) {
        if (res.code === 0) {
          wx.showToast({
            title: '成功提交申请'
          })
          setTimeout(function() {
            wx.switchTab({
              url: '/pages/order/ordercenter/ordercenter',
            })
          }, 1500);
        }
      });
    }
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
    // 载入当前订单信息
    let currentOrder = wx.getStorageSync('currOrder');
    console.log(currentOrder);
    this.setData({
      goods: currentOrder.list,
      order: currentOrder
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