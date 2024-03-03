// projecthelper.js
var route = require("../route")

/* ProjectModel
List<UserModel> Members
string Nam
string Id
List<FileModel> Files
/// 示例:
/// User1 : 2023/01/01 - 2023/02/01 : 写代码 : E!@# (计划代号)
/// User2 : 2023/03/01 - 2023/04/01 : 写代码 : E!@# (计划代号)
string Gantt 
*/

function GetProjects(onsucceed, onfailure) {
  return wx.request({
    url: route.routes.project + "GetProjects/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function JoinProjects(id, onsucceed, onfailure) {
  return wx.request({
    method: "POST",
    url: route.routes.project + "JoinProjects/" + id,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function CreateProjects(onsucceed, onfailure) {
  return wx.request({
    method: "POST",
    url: route.routes.project + "CreateProjects/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function RemoveProjects(id, onsucceed, onfailure) {
  return wx.request({
    method: "DELETE",
    url: route.routes.project + "RemoveProjects/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function AddFile(id, file, onsucceed, onfailure) {
  return wx.request({
    method: "PUT",
    url: route.routes.project + "AddFile/" + id,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function AddGantt(id, gantt, onsucceed, onfailure) {
  return wx.request({
    method: "PUT",
    url: route.routes.project + "AddGantt/" + id,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function RemoveGantt(id, gantt, onsucceed, onfailure) {
  return wx.request({
    method: "DELETE",
    url: route.routes.project + "RemoveGantt/" + id,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

module.exports.GetProjects = GetProjects;
module.exports.JoinProjects = JoinProjects;
module.exports.CreateProjects = CreateProjects;
module.exports.RemoveProjects = RemoveProjects;
module.exports.AddFile = AddFile;
module.exports.AddGantt = AddGantt;
module.exports.RemoveGantt = RemoveGantt;