var common = require('../../utils/common.js');


var app = getApp();

Page({
  data: {
    //获取用户头像昵称
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    cache: [
      { iconurl: '/images/icon/wx_app_clear.png', title: '缓存清理', tap: 'clearCache' }
    ],
    device: [
      { iconurl: '/images/icon/wx_app_cellphone.png', title: '系统信息', tap: 'showSystemInfo' },     
    ],
    fankui: [
      { iconurl: '/images/icon/wx_app_message.png', title: '反馈建议', tap: 'fankui' },
    ],
    about: [
      { iconurl: '/images/icon/about.png', title: '关于本程序', tap: 'about' },
    ],
    api: [
      { iconurl: '/images/icon/wx_app_list.png', title: '下载pdf、word文档', tap: 'downloadDocumentList' },
      { iconurl: '', title: '用户登陆', tap: 'login' },
      { iconurl: '', title: '校验用户信息', tap: 'check' },
      { iconurl: '', title: '获取用户加密信息', tap: 'decrypted' },
      { iconurl: '', title: '模板消息', tap: 'tplMessage' },
      { iconurl: '', title: '微信支付', tap: 'wxPay' }
    ],
    others: [
      { iconurl: '', title: 'wx:key示例', tap: 'showWxKeyDemo' },
      { iconurl: '', title: 'scroll-view高级用法演示', tap: 'showScrollViewDemo' }
    ],
    compassVal: 0,
    compassHidden: true,
    shakeInfo: {
      gravityModalHidden: true,
      num: 0,
      enabled: false
    },
    shakeData: {
      x: 0,
      y: 0,
      z: 0
    },
  },

  onLoad: function () {
    // this.setData({
    //   userInfo: app.globalData.g_userInfo
    // }),
    /**
     * 获取用户信息
     */
    // wx.getUserInfo({
    //   success: function (res) {
    //     console.log(res);
    //     var avatarUrl = 'userInfo.avatarUrl';
    //     var nickName = 'userInfo.nickName';
    //     that.setData({
    //       [avatarUrl]: res.userInfo.avatarUrl,
    //       [nickName]: res.userInfo.nickName,
    //     })
    //   }
    // })
  },

  //显示模态窗口
  showModal: function (title, content, callback) {
    wx.showModal({
      title: title,
      content: content,
      confirmColor: '#1F4BA5',
      cancelColor: '#7F8389',
      success: function (res) {
        if (res.confirm) {
          callback && callback();
        }
      }
    })
  },
  // 缓存清理
  clearCache: function () {
    this.showModal('缓存清理', '确定要清除本地缓存吗？', function () {
      wx.clearStorage({
        success: function (msg) {
          wx.showToast({
            title: "缓存清理成功",
            duration: 1000,
            mask: true,
            icon: "success"
          })
        },
        fail: function (e) {
          console.log(e)
        }
      })
    });
},

  //显示系统信息
  showSystemInfo: function () {
    wx.navigateTo({
      url: 'device/device'
    });
  },
  //反馈建议
  fankui: function () {
   wx.navigateTo({
     url: 'feedback/feedback',
   })
  },
  about:function(){
    common.showModal('本程序主要是对生活日常的记录及打卡.若想了解更多，详情请联系：13103860708');
  }
})