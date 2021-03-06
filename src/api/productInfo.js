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
  /*添加一条产品信息*/
  addAProductInfo: function (reqParam) {
    let apiParam = {
      url: "/ProductInfo/addAProductInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*删除一条产品信息*/
  deleteAProductInfo: function (reqParam) {
    let apiParam = {
      url: "/ProductInfo/deleteAProductInfo",
      method: "get",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*修改一条产品信息*/
  updateAProductInfo: function (reqParam) {
    let apiParam = {
      url: "/ProductInfo/updateAProductInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*通过产品code查询*/
  findProductsByCode: function (reqParam) {
    let apiParam = {
      url: "/ProductInfo/findProductsByCode",
      method: "get",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*通过产品id查询-findProductInfoById*/
  findProductInfoById: function (reqParam) {
    let apiParam = {
      url: "/ProductInfo/findProductInfoById",
      method: "get",
      param: reqParam
    };
    return apiPromise(apiParam);
  }


}










