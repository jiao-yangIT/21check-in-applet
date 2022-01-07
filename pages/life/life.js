// pages/life/life.js
var Bmob = require('../../utils/bmob.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rows: [],
    urlArr:[],
    listItem:'',
    picture:'',
  },
  /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
  onPullDownRefresh: function () {
    console.log(111,"下拉");
    wx.showNavigationBarLoading();
    that.setData({ page: 10, refresh: false })
    that.onLoad()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("上拉")
    wx.showLoading({
      title: 'loading...',
    })
    that.setData({ page: that.page + 10 })
    that.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(e.objectId)
    var objectId = e.objectId;
    // var that = this;
    // var think = Bmob.Object.extend("think");
    // var title = new Bmob.Query(think);
    // title.descending("createdAt")
  },
  setAniation: function () {
    //定义动画
    var animationUp = wx.createAnimation({
      timingFunction: 'ease-in-out'
    })
    this.animationUp = animationUp
  },
  
  onUpTap: function (event) {
    var newData = this.dbPost.up();
    this.setData({
      'post.upStatus': newData.upStatus,
      'post.upNum': newData.upNum
    }),
      this.animationUp.scale(2).step();
    this.setData({
      animationUp: this.animationUp.export()
    })
    setTimeout(function () {
      this.animationUp.scale(1).step();
      this.setData({
        animationUp: this.animationUp.export()
      })
    }.bind(this), 300);
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
    var that = this;
    var think = Bmob.Object.extend("think");
    var title = new Bmob.Query(think);
    title.descending("createdAt")
    title.find({
      success: function (result) {
        console.log('result', result)
        var arr = [];
        var list = [];
        if (result.length > 0) {
          for (var i = 0; i < result.length; i++) {
            var arrList = {
              listItem: result[i].createdAt
            }
            // list.push(listItem)
          }
        }
        // list.push(listItem)
        console.log(3, list)
        result.forEach(function (item) {
          arr.push({
            list: list,
            // createdAt: result[0].createdAt,
            createdAt: item.createdAt,
            picture: item.get('picture'),
            collect: item.get('collect') || 0,
            cat: item.get('cat') || 0,
            title: item.get('title'),
            message: item.get('message') || 0,
          })
        })
        // console.log(2,arr[1].picture[0].url)
        // console.log(4, result[0].createdAt)
        // console.log(5, arr)

        that.setData({
          rows: arr, isRequest: true, refresh: true
        })
        if (that.data.page == 10) {
          wx.hideNavigationBarLoading();
          // 停止下拉动作  
          wx.stopPullDownRefresh();
        } else {
          wx.hideLoading()
        }
        console.log(111, "下拉");
        // The object was retrieved successfully.        
      },
      error: function (result, error) {
        console.log("查询失败");
      }

    });
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