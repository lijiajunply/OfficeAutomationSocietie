const app = getApp()

Page({
  data: {
    thisProject: {}
  },
  onLoad(options) {
    const a = app.globalData.projects.find(item => item.id === options.id)
    if(a == null){
      console.log("有问题",app.globalData.projects,options.id)
      return}
    this.setData({
      thisProject : a
    })
  }
})