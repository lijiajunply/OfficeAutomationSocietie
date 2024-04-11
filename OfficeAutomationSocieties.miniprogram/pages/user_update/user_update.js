import {
  apiurl
} from "../../utils/api.js";
const app = getApp()

Page({
  data: {
    user: {
      name: '',
      phoneNum: ''
    },
    rules: [
      {
        name: "name",
        rules: {
          required: true,
          maxlength: 32
        }
      },
      {
        name: "registrationTime",
        rules: {}
      },
      {
        name: "userId",
        rules: {}
      },
      {
        name: "phoneNum",
        rules: {
          required: true,
          maxlength: 13
        }
      },
      {
        name: "password",
        rules: {}
      },
      {
        name: "organizes",
        rules: {}
      },
      {
        name: "projects",
        rules: {}
      },
      {
        name: "taskNotes",
        rules: {}
      }
    ]
  },

  onLoad() {
    this.setData({
      user: app.globalData.user
    })
  },
  submitForm() {
    if (this.data.user.name === '' || this.data.user.phoneNum === '') return
    if (this.data.user.name === app.globalData.user.name && this.data.user.phoneNum === app.globalData.user.name) {
      wx.navigateBack()
      return
    }
    console.log(this.data.user)
    return
    wx.request({
      method: "POST",
      header: {
        authorization: "Bearer " + app.globalData.jwt
      },
      url: apiurl + 'User/Update',
      data: this.data.user,
      success: (userData) => {
        if (userData.statusCode !== 200)
          return
        app.globalData.user = this.data.user
        wx.navigateBack()
      }
    })
  },
  handInputChange(e) {
    this.setData({
      [`user.${e.target.id}`]: e.detail.value
    })
  },
})