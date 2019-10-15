// pages/secondIndex/secondIndex.js
Page({
  //二级分类
  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    title: "",
    details: [{
        id: 1,
        label: "自营",
        relateId: 0,
        title: "煲汤材料炖汤清补",
        description: "漂亮得不像实力派",
        price: 59.9,
        number: "365人付款",
        place: "广州",
        free: "包邮",
        type: 0,
        picUrl: "/pages/index/assets/tang.png",
        tag: "满减"
      },
      {
        id: 2,
        label: "自营",
        relateId: 0,
        title: "煲汤材料炖汤清补",
        description: "哑光表面、专业级调音",
        price: 59.9,
        number: "365人付款",
        place: "广州",
        free: "包邮",
        type: 0,
        picUrl: "/pages/index/assets/tang.png"
      },
      {
        id: 3,
        label: "自营",
        relateId: 0,
        title: "煲汤材料炖汤清补",
        description: "TPU 环保材质、完美贴合",
        price: 59.9,
        number: "365人付款",
        place: "广州",
        free: "包邮",
        type: 0,
        picUrl: "/pages/index/assets/tang.png"
      },
      {
        id: 4,
        label: "自营",
        relateId: 0,
        title: "煲汤材料炖汤清补",
        description: "经典配色、专业调音、高品质麦克风",
        price: 59.9,
        number: "365人付款",
        place: "广州",
        free: "包邮",
        type: 0,
        picUrl: "/pages/index/assets/tang.png"
      },
      {
        id: 5,
        label: "自营",
        relateId: 0,
        title: "煲汤材料炖汤清补",
        description: "经典配色、专业调音、高品质麦克风",
        price: 59.9,
        number: "365人付款",
        place: "广州",
        free: "包邮",
        type: 0,
        picUrl: "/pages/index/assets/tang.png"
      },
      {
        id: 6,
        label: "自营",
        relateId: 0,
        title: "煲汤材料炖汤清补",
        description: "经典配色、专业调音、高品质麦克风",
        price: 59.9,
        number: "365人付款",
        place: "广州",
        free: "包邮",
        type: 0,
        picUrl: "/pages/index/assets/tang.png"
      },
      {
        id: 7,
        label: "自营",
        relateId: 0,
        title: "煲汤材料炖汤清补",
        description: "经典配色、专业调音、高品质麦克风",
        price: 59.9,
        number: "365人付款",
        place: "广州",
        free: "包邮",
        type: 0,
        picUrl: "/pages/index/assets/tang.png"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.setNavigationBarTitle({
      title: '汤料',
    })
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

  }
})