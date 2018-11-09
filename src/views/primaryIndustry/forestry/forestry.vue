<template>
  <div class="forestry">
    <div class="forestry-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="forestry-content" label="林业概况" name="forestryProfile">
          <primaryProfile></primaryProfile>
        </el-tab-pane>

        <el-tab-pane class="forestry-content" label="管理林业数据" name="industryDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>

        <el-tab-pane class="forestry-content" label="配置管理" name="second">
          <div class="audioTest">
            <p>666</p>
            <video class="videoElement" src="../../../assets/video/x07790mf7cj.m701.mp4" controls="controls"></video>
          </div>
        </el-tab-pane>
        <el-tab-pane class="forestry-content" label="角色管理" name="third">角色管理33</el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import industryDataManage from "@/components/industryDataManage/industryDataManage"
  import primaryProfile from "@/components/industryDataManage/primaryProfile"


  export default {
    name: "forestry",
    data() {
      return {
        activeName: 'forestryProfile',
        industryInfoProp: {
          code: "202",
          name: "林业"
        }
      }
    },
    mounted() {

    },

    components: {
      industryDataManage,
      primaryProfile
    },

    methods: {
      handleClick(tab, event) {

      }
    },

  }
</script>

<style scoped lang="less">
  .forestry {
    .forestry-tabs {
      height: 36px;
      line-height: 36px;
      width: 100%;
    }
    .forestry-content {
      height: calc(100vh - 180px);
      width: calc(100% - 22px);
      border: 1px solid #E5E5E5;
      border-radius: 5px;
      background: #fff;
      min-height: 300px;
      min-width: 50px;
      padding: 10px;
      .audioTest {
        height: 500px;
        width: 800px;
        margin: 0 auto;
        border: 1px solid red;
        .videoElement {
          height: 100%;
          width: 100%;
        }
      }
    }
  }

</style>
