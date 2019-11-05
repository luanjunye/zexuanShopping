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

    modalShow: false,
    serviceQrUrl: '',

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

  // 跳转物流信息页面
  goToShippingInfoPage() {
    console.log(this.data.order);
    wx.navigateTo({
      url: '/pages/ucenter/express/express?expressno=' + this.data.order.shippingNo,
    })
  },

  // 跳转到退货详情页
  goToRefundDetail() {
    wx.navigateTo({
      url: '/pages/order/orderRefundExpress/orderRefundExpress',
    })
  },



  // 客服微信二维码
  showModal() {
    let that = this;
    util.request(api.Service, {
    }, "GET").then(res => {
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

  previewQr(){
    wx.previewImage({
      urls: [this.data.serviceQrUrl],
    })
  },



  // 请求订单数据
  loadData() {
    let currentOrder = wx.getStorageSync('currOrder');
    let that = this;
    util.request(api.OrderDetail, {
      id: currentOrder.id
    }, "POST").then(res => {
      if (res.code === 0) {
        let tempOrder = res.orderInfoVO;
        // TODO: 修正时间在 safari 上的转换错误

        let timeCreate = tempOrder.createTime;
        let timeShipping = tempOrder.deliveryTime;
        let timePayed = tempOrder.payTime;

        tempOrder.id = currentOrder.id;

        // 保存订单信息
        wx.setStorageSync("currOrder", tempOrder);

        that.setData({
          timeCreate: timeCreate,
          timePayed: timePayed,
          timeShipping: timeShipping,
          order: tempOrder
        });

        console.log('[退款]按钮是否显示：', !tempOrder.returnStatus && tempOrder.shoppingStatus !== 1 && tempOrder.shoppingStatus !== 3)

        console.log('currentOrder: ', tempOrder);
      }
      wx.stopPullDownRefresh(); // 恢复下拉刷新
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
    }, "POST").then(function(res) {
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
            setTimeout(function() {
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
  },
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {
    this.loadData()
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});