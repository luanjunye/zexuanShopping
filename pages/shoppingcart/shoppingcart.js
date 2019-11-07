// pages/shoppingcart/ShoppingCart.js
const api = require('/../../config/url.js');
const util = require('/../../utils/util.js');
Page({
  // 购物车
  /**
   * 页面的初始数据
   */
  data: {
    userId: 0,
    isLogin: false,
    noChecked: false,
    checkedAll: false,
    isExpressFree: false,
    totalPrice: 0,
    totalCount: 0,
    freightPrice: 0,
    cartList: [],
    ids: [],
    shipping:0,
    freight:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

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
    let that = this;
    var data = new Object();
    let isLogin = wx.getStorageSync('isLogin');
    let userId = wx.getStorageSync('userId');
    let freight = wx.getStorageSync('freight');
    let shipping = wx.getStorageSync('shipping');
    // 页面显示
    if (isLogin && userId) {
      this.setData({
        isLogin: isLogin,
        userId: userId
      });
    }
    if (freight && shipping){
      this.setData({
        freight: freight,
        shipping: shipping
      });
    }
    // 读取购物车缓存数据
    let cartList = wx.getStorageSync("cartList");
    // 模拟数据
    if (!cartList) {
      util.request(api.CartPage, {
        userId: userId
      }, "GET").then(function(res) {
        if (res.code === 0) {
          console.log(res.data.list)
          data.cartList = res.data.list
          that.setData(data)
          wx.setStorageSync("cartList", cartList);
          that.setCheckedTotalPrice();
          that.setCheckedTotalCount();
          that.judgeCheckedAll();
        }
      });
    } else {
      // that.setData({
      //   cartList: cartList
      // })
      util.request(api.CartPage, {
        userId: userId
      }, "GET").then(function(res) {
        if (res.code === 0) {
          data.cartList = res.data.list
          that.setData(data)
          wx.setStorageSync("cartList", cartList);
          that.setCheckedTotalPrice();
          that.setCheckedTotalCount();
          that.judgeCheckedAll();
        }
      });
      that.setCheckedTotalPrice();
      that.setCheckedTotalCount();
      that.judgeCheckedAll();
    }
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

  // 产品选中
  changeCheck: function(e) {
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`cartList[${index}].checked`]: e.detail
    })
    this.setCheckedTotalPrice();
    this.setCheckedTotalCount();
    this.judgeCheckedAll();
  },
  //产品的购买数量
  changeCount: function(e) {
    let v = e.detail.value;
    let that = this
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`cartList[${index}].count`]: v
    })
    util.request(api.CartUpdate, {
      userId: this.data.userId,
      number: v,
      id: that.data.cartList[index].id
    }, "POST").then(function (res) {
      if (res.code === 0) {
        console.log(res)
      }
    });
    this.setCheckedTotalPrice();
    this.setCheckedTotalCount();
  },
  //选中的产品总价
  setCheckedTotalPrice: function() {
    let totalPrice = 0;
    this.data.cartList.forEach(function(v) {
      if (v.checked) {
        totalPrice += v.price * v.count
      }
    })
    this.setData({
      totalPrice: Number(totalPrice.toFixed(1))
    })
    this.judgeExpressFree();
  },
  //是否包邮
  judgeExpressFree: function() {
    if (this.data.totalPrice >= this.data.shipping) {
      this.setData({
        isExpressFree: true,
        freightPrice: 0
      })
    } else {
      let rest = this.data.shipping - this.data.totalPrice;
      this.setData({
        isExpressFree: false,
        restExpressFree: Number(rest.toFixed(1)),
        freightPrice: this.data.freight
      })
    }
  },
  judgeCheckedAll: function() {
    let noChecked = true;
    this.data.cartList.forEach(function(v) {
      if (v.checked) {
        noChecked = false;
        return;
      }
    })
    let checkedAll = true;
    this.data.cartList.forEach(function(v) {
      if (!v.checked) {
        checkedAll = false;
        return;
      }
    })
    this.setData({
      noChecked: noChecked,
      checkedAll: checkedAll
    })
  },

  //底部统计全选事件
  changeCheckedAll: function(e) {
    this.setData({
      checkedAll: e.detail
    });

    for (let i = 0; i < this.data.cartList.length; i++) {
      this.setData({
        [`cartList[${i}].checked`]: e.detail
      })
    }
    this.setCheckedTotalPrice();
    this.setCheckedTotalCount();
    this.judgeCheckedAll();
  },
  //选中的产品数量
  setCheckedTotalCount: function() {
    let totalCount = 0
    this.data.cartList.forEach(function(v) {
      if (v.checked) {
        totalCount += v.count
      }
    })
    this.setData({
      totalCount: totalCount
    })
  },
  //删除
  deleteProduct: function(e) {
    let id = e.currentTarget.dataset.value.id;
    let data = [];
    let ids = [];
    this.data.cartList.forEach(function(v) {
      if (id != v.id) {
        data.push(v);
      }
    })
    this.setData({
      cartList: data,
      ids: id
    })
    util.request(api.CartDelete, {
      id: this.data.ids
    }, "POST").then(function(res) {
      if (res.code === 0) {
        console.log(res)

      }
    });
    this.setCheckedTotalPrice();
    this.setCheckedTotalCount();
    this.judgeCheckedAll();
    this.updateHistory();
  },
  //改变后的列表
  updateHistory: function(e) {
    wx.setStorageSync("cartList", this.data.cartList);
  },
  
  //底部统计栏下单事件
  checkout: function() {
    if (this.data.noChecked) {
      return;
    }
    // 购物车数据存入缓存
    wx.setStorageSync("cartList", this.data.cartList);
    wx.setStorageSync("totalPrice", this.data.totalPrice);
    wx.setStorageSync("isExpressFree", this.data.isExpressFree)
    wx.navigateTo({
      url: '/pages/order/settlement/settlement'
    });
  },
  //商品详情页
  toProduct: function(e) {
    wx.navigateTo({
      url: '/pages/product/product?id=' + e.currentTarget.dataset.value.goodsId
    })
  }
})