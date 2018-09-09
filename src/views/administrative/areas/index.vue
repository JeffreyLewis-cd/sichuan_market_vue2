<template>
    <div>
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">图表展示</el-menu-item>
        <el-menu-item index="2"> 表格展示</el-menu-item>
        <el-menu-item index="3">消息中心</el-menu-item>
      </el-menu>

      <adminAreasCharts v-if="'1'==activeIndex"></adminAreasCharts>
      <adminAreas v-show="'2'==activeIndex"></adminAreas>

    </div>

</template>

<script type="text/ecmascript-6">
   import adminAreas from "./adminAreas"
   import adminAreasCharts from "./adminAreasCharts"


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
        },

        methods: {
          handleSelect(key, keyPath) {
            console.log(key, keyPath);
            this.activeIndex=key;
          }
        },

    }
</script>

<style scoped>

</style>
