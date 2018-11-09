<template>
  <div class="agriculture">
    <div class="agri-tabs">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane class="agri-content" label="农业概况" name="agricultureProfile">
          <primaryProfile v-if="'agricultureProfile'===activeName"></primaryProfile>
        </el-tab-pane>

        <el-tab-pane class="agri-content" label="农业数据" name="industryDataManage">
          <industryDataManage :industryInfoProp="industryInfoProp"></industryDataManage>
        </el-tab-pane>
        <el-tab-pane class="agri-content" label="农业企业" name="second">
          <companyDataManage></companyDataManage>
        </el-tab-pane>
        <el-tab-pane class="agri-content" label="农业产品" name="third">
          <productDataManage></productDataManage>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>

</template>

<script type="text/ecmascript-6">
  import industryDataManage from "@/components/industryDataManage/industryDataManage"
  import companyDataManage from "@/components/companyDataManage/companyDataManage"
  import primaryProfile from "@/components/industryDataManage/primaryProfile"
  import productDataManage from "@/components/productDataManage/productDataManage"


  export default {
    name: "agriculture",
    data() {
      return {
        activeName: 'agricultureProfile',
        industryInfoProp: {
          code: "201",
          name: "农业"
        }
      }
    },
    mounted() {

    },

    components: {
      industryDataManage,
      primaryProfile,
      companyDataManage,
      productDataManage,
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
      height: calc(100vh - 130px);
      width: calc(100% - 22px);
      border: 1px solid #E5E5E5;
      border-radius: 5px;
      background: #fff;
      min-height: 300px;
      min-width: 50px;
      padding: 10px;
      padding-top: 5px;
      overflow: hidden;
    }
  }

</style>
