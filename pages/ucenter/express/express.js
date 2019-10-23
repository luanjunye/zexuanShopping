// pages/ucenter/express/express.js

const util = require('./../../../utils/util.js');
const api = require('./../../../config/url.js');

Page({
  //物流信息
  /**
   * 页面的初始数据
   */
  data: {
    order:Object,
    expressInfo: Object,
    expressCompany: String,
  },

  // 获取快递信息
  getPackageInfo(packageId) {
    let that = this;
    util.request(api.OrderPackage, {
      shippingNo: packageId
    }, "GET").then(res => {
      if (res.code === 0){
        let info = JSON.parse(res.courierInfo);
        let tempArray = [];
        if (info.list.length > 0){
          info.list.forEach(item => {
            tempArray.push({
              text: item.content,
              desc: item.time
            })
          })
        }
        that.setData({
          expressCompany: info.cname,
          expressInfo: tempArray,
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '物流信息',
    });

    // 载入订单信息
    let currentOrder = wx.getStorageSync('currOrder');
    this.setData({
      order: currentOrder
    });

    // 请求快递物流信息
    if (currentOrder.expressNo){
      this.getPackageInfo(currentOrder.expressNo)
    } else if (currentOrder.shippingNo) {
      this.getPackageInfo(currentOrder.shippingNo)
    } else {
      wx.showToast({
        icon: 'none',
        title: '暂无物流信息',
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
  onShow: function () {

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

  }
})
