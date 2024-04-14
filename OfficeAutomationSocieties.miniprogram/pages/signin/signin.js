import {apiurl} from "../../utils/api.js";
const app = getApp()
Page({
  data: {
    isLoading: false
  },

  // 点击登录按钮，执行登录操作
  async login(data) {
    var username = data.detail.value.username;
    var password = data.detail.value.password;
    if (username == '' || password == '') // 暂时这样，需要指定账号密码规则。
    {
      wx.showToast({
        title: '用户名或密码不能为空',
        icon: 'none'
      });
      return;
    }

    const model = {
      phoneNum: username,
      password: password
      }

    // 加载条
    this.setData({
      isLoading: true
    });

    this.getData(model)
  },
  async onReady() {
    wx.hideTabBar();

    const storage = await wx.getStorageSync("UserData")
    // 检查用户状态
    if (storage != null) {
      // 异步获取登录信息
      this.getData(storage)
    }
  },
  getData(userData){
    wx.request({
      method: "POST",
      url: apiurl + 'User/Login',
      data: userData,
      success: (data) => {

        this.setData({
          isLoading: false
        });

        if (data.statusCode == 404) {
          wx.showToast({
            title: '信息有误',
            icon: 'none'
          });
          return
        }
        app.globalData.jwt = data.data

        wx.request({
          method: "GET",
          header: {
            authorization: "Bearer " + app.globalData.jwt
          },
          url: apiurl + 'User/GetData',
          success: (userData) => {
            if (userData.statusCode !== 200){
              wx.showToast({
                title: '登录成功',
                icon: 'none'
              });
              return
            }
            app.globalData.user = userData.data
            wx.showToast({
              title: '登录成功',
              icon: 'none'
            });
            wx.switchTab({
              url: '../index/index',
            });
          }
        })

        wx.setStorageSync("UserData", userData)
      }
    })
  }
})