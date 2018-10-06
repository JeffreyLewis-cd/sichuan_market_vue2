<template>
  <div class="hotel">
    <div class="hotel-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="hotel-content" label="住宿、餐饮业概况" name="thirdProfile">
          <thirdProfile></thirdProfile>
        </el-tab-pane>
        <el-tab-pane class="hotel-content" label="管理住宿、餐饮业数据" name="hotelDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>
        <el-tab-pane class="hotel-content" label="配置管理" name="second">配置管理22</el-tab-pane>
        <el-tab-pane class="hotel-content" label="角色管理" name="third">角色管理33</el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import industryDataManage from "@/components/industryDataManage/industryDataManage"
  import thirdProfile from "@/components/industryDataManage/thirdProfile"


  export default {
    name: "hotel",
    data() {
      return {
        activeName: 'thirdProfile',
        industryInfoProp: {
          code: "211",
          name: "住宿、餐饮业"
        }
      }
    },
    mounted() {

    },

    components: {
      industryDataManage,
      thirdProfile,
    },

    methods: {
      handleClick(tab, event) {

      }
    },

  }
</script>

<style scoped lang="less">
  .hotel {
    .hotel-tabs {
      height: 36px;
      line-height: 36px;
      width: 100%;
    }
    .hotel-content {
      height: calc(100vh - 180px);
      width: calc(100% - 22px);
      border: 1px solid #E5E5E5;
      border-radius: 5px;
      background: #fff;
      min-height: 300px;
      min-width: 50px;
      padding: 10px;
    }
  }

</style>
