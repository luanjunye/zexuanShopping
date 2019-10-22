// pages/ucenter/address/index/index.js
const api = require('/../../../../config/url.js');
const util = require('/../../../../utils/util.js');
Page({
  // 地址管理
  /**
   * 页面的初始数据
   */
  data: {
    userId:0,
    chooseMode: false,
    addressList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var data = new Object();
    let that = this;
    let userId = wx.getStorageSync('userId')
    if(userId){
      this.setData({
        userId : userId
      })
    }
    wx.setNavigationBarTitle({
      title: '地址管理',
    })
    util.request(api.AddressPage, {
      userId: userId
    }, "GET").then(function(res) {
      if (res.code === 0) {
        data.addressList = res.addressList
        that.setData(data)
      }
    });
    if (options.chooseMode == "true") {
      this.setData({
        chooseMode: true
      })

      this.data.addressList.forEach(function(v, index) {
        if (options.addressId == v.id) {
          that.setData({
            [`addressList[${index}].checked`]: true
          });
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function(e) {
    let that = this;
    let data = new Object();
    util.request(api.AddressPage, {
      userId: that.data.userId
    }, "GET").then(function (res) {
      if (res.code === 0) {
        data.addressList = res.addressList
        that.setData(data)
      }
    });
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
     let that = this;
     let data = new Object();
    util.request(api.AddressPage, {
      userId: that.data.userId
    }, "GET").then(function (res) {
      if (res.code === 0) {
        data.addressList = res.addressList
        that.setData(data)
      }
    });
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
  deleteAddress: function(e) {
    let id = e.currentTarget.dataset.value.id;
    let data = [];
    let that = this;
    this.data.addressList.forEach(function(v) {
      if (id != v.id) {
        data.push(v);
      } else {
        util.request(api.AddressDelete, {
          id: id,
        }, "POST").then(function(res) {
          if (res.code === 0) {
            console.log(res)
          }
        });
      }
    })
    this.setData({
      addressList: data
    })
  },
  editAddress: function(e) {
    let data = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/ucenter/address/edit/edit?edit=true&id=' + data.id + '&name=' + data.name + '&mobile=' + data.mobile + '&address=' + data.address + '&street=' + data.street + '&tdefault=' + data.tdefault
    })
  },
  addAddress: function() {
    wx.navigateTo({
      url: '/pages/ucenter/address/edit/edit'
    })
  },
  importAddress: function() {
    wx.chooseAddress({
      success(res) {
        let address = res.provinceName + " " + res.cityName + " " + res.countyName;
        wx.navigateTo({
          url: '/pages/ucenter/address/edit/edit?import=true&name=' + res.userName + '&mobile=' + res.telNumber + '&address=' + address + '&street=' + res.detailInfo
        })
      }
    })
  },
  chooseAddress: function(e) {
    if (this.data.chooseMode) {
      let address = e.currentTarget.dataset.value;

      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2]; //上一个页面
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        address: address
      })
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})