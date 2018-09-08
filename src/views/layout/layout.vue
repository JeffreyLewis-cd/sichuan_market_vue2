<template>

  <div class="layout">
    <div class="layout-left " :class="{'layout-left-collapse':leftSideNavCollapse}">
      <leftSideNav></leftSideNav>
    </div>
    <div class="layout-right " :class="{'layout-right-collapse':leftSideNavCollapse}">
      <topBar class="layout-right-topbar"></topBar>
      <div class="layout-right-details">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import leftSideNav from '@/views/layout/leftSideNav/leftSideNav';
  import topBar from '@/views/layout/topBar/topBar';
  import {mapGetters} from "vuex"


  export default {
    name: 'Title',
    data() {
      return {
        msg: 'hello vue'
      }
    },
    mounted: function () {
      console.log("主页-01-layout");
    },
    components: {
      leftSideNav,
      topBar,
    },
    methods: {},
    computed: {

      ...mapGetters({
        leftSideNavCollapse: 'leftSideNavCollapse',
      })
    }
  }
</script>

<style scoped lang="less">
  @pageMinheight: 600px;

  .layout {
    width: 100%;
    height: 100vh;
    min-height: @pageMinheight;
    background-color: aqua;
    display: flex;

    .layout-left {
      height: 100vh;
      min-height: @pageMinheight;
      width: 15%;
      min-width: 70px;
      background-color: #002140;
      transition: width linear 270ms;
    }
    .layout-right {
      height: 100vh;
      min-height: @pageMinheight;
      width: 85%;
      background-color: gray;
      transition: width linear 270ms;
      .layout-right-topbar {
        height: 60px;
        line-height: 60px;
        padding-right: 20px;
        width: calc(100% - 40px);
        background-color: #fff;
      }
      .layout-right-details {
        height: calc(100vh - 100px);
        min-height: @pageMinheight - 100px;
        width: calc(100% - 40px);
        background-color: #f0f2f5;
        padding: 20px;
      }
    }

    .layout-left-collapse {
      width: 60px;
    }
    .layout-right-collapse {
      width: calc(100% - 60px);
    }
  }

</style>
