// 配置API接口地址
// let apiRootURL = 'https://localhost:8080/SiChuanMarket_SSM';
// let apiRootURL = 'http://localhost:8080/SiChuanMarket_SSM';
let apiRootURL = baseURL_dynamic;

// 引用axios
let axios = require('axios');
import router from '../router'

// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key]
    }
    if (toType(o[key]) === 'string') {
      o[key] = o[key].trim()
    } else if (toType(o[key]) === 'object') {
      o[key] = filterNull(o[key])
    } else if (toType(o[key]) === 'array') {
      o[key] = filterNull(o[key])
    }
  }
  return o
}

//读取cookies
function getCookie(name) {
  let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg))
    return unescape(arr[2]);
  else
    return null;
}

/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios(method, urlPath, params, success, failure) {
  if (params) {
    params = filterNull(params)
  }
  if (!urlPath) {
    return false
  }
  urlPath = apiRootURL + urlPath;
  let self = this;

  axios({
    method: method,
    url: urlPath,
    data: method === 'POST' || method === 'PUT' ? params : null,
    params: method === 'GET' || method === 'DELETE' ? params : null,
    // baseURL: apiRootURL,
    withCredentials: false,
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json;charset=UTF-8',
      'Authorization': getCookie('token'),
    }
  })
    .then(function (res) {
      /*尝试两种不同的java response模板*/
      if (200 === res.data.retCode || 200 === res.data.code) {
        if (success) {
          success(res.data)
        }
      } else {
        if (failure) {
          console.log(res);
          if (403 === res.data.code) {
            router.push({name: "login"}); //后台token过期了，必须重新登录
          }
          failure(res.data)
        } else {
          window.alert('error: ' + res.data.message)
        }
      }
    })
    .catch(function (err) {
      if (failure) {
        failure(err);
      }
    })
}

// 返回在vue模板中的调用接口
export default {
  get: function (url, params, success, failure) {
    return apiAxios('GET', url, params, success, failure)
  },
  post: function (url, params, success, failure) {
    return apiAxios('POST', url, params, success, failure)
  },
  put: function (url, params, success, failure) {
    return apiAxios('PUT', url, params, success, failure)
  },
  delete: function (url, params, success, failure) {
    return apiAxios('DELETE', url, params, success, failure)
  },
  apiRootURL,
  getCookie,
}
