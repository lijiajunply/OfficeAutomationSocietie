import {
  apiurl
} from "../../../utils/api.js";
const app = getApp()

Page({
  data: {
    thisOrganize: {},
    members: []
  },
  onLoad(options) {
    const a = app.globalData.organizes.find(item => item.id === options.id)
    if (a == null) {
      console.log("有问题", app.globalData.organizes, options.id)
      return
    }
    this.setData({
      thisOrganize: a
    })

    wx.request({
      method: "GET",
      header: {
        authorization: "Bearer " + app.globalData.jwt
      },
      url: apiurl + 'organize/GetOrganizeMember/' + options.id,
      success: (member) => {
        if (member.statusCode !== 200) return
        this.setData({
          members: member.data
        })
      }
    })
  }
})