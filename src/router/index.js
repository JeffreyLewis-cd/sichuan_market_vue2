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

console.log("666");

export default router;
