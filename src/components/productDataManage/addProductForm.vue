<template>
  <div class="addProductForm">
    <!--返回按钮-->
    <div class="addProductFormBtn">
      <el-button type="primary" size="small" @click="backToProductList">返 &nbsp;&nbsp;&nbsp;回</el-button>
    </div>
    <!--添加产品表单-->
    <div class="addProFormContent">

    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "addProductForm",
    data() {
      return {}
    },
    mounted() {

    },

    components: {},

    methods: {
      /*返回产品列表*/
      backToProductList() {
        this.$emit("addProFormShow", false)
      }
    },

  }
</script>

<style scoped lang="less">
  .addProductForm {
    padding: 0 20px;
    border: 1px solid red;
    overflow: auto;

    .addProFormContent {
      min-height: 400px;
      width: 100%;
      height: calc(100vh - 230px);
      border: 1px solid blue;
    }
  }

</style>
