<template>
  <div class="addProductForm">
    <!--返回按钮-->
    <div class="addProductFormBtn">
      <el-button type="primary" size="small" @click="backToProductList">返 &nbsp;&nbsp;&nbsp;回</el-button>
    </div>
    <!--添加产品表单-->
    <div class="addProFormContent">
      <!--产品名称-->
      <div class="productTitle">
        <span>产品名称：</span>
        <el-input
          class="proNameInput"
          placeholder="请输入内容"
          suffix-icon="el-icon-edit"
          v-model="newProductInfo.productName">
        </el-input>
      </div>
      <!--产品简介-->
      <div class="proShortDescribe">
        <div class="proThumbnail">
          <p>封面小图一张：</p>
          <div class="proThumbnailUpload">
            <el-upload
              :action="uploadThumbnailURL"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <div class="proDescribeTxt">
          <p>产品简述：</p>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="newProductInfo.productDescribe">
          </el-input>
        </div>
      </div>
      <!--产品详情-->
      <div class="proShortDescribe" v-for="(fileItem,index) in newProductInfo.productDetails" :key="index">
        <div class="proThumbnail">
          <p>{{fileItem.fileTitle}} (配图或者视频) ：</p>
          <div class="proThumbnailUpload">
            <el-upload
              action="https://jsonplaceholder.typicode.com/posts/"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="">
            </el-dialog>
          </div>
        </div>
        <div class="proDescribeTxt">
          <p>{{fileItem.fileTitle}} (文字描述) ：</p>
          <el-input
            type="textarea"
            :rows="6"
            placeholder="请输入内容"
            v-model="newProductInfo.productDescribe">
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import pubapi from "../../api/pubapi"

  export default {
    name: "addProductForm",
    data() {
      return {
        newProductInfo: {
          productName: "666",
          productThumbnail: "",
          productDescribe: "",
          productDetails: [
            {
              fileTitle: "产品介绍一",
              fileUrl: "url图片01",
              fileTxt: "图片01",
            },
            {
              fileTitle: "产品介绍二",
              fileUrl: "url图片02",
              fileTxt: "图片02",
            },
            {
              fileTitle: "产品介绍三",
              fileUrl: "url图片03",
              fileTxt: "图片03",
            },
            {
              fileTitle: "产品介绍四",
              fileUrl: "url视频01",
              fileTxt: "视频01",
            }
          ],
        },
        uploadThumbnailURL: pubapi.apiRootURL + "/files/imageByte",
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    mounted() {

    },

    components: {},

    methods: {
      /*返回产品列表*/
      backToProductList() {
        this.$emit("addProFormShow", false)
      },
      /*上传封面小图*/
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
  }
</script>

<style scoped lang="less">
  .addProductForm {
    padding: 0 20px;
    overflow: auto;
    .addProFormContent {
      min-height: 400px;
      width: 100%;
      min-width: 900px;
      height: calc(100vh - 230px);
      .productTitle {
        text-align: left;
        margin: 15px 0;
        .proNameInput {
          width: 300px;
        }
      }
      .proShortDescribe {
        width: 100%;
        margin: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .proThumbnail {
          width: 40%;
          height: 200px;
          .proThumbnailUpload {
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
        .proDescribeTxt {
          width: 60%;
          height: 200px;
        }
      }
    }
  }
</style>
<style lang="less">
  .proThumbnailUpload {
    .el-upload--picture-card {
      height: 138px;
      width: 138px;
      overflow: hidden;
    }
    .el-upload-list__item {
      height: 138px;
      width: 138px;
      overflow: hidden;
    }
  }

</style>
