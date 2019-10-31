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
    this.getIndexData();
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
    });
    util.request(api.IndexUrlFreight, "GET").then(function (res) {
      if (res.code === 0) {
        wx.setStorageSync('freight', res.map.yunfei)
        wx.setStorageSync('shipping', res.map.baoyou)
      }
    })
  },
  handleClick:function(e){
    let data = e.currentTarget.dataset.value;
    if (data.type&&data.name){
      wx.navigateTo({
        url: '/pages/secondIndex/secondIndex?type=' + data.type + '&&name=' + data.name,
      })
    }
  },
  gotoProduct:function(e){
    let data = e.currentTarget.dataset.value;
    if (data.id){
      wx.navigateTo({
        url: '/pages/product/product?id=' + data.id,
      })
    }
  }
})