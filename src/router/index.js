import Vue from 'vue'
import Router from 'vue-router'

const login = () => import('@/views/login/login.vue');

const layout = () => import('@/views/layout/layout.vue');

/*四川概况*/
const adminAreas = () => import('@/views/administrative/areas/index.vue');
const adminMap = () => import('@/views/administrative/map/sichuanMap.vue');

/*第一产业*/
const agriculture = () => import('@/views/primaryIndustry/agriculture/agriculture.vue');
const forestry = () => import('@/views/primaryIndustry/forestry/forestry.vue');
const animal = () => import('@/views/primaryIndustry/animal/animal.vue');
const fisheries = () => import('@/views/primaryIndustry/fisheries/fisheries.vue');

/*第二产业*/
const industry = () => import('@/views/secondaryIndustry/industry/industry.vue');
const construction = () => import('@/views/secondaryIndustry/construction/construction.vue');


/*第三产业*/
const transportation = () => import('@/views/thirdIndustry/transportation/transportation.vue');
const wholeSale = () => import('@/views/thirdIndustry/wholeSale/wholeSale.vue');
const hotel = () => import('@/views/thirdIndustry/hotel/hotel.vue');
const finance = () => import('@/views/thirdIndustry/finance/finance.vue');
const realEstate = () => import('@/views/thirdIndustry/realEstate/realEstate.vue');
const other = () => import('@/views/thirdIndustry/other/other.vue');




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
    /*四川概况*/
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

    /*第一产业*/
    {
      path: "/primaryIndustry",
      name: "primaryIndustry",
      component: layout,
      children: [
        {
          path: "agriculture",
          name: "agriculture",
          component: agriculture,
        },
        {
          path: "forestry",
          name: "forestry",
          component: forestry,
        },
        {
          path: "animal",
          name: "animal",
          component: animal,
        },
        {
          path: "fisheries",
          name: "fisheries",
          component: fisheries,
        },
      ]
    },

    /*第二产业*/
    {
      path: "/secondaryIndustry",
      name: "secondaryIndustry",
      component: layout,
      children: [
        {
          path: "industry",
          name: "industry",
          component: industry,
        },
        {
          path: "construction",
          name: "construction",
          component: construction,
        },

      ]
    },


    /*第三产业*/
    {
      path: "/thirdIndustry",
      name: "thirdIndustry",
      component: layout,
      children: [
        {
          path: "transportation",
          name: "transportation",
          component: transportation,
        },
        {
          path: "wholeSale",
          name: "wholeSale",
          component: wholeSale,
        },
        {
          path: "hotel",
          name: "hotel",
          component: hotel,
        },
        {
          path: "finance",
          name: "finance",
          component: finance,
        },
        {
          path: "realEstate",
          name: "realEstate",
          component: realEstate,
        },
        {
          path: "other",
          name: "other",
          component: other,
        },


      ]
    },



    /*后台管理*/
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
    },
  ]
});

export default router;
