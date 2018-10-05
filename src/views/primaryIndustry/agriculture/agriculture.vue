<template>
  <div class="agriculture">
    <div class="agri-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="agri-content" label="农业概况" name="agricultureProfile">
          <industryProfile></industryProfile>
        </el-tab-pane>

        <el-tab-pane class="agri-content" label="管理农业数据" name="industryDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>
        <el-tab-pane class="agri-content" label="配置管理" name="second">配置管理22</el-tab-pane>
        <el-tab-pane class="agri-content" label="角色管理" name="third">角色管理33</el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import industryDataManage from "@/components/industryDataManage/industryDataManage"
  import industryProfile from "@/components/industryDataManage/industryProfile"


  export default {
    name: "agriculture",
    data() {
      return {
        activeName: 'agricultureProfile',
        industryInfoProp:{
          code:"201",
          name:"农业"
        }
      }
    },
    mounted() {

    },

    components: {
      industryDataManage,
      industryProfile,
    },

    methods: {
      handleClick(tab, event) {

      }
    },

  }
</script>

<style scoped lang="less">
  .agriculture {
    .agri-tabs {
      height: 36px;
      line-height: 36px;
      width: 100%;
    }
    .agri-content {
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
