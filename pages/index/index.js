const util = require('../../utils/util.js');
const api = require('../../config/url.js');
//const user = require('../../services/user.js');
//index.js
//获取应用实例
const app = getApp()

Page({
  // 主页
  data: {

    banner: [],
    categoryIndex: [],
    details: []
  },
  onLoad: function(options) {
    this.getIndexData();
  },
  onshow: function(options) {

  },
  getIndexData: function() {
    let that = this;
    var data = new Object();
    util.request(api.IndexUrlBanner, "GET").then(function(res) {
      if (res.code === 0) {
        data.banner = res.banner
        that.setData(data);
      }
    });
    util.request(api.IndexUrlQuick, "GET").then(function(res) {
      if (res.code === 0) {
        data.categoryIndex = res.category
        that.setData(data);
      }
    });
    util.request(api.IndexUrlOrder, "GET").then(function(res) {
      if (res.code === 0) {
        data.details = res.goodsIndexVOList
        that.setData(data);
      }
    })
  }
})