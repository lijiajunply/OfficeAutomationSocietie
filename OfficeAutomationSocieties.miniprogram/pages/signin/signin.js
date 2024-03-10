// pages/signin/signin.js
// const userhelper = require("/utils/helper/userhelper.js");

Page({
  data: {
    loginmodel: {
      name: "",
      password: ""
    },
    isLoading: false
  },

  // 点击登录按钮，执行登录操作
  login: function (data) {
    // 判断用户名与密码是否合法
    var username = data.detail.value.username;
    var password = data.detail.value.password;
    if(username == '' || password == '') // 暂时这样，需要指定账号密码规则。
    {
      console.log("用户名或密码非法");
      return;
    }

    // 赋值usermodel
    this.setData({
      loginmodel: {
        name: username,
        password: password
      }
    });
    console.log("LoginModel:",this.data.loginmodel);

    // 加载条
    this.setData({
      isLoading: true
    });

    // 异步获取登录信息
    // userhelper.login(

    // )

    // 模拟异步操作
    // setTimeout(() => {
    //   this.setData({
    //     isLoading: false
    //   });
    //   wx.switchTab({
    //     url: '../index/index',
    //   }).then(() => console.log("Login"));
    // }, 500);
  },

  checkLoginStatus: function () {

  },

  onload() {
    wx.hideTabBar();
    this.checkLoginStatus();
  }
})