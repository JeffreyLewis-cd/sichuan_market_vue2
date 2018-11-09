<template>
  <div class="addProductForm">
    <!--返回按钮-->
    <div class="addProductFormBtn">
      <el-button type="primary" size="small" @click="backToProductList">返 &nbsp;&nbsp;&nbsp;回</el-button>
      <el-button type="success" size="small" @click="clickSaveBtn">保 &nbsp;&nbsp;&nbsp;存</el-button>
    </div>
    <!--添加产品表单-->
    <div class="addProFormContent">
      <!--产品名称-->
      <div class="productTitleAndType">
        <div class="productTitle">
          <span>产品名称：</span>
          <el-input
            class="proNameInput"
            placeholder="请输入内容"
            suffix-icon="el-icon-edit"
            v-model="newProductInfo.productName">
          </el-input>
        </div>
        <div class="productType">
          <span>产品类型：</span>
          <el-select v-model="newProductInfo.productCode" placeholder="请选择">
            <el-option
              v-for="item in proCategoryList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
      </div>
      <!--产品简介-->
      <div class="proShortDescribe">
        <div class="proFile">
          <p>封面小图一张：</p>
          <div class="proFileUpload">
            <el-upload
              :action="uploadThumbnailURL"
              list-type="picture-card"
              :limit="1"
              :headers="headersSetting"
              :file-list="thumbnailFile"
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
        <div class="proFile">
          <p>{{fileItem.fileTitle}} (配图或者视频) ：</p>
          <div class="proFileUpload" @click.stop="setFileIndex(index)">
            <el-upload
              :action="storeInFileSystem"
              :headers="headersSetting"
              :limit="1"
              :file-list="formatDetailsFile(fileItem)"
              list-type="picture-card"
              :on-success="uploadFileSuccess"
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
            v-model="fileItem.fileTxt">
          </el-input>
        </div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import pubapi from "../../api/pubapi"
  import productInfoAPI from "../../api/productInfo"

  export default {
    name: "addProductForm",
    props: ["updateProInfoProp"],
    data() {
      return {
        newProductInfo: {
          productName: "666",
          productThumbnail: "",
          productDescribe: "",
          productCode: "",
          productDetails: [
            {
              productId: "",
              fileTitle: "产品介绍一",
              fileUrl: "url图片01",
              fileTxt: "图片01",
            },
            {
              productId: "",
              fileTitle: "产品介绍二",
              fileUrl: "url图片02",
              fileTxt: "图片02",
            },
            {
              productId: "",
              fileTitle: "产品介绍三",
              fileUrl: "url图片03",
              fileTxt: "图片03",
            },
            {
              productId: "",
              fileTitle: "产品介绍四",
              fileUrl: "url视频01",
              fileTxt: "视频01",
            }
          ],
        },
        uploadThumbnailURL: pubapi.apiRootURL + "/ProductInfo/imageByte",
        storeInFileSystem: pubapi.apiRootURL + "/ProductInfo/storeInFileSystem",
        dialogImageUrl: '',
        dialogVisible: false,
        headersSetting: {
          'Authorization': this.getCookie('token'),
        },
        activeDetailsIndex: 0,
        proCategoryList: [
          {
            label: "水果",
            value: "401"
          },
          {
            label: "粮食",
            value: "402"
          },
          {
            label: "油料",
            value: "403"
          },
          {
            label: "蔬菜",
            value: "404"
          },
          {
            label: "花卉",
            value: "405"
          },
          {
            label: "调料",
            value: "406"
          },
        ],
        value: '',
        productFormState: "add",
        thumbnailFile: [],
      }
    },
    mounted() {
      if (null != this.updateProInfoProp) {
        this.newProductInfo = this.updateProInfoProp;
        this.productFormState = "update";
        this.thumbnailFile = [{
          name: this.newProductInfo.productName,
          url: 'data:image/gif;base64,' + this.newProductInfo.productThumbnail
        }];
      } else {
        this.productFormState = "add";
        this.thumbnailFile = [];
      }
    },

    components: {},

    methods: {
      /*返回产品列表*/
      backToProductList() {
        this.$emit("addProFormShow", "productList")
      },
      /*上传封面小图*/
      handleRemove(file, fileList) {
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //读取cookies
      getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      },
      /*点击保存按钮*/
      clickSaveBtn() {
        if ("update" === this.productFormState) {
          this.updateProductInfo()  //修改一条产品信息
        } else {
          this.addAProductInfoBtn(); //保存一条产品信息
        }
      },

      /*保存一条产品信息*/
      addAProductInfoBtn() {
        let self = this;
        let addProduct = productInfoAPI.addAProductInfo(this.newProductInfo);
        addProduct.then((res) => {
          self.$notify({
            title: '成功',
            message: '成功添加该产品信息！',
            type: 'success'
          });
          self.$emit("addProFormShow", "productList")
        });
        addProduct.catch((err) => {
          console.error(err);
        })
      },

      /*修改一条产品信息*/
      updateProductInfo() {
        let self = this;
        let updateRes = productInfoAPI.updateAProductInfo(this.newProductInfo);
        updateRes.then((res) => {
          self.$notify({
            title: '成功',
            message: '成功修改该产品信息！',
            type: 'success'
          });
        });
        updateRes.catch((err) => {
          console.error(err);
        })
      },

      /*设置文件序号*/
      setFileIndex(detailsIndex) {
        this.activeDetailsIndex = detailsIndex;
      },

      /*上传文件成功*/
      uploadFileSuccess(response, file, fileList,) {
        this.newProductInfo.productDetails[this.activeDetailsIndex].fileUrl = response.data.filePath;
      },

      /*格式化详情文件*/
      formatDetailsFile(fileItem) {
        let formatDetail = null;
        if ('' == fileItem.productId) {
          formatDetail = [];
        } else {
          formatDetail = [{name: fileItem.fileName, url: fileItem.fileUrl}];
        }
        return formatDetail;
      }
    },
  }
</script>

<style scoped lang="less">
  .addProductForm {
    padding: 0 22px;
    overflow: auto;
    .addProFormContent {
      min-height: 400px;
      width: 100%;
      min-width: 900px;
      height: calc(100vh - 230px);
      .productTitleAndType {
        text-align: left;
        margin: 15px 0;
        display: flex;
        justify-content: space-between;
        .productTitle {
          width: 40%;
          .proNameInput {
            width: 300px;
          }
        }
        .productType {
          width: 60%;
        }
      }
      .proShortDescribe {
        width: 100%;
        margin: 15px 0;
        display: flex;
        justify-content: center;
        align-items: center;
        .proFile {
          width: 40%;
          height: 200px;
          .proFileUpload {
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
  .proFileUpload {
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
