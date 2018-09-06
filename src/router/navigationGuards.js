import router from "./index"


/*全局路由守卫*/

router.beforeEach((to, from, next) => {
  console.log("888");
  const nextRoute = ["backendUserManage", "mainPage", "backend"];  //被守卫的页面
  let isLogin = false;

  //读取cookies
  function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }

  let loginInfo = getCookie("loginInfo");
  ("true" == loginInfo) ? isLogin = true : isLogin = false;

  /*如果没有登录*/
  if (nextRoute.indexOf(to.name) >= 0 && !isLogin) {
    console.log("请你登录-55！");
    router.push({path: '/login'});
  } else {
    next();  //关键，正常通关
  }
});

export default router;
