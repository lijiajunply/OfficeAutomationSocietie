import { apiurl } from "../../../utils/api.js";
const app = getApp()

Page({
  data: {
    thisProject: {},
    members : []
  },
  onLoad(options) {
    const a = app.globalData.projects.find(item => item.id === options.id)
    if(a == null){
      console.log("有问题",app.globalData.projects,options.id)
      return
    }
    this.setData({
      thisProject : a
    })

    wx.request({
      method: "GET",
      header: {
        authorization: "Bearer " + app.globalData.jwt
      },
      url: apiurl + 'Project/GetProjectMember/'+options.id,
      success: (member) => {
        if(member.statusCode !== 200) return
        this.setData({
          members : member.data
        })
      }
    })
  }
})