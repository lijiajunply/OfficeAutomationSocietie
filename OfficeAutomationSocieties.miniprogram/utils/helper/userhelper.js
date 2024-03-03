// userhelper.js
var route = require("../route")

/* UserModel
string UserId
string Name
string Password
/// President : 社长,副社长,秘书长
/// Minister : 部长
/// Member : 普通成员
string Identity  = "Member";
List<ProjectModel> Projects
*/

/* LoginModel
string Password
string Name
*/

function GetData(onsucceed, onfailure) {
  return wx.request({
    url: route.routes.user + "GetData/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function SignUp(login, onsucceed, onfailure) {
  return wx.request({
    method: "POST",
    url: route.routes.user + "SignUp/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function Login(login, onsucceed, onfailure) {
  return wx.request({
    method: "POST",
    url: route.routes.user + "Login/",
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

function Update(id, user, onsucceed, onfailure) {
  return wx.request({
    method: "PUT",
    url: route.routes.user + "Update/" + id,
    onsucceed: onsucceed,
    onfailure: onfailure
  })
}

module.exports.GetData = GetData;
module.exports.SignUp = SignUp;
module.exports.Login = Login;
module.exports.Update = Update;