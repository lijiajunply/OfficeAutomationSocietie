// pages/project/project_addtask/project_addtask.js
import {
  apiurl
} from "../../../utils/api.js";
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    projectid: "",
    task: {
      toDo: "",
      startTime: "",
      endTime: ""
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    function formatDate() {
      const date = new Date();
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    }
    const now = formatDate()
    this.setData({
      projectid: options.id,
      task: {
        startTime: now,
        endTime: now
      }
    })
  },

  submitTask() {
    console.log(
      "ProjectID", this.data.projectid, "\n",
      "ToDo:", this.data.task.toDo, "\n",
      "StartTime:", this.data.task.startTime, "\n",
      "EndTime:", this.data.task.endTime
    );


    // return;

    wx.request({
      method: "PUT",
      header: {
        authorization: "Bearer " + app.globalData.jwt
      },
      url: apiurl + 'Project/AddGantt/' + this.data.projectid,
      data: this.data.task,
      success: (gantt) => {
        app.globalData.user.taskNotes.push(gantt.data)
        wx.navigateBack({
          delta: 4
        });
      }
    });
  },
  handInputChange(e) {
    console.log(e)
    this.setData({
      [`task.${e.target.id}`]: e.detail.value
    })
  },
})