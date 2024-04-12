// index.js
const app = getApp()
Page({
  data: {
    taskCount: 0,
    doingTask: [],
    timeOutTask: [],
    willDoTask: [],
    slideviewButtons: [{
      text: "详情"
    }]
  },
  onShow() {
    this.initPage()
  },
  initPage() {
    wx.showTabBar(true);
    this.setData({
      willDoTask: [],
      doingTask: [],
      timeOutTask: []
    })
    app.globalData.user.taskNotes.forEach(item => {
      if (item.isDone !== true) {
        this.setData({
          taskCount: this.data.taskCount + 1
        })
        const starkTime = new Date(item.startTime)
        const endTime = new Date(item.endTime)
        const now = new Date()

        item.endTimeFmt = this.formatDate(item.endTime);

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

    this.setData({
      willDoTask: this.data.willDoTask,
      doingTask: this.data.doingTask,
      timeOutTask: this.data.timeOutTask
    })
  },
  formatDate(dateStr) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}年${month}月${day}日`;
  }
})