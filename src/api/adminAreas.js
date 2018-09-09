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
            city_id: "41a48663-765c-41b0-8efb-52834b9c4249",
            city_name: "7",
            city_areas: 7,
            city_areas_unit: "7",
            city_airlines:0,
            city_airlines_unit:"",
            city_areas:7,
            city_areas_unit:"7",
            city_cars_counts:0,
            city_gdp_pp:0,
            city_gdp_pp_unit:"",
            city_gdp_total:0,
            city_gdp_total_unit:"",
            city_gov_address:"",
            city_id:"41a48663-765c-41b0-8efb-52834b9c4249",
            city_name:"7",
            city_population:7,
            city_population_unit:"7",
            city_scenic_spots:0,
            city_train:0,
            city_train_unit:""
            };*/


export default {



  /*添加一条城市信息*/
  addAnewCityInfo: function (reqParam) {
    let apiParam = {
      url: "/cityInfo/addAnewCityInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*删除一条城市信息*/
  deleteCityInfo: function (reqParam) {
    let apiParam = {
      url: "/cityInfo/deleteCityInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },

  /*修改一条城市信息*/
  updateCityInfo: function (reqParam) {
    let apiParam = {
      url: "/cityInfo/updateCityInfo",
      method: "post",
      param: reqParam
    };
    return apiPromise(apiParam);
  },


  /*查询所有的城市信息*/
  findAllCityInfo: function () {
    let apiParam = {
      url: "/cityInfo/findAllCityInfo",
      method: "get",
      param: ""
    };
    return apiPromise(apiParam);
  },

  /*查询城市总GDP列表*/
  findTotalGDPList: function () {
    let apiParam = {
      url: "/cityInfo/findTotalGDPList",
      method: "get",
      param: ""
    };
    return apiPromise(apiParam);
  },

}









