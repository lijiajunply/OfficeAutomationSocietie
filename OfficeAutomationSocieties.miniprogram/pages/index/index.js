// index.js
const app = getApp()
Page({
  data:{
    isLoading:true,
    task : [],
    taskCount : 0,
    doingTask : [],
    timeOutTask : [],
    willDoTask : []
  },

  onShow() {
    wx.showTabBar(true);
    
    app.globalData.user.taskNotes.forEach(item => {
      if(item.isDone !== true){
        this.setData({
          taskCount : this.data.taskCount++
        })
        const starkTime = new Date(item.startTime)
        const endTime = new Date(item.endTime)
        const now = new Date()
        if(endTime < now){
          this.data.timeOutTask.push(item)
          return
        }

        if(starkTime > now){
          this.data.willDoTask.push(item)
          return
        }

        this.data.doingTask.push(item)
      }
    });

    this.setData({
      isLoading:true,
      task : app.globalData.user.taskNotes
    })
    setInterval(()=>{
      this.setData({
        isLoading:false
      })
    },300);
  }
})
