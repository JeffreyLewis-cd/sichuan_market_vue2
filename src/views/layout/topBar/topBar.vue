<template>
  <div class="topBar">
    <!--导航-->
    <div class="expandOrCollapse" @click="expandOrCollpseControl">
      <p class="expandOrCollapse-icon" :style="(leftSideNavCollapse)? expandStyle:collapseStyle"
         :class="{'expandOrCollapse-icon-expand':leftSideNavCollapse}"></p>
    </div>

    <div class="topBar-userDropdown">
      <el-dropdown>
          <span class="el-dropdown-link">
            {{loginName}}<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人信息</el-dropdown-item>
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="topBar-userIcon">
      <p class="user-img" :style="userimgStyle"></p>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  import * as MUTATIONS from '../../../store/mutations'
  import pubapi from "@/api/pubapi.js"

  export default {
    name: "topBar",
    data() {
      return {
        isCollapse: false,
        collapseStyle: {
          backgroundImage: 'url(' + require('../../../assets/image/img01/list-collapsed.png') + ')',
          backgroundSize: '100% 100%'
        },
        expandStyle: {
          backgroundImage: 'url(' + require('../../../assets/image/img01/expand.png') + ')',
          backgroundSize: '100% 100%'
        },
        userimgStyle: {
          backgroundImage: 'url(' + require('../../../assets/image/img01/user.png') + ')',
          backgroundSize: '100% 100%'
        },
        loginName:pubapi.getCookie("loginName"),
      }
    },
    mounted() {

    },
    methods: {
      logout() {
        document.cookie = "loginInfo=false";
        this.$router.push({name: "login"})
      },

      /*控制左侧导航展开或者折叠*/
      expandOrCollpseControl() {
        this.$store.commit(MUTATIONS.leftSideNavCollapse_mu);
      }
    },
    watch: {},
    computed: {

      ...mapGetters({
        leftSideNavCollapse: 'leftSideNavCollapse',
      })
    }
  }


</script>

<style scoped lang="less">
  .topBar {
    width: 100%;
    height: 60px;
    .expandOrCollapse {
      height: 60px;
      width: 60px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      float: left;
      .expandOrCollapse-icon {
        height: 25px;
        width: 25px;
        /*background-image: url("../../../assets/image/img01/list-collapsed.png");*/
        /*background: url("~@/assets/image/img01/list-collapsed.png") center center no-repeat;*/
        /*background-size: 100% 100%;*/
      }
      .expandOrCollapse-icon-expand {
        /*background-image: url("../../../assets/image/img01/expand.png");*/
        /*background: url("~@/assets/image/img01/expand.png") center center no-repeat;*/
        /*background-size: 100% 100%;*/
      }
    }
    .expandOrCollapse:hover {
      background-color: aliceblue;
    }
    .topBar-userIcon {
      height: 60px;
      width: 60px;
      float: right;
      display: flex;
      justify-content: center;
      align-items: center;

      .user-img {
        height: 25px;
        width: 25px;
        /*background-image: url("../../../assets/image/img01/user.png");*/
        /*background: url("~@/assets/image/img01/user.png") center center no-repeat;*/
        background-size: 100% 100%;
      }
    }
    .topBar-userDropdown {
      float: right;
      width: 130px;
      text-align: center;
    }
    .topBar-userDropdown:hover {
      background-color: aliceblue;
      cursor: pointer;
    }
  }

</style>
<style lang="less">
  .topBar-userDropdown {
    .el-dropdown {
      width: 100%;
      .el-dropdown-link {
        display: inline-block;
        width: 100%;
      }
    }

  }


</style>
