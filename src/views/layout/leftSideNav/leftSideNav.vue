<template>

  <div class="leftSideNav ">
    <!--网站标题-->
    <div class="web-title">
      <img src="../../../assets/image/img01/CUIT.png" class="logo">
      <span v-show="!leftSideNavCollapse">四川经济</span>
    </div>

    <el-menu
      default-active="1-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :unique-opened='true'
      :collapse="leftSideNavCollapse"
      background-color="#002140"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        <template slot="title">
          <p class="leftNav-icon" :style="iconStyle.overView"></p>
          <span>四川概况</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="1-1" @click.native="linkToAdminMap">行政区域</el-menu-item>
          <el-menu-item index="1-2" @click.native="linkToMainPage">GDP(市)</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <p class="leftNav-icon" :style="iconStyle.agriculture"></p>
          <span>第一产业</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item,index) in navRouters.primary" :key="index"
                        :index="item.index" @click.native="linkToIndustry(item.router)">{{item.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <p class="leftNav-icon" :style="iconStyle.industry"></p>
          <span>第二产业</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="(item,index) in navRouters.secondary" :key="index"
                        :index="item.index" @click.native="linkToIndustry(item.router)">{{item.name}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <p class="leftNav-icon" :style="iconStyle.service"></p>
          <span>第三产业</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="4-1">交通运输、仓储和邮政业</el-menu-item>
          <el-menu-item index="4-2">批发和零售业</el-menu-item>
          <el-menu-item index="4-3">住宿和餐饮业</el-menu-item>
          <el-menu-item index="4-4">金融业</el-menu-item>
          <el-menu-item index="4-5">房地产业</el-menu-item>
          <el-menu-item index="4-6">其他</el-menu-item>

        </el-menu-item-group>
      </el-submenu>


      <el-submenu index="5">
        <template slot="title">
          <p class="leftNav-icon" :style="iconStyle.setting"></p>
          <span>后台管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="5-1" @click.native="linkToBackend">用户管理</el-menu-item>
          <el-menu-item index="5-2">选项2</el-menu-item>
        </el-menu-item-group>
      </el-submenu>


    </el-menu>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "leftSideNav",
    data() {
      return {
        iconStyle: {
          overView: {
            backgroundImage: "url(" + require("../../../assets/image/img01/industry_overview.png") + ")",
            backgroundSize: "100% 100%",
          },
          agriculture: {
            backgroundImage: "url(" + require("../../../assets/image/img01/industry_agriculture.png") + ")",
            backgroundSize: "100% 100%",
          },
          industry: {
            backgroundImage: "url(" + require("../../../assets/image/img01/factory.png") + ")",
            backgroundSize: "100% 100%",
          },
          service: {
            backgroundImage: "url(" + require("../../../assets/image/img01/iconfont-services.png") + ")",
            backgroundSize: "100% 100%",
          },
          setting: {
            backgroundImage: "url(" + require("../../../assets/image/img01/setting.png") + ")",
            backgroundSize: "100% 100%",
          },
        },
        navRouters: {
          primary: [
            {
              index: "2-1",
              router: "agriculture",
              name: "农业"
            },
            {
              index: "2-2",
              router: "forestry",
              name: "林业"
            },
            {
              index: "2-3",
              router: "animal",
              name: "畜牧业"
            },
            {
              index: "2-4",
              router: "fisheries",
              name: "渔业"
            },
          ],
          secondary: [
            {
              index: "3-1",
              router: "industry",
              name: "工业"
            },
            {
              index: "3-2",
              router: "construction",
              name: "建筑业"
            },
          ],
        }
      }
    },

    methods: {
      handleOpen(key, keyPath) {
        this.adjustRheight(); //调整右侧页面高度
      },
      handleClose(key, keyPath) {
        this.adjustRheight(); //调整右侧页面高度
      },

      /*调整右侧页面高度*/
      adjustRheight() {
        let self = this;
        setTimeout(function () {
          let leftEle = document.getElementsByClassName("leftSideNav")[0];
          self.$emit("adjustRightHeight", leftEle.clientHeight);
        }, 400);
      },


      /*四川地图*/
      linkToAdminMap() {
        this.$router.push({name: "adminMap"});
      },

      /*跳转到主页*/
      linkToMainPage() {
        this.$router.push({name: "adminAreas"});
      },

      /*跳转到后台管理界面*/
      linkToBackend() {
        this.$router.push({name: "backendUserManage"});

      },

      /*跳转到行业*/
      linkToIndustry(industry) {
        this.$router.push({name: industry});
      }

    },

    computed: {
      ...mapGetters({
        leftSideNavCollapse: 'leftSideNavCollapse',
      })
    },
    watch: {}
  }
</script>

<style scoped lang="less">

  .leftSideNav {
    background-color: #002140;
    .web-title {
      height: 60px;
      line-height: 60px;
      color: #fff;
      text-align: center;
      font-size: 22px;
      overflow: hidden;
      .logo {
        height: 40px;
        width: 40px;
      }
    }
    .el-menu-vertical-demo {
      .leftNav-icon {
        height: 18px;
        width: 18px;
        /*background-color: pink;*/
        margin: 0 5px;
        /*background-image: url("../../../assets/image/img01/industry_overview.png");*/
      }

    }
  }


</style>

<style lang="less">

  .el-menu {
    border-right: none !important;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .el-submenu__title {
    height: 56px;
    line-height: 56px;
    display: flex;
    justify-content: left;
    align-items: center;
  }


</style>
