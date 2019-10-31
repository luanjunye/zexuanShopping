// pages/ucenter/invoice/invoice.js
const api = require('/../../../config/url.js');
const util = require('/../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: '个人',
    type: [{
      id: 1,
      name: '个人'
    }, {
      id: 2,
      name: '企业'
    }],
    position: 'left',
    currentId: 1,
    form: {
      name: "",
      dutyParagraph: "",
      email: "",
    },
    order: Object,
    productList: [],
    userId: ""
  },

  handleTypeChange({
    detail = {}
  }) {
    if (detail.value === '个人') {
      this.setData({
        current: detail.value,
        currentId: 1
      });
    } else {
      this.setData({
        current: detail.value,
        currentId: 2
      });
    }
  },


  // 验证输入
  verifyInput: function() {
    let name = this.data.form.name;
    let mail = this.data.form.email;
    let dutyParagraph = this.data.form.dutyParagraph;

    let mailReg = new RegExp('w*@\w*\.(\w*|\w*\.\w*)','g');
    if (name.trim().length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请填写抬头名称',
      })
    } else if (dutyParagraph.trim().length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请填写纳税人识别号',
      })
    } else if (!mailReg.test(mail)) {
      wx.showToast({
        icon: 'none',
        title: '请输入正确的邮箱地址',
      })
    } else {
      return true;
    }
  },

  onChangeName: function(e) {
    this.setData({
      'form.name': e.detail.value
    })
  },
  onChangeNumber: function(e) {
    this.setData({
      'form.dutyParagraph': e.detail.value
    })
  },
  onChangeEmail: function(e) {
    this.setData({
      'form.email': e.detail.value
    })
  },

  // 提交
  btn_submit: function() {
    let that = this;
    if (this.data.currentId === 1) {
      util.request(api.ApplicationInvoice, {
        userId: this.data.userId,
        revenueNum: "",
        invoiceTitle: that.data.form.name,
        status: this.data.currentId,
        email: that.data.form.email,
        goodsId: this.data.productList,
        orderId: this.data.order.id
      }, "POST").then(function(res) {
        if (res.code === 0) {
          console.log(res)
        }
      });
    } else {
      util.request(api.ApplicationInvoice, {
        userId: this.data.userId,
        revenueNum: that.data.form.dutyParagraph,
        invoiceTitle: that.data.form.name,
        status: this.data.currentId,
        email: that.data.form.email,
        goodsId: this.data.productList,
        orderId: this.data.order.id

      }, "POST").then(function(res) {
        if (res.code === 0) {
          console.log(res)

        }
      });
    }
    wx.showToast({
      title: '提交成功',
    })
    wx.switchTab({
      url: 'pages/index/index',
    })
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let currentOrder = wx.getStorageSync('currOrder');
    if (currentOrder) {
      let productList = [];
      currentOrder.productList.forEach(item => {
        productList.push(item.id)
      })
      this.setData({
        order: currentOrder,
        productList: productList
      });
      console.log(typeof this.data.productList)
      console.log(this.data.productList)
    }

    console.log(currentOrder)
    // let that = this;
    // var data = new Object();
    let userId = wx.getStorageSync('userId')
    if (userId) {
      this.setData({
        userId: userId
      })
    }
    // if (userId) {
    //   util.request(api.InvoiceList, {
    //     userId: userId
    //   }, "GET").then(function (res) {
    //     if (res.code === 0) {
    //       console.log(res)
    //       data.commentList = res.commentList
    //       that.setData(data)
    //     }
    //   });
    // }
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
    console.log(this.data.order)
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
})