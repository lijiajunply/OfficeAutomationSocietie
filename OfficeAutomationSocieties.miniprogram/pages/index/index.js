// index.js
const app = getApp()
Page({
  data:{
    isLoading:true,
    task : [{endTime: "2024-04-12",
    isDone: false,
    startTime: "2024-04-09",
    toDo: "完成小程序"},{endTime: "2024-04-12",
    isDone: false,
    startTime: "2024-04-09",
    toDo: "完成小程序"},{endTime: "2024-04-12",
    isDone: false,
    startTime: "2024-04-09",
    toDo: "完成小程序"},{endTime: "2024-04-12",
    isDone: false,
    startTime: "2024-04-09",
    toDo: "完成小程序"},{endTime: "2024-04-12",
    isDone: false,
    startTime: "2024-04-09",
    toDo: "完成小程序"},{endTime: "2024-04-12",
    isDone: false,
    startTime: "2024-04-09",
    toDo: "完成小程序"}],
    taskCount : 50,
    doingTask : [],
    timeOutTask : [],
    willDoTask : []
  },

  onShow() {
    wx.showTabBar(true);
    
    app.globalData.user.taskNotes.forEach(item => {
      if(item.isDone !== true){
        this.setData({
          taskCount : this.data.taskCount + 1
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

    console.log(this.data.task)
    // setInterval(()=>{
    //   this.setData({
    //     isLoading:false
    //   })
    // },300);
  }
})
