// pages/ucenter/evaluate/evaluate.js
import Toast from '../../../lib/vant-weapp/toast/toast';
var util = require('../../../utils/util.js')
const api = require('../../../config/url.js');
const uploadImage = require('./../../../utils/fileUpload.js');
const maxCountPics = 5;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    rateText: [
      "很差", "差", "一般吧", "满意", "非常满意"
    ],
    productList: [],
    returnEvidencePic: [],
    order: [],
    userId: '',
    selectAppraiseModelVOS: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '评价',
    })
    let userId = wx.getStorageSync('userId')
    if (userId) {
      this.setData({
        userId: userId
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
          res.tempFilePaths.splice(maxCountPics - oldPicCount, oldPicCount + newPicCount - maxCountPics);
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
              if (hasReachMaxCountOfUploadPic) {
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    let data = wx.getStorageSync("currOrder");
    console.log(data)
    let list = []
    let that = this

    util.request(api.OrderDetail, {
      id: data.id,
    }, "POST").then(function(res) {
      if (res.code === 0) {
       that.setData({
         productList:res.orderInfoVO.list
       })
      }
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },
  changeInput: function(e) {
    let index = e.currentTarget.dataset.index;
    let v = e.detail;
    this.setData({
      [`productList[${index}].selectAppraiseModelVOList.comment`]: v
    });
  },
  changeRate: function(e) {
    let index = e.currentTarget.dataset.index;
    let v = e.detail.index;
    let rateTxt = "非常满意";
    if (v == 1) {
      rateTxt = "非常差"
    } else if (v == 2) {
      rateTxt = "差"
    } else if (v == 3) {
      rateTxt = "一般吧"
    } else if (v == 4) {
      rateTxt = "满意"
    }
    this.setData({
      [`productList[${index}].selectAppraiseModelVOList.rate`]: v,
      [`productList[${index}].selectAppraiseModelVOList.rateTxt`]: rateTxt
    });

  },
  post: function(e) {
    let index = e.currentTarget.dataset.index;
    let data = this.data.productList[index].comment;
    let rate = this.data.productList[index].rate;
    let goodsId = this.data.productList[index].id;
    var time = util.formatTime(new Date());
    console.log(time)
    if (!data) {
      Toast("请填写评价")
      return;
    }
    this.setData({
      [`productList[${index}].selectAppraiseModelVOList.commentStatus`]: 1,
      [`productList[${index}].selectAppraiseModelVOList.commentTime`]: time
    });
    util.request(api.AddEvaluate, {
      buyer: this.data.userId,
      content: data,
      starClass: rate,
      goodsId: goodsId,
      orderId: this.data.order.id,
      url: []
    }, "POST").then(function(res) {
      if (res.code === 0) {
        console.log(res)
      }
    });
    Toast("评论成功");
  }
})