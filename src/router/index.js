import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('@/views/login/login.vue');

const layout = () => import('@/views/layout/layout.vue');

const userManage = () => import('@/views/backend/userManage/userManage.vue');

const adminAreas = () => import('@/views/administrative/areas/adminAreas.vue');


Vue.use(Router);

const router = new Router({
  routes: [
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
      ]
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

export default router;
