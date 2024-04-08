// index.js
const app = getApp()
Page({
  data:{
    isLoading:true,
    task : []
  },

  // 页面加载函数
  onShow() {
    // 显示底部栏
    wx.showTabBar(true);
    // 异步获取公告
    this.setData({
      isLoading:true,
      task : app.globalData.user.taskNotes
    })
    setInterval(()=>{
      this.setData({
        isLoading:false
      })
    },2000);
  }
})
