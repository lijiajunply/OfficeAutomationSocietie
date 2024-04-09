// index.js
const app = getApp()
Page({
  data: {
    task: [],
    taskCount: 0,
    doingTask: [],
    timeOutTask: [],
    willDoTask: []
  },

  onLoad() {
    wx.showTabBar(true);

    app.globalData.user.taskNotes.forEach(item => {
      if (item.isDone !== true) {
        this.setData({
          taskCount: this.data.taskCount + 1
        })
        const starkTime = new Date(item.startTime)
        const endTime = new Date(item.endTime)
        const now = new Date()
        if (endTime < now) {
          this.data.timeOutTask.push(item)
          return
        }

        if (starkTime > now) {
          this.data.willDoTask.push(item)
          return
        }

        this.data.doingTask.push(item)
      }
    });

    // this.data.task.push();

    this.setData({
      task: app.globalData.user.taskNotes,
      willDoTask: this.data.willDoTask,
      doingTask: this.data.doingTask,
      timeOutTask: this.data.timeOutTask
    })

    console.log("所有任务:", this.data.task)
    console.log("未来任务", this.data.willDoTask)
    console.log("正在中任务:", this.data.doingTask)
    console.log("超时任务:", this.data.timeOutTask)

    // setInterval(()=>{
    //   this.setData({
    //     isLoading:false
    //   })
    // },300);
  },
  formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}年${month}月${day}日`;
  }
})