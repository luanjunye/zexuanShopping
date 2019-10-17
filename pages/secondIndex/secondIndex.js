// pages/secondIndex/secondIndex.js
const util = require('../../utils/util.js');
const api = require('../../config/url.js');

Page({
  //二级分类
  /**
   * 页面的初始数据
   */
  data: {
    categoryId: 0,
    title: "",
    details: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let that = this;
    let name = options.name;
    if (name) {
      wx.setNavigationBarTitle({
        title: name,
      })
    }

    let type = options.type;
    if (type) {
      that.setData({
        categoryId: type
      })
    }
    this.loadData(type)
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
  loadData: function(type) {
    let that = this;
    var data = new Object();
    util.request(api.SecondIndexUrlCommodity, {
      categoryId: type,
      page: 1
    }, "GET").then(function(res) {
      if (res.code === 0) {
        data.details = res.details
        that.setData(data)
      }
    });
  },
  scrollListen: function(e) {
  
  }
})