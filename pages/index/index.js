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
    categoryIndex: [],
    details: [{
      list: [{
          id: 1,
          relateId: 0,
          title: "坚果 Pro",
          description: "漂亮得不像实力派",
          price: 1299.00,
          type: 0,
          picUrl: "https://resource.smartisan.com/resource/3bd5267edd7257e719e7965b756e2c2e.png",
          tag: "满减"
        },
        {
          id: 2,
          relateId: 0,
          title: "半入耳式耳机 心动版",
          description: "哑光表面、专业级调音",
          price: 99.00,
          type: 0,
          picUrl: "https://resource.smartisan.com/resource/90be7779c2454407ee5f4b6184c929ed.jpg"
        },
        {
          id: 3,
          relateId: 0,
          title: "坚果 Pro 2 软胶保护套",
          description: "TPU 环保材质、完美贴合",
          price: 49.00,
          type: 0,
          picUrl: "https://resource.smartisan.com/resource/ca332140775bb0646f65e516942d3adc.jpg"
        },
        {
          id: 4,
          relateId: 0,
          title: "Smartisan 半入耳式耳机",
          description: "经典配色、专业调音、高品质麦克风",
          price: 59.00,
          type: 0,
          picUrl: "https://resource.smartisan.com/resource/8a875418797690e26b665cc0d86dffc7.jpg"
        }
      ]
    }]
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