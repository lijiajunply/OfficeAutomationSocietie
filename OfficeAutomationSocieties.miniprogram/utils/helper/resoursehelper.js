// resourselper.js
var route = require("../route")

/* ResourseModel
string Id
string Name
UserModel User
string StartTime
string EndTime
*/

function GetResourses(onsucceed, onfailure) {
  return wx.request({
    url: route.routes.resource,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function GetResourceModel(id, onsucceed, onfailure) {
  return wx.request({
    url: route.routes.resource + "GetResourceModel/" + id,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function PutResourceModel(id, resourse, onsucceed, onfailure) {
  return wx.request({
    url: route.routes.resource + "PutResourceModel/" + id,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function AddResource(resourse, onsucceed, onfailure) {
  return wx.request({
    url: route.routes.resource + "AddResource/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function DeleteResource(id, onsucceed, onfailure) {
  return wx.request({
    url: route.routes.resource + "DeleteResource/" + id,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

module.exports.GetResoursesabc = GetResourses;
module.exports.GetResourceModel = GetResourceModel;
module.exports.PutResourceModel = PutResourceModel;
module.exports.AddResource = AddResource;
module.exports.DeleteResource = DeleteResource;