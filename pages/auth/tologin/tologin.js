// pages/auth/tologin/tologin.js
import Dialog from '../../../lib/vant-weapp/dialog/dialog';
const api = require('../../../config/url.js');
const util = require('../../../utils/util.js');
var app = getApp();

Page({
// 登陆页面
  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    userInfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  getUserInfo: function () {
    wx.getUserInfo({
      success: function (res) {
        let userInfo = res.userInfo
        app.globalData.userInfo = res.userInfo;
        wx.setStorageSync('userInfo', res.userInfo);
        //console.log(app.globalData.userInfo)
      }
    })
  },
  wxlogin: function (e) {
    let that = this;
    // 判断是否授权
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // // 获取用户信息
          //that.getUserInfo()
          // // 记录登录状态
          // wx.setStorageSync('isLogin', true);
          // Dialog.alert({
          //   message: '模拟登录成功，此处还需调用微信登录开放接口'
          // }).then(() => {
          //   // 返回上一级
           
          // });
          wx.login({
            success:res =>{
             
              if (res.code){
               util.request(api.IndexUrlLogin,{
                 code: res.code,
                 userInfo: e.detail
               },'POST','application/json').then(res =>{
                 if(res.code === 0){
                   wx.setStorageSync('userInfo', res.map.userInfo);
                   wx.setStorageSync('token', res.map.token);
                   wx.setStorageSync('userId', res.map.userId);
                   wx.setStorageSync('isLogin', true);
                   wx.navigateBack({
                     delta: 1
                   })
                 } else {
                   // util.showErrorToast(res.errmsg)
                   wx.showModal({
                     title: '提示',
                     content: res.errmsg,
                     showCancel: false
                   });
                 }
               });
             }
            }
          })
        }
      }
    })
  }
})