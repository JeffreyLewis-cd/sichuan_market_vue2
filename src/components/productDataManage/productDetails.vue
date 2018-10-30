<template>
  <div class="productDetails">
    <div>
      <el-button type="primary" size="small" @click.native="backToProList">返&nbsp;&nbsp;&nbsp; 回</el-button>
    </div>
    <h3 class="proDetailsTitle">{{proDetails.productName}}</h3>
    <p class="proDetDescribe">{{proDetails.productDescribe}}"</p>
    <div v-for="(proItem,index) in proDetails.productDetails" :key="index">
      <img :src="proItem.fileUrl">
      <p>{{proItem.fileTxt}}</p>

    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: "productDetails",
    props: ["proDetailsProp"],
    data() {
      return {
        proDetails: this.proDetailsProp,
      }
    },
    mounted() {
      console.log(this.proDetails);
    },

    components: {},

    methods: {
      /*返回产品列表*/
      backToProList() {
        this.$emit("backToProList", "productList")
      }
    },

  }
</script>

<style scoped lang="less">
  .productDetails {
    padding: 0 22px;
    .proDetailsTitle {
      text-align: center;
    }
    .proDetDescribe {
      border: 1px solid red;
      text-indent: 26px;
    }
  }

</style>
