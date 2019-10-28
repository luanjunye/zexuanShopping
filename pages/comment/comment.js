// pages/comment/comment.js
const api = require('/../../config/url.js');
const util = require('/../../utils/util.js');
Page({
// 评价页面
  /**
   * 页面的初始数据
   */
  data: {
    active: "all",
    count: {},
    goodCommentRate: 100,
    rate: 5,
    //comment: [],
    commentList:[],
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    var data = new Object();
    let goodsId = options.productId;
    if(goodsId){
      util.request(api.EvaluateList, {
        id: goodsId
      }, "POST").then(function (res) {
        if (res.code === 0) {
          console.log(res)
          data.commentList = res.commentList
          that.setData(data)
        }
      });
      util.request(api.EvaluateListInfo, {
        id: goodsId
      }, "POST").then(function (res) {
        if (res.code === 0) {
          console.log(res)
          data.count = res.count
          that.setData(data)
        }
      });
    }

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
  changeTag: function (e) {
    let tag = e.currentTarget.dataset.value;
    this.setData({
      active: tag
    });
    let data = this.data.commentList;
    if (tag == "new") {
      data.sort(function (a, b) {
        if (b.time > a.time) {
          return 1;
        }
        if (b.time < a.time) {
          return -1;
        }
        return 0;
      });
    } else if (tag == "pic") {
      data = data.filter(v => {
        return v.pics.length > 0;
      });
    } else if (tag == "add") {
      data = data.filter(v => {
        return v.addComment;
      })
    } else if (tag == "good") {
      data = data.filter(v => {
        return v.rate >= 4;
      })
    } else if (tag == "mid") {
      data = data.filter(v => {
        return v.rate == 4 || v.rate == 3;
      })
    } else if (tag == "bad") {
      data = data.filter(v => {
        return v.rate <= 2;
      })
    }
    this.setData({
      commentList: data
    })
  }
})