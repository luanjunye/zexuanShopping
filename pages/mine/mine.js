// pages/mine/mine.js
const api = require('/../../config/url.js');
const util = require('/../../utils/util.js');
var app = getApp();
Page({
  // 个人中心
  /**
   * 页面的初始数据
   */
  data: {
    background: "",
    userInfo: {},
    isLogin: false,
    images: {},
    // icons: {},
    // otherSecond: {},
    // otherFirst: {},
    other_f: [],
    other_s: [],
    other_t: [],
    status: [],
    modalShow: false,
    serviceQrUrl: '',
    mobileShow: false,
    mobile: ''
  },

  copyWxCode(){
    wx.setClipboardData({
      data: 'KG17766504166',
      success(res) {
        wx.showToast({
          title: '已复制客服微信号',
        })
      }
    })
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

  // iconLoad: function(e) {
  //   var $width = e.detail.width, //获取图片真实宽度
  //     $height = e.detail.height,
  //     //图片的真实宽高比例
  //     ratio = $width / $height;
  //   var viewWidth = 63, //设置图片显示宽度，左右留有16rpx边距
  //     //计算的高度值
  //     viewHeight = 63 / ratio;
  //   var icon = this.data.icons;
  //   //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
  //   icon[e.target.dataset.index] = {
  //     width: viewWidth,
  //     height: viewHeight
  //   }
  //   this.setData({
  //     icons: icon,
  //   })
  // },

  // otherfLoad: function(e) {
  //   var $width = e.detail.width, //获取图片真实宽度
  //     $height = e.detail.height,
  //     //图片的真实宽高比例
  //     ratio = $width / $height;
  //   var viewWidth = 63, //设置图片显示宽度，左右留有16rpx边距
  //     //计算的高度值
  //     viewHeight = 63 / ratio;
  //   var otherf = this.data.other_f;
  //   //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
  //   otherf[e.target.dataset.index] = {
  //     width: viewWidth,
  //     height: viewHeight
  //   }
  //   this.setData({
  //     otherFirst: otherf,
  //   })
  // },

  // othersLoad: function(e) {
  //   var $width = e.detail.width, //获取图片真实宽度
  //     $height = e.detail.height,
  //     //图片的真实宽高比例
  //     ratio = $width / $height;
  //   var viewWidth = 63, //设置图片显示宽度，左右留有16rpx边距
  //     //计算的高度值
  //     viewHeight = 63 / ratio;
  //   var others = this.data.other_s;
  //   //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
  //   others[e.target.dataset.index] = {
  //     width: viewWidth,
  //     height: viewHeight
  //   }
  //   this.setData({
  //     otherSecond: others,
  //   })
  // },

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

  // 联系我们
  showMobile() {
    let that = this;
    util.request(api.IndexUrlMobile, {}, "GET").then(res => {
      console.log(res);
      that.setData({
        mobile: res.mobile,
        mobileShow: true
      })
    })
  },

  hideMobile() {
    this.setData({
      mobileShow: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getInitialization()
  },

  getInitialization: function() {
    let that = this;
    var data = new Object();
    let userId = wx.getStorageSync('userId')

    util.request(api.MineUrlBackground, "GET").then(function(res) {
      if (res.code === 0) {
        data.background = res.data[0].url
        that.setData(data)
      }
    });
    if (userId) {
      util.request(api.MineUrlIconFirst, {
        userId: userId
      }, "GET").then(function(res) {
        if (res.code === 0) {
          data.status = res.status
          that.setData(data)
        }
      });
    } else {
      util.request(api.MineUrlIconFirst, "GET").then(function(res) {
        if (res.code === 0) {
          data.status = res.status
          that.setData(data)
        }
      });
    }

    util.request(api.MineUrlIconSecond, "GET").then(function(res) {
      if (res.code === 0) {
        data.other_f = res.other_f
        that.setData(data)
      }
    });
    util.request(api.MineUrlIconThird, "GET").then(function(res) {
      if (res.code === 0) {
        data.other_s = res.other_s
        that.setData(data)
      }
    });
    util.request(api.MineUrlIconFourth, "GET").then(function(res) {
      if (res.code === 0) {
        data.other_t = res.data
        that.setData(data)
      }
    });

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
    this.getInitialization()
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
  checkLogin: function() {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/auth/tologin/tologin',
      })
    }
  },
  toOrder: function(e) {
    let type = e.currentTarget.id;
    if (type <= 5) {
      this.checkLogin();
      getApp().globalData.type = type;
      wx.switchTab({
        url: '/pages/order/ordercenter/ordercenter',
      })
    } else if (type == 6) {
      this.checkLogin();
      wx.navigateTo({
        url: '/pages/ucenter/address/index/index',
      })
    } else if (type == 9) {
      wx.navigateTo({
        url: '/pages/ucenter/antiCheating/antiCheating',
      })
    } else if (type == 10) {
      this.showModal()
    } else if (type == 11) {
      wx.navigateTo({
        url: '/pages/ucenter/companyProfile/companyProfile',
      })
    } else if (type == 13) {
      this.showMobile()
    } else if (type == 17) {
      wx.navigateTo({
        url: '/pages/ucenter/questions/questions',
      })
    } else {
      wx.showToast({
        title: "功能开发中~",
        icon: "none"
      })
    }
  }
})
