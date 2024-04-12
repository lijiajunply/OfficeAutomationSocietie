// pages/user/user.js
const app = getApp()
Page({
  data: {
    username: "",
    phoneNum : "",
    dayNum : 1
  },

  onLoad() {
    const now = new Date()
    const registration = new Date(app.globalData.user.registrationTime)
    this.setData({
      username: app.globalData.user.name,
      phoneNum: app.globalData.user.phoneNum,
      dayNum : parseInt((now - registration.getTime()) / (1000 * 60 * 60 * 24)) + 1
    })
  },

  logout: function () {
    wx.setStorageSync("UserData", null)
    wx.redirectTo({
      url: '/pages/signin/signin',
    })
  }
})