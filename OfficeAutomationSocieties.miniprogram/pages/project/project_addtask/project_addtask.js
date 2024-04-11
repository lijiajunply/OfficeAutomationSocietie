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
      starttime: "",
      endtime: ""
    }

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      projectid: options.id
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  submitTask() {
    console.log(
      "ProjectID", this.data.projectid, "\n",
      "Describtion:", this.data.describtion, "\n",
      "StartTime:", this.data.starttime, "\n",
      "EndTime:", this.data.endtime
    );
    return;

    wx.request({
      method: "PUT",
      header: {
        authorization: "Bearer " + app.globalData.jwt
      },
      url: apiurl + 'Project/AddGantt/' + this.data.projectid,
      data: task,
      success: (gantt) => {

      }
    })
  }
})