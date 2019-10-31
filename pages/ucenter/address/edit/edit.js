// pages/ucenter/address/edit/edit.js
import {
  areaData
} from "../../../../lib/area.js"
import Toast from '../../../../lib/vant-weapp/toast/toast';
const api = require('/../../../../config/url.js');
const util = require('/../../../../utils/util.js');
Page({
  // 编辑地址
  /**
   * 页面的初始数据
   */
  data: {
    form: {
      id: "",
      name: "",
      mobile: "",
      address: "",
      street: "",
      tdefault: false
    },
    show: false,
    areaList: areaData,
    edit: false,
    userId: 0
  },

  // 验证输入
  verifyInput: function() {
    let name = this.data.form.name;
    let mobile = this.data.form.mobile;
    let address = this.data.form.address;
    let street = this.data.form.street;

    let mailReg = new RegExp('w*@\w*\.(\w*|\w*\.\w*)', 'g');
    if (name.trim().length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请填写姓名',
      })
    } else if (mobile.trim().length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请填写手机号',
      })
    } else if (address.trim().length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请填写正确地址',
      })
    } else if (street.trim().length < 1) {
      wx.showToast({
        icon: 'none',
        title: '请填写正确地址',
      })
    } else {
      return true;
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    var userId = wx.getStorageSync('userId')
    if (userId) {
      this.setData({
        userId: userId
      })
    }
    wx.setNavigationBarTitle({
      title: '编辑地址',
    })
    if (e.edit == "true") {
      this.setData({
        edit: true,
        'form.id': e.id,
        'form.name': e.name,
        'form.mobile': e.mobile,
        'form.address': e.address,
        'form.street': e.street
      })
    } else if (e.import == "true") {
      this.setData({
        edit: false,
        'form.id': e.id,
        'form.name': e.name,
        'form.mobile': e.mobile,
        'form.address': e.address,
        'form.street': e.street
      })
    }
    if (e.tdefault == "true") {
      this.setData({
        'form.tdefault': true
      })
    } else {
      this.setData({
        'form.tdefault': false
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
  onShow: function() {

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
  onChangeName: function(e) {
    this.setData({
      'form.name': e.detail
    })
  },
  onChangeMobile: function(e) {
    this.setData({
      'form.mobile': e.detail
    })
  },
  onChangeStreet: function(e) {
    this.setData({
      'form.street': e.detail
    })
  },
  changeDefault: function(e) {
    this.setData({
      'form.tdefault': e.detail
    })
  },
  importAddress: function() {
    let that = this;
    wx.chooseAddress({
      success(res) {
        that.setData({
          'form.name': res.userName,
          'form.mobile': res.telNumber,
          'form.address': res.provinceName + " " + res.cityName + " " + res.countyName,
          'form.street': res.detailInfo
        })
      }
    })
  },
  showSelectAddress: function(e) {
    this.setData({
      show: true
    })
  },
  cancelSelect: function() {
    this.setData({
      show: false
    })
  },
  selectArea: function(e) {
    let v = e.detail.values;
    let data = v[0].name + " " + v[1].name + " " + v[2].name;
    this.setData({
      'form.address': data,
      show: false
    })
  },
  saveAddress: function() {
    if (this.verifyInput()) {
      let pages = getCurrentPages();
      let prevPage = pages[pages.length - 2]; //上一个页面
      let data = prevPage.data.addressList;
      let that = this;
      if (this.data.edit) {
        // 编辑
        data.forEach(function(v, index) {
          if (v.id == that.data.form.id) {
            data[index] = that.data.form;
            util.request(api.AddressUpdate, {
              id: that.data.form.id,
              userId: that.data.userId,
              name: that.data.form.name,
              mobile: that.data.form.mobile,
              address: that.data.form.address,
              street: that.data.form.street,
              tdefault: that.data.form.tdefault
            }, "POST").then(function(res) {
              if (res.code === 0) {
                console.log(res)
              }
            });
          }
        })
      } else {
        // 添加
        data.push(this.data.form)
        util.request(api.AddressSave, {
          userId: this.data.userId,
          name: this.data.form.name,
          mobile: this.data.form.mobile,
          address: this.data.form.address,
          street: this.data.form.street,
          tdefault: this.data.form.tdefault
        }, "POST").then(function(res) {
          if (res.code === 0) {
            console.log(res)
          }
        });
      }
      //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
      prevPage.setData({
        addressList: data
      })
      Toast.success({
        duration: 0,
        message: '保存成功',
      });
      setTimeout(function() {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }
  }
})