// pages/ucenter/evaluate/evaluate.js
import Toast from '../../../lib/vant-weapp/toast/toast';
var util = require('../../../utils/util.js');
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



    let data = wx.getStorageSync("currOrder");
    console.log(data)
    let list = []
    let that = this

    util.request(api.OrderDetail, {
      id: data.id,
    }, "POST").then(function (res) {
      if (res.code === 0) {
        res.orderInfoVO.list.forEach(item => {
          list.push({
            goodsId: item.goodsId,
            money: item.money,
            name: item.name,
            num: item.num,
            type: item.type,
            url: item.url,
            selectAppraiseModelVOList: {
              comment: item.selectAppraiseModelVOList.comment ? item.selectAppraiseModelVOList.comment : '',
              commentStatus: item.selectAppraiseModelVOList.commentStatus ? item.selectAppraiseModelVOList.commentStatus : '',
              commentTime: item.selectAppraiseModelVOList.commentTime ? item.selectAppraiseModelVOList.commentTime : '',
              goodsId: item.selectAppraiseModelVOList.goodsId ? item.selectAppraiseModelVOList.goodsId : '',
              picUrl: item.selectAppraiseModelVOList.picUrl ? item.selectAppraiseModelVOList.picUrl : [],
              rate: item.selectAppraiseModelVOList.rate ? item.selectAppraiseModelVOList.rate : 5,
            }
          })
        });

        // that.setData({
        //   productList: res.orderInfoVO.list
        // })

        that.setData({
          productList: list,
          order:data
        })
        console.log(that.data.productList)
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  // 删除当前图片
  removeCurrentPic(e) {
    let productIndex = e.currentTarget.dataset.prodcutindex;
    let index = e.currentTarget.dataset.index; // 商品 Index
    console.log(`current pic: product: ${productIndex} - ${index}`)

    let tmpPicArray = this.data.productList[productIndex].selectAppraiseModelVOList.picUrl;
    tmpPicArray.splice(index, 1);
    this.setData({
      [`productList[${productIndex}].selectAppraiseModelVOList.picUrl`]: tmpPicArray
    })
  },

  // 预览图片
  showCurrentPic(e) {
    let productIndex = e.currentTarget.dataset.prodcutindex;
    let index = e.currentTarget.dataset.index; // 图片 Index
    let that = this;
    wx.previewImage({
      urls: [that.data.productList[productIndex].selectAppraiseModelVOList.picUrl[index]],
    })
  },


  // 图片选择
  imgPickerTaped(e) {
    let that = this;
    let productId = e.currentTarget.dataset.index; // 商品 Index
    wx.chooseImage({
      count: 5,
      compressed: ['compressed'],
      success: function(res) {
        let hasReachMaxCountOfUploadPic = false; // 是否达到最大上传数量，在上传最后提示用

        // 新旧图片数量
        let oldPathArray = that.data.productList[productId].selectAppraiseModelVOList.picUrl;
        oldPathArray = oldPathArray ? oldPathArray : []; // picUrl 为 null 时设为 []
        let oldPicCount = oldPathArray.length;
        let newPicCount = res.tempFilePaths.length;
        console.log('oldPicCount: ', oldPicCount, 'newPicCount: ', newPicCount);

        if (oldPicCount + newPicCount > maxCountPics) {
          hasReachMaxCountOfUploadPic = true
          res.tempFilePaths.splice(maxCountPics - oldPicCount, oldPicCount + newPicCount - maxCountPics);
        }

        console.log(hasReachMaxCountOfUploadPic)

        // 路径参数
        let tempFilePaths = that.data.productList[productId].selectAppraiseModelVOList.picUrl;
        tempFilePaths = tempFilePaths ? tempFilePaths : [];
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
              oldPathArray.push(result);
              that.setData({
                [`productList[${productId}].selectAppraiseModelVOList.picUrl`]: oldPathArray
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
    let data = this.data.productList[index].selectAppraiseModelVOList.comment;
    let rate = this.data.productList[index].selectAppraiseModelVOList.rate;
    let goodsId = this.data.productList[index].goodsId;
    var time = util.formatTime(new Date());
    let that = this;
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
      url: that.data.productList[index].selectAppraiseModelVOList.picUrl
    }, "POST").then(function(res) {
      if (res.code === 0) {
        console.log(res)
      }
    });
    Toast("评论成功");
  }
})
