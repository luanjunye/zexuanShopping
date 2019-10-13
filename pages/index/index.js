const util = require('../../utils/util.js');
const api = require('../../config/url.js');
//const user = require('../../services/user.js');
//index.js
//获取应用实例
const app = getApp()

Page({
  // 主页
  data: {
    // // 头部导航栏的高度
    // statusBarHeight: app.globalData.statusBarHeight,
    banner: [],
    categoryIndex: [],
    details: []
  },
  onLoad: function(options) {
    this.getIndexData();
    //console.log(this.details)
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
        data.details = [{
            id: 1,
            label: "自营",
            relateId: 0,
            title: "煲汤材料炖汤清补",
            description: "漂亮得不像实力派",
            price: 59.9,
            number: "365人付款",
            place: "广州",
            free: "包邮",
            type: 0,
            picUrl: "/pages/index/assets/tang.png",
            tag: "满减"
          },
          {
            id: 2,
            label: "自营",
            relateId: 0,
            title: "煲汤材料炖汤清补",
            description: "哑光表面、专业级调音",
            price: 59.9,
            number: "365人付款",
            place: "广州",
            free: "包邮",
            type: 0,
            picUrl: "/pages/index/assets/tang.png"
          },
          {
            id: 3,
            label: "自营",
            relateId: 0,
            title: "煲汤材料炖汤清补",
            description: "TPU 环保材质、完美贴合",
            price: 59.9,
            number: "365人付款",
            place: "广州",
            free: "包邮",
            type: 0,
            picUrl: "/pages/index/assets/tang.png"
          },
          {
            id: 4,
            label: "自营",
            relateId: 0,
            title: "煲汤材料炖汤清补",
            description: "经典配色、专业调音、高品质麦克风",
            price: 59.9,
            number: "365人付款",
            place: "广州",
            free: "包邮",
            type: 0,
            picUrl: "/pages/index/assets/tang.png"
          },
          {
            id: 5,
            label: "自营",
            relateId: 0,
            title: "煲汤材料炖汤清补",
            description: "经典配色、专业调音、高品质麦克风",
            price: 59.9,
            number: "365人付款",
            place: "广州",
            free: "包邮",
            type: 0,
            picUrl: "/pages/index/assets/tang.png"
          },
          {
            id: 6,
            label: "自营",
            relateId: 0,
            title: "煲汤材料炖汤清补",
            description: "经典配色、专业调音、高品质麦克风",
            price: 59.9,
            number: "365人付款",
            place: "广州",
            free: "包邮",
            type: 0,
            picUrl: "/pages/index/assets/tang.png"
          },
          {
            id: 7,
            label: "自营",
            relateId: 0,
            title: "煲汤材料炖汤清补",
            description: "经典配色、专业调音、高品质麦克风",
            price: 59.9,
            number: "365人付款",
            place: "广州",
            free: "包邮",
            type: 0,
            picUrl: "/pages/index/assets/tang.png"
          }
        ]
        that.setData(data);
        console.log(data)
      }
    });
  }
})