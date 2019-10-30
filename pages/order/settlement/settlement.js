// pages/settlement/settlement.js
import Toast from '../../../lib/vant-weapp/toast/toast';
const api = require('/../../../config/url.js');
const util = require('/../../../utils/util.js');
Page({
  // 确认订单
  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    totalPrice: 0,
    expressPrice: 0,
    actualPrice: 0,
    couponCount: 2,
    coupon: {
      id: "",
      title: "",
      discount: 0
    },
    productList: [],
    specification: {},
    count: 0,
    agree: true,
    userId: "",
    remark: "",
    goodsIdCount: [],
    type:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

    // wx.setNavigationBarTitle({
    //   title: '结算',
    // })
    let that = this
    var data = new Object();
    var userId = wx.getStorageSync('userId')
    this.setData({
      userId: userId
    })
    util.request(api.OrderProduct, {
      userId: this.data.userId
    }, "POST").then(function(res) {
      if (res.code === 0) {
        data.address = res.bayInfoVO
        that.setData(data)
      }
    });
    if (options.from == "product") {
      // 直接购买
      let product = wx.getStorageSync("checkoutProduct");
      let specification = wx.getStorageSync("specification");
      let count = wx.getStorageSync("count");
      this.setData({
        productList: [{
          id: product.id,
          checked: true,
          label: product.label,
          picUrl: product.goodsViewVOList[0].url,
          title: product.tiltle,
          spec: specification.name,
          maxNum: product.quota,
          price: product.price,
          count: count
        }],
        count: count,
        totalPrice: product.price * count,
        goodsIdCount: [{
          goodsId: product.id,
          num: count
        }],
        type:2
      })

      // 判断运费
      if (product.price >= 88) {
        this.setData({
          expressPrice: 0
        })
      } else {
        this.setData({
          expressPrice: 0
        })
      }
      // 实际价格总计
      let actualPrice = this.data.totalPrice + this.data.expressPrice
      this.setData({
        actualPrice: actualPrice
      })
    } else {
      // 购物车结算
      let cartList = wx.getStorageSync("cartList");
      let data = [];
      let goodsIdCount = [];
      cartList.forEach(function(v) {
        if (v.checked) {
          data.push(v)
          console.log(v.goodsId)
          goodsIdCount.push({
            "goodsId": v.goodsId,
            "num": v.count,
            "id": v.id
          })
        }
      })
      this.setData({
        productList: data,
        goodsIdCount: goodsIdCount,
        type:1,
        totalPrice: wx.getStorageSync("totalPrice")
      })

      // 判断运费
      if (wx.getStorageSync("isExpressFree") == true) {
        this.setData({
          expressPrice: 0
        })
      } else {
        this.setData({
          expressPrice: 0
        })
      }
      // 实际价格总计
      let actualPrice = this.data.totalPrice + this.data.expressPrice
      this.setData({
        actualPrice: actualPrice
      })
    }
  },

  remark_input: function(e) {
    this.setData({
      'remark': e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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
  changeAgree: function(e) {
    this.setData({
      agree: e.detail
    })
  },
  chooseAddress: function() {
    wx.navigateTo({
      url: '/pages/ucenter/address/index/index?chooseMode=true&addressId=' + this.data.address.id,
    })
  },

  submitOrder: function() {
    let that = this
    // var data = new Object();

    util.request(api.OrderSave, {
      listModels: this.data.goodsIdCount,
      userId: this.data.userId,
      addressId: this.data.address.id,
      remark: that.data.remark,
      freight: that.data.expressPrice,
      type:this.data.type
    }, "POST").then(function(res) {
      if (res.code === 0) {
        let id = res.id
        util.request(api.Pay, {
          id: id,
        }, "POST").then(function (res) {
          console.log(res);
          if (res.success) {
            let entity = res.entity;
            wx.requestPayment({
              timeStamp: entity.timeStamp,
              nonceStr: entity.nonceStr,
              package: entity.package,
              signType: 'MD5',
              paySign: entity.sign,
              success(res) {
                wx.showToast({
                  title: '支付成功',
                });
                setTimeout(function () {
                  wx.switchTab({
                    url: '/pages/order/ordercenter/ordercenter',
                  })
                }, 1500);
              },
              fail(res) {
                console.log('fail: ', res)
              }
            })
          }
        })
      }
    });
  }
})