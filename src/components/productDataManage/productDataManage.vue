<template>
  <div class="productDataManagePage">
    <div class="productsCategory">
      <span>产品分类：</span>
      <el-button :type="(item.value===activeCategory)?'primary':'text'" size="small" plain
                 v-for="(item,index) in proCategoryList" :key="index"
                 @click.native="switchProCategory(item.value)" class="proCateItem"> {{item.label}}
      </el-button>
    </div>
    <div class="productsList">
      <div class="productsItem">

      </div>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: "productDataManage",
    data() {
      return {
        proCategoryList: [
          {
            label: "粮食",
            value: "401"
          },
          {
            label: "蔬菜",
            value: "402"
          },
          {
            label: "油料",
            value: "403"
          },
          {
            label: "水果",
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
        activeCategory: "401"
      }
    },
    mounted() {

    },

    components: {},

    methods: {
      /*切换产品分类*/
      switchProCategory(value) {
          this.activeCategory=value;
      }
    },

  }
</script>

<style scoped lang="less">
  .productDataManagePage {
    .productsCategory {
      height: 36px;
      width: 100%;
      border: 1px solid gray;
      .proCateItem {
        margin-right: 20px;
        letter-spacing: 5px;
        /*border:1px solid red;*/
        padding: 6px 20px;
        font-weight: bold;
      }
    }
    .productsList {
      min-height: 500px;
      width: 100%;
      border: 1px solid gray;
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
