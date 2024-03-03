// pages/signin/signin.js
Page({
  data: {
    username:"",
    password:"",
    isLoading:false
  },
  
  // 点击登录按钮，执行登录操作
  login: function(event) {    
    // 加载条
    this.setData({
      isLoading: true
    });
    
    // 模拟异步操作
    setTimeout(() => {
      this.setData({
        isLoading: false
      });
      // wx.redirectTo({
      //   url: '/pages/index/index',
      // })
      wx.switchTab({
        url: '../index/index',
      }).then(() => console.log("Login"));
    }, 500);
  },

  onload() {
    wx.hideTabBar();
  }
})