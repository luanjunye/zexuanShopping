// pages/shoppingcart/ShoppingCart.js
Page({
// 购物车
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    noChecked: false,
    checkedAll: false,
    totalPrice: 0,
    totalCount: 0,
    freightPrice:0,
    cartList: []
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
    let isLogin = wx.getStorageSync('isLogin');
    // 页面显示
    if (isLogin) {
      this.setData({
        isLogin: isLogin
      });
    }
    // 读取购物车缓存数据
    let cartList = wx.getStorageSync("cartList");
    console.log(cartList)
    // 模拟数据
    if (!cartList) {
      let data = [{
          id: 1,
          checked: false,
          picUrl: 'https://resource.smartisan.com/resource/71432ad30288fb860a4389881069b874.png',
          title: '畅呼吸智能空气净化器',
          spec: '标准版 白色',
          count: 1,
          maxNum: 99,
          price: 1399.00,
          originPrice: 1999.00,
          label: "自营"
        },
        {
          id: 2,
          checked: false,
          picUrl: 'https://yanxuan.nosdn.127.net/e9cecc7cb24a8d7745da1c99b87dde08.png',
          title: '丛林系列·缝线笔记本 4本装',
          spec: '丛林系列',
          count: 1,
          maxNum: 99,
          price: 19.00,
          originPrice: 29.00,
          label: "自营"
        }
      ];
      this.setData({
        cartList: data
      });
      wx.setStorageSync("cartList", cartList);
    } else {
      this.setData({
        cartList: cartList
      })
    }
    this.setCheckedTotalPrice();
    this.setCheckedTotalCount();
    this.judgeCheckedAll();
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
    let index = e.currentTarget.dataset.index;
    this.setData({
      [`cartList[${index}].count`]: v
    })
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
      totalPrice: totalPrice
    })
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
    this.data.cartList.forEach(function(v) {
      if (id != v.id) {
        data.push(v);
      }
    })
    this.setData({
      cartList: data
    })
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
    wx.navigateTo({
      url: '/pages/checkout/checkout'
    });
  },
  //商品详情页
  toProduct: function(e) {
    wx.navigateTo({
      url: '/pages/product/product?id=' + e.currentTarget.dataset.value.id
    })
  }
})