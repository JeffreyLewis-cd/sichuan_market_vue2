<template>
  <div class="loginPage" :style="loginPageStyle">
    <div class="loginPage-box">
      <h2 class="login-title">四川省经济统计分析平台</h2>
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="70px" class="login-ruleForm">

        <el-form-item label="账号" prop="name">
          <el-input v-model.number="ruleForm2.name"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="ruleForm2.password" @keyup.enter.native="toLogin('ruleForm2')"
                    auto-complete="off"></el-input>
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
        } else {
          callback();
        }

      };
      var validatePassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
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
        },
        loginPageStyle: {
          backgroundImage: 'url(' + require('../../assets/image/img01/big-data.jpg') + ')'
        },
      };
    },
    mounted() {
      /*初始化cookie*/
      document.cookie = "loginInfo=" + "false";
      document.cookie = "token=" + "";

    },
    methods: {
      /*字符串转日期*/
      stringToDate(dateStr, separator) {
        if (!separator) {
          separator = "-";
        }
        var dateArr = dateStr.split(separator);
        var year = parseInt(dateArr[0]);
        var month;
        //处理月份为04这样的情况
        if (dateArr[1].indexOf("0") == 0) {
          month = parseInt(dateArr[1].substring(1));
        } else {
          month = parseInt(dateArr[1]);
        }
        var day = parseInt(dateArr[2]);
        var date = new Date(year, month - 1, day);
        return date;
      },


      submitForm(formName) {
        let self = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.ruleForm2.password = this.$md5(this.ruleForm2.password);
            let loginResult = login_api.login(this.ruleForm2);
            loginResult.then((res) => {
              console.log("成功");
              console.log(res);
              let exp = new Date();

              /*毫秒，30分钟后过期*/
              exp.setTime(exp.getTime() + (2 * 60 * 60 * 1000));
              let expireTime = "; expires=" + exp.toUTCString();

              document.cookie = "loginInfo=" + "true" + expireTime;
              document.cookie = "token=" + res.data.token + expireTime;
              self.$router.push({name: "adminMap"});
            });
            loginResult.catch((err) => {
              console.log("失败");
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
      },

      /*回车键登录*/
      toLogin(formName) {
        this.submitForm(formName);
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
    background-size: cover;
    /*background: url("~@/assets/image/img01/big-data.jpg") center center no-repeat;*/
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
