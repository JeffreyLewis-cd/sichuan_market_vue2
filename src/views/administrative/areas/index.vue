<template>
  <div class="cityGDP">
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">图表展示</el-menu-item>
      <el-menu-item index="2"> 表格展示</el-menu-item>
      <el-menu-item index="3">文件上传</el-menu-item>
    </el-menu>
    <adminAreasCharts v-if="'1'==activeIndex"></adminAreasCharts>
    <adminAreas v-show="'2'==activeIndex"></adminAreas>
    <fileUpload v-show="'3'==activeIndex"></fileUpload>
  </div>
</template>

<script type="text/ecmascript-6">
  import adminAreas from "./adminAreas"
  import adminAreasCharts from "./adminAreasCharts"
  import fileUpload from "./fileUpload"

  import {mapGetters} from "vuex"

  export default {
    name: "index",
    data() {
      return {
        activeIndex: '1',
      }
    },
    mounted() {

    },

    components: {
      adminAreas,
      adminAreasCharts,
      fileUpload,
    },

    methods: {
      handleSelect(key, keyPath) {
        this.activeIndex = key;
      }
    },
    computed: {

      ...mapGetters({
        leftSideNavCollapse: 'leftSideNavCollapse',
      })
    },
    watch: {
      leftSideNavCollapse() {
        let self = this;
        if ('1' === self.activeIndex) {
          self.activeIndex = '0';
          setTimeout(function () {
            self.activeIndex = '1';
          }, 200)
        }
      }

    }

  }
</script>

<style scoped lang="less">
  .el-menu-demo {
    height: 40px !important;
    line-height: 40px !important;
    background-color: #f0f2f5;
  }

</style>
<style lang="less">
  .el-menu-demo {
    .el-menu-item {
      height: 40px !important;
      line-height: 40px !important;
    }
    .is-active {
      background-color: #f0f2f5 !important;
    }
    .el-menu-item:hover {
      background-color: #f0f2f5 !important;
      color: #409EFF !important;
    }
  }

</style>

