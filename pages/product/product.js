// pages/commodity/commodity.js
let WxParse = require("../../lib/wxParse/wxParse.js");
import Toast from '../../lib/vant-weapp/toast/toast';
const api = require('/../../config/url.js');
const util = require('/../../utils/util.js');
Page({
// 商品详情
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    serviceShow: false,
    cartList: [],
    deliveryAddress: {
      address: "北京市东城区东华门街道",
      time: "18:00",
      day: "",
    },
    product:{},
    specificationList:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    let isLogin = wx.getStorageSync('isLogin')
    let that = this
    var data = new Object();
    if(isLogin){
      this.setData({
        isLogin: isLogin
      })
    }
    util.request(api.CommodityDetails,{id:1}, "POST").then(function (res) {
      if (res.code === 0) {
        data.product = res.product
        that.setData(data)
        console.log(res)
      }
    });

    util.request(api.SpecificationsDetails, { id: 1 }, "POST").then(function (res) {
      if (res.code === 0) {
        data.specificationList = res.specificationList
        that.setData(data)
        console.log(res)
      }
    });
   
    // 初始化配送时间
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate() + 3;
    this.setData({
      'deliveryAddress.day': month + '月' + day + '日'
    })
    // 读取购物车
    let cartList = wx.getStorageSync("cartList");
    if (cartList) {
      this.setData({
        cartList: cartList
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (e) {
    // 加载商品详情数据
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  openIndexPage: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  openAddress: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        if (!res.address) {
          return;
        }
        that.setData({
          'deliveryAddress.address': res.address
        })
      },
    })
  },
  openService: function () {
    this.setData({
      serviceShow: true
    })
  },
  closeService: function () {
    this.setData({
      serviceShow: false
    })
  },
  showSku: function (e) {
    this.setData({
      'sku.show': true
    })
  },
  closeSku: function (e) {
    this.setData({
      'sku.show': false
    })
  },
  toComment: function () {
    wx.navigateTo({
      url: '/pages/comment/comment?productId=' + this.data.product.id,
    })
  },
  buyNow: function(){
    
  },
  openCartPage: function(){
    wx.switchTab({
      url: '/pages/shoppingcart/shoppingcart',
    })
  },
  addToCart:function(){
      let cartList = this.data.cartList;
      cartList.push({
        id:this.data.product.id,
        label: this.data.product.label,
        checked: true,
        picUrl: this.data.product.goodsViewVOList[0].url,
        title: this.data.product.tiltle,
        spec: this.data.specificationList.name,
        originPrice: this.data.product.originalPrice,
        count: 1,
        maxNum: 99,
        price: this.data.product.price
      });
    wx.setStorageSync("cartList", cartList)
      this.setData({
        cartList: cartList
      });
      Toast("加入购物车成功")
  },
  checkLogin: function () {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/auth/tologin/tologin',
      })
    }
  },
})