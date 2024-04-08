// pages/user/user.js
const app = getApp()
Page({
  data: {
    username: ""
  },

  onLoad() {
    
    this.setData({
      username: app.globalData.user.name
    })
  },

  logout: function () {
    wx.setStorageSync("UserData", null)
    wx.redirectTo({
      url: '/pages/signin/signin',
    })
  }
})