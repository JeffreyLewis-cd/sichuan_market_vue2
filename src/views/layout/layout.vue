<template>
  <div class="layout">
    <!--页面左侧导航-->
    <div class="layout-left " :class="{'layout-left-collapse':leftSideNavCollapse}">
      <leftSideNav @adjustRightHeight="adjustRightHeightFa" ref="layoutLeft"></leftSideNav>
    </div>
    <!--页面右侧主体部分-->
    <div class="layout-right " ref="layoutRight"
         :class="{'layout-right-collapse':leftSideNavCollapse}">
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

    },
    components: {
      leftSideNav,
      topBar,
    },
    methods: {
      /*调整页面右边高度*/
      adjustRightHeightFa(val) {
        let newRheight = '';
        let rightEle = this.$refs.layoutRight;
        if (document.body.clientHeight < val) {
          newRheight = val + "px";
        } else {
          newRheight = "100vh"
        }
        rightEle.style.height = newRheight;
      }
    },
    computed: {
      ...mapGetters({
        leftSideNavCollapse: 'leftSideNavCollapse',
      })
    }
  }
</script>

<style scoped lang="less">
  @pageMinheight: 500px;
  .layout {
    width: 100%;
    height: 100vh;
    overflow: hidden !important;
    min-height: @pageMinheight;
    background-color: #f0f2f5;
    display: flex;
    .layout-left {
      height: 100vh;
      overflow: hidden !important;
      min-height: @pageMinheight;
      width: 200px;
      min-width: 70px;
      background-color: #002140;
      transition: width linear 270ms;
    }
    .layout-right {
      height: 100vh;
      overflow: hidden !important;
      min-height: @pageMinheight;
      width: calc(100% - 200px);
      background-color: #F0F2F5;
      transition: width linear 270ms, height linear 270ms;
      .layout-right-topbar {
        height: 60px;
        line-height: 60px;
        padding-right: 20px;
        width: calc(100% - 20px);
        background-color: #fff;
      }
      .layout-right-details {
        height: calc(100vh - 100px);
        min-height: @pageMinheight - 100px;
        width: calc(100% - 40px);
        background-color: #f0f2f5;
        padding: 20px;
        overflow: hidden;
      }
    }

    .layout-left-collapse {
      width: 60px;
    }
    .layout-right-collapse {
      width: calc(100% - 60px);
      overflow: hidden;
    }
  }

</style>
<style lang="less">
  @import "../../assets/style/basicStyle";
</style>
