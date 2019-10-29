// pages/orderInfo/orderInfo.js

const util = require('./../../../utils/util.js');
const api = require('./../../../config/url.js');

Page({
  data: {
    order: Object,
    timeCreate: String,
    timePayed: String,
    timeShipping: String,
    expressInfo: Object,
    lastExpressInfo: Object,

    // refund related
    // packageListArray: ['-- 请选择 --', '顺丰', '韵达', '中通', '中通'],
    returnPackageId: String,
    // returnPackageCompany: 0,
  },

  // 获取快递信息
  getPackageInfo(packageId) {
    let that = this;
    util.request(api.OrderPackage, {
      shippingNo: packageId
    }, "GET").then(res => {
      if (res.code === 0) {
        let info = JSON.parse(res.courierInfo);
        console.log(info);
        let lastInfo = info.list.length > 0 ? info.list[info.list.length - 1] : null;
        that.setData({
          expressInfo: info,
          lastExpressInfo: lastInfo
        })
      }
    })
  },

  // 跳转物流信息页面
  goToShippingInfoPage() {
    console.log(this.data.order);
    wx.navigateTo({
      url: '/pages/ucenter/express/express?expressno=' + this.data.order.expressNo,
    })
  },

  // 跳转到退货详情页
  goToRefundDetail(){
    wx.navigateTo({
      url: '/pages/order/orderRefundExpress/orderRefundExpress',
    })
  },



  // 请求订单数据
  loadData() {
    let currentOrder = wx.getStorageSync('currOrder');
    let that = this;
    util.request(api.OrderDetail, {
      id: currentOrder.id
    }, "POST").then(res => {
      console.log(typeof res.code);
      if (res.code === 0) {
        let tempOrder = res.orderInfoVO;
        // TODO: 修正时间在 safari 上的转换错误
        
        let timeCreate = util.formatTime(new Date(tempOrder.createTime.slice(0, 19)));
        let timeShipping = tempOrder.deliveryTime? util.formatTime(new Date(tempOrder.deliveryTime.slice(0, 19))): '';
        let timePayed = tempOrder.payTime? util.formatTime(new Date(tempOrder.payTime.slice(0, 19))): '';

        tempOrder.id = currentOrder.id;

        // 保存订单信息
        wx.setStorageSync("currOrder", tempOrder);

        that.setData({
          timeCreate: timeCreate,
          timePayed: timePayed,
          timeShipping: timeShipping,
          order: tempOrder
        });

        console.log('currentOrder: ', tempOrder);

        // 获取快递信息
        // that.getPackageInfo(tempOrder.shippingNo)

        /*
        let data = {
          "userName": "邴新科",
          "mobile": null,
          "address": "山东省济南市",
          "street": "高新万达",
          "shopName": "屈蜂堂官方商城",
          "label": "自营",
          "list": [{
              "name": "安守本分卡号",
              "type": "",
              "money": 200,
              "num": 20,
              "url": "https://resource.smartisan.com/resource/fda5c3e61a71c0f883bbd6c76516cd85.png"
            },
            {
              "name": null,
              "type": "",
              "money": 20,
              "num": 20,
              "url": null
            }
          ],
          "remark": "",
          "payMoney": 5000,
          "actualPrice": 5000,
          "freight": 0,
          "orderNum": "2019101909340001",
          "createTime": "2019-10-19T01:37:47.000+0000",
          "payTime": "2019-10-21T08:07:42.000+0000",
          "deliveryTime": "2019-10-21T08:07:44.000+0000",
          "shippingNo": "9830000829665"
        }
        */
      }
    })
  },

  // 显示 快递修改面板
  showPackagePanel(e) {
    this.setData({
      packagePanelShowed: true
    })
  },

  // 处理 input,picker 数据双向绑定
  handleModalChange: function(e) {
    let name = e.currentTarget.dataset.modal;
    let value = e.detail.value;
    let dataMap = {};
    dataMap[name] = value;
    this.setData(dataMap);
    // console.log(name, ':', this.data[name]) // 显示 page 内 data 的实际数据
  },

  // 填写退货信息 确定时
  confirmPackageInfo: function(e) {
    let that = this;
    if (!this.data.returnPackageId) {
      wx.showToast({
        icon: 'none',
        title: '请填写快递单号'
      })
    } else {
      this.packagePanelHide();
      util.request(api.OrderRefundExpressNo, {
        id: that.data.order.id,
        expressNo: that.data.returnPackageId
      }, "POST").then(res => {
        if (res.code === 0) {
          wx.showToast({
            title: '添加成功',
          })
          // 1.5s 后刷新页面
          setTimeout(function() {
            that.loadData();
          }, 1500)
        }
      })
      // 执行确定
    }
  },

  // 退货信息面板操作方法
  packagePanelHide: function() {
    this.setData({
      packagePanelShowed: false
    })
  },
  packagePanelShow: function() {
    this.setData({
      packagePanelShowed: true
    })
  },

  // 去支付
  toPay(e) {

    let that = this;
    let actualPrice = this.data.order.actualPrice; // 实际价格
    let currentOrder = this.data.order; // 当前订单

    util.request(api.Pay, {
      id: currentOrder.id,
    }, "POST").then(function (res) {
      console.log(res);
      if (res.success) {
        let entity = res.entity;
        wx.requestPayment({
          timeStamp: entity.timeStamp,
          nonceStr: entity.nonceStr,
          package: entity.package,
          signType: 'MD5',
          paySign: entity.sign,
          success(res) {
            wx.showToast({
              title: '支付成功',
            });
            setTimeout(function () {
              that.requestData();
            }, 1500);
          },
          fail(res) {
            console.log('fail: ', res)
          }
        })
      }
    })
  },

  // 跳转到
  toReturnPage() {
    // 既然已经到订单详情页了，该订单就已经保存到 storage 中了，不需要再存一次了
    wx.navigateTo({
      url: "/pages/order/orderRefund/orderRefund",
    })
  },

  onLoad: function() {},
  onReady: function() {},
  onShow: function() {
    // 载入订单信息
    let currentOrder = wx.getStorageSync('currOrder');
    this.setData({
      order: currentOrder
    });
    console.log(currentOrder);

    this.loadData();
    this.loadData();
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    this.loadData()
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});