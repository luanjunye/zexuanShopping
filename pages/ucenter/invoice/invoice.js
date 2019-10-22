// pages/ucenter/invoice/invoice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current:'个人',
    type:[{
      id:1,
      name:'个人'
    },{
      id:2,
      name:'企业'
    }],
    position:'left',
    currentId:1,
    form:{
      name:"",
      mobile:"",
      email:"",
    }
  },

  handleTypeChange({ detail = {} }) {
    if(detail.value === '个人'){
      this.setData({
        current: detail.value,
        currentId : 1
      });
    }else{
      this.setData({
        current: detail.value,
        currentId: 2
      });
    }
  },

  onChangeName: function (e) {
    this.setData({
      'form.name': e.detail
    })
  },
  onChangeNumber: function (e) {
    this.setData({
      'form.mobile': e.detail
    })
  },
  onChangeEmail: function (e) {
    this.setData({
      'form.email': e.detail
    })
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

  }
})