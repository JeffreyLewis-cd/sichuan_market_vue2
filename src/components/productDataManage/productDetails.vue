<template>
  <div class="productDetails">
    <div>
      <el-button type="primary" size="small" @click.native="backToProList">返&nbsp;&nbsp;&nbsp; 回</el-button>
    </div>
    <h3 class="proDetailsTitle">{{proDetails.productName}}</h3>
    <p class="proDetDescribe">{{proDetails.productDescribe}}"</p>
    <div v-for="(proItem,index) in proDetails.productDetails" :key="index" class="proDetailsItem">
      <img v-if="'image'===checkFileType(proItem.fileUrl)" :src="proItem.fileUrl" class="proDetailImg">
      <video v-if="'video'===checkFileType(proItem.fileUrl)" :src="proItem.fileUrl" controls="controls"
             class="proVideo"></video>
      <p class="proTxt">{{proItem.fileTxt}}</p>

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
      },

      /*判断文件类型*/
      checkFileType(fileUrl) {
        let fileType = fileUrl.split(".").pop();
        console.log(fileType);
        let eleType = "image";
        if ('mp4' === fileType || 'MP4' === fileType) {
          eleType = "video";
        } else {
          eleType = "image";
        }
        return eleType;
      }

    },

  }
</script>

<style scoped lang="less">
  .productDetails {
    height: calc(100vh - 175px);
    width: 96%;
    overflow-y: auto;
    padding: 0 22px;
    .proDetailsTitle {
      text-align: center;
    }
    .proDetDescribe {
      text-indent: 26px;
    }
    .proDetailsItem {
      text-align: center;
      .proDetailImg {
        max-width: 1000px;
      }
      .proVideo {
        max-width: 1000px;
        min-width: 800px;
      }
      .proTxt {
        text-indent: 28px;
        text-align: left;
      }
    }
  }

</style>
