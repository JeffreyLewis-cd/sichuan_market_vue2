<template>
  <div class="agriculture">
    <div class="agri-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="agri-content" label="农业概况" name="agricultureProfile">
          <agricultureProfile></agricultureProfile>
        </el-tab-pane>
        <el-tab-pane class="agri-content" label="配置管理" name="second">配置管理22</el-tab-pane>
        <el-tab-pane class="agri-content" label="角色管理" name="third">角色管理33</el-tab-pane>
        <el-tab-pane class="agri-content" label="管理农业数据" name="agricultureDataManage">
          <agricultureDataManage></agricultureDataManage>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import agricultureProfile from "./agricultureProfile"
  import agricultureDataManage from "./agricultureDataManage"


  export default {
    name: "agriculture",
    data() {
      return {
        activeName: 'agricultureProfile'
      }
    },
    mounted() {

    },

    components: {
      agricultureProfile,
      agricultureDataManage,
    },

    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
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
