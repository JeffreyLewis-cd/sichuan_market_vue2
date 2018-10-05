<template>
  <div class="construction">
    <div class="construction-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="construction-content" label="建筑业概况" name="secondaryProfile">
          <secondaryProfile></secondaryProfile>
        </el-tab-pane>
        <el-tab-pane class="construction-content" label="管理建筑业数据" name="constructionDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>
        <el-tab-pane class="construction-content" label="配置管理" name="second">配置管理22</el-tab-pane>
        <el-tab-pane class="construction-content" label="角色管理" name="third">角色管理33</el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import industryDataManage from "@/components/industryDataManage/industryDataManage"
  import secondaryProfile from "@/components/industryDataManage/secondaryProfile"


  export default {
    name: "industry",
    data() {
      return {
        activeName: 'secondaryProfile',
        industryInfoProp: {
          code: "208",
          name: "建筑业"
        }
      }
    },
    mounted() {

    },

    components: {
      industryDataManage,
      secondaryProfile,
    },

    methods: {
      handleClick(tab, event) {

      }
    },

  }
</script>

<style scoped lang="less">
  .construction {
    .construction-tabs {
      height: 36px;
      line-height: 36px;
      width: 100%;
    }
    .construction-content {
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
