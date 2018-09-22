import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('@/views/login/login.vue');

const layout = () => import('@/views/layout/layout.vue');

/*四川概况*/
const adminAreas = () => import('@/views/administrative/areas/index.vue');
const adminMap = () => import('@/views/administrative/map/sichuanMap.vue');


/*后台管理*/
const userManage = () => import('@/views/backend/userManage/userManage.vue');


Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: 'mainPage',
      component: layout,
      children: [
        {
          path: "adminAreas",
          name: "adminAreas",
          component: adminAreas,
        },
        {
          path: "adminMap",
          name: "adminMap",
          component: adminMap,
        },
      ]
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

export default router;
