<template>
  <div class="other">
    <div class="other-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="other-content" label="其他产业概况" name="thirdProfile">
          <thirdProfile></thirdProfile>
        </el-tab-pane>
        <el-tab-pane class="other-content" label="管理其他产业数据" name="otherDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>
        <el-tab-pane class="other-content" label="配置管理" name="second">配置管理22</el-tab-pane>
        <el-tab-pane class="other-content" label="角色管理" name="third">角色管理33</el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import industryDataManage from "@/components/industryDataManage/industryDataManage"
  import thirdProfile from "@/components/industryDataManage/thirdProfile"


  export default {
    name: "other",
    data() {
      return {
        activeName: 'thirdProfile',
        industryInfoProp: {
          code: "222",
          name: "其他"
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
  .other {
    .other-tabs {
      height: 36px;
      line-height: 36px;
      width: 100%;
    }
    .other-content {
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
