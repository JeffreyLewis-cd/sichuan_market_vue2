<template>

  <div class="leftSideNav ">
    <!--网站标题-->
    <div class="web-title">
      <img src="../../../assets/image/img01/CUIT.png" class="logo">
      <span v-show="!leftSideNavCollapse">四川消费研究</span>
    </div>


    <!--<el-row class="tac">-->
      <!--<el-col :span="24">-->
        <el-menu
          default-active="1-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="leftSideNavCollapse"
          background-color="#002140"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>四川概况</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="linkToMainPage">行政区域</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>

          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>后台管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="4-1" @click.native="linkToBackend">用户管理</el-menu-item>
              <el-menu-item index="4-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>


        </el-menu>
      <!--</el-col>-->
    <!--</el-row>-->
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "leftSideNav",
    data(){
      return{


      }
    },

    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      /*跳转到主页*/
      linkToMainPage() {
        console.log("跳转到主页");
        this.$router.push({name: "adminAreas"});
      },

      /*跳转到后台管理界面*/
      linkToBackend() {
        console.log("跳转到后台管理界面");
        this.$router.push({name: "backendUserManage"});

      }

    },

    computed: {
      ...mapGetters({
        leftSideNavCollapse: 'leftSideNavCollapse',
      })
    },
    watch:{

    }
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


</style>
