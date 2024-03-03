// announcementhelper.js
var route = require("../route")

/* AnnouncementModel
/// Markdown
public string Context
public UserModel User
public string Time
public string Id
*/

function AddAnnouncement(announcement, onsucceed, onfailure) {
  return wx.request({
    method: "POST",
    url: route.routes.announcement + "AddAnnouncement/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function RemoveAnnouncement(announcement, onsucceed, onfailure) {
  return wx.request({
    method: "POST",
    url: route.routes.announcement + "RemoveAnnouncement/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

module.exports.AddAnnouncement = AddAnnouncement;
module.exports.RemoveAnnouncement = RemoveAnnouncement;