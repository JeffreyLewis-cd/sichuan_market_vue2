import pubapi from "./pubapi"
/*公共promise对象*/
let apiPromise = function (apiParam) {
  return new Promise(function (resolve, reject) {
    pubapi[apiParam.method](
      apiParam.url,
      apiParam.param,
      res => {
        if (res) {
          resolve(res);
        } else {
          reject("error")
        }
      },
      err => {
        reject(err)
      }
    );
  })

};


export default {


  /*添加一条行业信息*/
  addAindustryInfo: function (reqParam) {
    let apiParam = {
      url: "/industryInfo/addAindustryInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*删除一条行业信息*/
  deleteIndustryData: function (reqParam) {
    let apiParam = {
      url: "/industryInfo/deleteAindustryInfo",
      method: "get",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*修改一条行业信息*/
  updateIndustryData: function (reqParam) {
    let apiParam = {
      url: "/industryInfo/updateAindustryInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*查询某个行业信息*/
  findIndustryInfoByCode: function (reqParam) {
    let apiParam = {
      url: "/industryInfo/findIndustryInfoByCode",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },


}









