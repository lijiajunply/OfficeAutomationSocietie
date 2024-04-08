// pages/signin/signin.js
// const userhelper = require("/utils/helper/userhelper.js");
const api = require("../../utils/api.js");
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
    console.log("LoginModel:", this.data.loginmodel);

    // 加载条
    this.setData({
      isLoading: true
    });

    // 异步获取登录信息
    wx.request({
      method: "POST",
      url: api.apiurl + 'User/Login',
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
          url: api.apiurl + 'User/GetData',
          data: this.data.loginmodel
          ,
          success: (userData) => {
            console.log(userData)
            if (userData.statusCode !== 200)
              return

            console.log(userData.data)
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

  async onload() {
    wx.hideTabBar();

    // 检查用户状态
    if (await wx.getStorageSync("UserData")) {
      console.log("用户已登录");
      wx.request({
        url: api.apiurl + 'User/GetData',
        success: () => {
          wx.switchTab({
            url: '../index/index',
          });
        }
      })
    }
  }
})