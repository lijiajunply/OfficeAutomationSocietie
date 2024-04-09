// pages/signin/signin.js
// const userhelper = require("/utils/helper/userhelper.js");
import {
  apiurl
} from "../../utils/api.js";
const app = getApp()
Page({
  data: {
    loginmodel: {
      name: "",
      password: ""
    },
    isLoading: false
  },

  // 点击登录按钮，执行登录操作
  login: async function (data) {
    // 判断用户名与密码是否合法
    var username = data.detail.value.username;
    var password = data.detail.value.password;
    if (username == '' || password == '') // 暂时这样，需要指定账号密码规则。
    {
      console.log("用户名或密码非法");
      return;
    }

    // 赋值usermodel
    this.setData({
      loginmodel: {
        phoneNum: username,
        password: password
      }
    });

    // 加载条
    this.setData({
      isLoading: true
    });

    // 异步获取登录信息
    wx.request({
      method: "POST",
      url: apiurl + 'User/Login',
      data: this.data.loginmodel,
      success: (data) => {

        this.setData({
          isLoading: false
        });

        if (data.statusCode == 404)
          return

        app.globalData.jwt = data.data
        wx.setStorageSync("UserData", this.data.loginmodel)

        wx.request({
          method: "GET",
          header: {
            authorization: "Bearer " + data.data
          },
          url: apiurl + 'User/GetData',
          success: (userData) => {
            if (userData.statusCode !== 200)
              return
            app.globalData.user = userData.data
            // 模拟异步操作
            setTimeout(() => {
              wx.switchTab({
                url: '../index/index',
              });
            }, 500);
          }
        })
      }
    })


  },

  async onReady() {
    wx.hideTabBar();

    const storage = await wx.getStorageSync("UserData")
    // 检查用户状态
    if (storage != null) {
      console.log("用户已登录");
      // 异步获取登录信息
      wx.request({
        method: "POST",
        url: apiurl + 'User/Login',
        data: storage,
        success: (data) => {

          this.setData({
            isLoading: false
          });

          if (data.statusCode == 404) return
          app.globalData.jwt = data.data

          wx.request({
            method: "GET",
            header: {
              authorization: "Bearer " + app.globalData.jwt
            },
            url: apiurl + 'User/GetData',
            success: (userData) => {
              if (userData.statusCode !== 200)
                return
              app.globalData.user = userData.data

              setTimeout(() => {
                wx.switchTab({
                  url: '../index/index',
                });
              }, 500);
            }
          })
        }
      })
    }
  }
})