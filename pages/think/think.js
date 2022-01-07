// pages/think/think.js
var util = require('../../utils/util.js')
var Bmob = require('../../utils/bmob.js')
var WxParse = require('../../utils/wxParse/wxParse.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    useKeyboardFlag: true,
    keyboardInputValue: '',
    sendMoreMsgFlag: false,
    urlArr: [],
    deleteIndex: -1,
    currentAudio: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    // var time = util.formatTime(new Date())
    // this.setData({
    //   time:time
    // })

  },

  //选择本地照片与拍照
  upImg: function (event) {
    var that = this;
    var sourceType = [event.currentTarget.dataset.category],
      that = this;
    wx.chooseImage({
      count: 9,
      sourceType: sourceType,
      success: function (res) {
        wx.showNavigationBarLoading()
        that.setData({
          loading: false
        })
        var urlArr = new Array();
        var tempFilePaths = res.tempFilePaths;
        console.log(tempFilePaths)
        var imgLength = tempFilePaths.length;
        if (imgLength > 0) {
          var newDate = new Date();
          var newDateStr = newDate.toLocaleDateString();
          var j = 0;
          for (var i = 0; i < imgLength; i++) {
            var tempFilePath = [tempFilePaths[i]];
            var extension = /\.([^.]*)$/.exec(tempFilePath[0]);
            if (extension) {
              extension = extension[1].toLowerCase();
            }
            var name = newDateStr + "." + extension;//上传的图片的别名
            var file = new Bmob.File(name, tempFilePath);
            file.save().then(function (res) {
              wx.hideNavigationBarLoading()
              var url = res.url();
              console.log("第" + i + "张Url" + url);
              urlArr.push({ "url": url });
              j++;
              console.log(j, imgLength);
              showPic(urlArr, that)
            }, function (error) {
              console.log(error)
            });
          }
        }
      }
          })
    //上传完成后显示图片
    function showPic(urlArr, t) {
      t.setData({
        loading: true,
        urlArr: urlArr
      })
    }
  },
  

  // 获取用户输入
  bindCommentInput: function (e) {
    this.setData({
      keyboardInputValue: e.detail.value
    })
  },

  //提交用户评论  
  submitComment: function (event) {
    var that = this;
    that.setData({
      isShow: (!that.setData.isShow)
    })
    var Think = Bmob.Object.extend("think");
    var think = new Think();
    var img = this.data.chooseFiles;
    think.set("title", this.data.keyboardInputValue);
    think.set("picture", this.data.urlArr);
    think.save(null, {
      success: function (result) {
        console.log("添加成功,objectId:" + result.id);
      },
      error: function (result, error) {
        console.log("添加失败" + error.code + "" + error.message);
      },
    },
    )
    //显示操作结果
    this.showCommitSuccessToast();
    //恢复初始状态
    this.resetAllDefaultStatus();
  },
  //发布成功
  showCommitSuccessToast: function () {
    //显示操作结果
    wx.showToast({
      title: "发布成功",
      duration: 1000,
      icon: "success"
    })

  },

  // bindCommentData: function () {
  //   var comments = this.dbPost.getCommentData();
  //   // 绑定评论数据
  //   this.setData({
  //     comments: comments
  //   });
  // },

  //将所有相关的按钮状态，输入状态都回到初始化状态
  resetAllDefaultStatus: function () {
    //清空评论框
    this.setData({
      keyboardInputValue: '',
      urlArr: [],
      sendMoreMsgFlag: false
    });
  },

  //显示 选择照片、拍照等按钮
  sendMoreMsg: function () {
    this.setData({
      sendMoreMsgFlag: !this.data.sendMoreMsgFlag
    })
  },
  //删除已经选择的图片
  delImg: function () {//图片删除
    var path;
    //删除第一张
    path = this.data.urlArr[0].url;
    var s = new Bmob.Files.del(path).then(function (res) {
      if (res.msg == "ok") {
        console.log('删除成功');
        common.showModal("删除成功");
      }
      console.log(res);
    }, function (error) {
      console.log(error)
    }
    );
  },

  deleteImage: function (event) {
    var index = event.currentTarget.dataset.idx,
      that = this;
    that.setData({
      deleteIndex: index
    });
    that.data.urlArr.splice(index, 1);
    setTimeout(function () {
      that.setData({
        deleteIndex: -1,
        urlArr: that.data.urlArr
      });
    }, 500)
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