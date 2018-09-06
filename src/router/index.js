import Vue from 'vue'
import Router from 'vue-router'

const userManage = () => import('@/views/backend/userManage/userManage.vue');
const layout = () => import('@/views/layout/layout.vue');
const login = () => import('@/views/login/login.vue');

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: layout
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: "/backend",
      name: "backend",
      component: layout,
      children: [
        {
          path: "userManage",
          name: "backendUserManage",
          component: userManage,
        },
      ]
    }
  ]
});

/*全局路由守卫*/

router.beforeEach((to, from, next) => {
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
  ("true" == loginInfo) ? isLogin = true : isLogin + false;


  /*如果没有登录*/
  if (nextRoute.indexOf(to.name) >= 0) {
    if (!isLogin) {
      console.log("请你登录！");
      router.push({name:"login"});
    }
  }

  /*已登录状态；当路由到login时，跳转至mainPage */
  if ("login" === to.name) {
    if (isLogin) {
      router.push({name: "mainPage"});
    }
  }
  next();  //关键，正常通关

});

export default router;
