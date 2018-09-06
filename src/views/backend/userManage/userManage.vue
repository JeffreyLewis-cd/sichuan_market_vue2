<template>
  <div class="userManage">
    <div class="userManage-title">
      <span>用户管理</span>
      <el-button type="primary" size="small" class="addUser" @click="showAddUserDialog">添加用户</el-button>
    </div>

    <!--所有用户列表-->
    <el-table
      :data="allUsers"
      border
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="ID"
        width="150">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="password"
        label="密码"
        width="300">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="电话号码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="editUser(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--对话框-添加新用户-->
    <el-dialog class="userManage-dialog"
               title="提示"
               :visible.sync="dialogVisible"
               width="40%">
      <!--新用户信息-->
      <div class="dialog-row-box" v-for="(item,index) in dialogTitles" :key="index">
        <p class="dialog-row-label">{{item.title}}:&nbsp;</p>
        <el-input
          style="width: 50%;"
          placeholder="请输入..."
          suffix-icon="el-icon-edit"
          v-model="reqParam[item.field]">
        </el-input>
      </div>

      <!--对话框-按钮-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm" size="small">确 定</el-button>
      </span>
    </el-dialog>


  </div>
</template>

<script type="text/ecmascript-6">
  import backendManage_api from "../../../api/backendManage_api";


  export default {
    name: "userManage",
    data() {
      return {
        allUsers: [],
        dialogVisible: false,
        input2: "",
        dialogTitles: [
          {
            title: "姓名",
            field: "name",
          },
          {
            title: "密码",
            field: "password",
          },
          {
            title: "电话",
            field: "phone",
          },
          {
            title: "邮箱",
            field: "email",
          },
          {
            title: "状态",
            field: "status",
          },
        ],
        reqParam: {
          id: "",
          name: "",
          password: "",
          phone: "",
          email: "",
          status: "",
        },
        dialogState: "add"
      }
    },
    created() {
      this.getAllUser();
    },
    mounted() {

    },
    methods: {
      /*获取所有的用户*/
      getAllUser() {
        let self = this;
        let allUsersPromise = backendManage_api.findAllUsers();
        allUsersPromise.then((res) => {
          self.allUsers = res.data;

        });
        allUsersPromise.catch((err) => {
          console.log(err);
        })


      },

      /*删除某个用户*/
      deleteUser(row) {
        let self = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let deleteUserPromise = backendManage_api.deleteUser(row);
            deleteUserPromise.then((res) => {
              self.$notify({
                title: '成功',
                message: '这是一条成功的提示消息',
                type: 'success'
              });
              self.getAllUser(); //刷新列表

            });
            deleteUserPromise.catch((err) => {
              console.log(err);
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });


      },

      /*展示添加用户对话框*/
      showAddUserDialog() {
        this.dialogVisible = true;
        this.dialogState = "add";
        this.reqParam={
          id: "",
          name: "",
          password: "",
          phone: "",
          email: "",
          status: "",
        }
      },

      /*对话框-确定*/
      dialogConfirm() {
        if ("add" === this.dialogState) {
          this.saveAnewUser();
        } else if ("edit" === this.dialogState) {
          this.updateUser();
        }
      },

      /*保存新用户*/
      saveAnewUser() {
        let self = this;
        this.reqParam.password = this.$md5(this.reqParam.password);//加密
        let saveNewUserPromise = backendManage_api.addAnewPerson(this.reqParam);
        saveNewUserPromise.then((res) => {
          self.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
          self.getAllUser(); //刷新列表
          self.dialogVisible = false;
        });
        saveNewUserPromise.catch((err) => {
          console.log(err);
          self.dialogVisible = false;
        })
      },

      /*编辑用户*/
      editUser(row) {
        this.reqParam = row;
        this.dialogVisible = true;
        this.dialogState = "edit";
      },

      /*执行后台更新用户操作*/
      updateUser() {
        let self = this;
        let updateUserPromise = backendManage_api.updateUser(this.reqParam);
        updateUserPromise.then((res) => {
          self.$notify({
            title: '成功',
            message: '这是一条成功的提示消息',
            type: 'success'
          });
          self.getAllUser(); //刷新列表
          self.dialogVisible = false;

        });
        updateUserPromise.catch((err) => {
          console.log(err);
        })
      }

    }
  }
</script>

<style scoped lang="less">
  .userManage {
    background-color: #fff;
    padding: 20px;
    .userManage-title {
      height: 40px;
      line-height: 20px;
      font-size: 18px;
      .addUser {
        float: right;
      }
    }
    .userManage-dialog {
      .dialog-row-box {
        margin-bottom: 20px;
        .dialog-row-label {
          float: left;
          width: 30%;
          text-align: right;
          height: 40px;
          line-height: 40px;
        }

      }

    }
  }

</style>
