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

//参数格式
/*
    reqParam={
      name:"",
      password:"",
      phone:"",
      email:"",
      status:"",
    };*/


export default {



  /*用户登录*/
  login: function (reqParam) {
    let apiParam = {
      url: "/person/login",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },



}









