<template>
  <div class="realEstate">
    <div class="realEstate-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="realEstate-content" label="房地产业概况" name="thirdProfile">
          <thirdProfile></thirdProfile>
        </el-tab-pane>
        <el-tab-pane class="realEstate-content" label="管理房地产业数据" name="realEstateDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>
        <el-tab-pane class="realEstate-content" label="配置管理" name="second">配置管理22</el-tab-pane>
        <el-tab-pane class="realEstate-content" label="角色管理" name="third">角色管理33</el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import industryDataManage from "@/components/industryDataManage/industryDataManage"
  import thirdProfile from "@/components/industryDataManage/thirdProfile"


  export default {
    name: "realEstate",
    data() {
      return {
        activeName: 'thirdProfile',
        industryInfoProp: {
          code: "214",
          name: "房地产业"
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
  .realEstate {
    .realEstate-tabs {
      height: 36px;
      line-height: 36px;
      width: 100%;
    }
    .realEstate-content {
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
