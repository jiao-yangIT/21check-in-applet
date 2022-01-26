var Bmob = require('../../../utils/bmob.js');
var common = require('../../../utils/common.js');
var app = getApp()
Page({
      data: {
        userInfo: {},
        phone: '',
        message: ''
      },
      onLoad: function() {
      },
      //获取电话号码输入
      bindCommentInput: function(e) {
        this.setData({
          phone: e.detail.value,
        })
      },
      //获取反馈信息输入
  bindmessageInput: function(e) {
        this.setData({
          message: e.detail.value,
        })
      },
      submitComment: function(event) {
        var that = this;
        //增加反馈
        var message = Bmob.Object.extend("message");
        var message = new message();
        message.set("phone", this.data.phone);
        message.set("message", this.data.message);
        //添加数据，第一个入口参数是null
        message.save(null, {
          success: function(result) {
            // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
            common.showModal('保存反馈成功，点击确定返回。', '提示', function() {
              wx.navigateBack(-1);
            });

            // wx.navigateBack();
            that.setData({
              loading: false
            })

          },
          error: function(result, error) {
            // 添加失败
            common.showModal('保存反馈失败，请重新发布');

          }
        });
        //恢复初始状态
        this.resetAllDefaultStatus();

      },
      resetAllDefaultStatus: function() {
        //清空评论框
        this.setData({
          phone: '',
       message:''
        });
      },
}
    )