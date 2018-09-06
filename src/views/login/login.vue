<template>
  <div class="loginPage">
    <div class="loginPage-box">
      <h2 class="login-title">四川省消费市场统计平台</h2>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px" class="login-ruleForm">

        <el-form-item label="账号" prop="name">
          <el-input v-model.number="ruleForm2.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item class="login-btns">
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
          <el-button @click="resetForm('ruleForm2')">重置</el-button>
        </el-form-item>

      </el-form>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import login_api from "../../api/login_api";


  export default {
    name: "login",

    data() {
      var checkUserName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('账号不能为空'));
        }else{
          callback();
        }

      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        }else{
          callback();
        }
      };


      return {
        ruleForm2: {
          password: '',
          name: ''
        },
        rules2: {
          name: [
            {validator: checkUserName, trigger: 'blur'}
          ],
          password: [
            {validator: validatePassword, trigger: 'blur'}
          ],
        }
      };
    },
    mounted(){
      console.log(this.$router)
    },
    methods: {
      submitForm(formName) {
        let self=this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(login_api);
            console.log(this.ruleForm2);
            this.ruleForm2.password=this.$md5(this.ruleForm2.password);
            let loginResult=login_api.login(this.ruleForm2);
            loginResult.then((res)=>{
              console.log(res);
              if(200==res.retCode){
                document.cookie="loginInfo="+"true";
                self.$router.push({name:"mainPage"});
              }
            });
            loginResult.catch((err)=>{
              console.log(err);
            })



          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }


  }
</script>

<style scoped lang="less">
  @minHeight: 600px;
  @minWidth: 1000px;

  .loginPage {
    height: 100vh;
    min-height: @minHeight;
    min-width: @minWidth;
    width: 100%;
    background-color: lightblue;
    background-image: url("../../assets/image/img01/big-data.jpg");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    .loginPage-box {
      height: 400px;
      width: 500px;
      background-color: #fff;
      border-radius: 5px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .login-title {
        height: 100px;
        line-height: 100px;
      }
      .login-ruleForm {
        width: 70%;
        margin-left: -70px;
        .login-btns {
          text-align: center;
          .el-form-item__content {
            margin: 0 !important;
          }

        }
      }
    }
  }
</style>

<style lang="less">
  .login-btns {
    .el-form-item__content {
      /*margin:0 !important;*/
      .el-button {
        width: 100px;
      }
    }

  }
</style>
