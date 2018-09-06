<template>
  <div class="topBar">

    <div class="topBar-user">
      <el-col :span="12">
        <el-dropdown>
      <span class="el-dropdown-link">
        用户名<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </div>
    <div class="topBar-userIcon">
      <p class="user-img"></p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "topBar",
    data(){
      return{

      }
    },
    methods:{
      logout(){
        console.log("退出");
        document.cookie="loginInfo=false";
        this.$router.push({name:"login"})
      }
    }
  }


</script>

<style scoped lang="less">
  .topBar {
    width: 100%;
    height: 60px;
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
        background-image: url("../../../assets/image/img01/user.png");
        background-size: 100% 100%;
      }
    }
    .topBar-user {
      float: right;
      width: 130px;
    }
  }

</style>
