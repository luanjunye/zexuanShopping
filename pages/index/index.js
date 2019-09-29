const util = require('../../utils/util.js');
const api = require('../../config/url.js');
//const user = require('../../services/user.js');
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    // // 头部导航栏的高度
    // statusBarHeight: app.globalData.statusBarHeight,
    banner: [],
    categoryIndex: []
  },
  onLoad: function(options) {
    this.getIndexData();
  },
  getIndexData: function() {
    let that = this;
    var data = new Object();
    util.request(api.IndexUrlBanner, "GET").then(function(res) {
      if (res.retCode == 0) {
        data.banner = res.retData.banner
        that.setData(data);
      }
    });
    util.request(api.IndexUrlQuick, "GET").then(function(res) {
      if (res.retCode == 0) {
        data.categoryIndex = res.retData.categoryIndex
        that.setData(data);
      }
    });
  }
})