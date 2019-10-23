// pages/commodity/commodity.js
let WxParse = require("../../lib/wxParse/wxParse.js");
import Toast from '../../lib/vant-weapp/toast/toast';
const api = require('/../../config/url.js');
const util = require('/../../utils/util.js');
Page({
// 商品详情
  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    serviceShow: false,
    cartList: [],
    deliveryAddress: {
      address: "北京市东城区东华门街道",
      time: "18:00",
      day: "",
    },
    product:{},
  
    sku: {
      show: false, // 显示属性规格
      noneSku: false, // 有无规格选择
      quota: 100, // 限购数量
      productId: 1, // 商品id
      picUrl: "", // 当前选择图片
      specText: "", // 所选规格属性
      specTextNoCount: "", // 所选规格属性 无数量
      tree: [
        {
          k: '颜色', // skuKeyName：规格类目名称
          v: [
            {
              id: 1, // skuValueId：规格值 id
              name: '银色', // skuValueName：规格值名称
              picUrl: 'https://img11.360buyimg.com/n1/s450x450_jfs/t1/62813/33/2131/584186/5d079803E03084b0d/2b4970456b7bf49f.png', // 规格类目图片，只有第一个规格类目可以定义图片
              selected: false, // 是否选择
              disabled: false // 禁用
            },
            {
              id: 2,
              name: '深空灰色',
              picUrl: 'https://img14.360buyimg.com/n0/jfs/t1/3/15/4536/138660/5b997bf8Ed72ebce7/819dcf182d743897.jpg',
              selected: false,
              disabled: false
            }
          ],
          ks: 's1' // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
        },
      
      ],
      // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
      list: [
        {
          id: 1, // skuId，下单时后端需要
          price: 1.00, // 价格
          s1: 1, // 规格类目 ks 为 s1 的对应规格值 id
          stockNum: 50 // 当前 sku 组合对应的库存
        }
      ],
      // 选择的 sku 组合
      selectedSku: {
      },
      count: 1 // 选择的商品数量
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品详情',
    })
    let isLogin = wx.getStorageSync('isLogin')
    let that = this
    var data = new Object();
    if(isLogin){
      this.setData({
        isLogin: isLogin
      })
    }
    util.request(api.CommodityDetails,{id:1}, "POST").then(function (res) {
      if (res.code === 0) {
        data.product = res.product
        that.setData(data)
        console.log(res)
      }
    });

    util.request(api.SpecificationsDetails, { id: 1 }, "POST").then(function (res) {
      if (res.code === 0) {
        data.sku = res.product
        that.setData(data)
        console.log(res)
      }
    });
   
    // 初始化配送时间
    let date = new Date();
    let month = date.getMonth() + 1;
    let day = date.getDate() + 3;
    this.setData({
      'deliveryAddress.day': month + '月' + day + '日'
    })
    // 读取购物车
    let cartList = wx.getStorageSync("cartList");
    if (cartList) {
      this.setData({
        cartList: cartList
      })
    }
    // 加载sku后初始化selectedSku
    let tree = this.data.sku.tree;
    for (let i = 0; i < tree.length; i++) {
      let s = 'sku.selectedSku.' + tree[i].ks;
      this.setData({
        [s]: ''
      })
    }
    // 只有一种 sku 规格值时默认选中第一个
    if (tree.length == 1) {
      let k = 'sku.selectedSku.' + this.data.sku.tree[0].ks;
      this.setData({
        [`sku.tree[${0}].v[${0}].selected`]: true,
        [k]: this.data.sku.tree[0].v[0].id
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
  onShow: function (e) {
    // 加载商品详情数据
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */

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
  openIndexPage: function () {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  openAddress: function () {
    let that = this;
    wx.chooseLocation({
      success: function (res) {
        if (!res.address) {
          return;
        }
        that.setData({
          'deliveryAddress.address': res.address
        })
      },
    })
  },
  openService: function () {
    this.setData({
      serviceShow: true
    })
  },
  closeService: function () {
    this.setData({
      serviceShow: false
    })
  },
  openCartPage: function () {
    wx.switchTab({
      url: '/pages/shoppingcart/shoppingcart',
    })
  },
  toComment: function () {
    wx.navigateTo({
      url: '/pages/comment/comment?productId=' + this.data.product.id,
    })
  },
  toProduct: function (e) {
    let id = e.currentTarget.dataset.value.id;
    wx.navigateTo({
      url: '/pages/product/product?id=' + id
    })
  },
  clickTag: function (e) {
    let v = e.currentTarget.dataset.value;
    wx.navigateTo({
      url: '/pages/promotion/promotion?id=' + v.id + '&title=' + v.title
    });
  },
  previewThumb: function (e) {
    wx.previewImage({
      current: this.data.product.picUrl,
      urls: [this.data.product.picUrl]
    })
  },
  showSku: function (e) {
    this.setData({
      'sku.show': true
    })
  },
  closeSku: function (e) {
    this.setData({
      'sku.show': false
    })
  },
  selectSku: function (e) {
    let k = e.currentTarget.dataset.k;
    let v = e.currentTarget.dataset.value;
    let index = e.currentTarget.dataset.index;
    let iindex = e.currentTarget.dataset.iindex;
    if (this.data.sku.tree[index].v[iindex].disabled) {
      return;
    }
    // 勾选或反选 设置属性
    if (!this.data.sku.tree[index].v[iindex].selected) {
      // 勾选 记录
      let s = 'sku.selectedSku.' + k.ks;
      this.setData({
        [s]: v.id
      });
    } else {
      // 反选 删除值
      let s = 'sku.selectedSku.' + k.ks;
      this.setData({
        [s]: ''
      });
    }
    this.setData({
      [`sku.tree[${index}].v[${iindex}].selected`]: !this.data.sku.tree[index].v[iindex].selected
    });
    // 排除该组其他已选项
    let vList = this.data.sku.tree[index].v;
    for (let i = 0; i < vList.length; i++) {
      if (vList[i].id != v.id) {
        this.setData({
          [`sku.tree[${index}].v[${i}].selected`]: false
        })
      }
    }
    this.judgeAllItem();
    // 修改属性图片
    if (index == 0) {
      this.setData({
        'product.picUrl': this.data.sku.tree[0].v[iindex].picUrl
      })
    }
    // 修改选择商品价格信息
    if (this.isAllSelected()) {
      let skuComb = this.getSkuComb();
      this.setData({
        'product.price': skuComb.price
      })
    } else {
      // 恢复默认价格
      this.setData({
        'product.price': this.data.product.defaultPrice
      })
    }
  },
  // 循环判断所有属性是否可选
  judgeAllItem: function () {
    // 判断库存
    let tree = this.data.sku.tree;
    for (let i = 0; i < tree.length; i++) {
      let v = tree[i].v;
      for (let j = 0; j < v.length; j++) {
        if (this.isSkuChoosable(tree[i].ks, v[j].id)) {
          // 可点击
          this.setData({
            [`sku.tree[${i}].v[${j}].disabled`]: false
          })
        } else {
          // 不可点击
          this.setData({
            [`sku.tree[${i}].v[${j}].disabled`]: true
          })
        }
      }
    }
    this.getSelectedText();
  },
  isSkuChoosable: function (ks, vId) {

    let selectedSku = this.data.sku.selectedSku;
    let list = this.data.sku.list;

    // 先假设sku已选中，拼入已选中sku对象中
    let matchedSku = Object.assign({}, selectedSku, {
      [ks]: vId
    });

    // 再判断剩余sku是否全部不可选，若不可选则当前sku不可选中
    let skusToCheck = Object.keys(matchedSku).filter(
      skuKey => matchedSku[skuKey] != ''
    );

    let filteredSku = list.filter(sku => (
      skusToCheck.every(
        skuKey => String(matchedSku[skuKey]) == String(sku[skuKey])
      )
    ));

    let stock = filteredSku.reduce((total, sku) => {
      total += sku.stockNum;
      return total;
    }, 0);
    return stock > 0;
  },
  // 是否所有规格已选
  isAllSelected: function () {
    let selectedSku = this.data.sku.selectedSku;
    let selected = Object.keys(selectedSku).filter(
      skuKeyStr => selectedSku[skuKeyStr] != ""
    );
    return this.data.sku.tree.length == selected.length;
  },
  // 获得已选择的组合
  getSkuComb: function () {
    if (!this.isAllSelected()) {
      return {};
    }
    let selectedSku = this.data.sku.selectedSku;
    let list = this.data.sku.list;
    let skusToCheck = [];
    this.data.sku.tree.forEach(v => {
      skusToCheck.push(v.ks)
    })
    let filteredSku = list.filter(sku => (
      skusToCheck.every(
        skuKey => String(selectedSku[skuKey]) == String(sku[skuKey])
      )
    ));
    return filteredSku[0];
  },
  // 选择属性文字
  getSelectedText: function () {
    let selectedSku = this.data.sku.selectedSku;
    let text = "";
    Object.keys(selectedSku).forEach(
      skuKeyStr => {
        let id = selectedSku[skuKeyStr];
        let tree = this.data.sku.tree;
        for (let i = 0; i < tree.length; i++) {
          let v = tree[i].v;
          for (let j = 0; j < v.length; j++) {
            if (v[j].id == id) {
              text = text + ' ' + v[j].name
            }
          }
        }
      }
    )
    this.setData({
      'sku.specTextNoCount': text
    })
    if (this.isAllSelected()) {
      text = text + ' ×' + this.data.sku.count;
    }
    this.setData({
      'sku.specText': text
    })
  },
  changeCount: function (e) {
    this.setData({
      'sku.count': e.detail.value
    });
    this.getSelectedText();
  },
  // 未选择属性提示
  toChooseTip: function () {
    // 未选择规格属性
    if (!this.data.sku.show) {
      // 未显示选择面板则显示
      this.setData({
        'sku.show': true
      })
      return;
    }
    let selectedSku = this.data.sku.selectedSku;
    let skuNotChoose = Object.keys(selectedSku).filter(
      skuKeyStr => selectedSku[skuKeyStr] == ''
    )[0]
    this.data.sku.tree.forEach(v => {
      if (v.ks == skuNotChoose) {
        Toast("请选择：" + v.k);
      }
    })
  },
  buyNow: function () {
    if (!this.isAllSelected()) {
      // 提示
      this.toChooseTip();
    } else {
      // 下单 判断数量
      let skuComb = this.getSkuComb();
      if (this.data.sku.count > skuComb.stockNum) {
        Toast("库存不足，请减少购买数量");
        return;
      }
      // 跳转settlement页面
      wx.setStorageSync("checkoutProduct", this.data.product);
      wx.setStorageSync("checkoutProductSku", this.data.sku);
      wx.navigateTo({
        url: '/pages/settlement/settlement?from=product',
      })
    }
  },
  addToCart: function () {
    if (!this.isAllSelected()) {
      // 提示
      this.toChooseTip();
    } else {
      // 添加至购物车 判断数量
      let skuComb = this.getSkuComb();
      if (this.data.sku.count > skuComb.stockNum) {
        Toast("库存不足，请减少购买数量");
        return;
      }
      let cartList = this.data.cartList;
      cartList.push({
        id: this.data.product.id,
        checked: true,
        picUrl: this.data.product.picUrl,
        title: this.data.product.title,
        spec: this.data.sku.specTextNoCount,
        count: this.data.sku.count,
        maxNum: this.data.sku.quota,
        price: this.data.product.price
      });
      wx.setStorageSync("cartList", cartList);
      this.setData({
        cartList: cartList
      });
      Toast("加入购物车成功");
    }
  },
  checkLogin: function () {
    if (!this.data.isLogin) {
      wx.navigateTo({
        url: '/pages/auth/tologin/tologin',
      })
    }
  },
})