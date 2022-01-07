var Bmob = require('../../../utils/bmob.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    rows:[]
  },
  gojoin:function(e){
    var index=parseInt(e.currentTarget.dataset.index);
    wx.navigateTo({
      url: '../join/join?tumb_upid='+this.data.syncjoin[index].tumb_upid
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(e) {
    console.log(e.objectId)
    var objectId = e.objectId;
    var that = this;
    var habit = Bmob.Object.extend("icon");
    var habitname = new Bmob.Query(habit);
    habitname.descending("createdAt");
    //分页查询
    habitname.limit(that.data.page);
    habitname.find({
      success: function (result) {
        console.log(result, result.id);
        that.setData({
          rows: result,

        })
        // The object was retrieved successfully.        
      },
      error: function (result, error) {
        console.log("查询失败");
      }
    });    
  },
  // 滑动切换tab 
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
  },
  /** 
   * 点击tab切换 
   */
  itemOnclick:function(){

  },
  swichNav: function(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  // wx.setStorage({
  //   key: '',
  //   data: '',
  // }),
  daka: function() {
    wx.navigateTo({
      url: '../../index/index',
    })

  },
  //search
  toSearch: function() {
    this.setData({
      curPage: 1
    });
    this.getGoodsList(this.data.activeCategoryId);
  },
  //search input
  listenerSearchInput: function(e) {
    this.setData({
      searchInput: e.habit.value
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