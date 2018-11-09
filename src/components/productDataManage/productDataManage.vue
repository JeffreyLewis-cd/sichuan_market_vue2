<template>
  <div class="productDataManagePage">
    <!--产品分类-->
    <div class="productsCategory" v-if="'productList'===productPageShow">
      <el-button type="primary" size="small" class="productAddBtn"
                 @click="showDialog_add_product">添加产品
      </el-button>
      <span>产品分类：</span>
      <el-button :type="(item.value===activeProductCode)?'primary':'text'" size="small" plain
                 v-for="(item,index) in proCategoryList" :key="index"
                 @click.native="switchProCategory(item.value)" class="proCateItem"> {{item.label}}
      </el-button>
    </div>
    <!--产品列表卡片-->
    <div class="productsContent" v-if="'productList'===productPageShow">
      <div class="productsItem" v-for="(proItem,index) in productsList" :key="index"
           @click="showProductDetails(proItem)">
        <img :src="'data:image/jpeg;base64,'+proItem.productThumbnail" class="proThumbnail"/>
        <div class="proText">
          <h4>{{proItem.productName}}</h4>
          <div>
            <p class="txt">{{proItem.productDescribe}}</p>
          </div>
        </div>
        <div class="proInfoOperate">
          <p class="operate delete" @click.stop="deleteAProductInfoVue(proItem.productId)">
            <i class="el-icon-delete"></i>
          </p>
          <p class="operate edit" @click.stop="updateAProductInfoVue(proItem.productId)">
            <i class="el-icon-edit"></i>
          </p>
        </div>
      </div>
      <img class="noDataGif" src="../../assets/image/products/nodate.gif" v-if="0===productsList.length"/>
    </div>
    <!--添加产品-->
    <addProductForm v-if="'addProduct'===productPageShow" :updateProInfoProp="updateProInfo"
                    @addProFormShow="addProFormShowFa"></addProductForm>
    <!--产品详情-->
    <productDetails v-if="'productDetails'===productPageShow" @backToProList="backToProListFa"
                    :proDetailsProp="activeProDetails"></productDetails>

  </div>
</template>

<script type="text/ecmascript-6">
  import addProductForm from "./addProductForm"
  import productInfoAPI from "../../api/productInfo"
  import productDetails from "./productDetails"

  export default {
    name: "productDataManage",
    data() {
      return {
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
        activeProductCode: "401",
        productsList: [],
        productPageShow: "productList",
        activeProDetails: null,
        updateProInfo: null,
      }
    },
    mounted() {
      this.findProductsByCodeVue();  //通过产品code查询
    },

    components: {
      addProductForm,
      productDetails,
    },

    methods: {
      /*切换产品分类*/
      switchProCategory(value) {
        this.activeProductCode = value;
        this.findProductsByCodeVue();  //通过产品code查询
      },

      /*添加产品*/
      showDialog_add_product() {
        this.productPageShow = "addProduct";
        this.updateProInfo = null;
      },

      /*返回产品列表*/
      addProFormShowFa(value) {
        this.productPageShow = value;
        this.findProductsByCodeVue();  //通过产品code查询
      },

      /*通过产品code查询*/
      findProductsByCodeVue() {
        let self = this;
        let param = {
          productCode: this.activeProductCode,
        };
        let productsRes = productInfoAPI.findProductsByCode(param);
        productsRes.then((res) => {
          self.productsList = res.data.productInfo;
        });
        productsRes.catch((err) => {
          console.error(err);
        })
      },

      /*展示产品详情*/
      showProductDetails(proDetails) {
        this.activeProDetails = proDetails;
        this.productPageShow = "productDetails"
      },

      /*展示产品列表*/
      backToProListFa(value) {
        this.productPageShow = value;
        this.findProductsByCodeVue();  //通过产品code查询
      },

      /*删除一条产品信息*/
      deleteAProductInfoVue(productId) {
        let self = this;
        this.$confirm('此操作将永久删除该产品信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let param = {
              productId: productId,
            };
            let deleteResult = productInfoAPI.deleteAProductInfo(param);
            deleteResult.then((res) => {
              self.$notify({
                title: '成功',
                message: '成功删除一条产品信息！',
                type: 'success'
              });
              self.findProductsByCodeVue();  //通过产品code查询
            });
            deleteResult.catch((err) => {
              console.error(err);
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });

      },

      /*编辑更新一条产品信息*/
      updateAProductInfoVue(productId) {
        let self = this;
        let param = {
          productId: productId,
        };
        let proInfo = productInfoAPI.findProductInfoById(param);
        proInfo.then((res) => {
          self.updateProInfo = res.data.productInfo;
          self.productPageShow = "addProduct";
        });
        proInfo.catch((err) => {
          console.error(err);
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .productDataManagePage {
    overflow: auto;
    .productsCategory {
      height: 36px;
      width: calc(100% - 44px);
      border-bottom: 1px solid #E4E7ED;
      margin-left: 22px;
      .proCateItem {
        margin-right: 20px;
        letter-spacing: 5px;
        padding: 6px 20px;
        font-weight: bold;
      }
      .productAddBtn {
        margin-right: 30px;
      }
    }
    .productsContent {
      min-height: 460px;
      height: calc(100vh - 175px);
      width: calc(100% - 40px);
      padding: 10px;
      padding-top: 0;
      margin-top: 5px;
      overflow: auto;
      .productsItem {
        height: 360px;
        width: calc(23% - 4px);
        overflow: hidden;
        background-color: #E8F2FA;
        margin: 20px 1%;
        border: 1px solid rgba(211, 229, 247, 0.5);
        border-radius: 3px;
        cursor: pointer;
        float: left;
        .proThumbnail {
          height: 200px;
          width: 100%;
        }
        .proText {
          padding: 5px 15px;
          .txt {
            height: 70px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
        }
        .proInfoOperate {
          height: 36px;
          width: 100%;
          text-align: right;
          font-size: 18px;
          .operate {
            width: 36px;
            float: right;
            text-align: center;
          }
          .delete:hover {
            font-size: 24px;
            background-color: rgba(245, 108, 108, 0.8);
            border-radius: 36px;
            color: rgba(255, 255, 255, 1);
          }
          .edit:hover {
            font-size: 24px;
            background-color: rgba(64, 128, 255, 0.8);
            border-radius: 36px;
            color: rgba(255, 255, 255, 1);
          }
        }

      }
      .noDataGif {
        display: block;
        margin: 0 auto;
        /*border: 1px solid red;*/
      }
      .productsItem:hover {
        box-shadow: 0 0 20px rgba(160, 160, 160, 0.9);
      }
    }
  }


</style>
<style lang="less">
  .productsCategory {
    .el-button--text {
      color: rgba(0, 0, 0, .65);
    }
  }
</style>
