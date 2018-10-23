<template>
  <div class="industryDetailsPage">
    <div class="indusDetailsBtns">
      <el-button type="primary" size="small" @click.native="backToIndustryList">返&nbsp;&nbsp;&nbsp;回</el-button>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: "industryDetails",
    data() {
      return {}
    },
    mounted() {

    },

    components: {},

    methods: {
      /*返回行业列表*/
      backToIndustryList() {
        this.$emit("backToInustryList", false);
      }
    },

  }
</script>

<style scoped lang="less">
  .indusDetailsBtns {
    height: 38px;
    width: 100%;
    text-align: right;
  }

</style>
