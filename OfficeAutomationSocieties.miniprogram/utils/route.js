const baseurl = "https://localhost/";
const apiurl = baseurl + "api/";
const routes = {
  user: apiurl + "Member/",
  resource: apiurl + "Resource/",
  project: apiurl + "Projects/",
  announcement: apiurl + "Announcement/"
};

module.exports.baseurl = baseurl;
module.exports.apiurl = apiurl;
module.exports.routes = routes;