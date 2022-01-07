// pages/habit/habit.js
//获取应用实例
const app=getApp()
var Bmob = require('../../utils/bmob.js')
// var data=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show:true,
    dataList:false,
    data:''
  },
bindviewtap:function(){
  const query=Bmob.query('habit');
  query.set("name","Bmob")
  query.set("cover","后端云")
  query.save().then(res=>{
    console.log(res)
    console.log('123')
  }).catch(err=>{
    console.log(err)
  })

},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
//添加习惯
addhabit(event){
  wx.navigateTo({
    url: './addhabit/addhabit',
    success: function(res) {},
    fail: function(res) {},
    complete: function(res) {},
  })
},
  goDetail() {
    wx.navigateTo({
      url: '../index/index',
    })
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
    // var data ='';
    var that=this;
    wx.getStorage({
      key: 'signDay',
      success: function (res) { 
        console.log(res.data)
        that.setData({
          data:res.data,
          show: false,
          dataList: true
        })
      },
    })
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