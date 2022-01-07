var app = getApp();
var signData;
var date;
var signDay;
Page({
  //事件处理函数
  sign: function() {
    signData[date] = date;
    console.log(signData);
    signDay = signDay + 1;
    wx.setStorageSync("signData", signData);
    wx.setStorageSync("signDay", signDay);
    this.setData({
      signData: signData,
      signDay: signDay
    })
    wx.switchTab({
      url: '../habit/habit',
    })
    wx.showToast({
      title: '签到成功',
      icon: 'success',
      duration: 2000
    })
  },
  data: {
    dayStyle: [{
        month: 'current',
        day: new Date().getDate(),
        color: 'red'
      },
      {
        month: 'current',
        day: new Date().getDate(),
        color: 'white',
        background: 'red'
      }
    ],
  },
  // 给点击的日期设置一个背景颜色
dayClick: function(event) {
    let clickDay = event.detail.day;
    let changeDay = `dayStyle[1].day`;
    let changeBg = `dayStyle[1].background`;
    this.setData({
      [changeDay]: clickDay,
      [changeBg]: "gray",
    })},

think: function(){
  wx.redirectTo({
    url: '../think/think',
  })
    },
  onLoad: function() {
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
    date = mydate.getDate();
    console.log("date" + date)
    var day = mydate.getDay();
    console.log(day)
    var nbsp;
    if ((date - day) <= 0) {
      nbsp = day - date + 1;
    } else {
      nbsp = 7 - ((date - day) % 7) + 1;
    }
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    // 判断是否签到过
    if (wx.getStorageSync("signData") == null || wx.getStorageSync("signData") == '') {
      wx.setStorageSync("signData", new Array(monthDaySize));
    };
    if (wx.getStorageSync("signDay") == null || wx.getStorageSync("signDay") == '') {
      wx.setStorageSync("signDay", 0);
    }
    signData = wx.getStorageSync("signData")
    signDay = wx.getStorageSync("signDay")
    this.setData({
      year: year,
      month: month,
      nbsp: nbsp,
      monthDaySize: monthDaySize,
      date: date,
      signData: signData,
      signDay: signDay
    })
  },
})