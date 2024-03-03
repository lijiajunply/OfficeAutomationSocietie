// index.js

Page({
  data:{
    isLoading:true,
    testarray:["a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a","a",]
  },

  // 页面加载函数
  onShow() {
    // 显示底部栏
    wx.showTabBar(true);
    // 异步获取公告
    this.setData({
      isLoading:true
    })
    setInterval(()=>{
      this.setData({
        isLoading:false
      })
    },2000);
  }
})
