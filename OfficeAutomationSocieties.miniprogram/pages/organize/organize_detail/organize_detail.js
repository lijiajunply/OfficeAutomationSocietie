import {
  apiurl
} from "../../../utils/api.js";
const app = getApp()

Page({
  data: {
    thisOrganize: {},
    members: [],
    doingRes: [],
    willBeRes: [],
    isDigShow: false,
    buttons: [{
      text: "取消"
    }, {
      text: "确认"
    }],
    isAddShow: false,
    ann : {}
  },
  onLoad(options) {
    const a = app.globalData.organizes.find(item => item.id === options.id)
    if (a == null) {
      wx.showToast({
        title: '组织不存在'
      })
      wx.navigateBack()
      return
    }
    this.setData({
      thisOrganize: a,
      ann : a.announcements[0]
    })

    function formatDate(dateStr) {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}年${month}月${day}日`;
    }

    if (a.resources.length !== 0) {
      a.resources.forEash(x => {
        if (x.endTime === "") {
          this.data.willBeRes.push(x)
        } else {
          x.endTime = formatDate(x.endTime)
          this.data.doingRes.push(x)
        }
      })

      this.setData({
        willBeRes: this.data.willBeRes,
        doingRes: this.data.doingRes,
      })
    }

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
  },
  quitOrganize() {
    this.setData({
      isDigShow: true
    })
  },
  buttontap(detail) {
    console.log(detail.detail)
    if (detail.detail.index === 0) {
      this.setData({
        isDigShow: false
      })
      return
    }

    wx.request({
      method: "GET",
      header: {
        authorization: "Bearer " + app.globalData.jwt
      },
      url: apiurl + 'Organize/QuitOrganize/' + this.data.thisOrganize.id,
      success: (data) => {
        if (data.statusCode !== 200) return
        const index = app.globalData.organizes.indexOf(this.data.thisOrganize);
        app.globalData.organizes.splice(index, 1)
        wx.navigateBack()
      }
    })

    this.setData({
      isDigShow: false
    })
  },
  lookAnn(){
    if(this.data.ann == null){
      wx.showToast({
        title: '暂无公告',
        icon: 'none'
      })
      return
    }
    this.setData({
      isAddShow: true
    })
  }
})