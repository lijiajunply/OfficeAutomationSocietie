// pages/user/user.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  logout:function(event) {
    // 调用接口登出

    
    // 返回登录界面
    wx.redirectTo({
      url: '/pages/signin/signin',
    })
  }
})