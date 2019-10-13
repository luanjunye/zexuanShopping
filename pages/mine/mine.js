// pages/mine/mine.js
var app = getApp();
Page({
// 个人中心
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    isLogin: false,
    images: {},
    icons: {},
    other_f: {},
    other_s: {},
    status: [{
        "id": 1,
        "url": "/pages/mine/assets/payment.png",
        "webUrl": "",
        "title": "待付款",
        "content": 1,

      },
      {
        "id": 2,
        "url": "/pages/mine/assets/deliver.png",
        "webUrl": "",
        "title": "待发货",
        "content": 0,

      }, {
        "id": 3,
        "url": "/pages/mine/assets/receiving.png",
        "webUrl": "",
        "title": "待收货",
        "content": 0,

      },
      {
        "id": 4,
        "url": "/pages/mine/assets/evaluate.png",
        "webUrl": "",
        "title": "待评价",
        "content": 0,
      },
      {
        "id": 5,
        "url": "/pages/mine/assets/sale.png",
        "webUrl": "",
        "title": "退款售后",
        "content": 0,

      }
    ],
    others_first: [{
        "id": 6,
        "url": "/pages/mine/assets/address.png",
        "webUrl": "",
        "title": "收货地址",
        "content": 1,

      },
      {
        "id": 7,
        "url": "/pages/mine/assets/collection.png",
        "webUrl": "",
        "title": "我的收藏",
        "content": 0,

      }, {
        "id": 8,
        "url": "/pages/mine/assets/mail.png",
        "webUrl": "",
        "title": "我的私信",
        "content": 0,

      },
      {
        "id": 9,
        "url": "/pages/mine/assets/cheat.png",
        "webUrl": "",
        "title": "反作弊",
        "content": 0,
      }
    ],
    others_second: [{
        "id": 10,
        "url": "/pages/mine/assets/customer.png",
        "webUrl": "",
        "title": "官方客服",
        "content": 1,

      },
      {
        "id": 11,
        "url": "/pages/mine/assets/enterprise.png",
        "webUrl": "",
        "title": "公司简介",
        "content": 0,

      }, {
        "id": 12,
        "url": "/pages/mine/assets/group.png",
        "webUrl": "",
        "title": "团购优惠",
        "content": 0,

      },
      {
        "id": 13,
        "url": "/pages/mine/assets/contact.png",
        "webUrl": "",
        "title": "联系我们",
        "content": 0,
      }
    ]
  },

  imageLoad: function(e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      //图片的真实宽高比例
      ratio = $width / $height;
    var viewWidth = 750, //设置图片显示宽度，左右留有16rpx边距
      //计算的高度值
      viewHeight = 750 / ratio;
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image,
    })
  },

  iconLoad: function(e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      //图片的真实宽高比例
      ratio = $width / $height;
    var viewWidth = 63, //设置图片显示宽度，左右留有16rpx边距
      //计算的高度值
      viewHeight = 63 / ratio;
    var icon = this.data.icons;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    icon[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      icons: icon,
    })
  },

  otherfLoad: function(e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      //图片的真实宽高比例
      ratio = $width / $height;
    var viewWidth = 63, //设置图片显示宽度，左右留有16rpx边距
      //计算的高度值
      viewHeight = 63 / ratio;
    var otherf = this.data.other_f;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    otherf[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      other_f: otherf,
    })
  },

  othersLoad: function(e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      //图片的真实宽高比例
      ratio = $width / $height;
    var viewWidth = 63, //设置图片显示宽度，左右留有16rpx边距
      //计算的高度值
      viewHeight = 63 / ratio;
    var others = this.data.other_s;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    others[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      other_s: others,
    })
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
    let userInfo = wx.getStorageSync('userInfo');
    let isLogin = wx.getStorageSync('isLogin');
    // 页面显示
    if (userInfo && isLogin) {
      this.setData({
        userInfo: userInfo,
        isLogin: isLogin
      });
    } else {
      // 未登录信息
      this.setData({
        userInfo: app.globalData.userInfo,
        isLogin: isLogin
      });
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

  toLogin: function() {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/auth/tologin/tologin',
      })
    }
  },
  toOrder: function(e) {
    this.toLogin();
    let type = e.currentTarget.id;
    console.log(type)
    if (type <= 5) {
      getApp().globalData.type = type;
      wx.switchTab({
        url: '/pages/ordercenter/ordercenter',
      })
    } else if (type == 6) {
      wx.navigateTo({
        url: '/pages/ucenter/address/index/index',
      })
    } else {
      wx.showToast({
        title: "功能开发中~",
        icon: "none"
      })
    }
  }
})