<template>
  <div class="productDataManagePage">
    <!--产品分类-->
    <div class="productsCategory" v-if="!addProductFormShow">
      <el-button type="primary" size="small" class="productAddBtn"
                 @click="showDialog_add_product">添加产品
      </el-button>
      <span>产品分类：</span>
      <el-button :type="(item.value===activeCategory)?'primary':'text'" size="small" plain
                 v-for="(item,index) in proCategoryList" :key="index"
                 @click.native="switchProCategory(item.value)" class="proCateItem"> {{item.label}}
      </el-button>
    </div>
    <!--产品列表卡片-->
    <div class="productsContent" v-if="!addProductFormShow">
      <div class="productsItem" v-for="(proItem,index) in productsList" :key="index">
        <!--<img src="../../assets/image/img01/lemon_01.png" class="proThumbnail"/>-->
        <img :src="proItem.productThumbnail" class="proThumbnail"/>
        <div class="proText">
          <h4>{{proItem.productName}}</h4>
          <p>{{proItem.productDescribe}}</p>
        </div>
      </div>
    </div>
    <!--添加产品-->
    <addProductForm v-if="addProductFormShow" @addProFormShow="addProFormShowFa"></addProductForm>
  </div>
</template>

<script type="text/ecmascript-6">
  import addProductForm from "./addProductForm"

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
        activeCategory: "401",
        productsList: [
          {
            productId: "",
            productName: '柠檬',
            productDescribe: '柠檬描述',
            productThumbnail: require("../../assets/image/products/lemon02.jpg"),
            productDetails: {
              images: [
                {
                  txt: "",
                  url: "",
                },
                {
                  txt: "",
                  url: "",
                },
                {
                  txt: "",
                  url: "",
                },
              ],
              videos: [
                {
                  txt: "",
                  url: "",
                }
              ]
            }
          },
          {
            productId: "",
            productName: '水蜜桃',
            productDescribe: '水蜜桃描述',
            productThumbnail: require("../../assets/image/products/honeyPeach02.jpg"),
            productImage: [],
            productVideo: []
          },
          {
            productId: "",
            productName: '猕猴桃',
            productDescribe: '猕猴桃描述',
            productThumbnail: require("../../assets/image/products/kiwifruit01.jpg"),
            productImage: [],
            productVideo: []
          },
          {
            productId: "",
            productName: '芒果',
            productDescribe: '芒果描述',
            productThumbnail: require("../../assets/image/products/mango01.jpg"),
            productImage: [],
            productVideo: []
          },
          {
            productId: "",
            productName: '石榴',
            productDescribe: '石榴描述',
            productThumbnail: require("../../assets/image/products/pomegranate01.jpg"),
            productImage: [],
            productVideo: []
          },
          {
            productId: "",
            productName: '草莓',
            productDescribe: '草莓描述',
            productThumbnail: require("../../assets/image/products/strabarrey01.jpg"),
            productImage: [],
            productVideo: []
          },
        ],
        addProductFormShow: false,
      }
    },
    mounted() {

    },

    components: {
      addProductForm,
    },

    methods: {
      /*切换产品分类*/
      switchProCategory(value) {
        this.activeCategory = value;
      },

      /*添加产品*/
      showDialog_add_product() {
        this.addProductFormShow = true;
      },

      /*返回产品列表*/
      addProFormShowFa(value) {
        this.addProductFormShow = value;
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
      height: calc(100vh - 255px);
      width: calc(100% - 42px);
      padding: 10px;
      margin-top: 15px;
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
          padding: 15px;
        }
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
