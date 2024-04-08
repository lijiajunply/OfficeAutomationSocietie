// pages/project/project.js

import { apiurl } from "../../utils/api.js";
const app = getApp()

Page({
  data: {
    projects:[]
  },

  onLoad() {
    wx.request({
      method: "GET",
      header: {
        authorization: "Bearer " + app.globalData.jwt
      },
      url: apiurl + 'Project/GetUserProjects',
      success: (project) => {
        if(project.statusCode !== 200) return
        this.setData({
          projects : project.data
        })
        app.globalData.projects = project.data
      }
    })
  }
})