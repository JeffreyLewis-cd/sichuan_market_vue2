<template>
  <div class="fisheries">
    <div class="fisheries-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="fisheries-content" label="渔业概况" name="fisheriesProfile">
          <primaryProfile></primaryProfile>
        </el-tab-pane>

        <el-tab-pane class="fisheries-content" label="管理渔业数据" name="industryDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>

        <el-tab-pane class="fisheries-content" label="配置管理" name="second">配置管理22</el-tab-pane>
        <el-tab-pane class="fisheries-content" label="角色管理" name="third">角色管理33</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import industryDataManage from "@/components/industryDataManage/industryDataManage"
  import primaryProfile from "@/components/industryDataManage/primaryProfile"


  export default {
    name: "fisheries",
    data() {
      return {
        activeName: 'fisheriesProfile',
        industryInfoProp: {
          code: "204",
          name: "渔业"
        }
      }
    },
    mounted() {

    },

    components: {
      industryDataManage,
      primaryProfile,
    },

    methods: {
      handleClick(tab, event) {

      }
    },

  }
</script>

<style scoped lang="less">
  .fisheries {
    .fisheries-tabs {
      height: 36px;
      line-height: 36px;
      width: 100%;
    }
    .fisheries-content {
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
