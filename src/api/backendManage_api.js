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
  /*查询所有的用户*/
  findAllUsers: function () {
    let apiParam = {
      url: "/person/findAllUsers",
      method: "get",
      param: ""
    };
    return apiPromise(apiParam);
  },


  /*添加一个用户*/
  addAnewPerson: function (reqParam) {
    let apiParam = {
      url: "/person/addAnewPerson",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*删除一个用户*/
  deleteUser:function (reqParam) {
    let apiParam = {
      url: "/person/deleteUser",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*编辑用户*/
  updateUser:function (reqParam) {
    let apiParam = {
      url: "/person/updateUser",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

}









