// pages/ordercenter/ordercenter.
import Dialog from './../../../lib/vant-weapp/dialog/dialog';

const util = require('./../../../utils/util.js');
const api = require('./../../../config/url.js');

Page({
  // 订单中心
  data: {
    active: 0, // shippingStatus : 0 全部 1 待付款 2 待发货 3 已发货 4 待评价 5 退款售后
    loading: false,
    orderList: [],
    order: [],
    shippingStatus: 0
  },


  /* 订单状态 status
  0 订单创建成功等待付款，
  1xx 表示订单取消和删除等状态   101订单已取消，         102订单已删除
  2xx 表示订单支付状态         201订单已付款，等待发货
  3xx 表示订单物流相关状态      300订单已发货，         301用户确认收货
  4xx 表示订单退换货相关的状态   401 没有发货，退款      402 已收货，退款退货
  */

  onLoad: function(options) {
    // this.requestData()
  },

// 网络请求数据
  requestData(){
    let userId = getApp().getUserId();
    let that = this;
    util.request(api.OrderList, {
      userId: userId,
      shippingStatus: 0 // 订单发货状态
    }, "GET").then(function (res) {
      if (res.code === 0) {
        let tempOrder = [];
        if (res.data.list.length > 0) {
          res.data.list.forEach(item => {

            // 产品列表
            let goodList = [];
            item.list.forEach((good, index) => {
              goodList.push({
                id: index,
                picUrl: good.url,
                title: good.name,
                specDesc: good.type,
                count: good.num,
                price: good.money,
              })
            });
            // console.log('orderGoodList', goodList);
            // console.log(item.status, item.shippingStatus); // 订单状态
            tempOrder.push({
              id: item.id,
              shopType: item.shopType,
              shopName: item.shopName,
              status: item.status,
              statusName: item.statusName,
              productList: goodList,
              totalPrice: item.money,
              shippingStatus: item.shippingStatus
              // payType: '微信',
              // actualPrice: 88.00,
              // expressPrice: 0.00,
              // createTime: '2019-08-18 18:35',
              // orderSn: '20180320',
              // freight: 5.00,
            })
          })
        }
        that.setData({
          order: tempOrder
        });
        that.loadData(that.data.shippingStatus) // 筛选并显示数据需要在网络请求之后，不可在页面载入时直接调用
      }
    });
  },


  // 载入筛选状态后的订单数据
  loadData: function(type) {
    this.setData({
      loading: true
    })
    let data = this.data.order.filter(item => {
      if (type === 0) { // 输入 0 时显示所有的订单
        return true
      } else {
        return item.shippingStatus === type
      }
    });
    // console.log('筛选后的数据', data);
    this.setData({
      orderList: data,
      loading: false
    })
  },


  // 状态标签切换
  changeTab: function(e) {
    console.log(e);
    let type = e.detail.index;
    this.setData({
      shippingStatus: type
    });
    console.log(typeof type);
    this.loadData(type)
  },


  scrollListen: function(e) {
    console.log("滑到底部啦 该加载下一页数据啦")
  },
  cancelOrder: function(e) {
    Dialog.confirm({
      message: '是否取消此订单？'
    }).then(() => {
      // on confirm
      let index = e.currentTarget.dataset.index;
      this.setData({
        [`orderList[${index}].orderStatus`]: 0
      })
      for (let i = 0; i < this.data.orderList[index].productList.length; i++) {
        this.setData({
          [`orderList[${index}].productList[${i}].status`]: 0
        })
      }
    }).catch(() => {
      // on cancel
    });
  },


  // 删除订单
  toDelete: function(e) {
    Dialog.confirm({
      message: '是否删除此订单？'
    }).then(() => {
      // on confirm
      let id = e.currentTarget.dataset.value.id;
      let currentOrder = e.currentTarget.dataset.value;

      util.request(api.OrderRemove, {
        id: currentOrder.id,
      }, "POST").then(function(res) {
        if (res.code === 0) {
          wx.showToast({
            title: '删除成功',
          })
        } else {
          wx.showToast({
            title: '删除失败',
          })
        }
      });

      // 更新处理当前页面数据
      let tempOrderList = [];
      let tempOrder = [];
      this.data.orderList.forEach(function(v) {
        if (id != v.id) {
          tempOrderList.push(v);
        }
      });
      this.data.order.forEach(function(v) {
        if (id != v.id) {
          tempOrders.push(v);
        }
      })
      this.setData({
        orderList: tempOrderList,
        order: tempOrder
      })

    }).catch(() => {
      // on cancel
    });
  },


  // 确认收货
  confirmReceive: function(e) {
    Dialog.confirm({
      message: '确认收货后钱款会支付给商家'
    }).then(() => {
      // on confirm
      let index = e.currentTarget.dataset.index;
      let currentOrder = e.currentTarget.dataset.value;
      console.log(index)

      util.request(api.OrderConfirm, {
        id: currentOrder.id,
      }, "POST").then(function(res) {
        if (res.code === 0) {
          wx.showToast({
            title: '确认收货成功',
          })
        } else {
          wx.showToast({
            title: '确认收货失败',
          })
        }
      });

      // 更新处理当前页面数据
      let tempOrder = [];
      this.data.order.forEach(function(v) {
        if (id == v.id) {
          v.shippingStatus = 4;
        }
        tempOrder.push(v)
      })
      this.setData({
        order: tempOrder,
        [`orderList[${index}].shippingStatus`]: 4,
      })

    }).catch(() => {
      // on cancel
    });
  },


  // 去支付
  toPay: function(e) {
    let actualPrice = e.currentTarget.dataset.value.actualPrice;
    wx.showModal({
      title: '提示',
      content: '此处需调用微信支付接口',
      showCancel: false,
      confirmColor: '#b4282d',
      success: function(res) {
        if (res.confirm) {
          wx.redirectTo({
            url: '/pages/pay-result/pay-result?status=1&actualPrice=' + actualPrice,
          })
        }
      }
    })
  },

  // 订单详情
  toOrderDetail: function(v) {
    let data = v.currentTarget.dataset.value;
    wx.setStorageSync("currOrder", data);
    console.log(data);
    wx.navigateTo({
      url: '/pages/orderInfo/orderInfo'
    })
  },

  // 跳转 评价页面
  toComment: function(v) {
    let data = v.currentTarget.dataset.value;
    wx.setStorageSync("currOrder", data);
    wx.navigateTo({
      url: '/pages/ucenter/to-comment/to-comment'
    })
  },

  // 跳转 物流页
  toExpress: function(v) {
    wx.navigateTo({
      url: '/pages/ucenter/express/express'
    })
  },


  toPayAgain: function(e) {
    let index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/pages/product/product?id=' + this.data.order[index].productList[0].id
    })
  },

  // LIFECYCLE METHODS
  onReady: function() {},
  onShow: function() {
    this.requestData();
  },
  onHide: function() {},
  onUnload: function() {
  },
  onPullDownRefresh: function() {
    this.requestData();
  },
  onReachBottom: function() {},
  onShareAppMessage: function() {},
});
