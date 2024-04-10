import {
  apiurl
} from "../../../utils/api.js";
const app = getApp()

Page({
  data: {
    thisProject: {},
    taskCount : 0,
    members: [],
    doingTask: [],
    timeOutTask: [],
    willDoTask: []
  },
  onLoad(options) {
    const a = app.globalData.projects.find(item => item.id === options.id)
    if (a == null) {
      console.log("有问题", app.globalData.projects, options.id)
      return
    }

    a.ganttList.forEach(item => {
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

    this.setData({
      thisProject: a
    })

    wx.request({
      method: "GET",
      header: {
        authorization: "Bearer " + app.globalData.jwt
      },
      url: apiurl + 'Project/GetProjectMember/' + options.id,
      success: (member) => {
        if (member.statusCode !== 200) return
        this.setData({
          members: member.data
        })
      }
    })
  },
  addTask() {
    console.log("ToAddTask")
    wx.navigateTo({
      url: '../project_addtask/project_addtask' //?id=' + this.data.thisProject.id,
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