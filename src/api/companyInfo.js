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


  /*添加一条企业信息*/
  addACompanyInfo: function (reqParam) {
    let apiParam = {
      url: "/companyInfo/addACompanyInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },


  /*删除一条企业信息*/
  deleteACompanyInfo: function (reqParam) {
    let apiParam = {
      url: "/companyInfo/deleteACompanyInfo",
      method: "get",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*修改一条企业信息*/
  updateACompanyInfo: function (reqParam) {
    let apiParam = {
      url: "/companyInfo/updateACompanyInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*查询某个企业信息-根据行业ID*/
  findComInfoByIndustryId: function (reqParam) {
    let apiParam = {
      url: "/companyInfo/findComInfoByIndustryId",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*查询某个企业信息-根据行业code*/
  findComInfoByIndustryCode: function (reqParam) {
    let apiParam = {
      url: "/companyInfo/findComInfoByIndustryCode",
      method: "get",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*查询某个企业信息-根据企业ID*/
  findCompanyInfoById: function (reqParam) {
    let apiParam = {
      url: "/companyInfo/findCompanyInfoById",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

}










