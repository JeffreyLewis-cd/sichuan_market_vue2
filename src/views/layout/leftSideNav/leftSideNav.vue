<template>

  <div class="leftSideNav">
    <!--网站标题-->
    <div class="web-title">
      <img src="../../../assets/image/img01/download.svg" class="logo"> <span>四川消费研究</span>
    </div>

    <!--导航-->
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#002140"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1" >
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="1-1" @click.native="linkToMainPage">选项1</el-menu-item>
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

          <el-submenu index="4" >
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
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "leftSideNav",

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
        this.$router.push({path: "/"});
      },

      /*跳转到后台管理界面*/
      linkToBackend() {
        console.log("跳转到后台管理界面");
        this.$router.push({name: "backendUserManage"});

      }

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
      .logo {
        height: 40px;
        width: 40px;
      }
    }
  }

</style>
