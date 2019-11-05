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
    product: {},
    specificationList: {},
    userId: "",
    id: "",
    count: 0,
    modalShow: false,
    serviceQrUrl: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    let isLogin = wx.getStorageSync('isLogin')
    let userId = wx.getStorageSync('userId')
    let id = options.id
    if (id) {
      this.setData({
        id: id
      })
    }
    let that = this
    var data = new Object();
    if (isLogin && userId) {
      this.setData({
        isLogin: isLogin,
        userId: userId
      })
    }
    util.request(api.CommodityDetails, {
      id: this.data.id
    }, "POST").then(function(res) {
      if (res.code === 0) {
        data.product = res.product
        that.setData(data)
        console.log(res.product.comment.goodComment)
      }
    });

    util.request(api.SpecificationsDetails, {
      id: this.data.id
    }, "POST").then(function(res) {
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

    // util.request(api.ProductInCart, {
    //   userId: this.data.userId,
    //   goodsId: this.data.id
    // }, "POST").then(function (res) {
    //   if (res.code === 0) {
    //     data.count = res.count
    //     that.setData(data)
    //   }
    // });
    // 读取购物车
    // let cartList = wx.getStorageSync("cartList");
    // console.log(cartList)
    // if (cartList) {
    //   this.setData({
    //     cartList: cartList
    //   })
    // }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    // 加载商品详情数据
    /**
     * WxParse.wxParse(bindName , type, data, target,imagePadding)
     * 1.bindName绑定的数据名(必填)
     * 2.type可以为html或者md(必填)
     * 3.data为传入的具体数据(必填)
     * 4.target为Page对象,一般为this(必填)
     * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
     */
    let isLogin = wx.getStorageSync('isLogin')
    let userId = wx.getStorageSync('userId')
    console.log(userId)
    if (isLogin && userId) {
      this.setData({
        isLogin: isLogin,
        userId: userId
      })
    }
    this.selectCart()
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
  openIndexPage: function() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  openAddress: function() {
    let that = this;
    wx.chooseLocation({
      success: function(res) {
        if (!res.address) {
          return;
        }
        that.setData({
          'deliveryAddress.address': res.address
        })
      },
    })
  },
  openService: function() {
    this.setData({
      serviceShow: true
    })
  },
  closeService: function() {
    this.setData({
      serviceShow: false
    })
  },
  showSku: function(e) {
    this.setData({
      'sku.show': true
    })
  },
  closeSku: function(e) {
    this.setData({
      'sku.show': false
    })
  },
  toComment: function() {
    wx.navigateTo({
      url: '/pages/comment/comment?productId=' + this.data.product.id,
    })
  },
  buyNow: function() {
    if (this.checkLogin()) {
      // 跳转checkout页面
      wx.setStorageSync("checkoutProduct", this.data.product);
      wx.setStorageSync("specification", this.data.specificationList);
      wx.setStorageSync("count", 1);
      wx.navigateTo({
        url: '/pages/order/settlement/settlement?from=product',
      })
    }
  },
  openCartPage: function() {
    wx.switchTab({
      url: '/pages/shoppingcart/shoppingcart',
    })
  },
  addToCart: function() {
    let that = this
    if (this.checkLogin()) {
      let cartList = this.data.cartList;
      cartList.push({
        id: this.data.product.id,
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
      util.request(api.CartSave, {
        goodsId: this.data.id,
        userId: this.data.userId,
        number: 1
      }, "POST").then(function(res) {
        if (res.code === 0) {
          console.log(res)
          that.selectCart()
        }
      });
      wx.setStorageSync("cartList", cartList)
      this.setData({
        cartList: cartList
      });

      Toast("加入购物车成功")
    }
  },
  checkLogin: function() {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/auth/tologin/tologin',
      })
    } else {
      return true
    }
  },

  // 客服微信二维码
  showModal() {
    let that = this;
    util.request(api.Service, {}, "GET").then(res => {
      console.log(res);
      that.setData({
        serviceQrUrl: res.data,
        modalShow: true
      })
    })
  },

  hideModal() {
    this.setData({
      modalShow: false
    })
  },

  customerService: function() {
    this.showModal()
  },

  selectCart: function() {
    let that = this
    var data = new Object();
    util.request(api.ProductInCart, {
      userId: this.data.userId,
    }, "POST").then(function(res) {
      if (res.code === 0) {
        data.count = res.count
        that.setData(data)
      }
    });
  }
})