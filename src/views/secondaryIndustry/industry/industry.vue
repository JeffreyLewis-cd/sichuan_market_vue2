<template>
  <div class="industry">
    <div class="industry-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="industry-content-pub" label="工业概况" name="secondaryProfile">
          <secondaryProfile></secondaryProfile>
        </el-tab-pane>
        <el-tab-pane class="industry-content-pub" label="管理工业数据" name="industryDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>
        <el-tab-pane class="industry-content-pub" label="配置管理" name="second">配置管理22</el-tab-pane>
        <el-tab-pane class="industry-content-pub" label="角色管理" name="third">角色管理33</el-tab-pane>
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
          code: "221",
          name: "工业"
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
  @import "../../../assets/style/basicStyle";

  .industry {
    .industry-tabs {
      height: 36px;
      line-height: 36px;
      width: 100%;
    }
  }

</style>
