<template>
  <div class="batchImport">
    <p @click="chooseFile"> 批量导入数据 </p>
    <input type="file" name="filename" accept="xlsx" ref="inputFile" v-if="inputFileFresh"
           @change="fileUpload" style="display: none;"/>
  </div>

</template>

<script type="text/ecmascript-6">
  // 引用axios
  let axios = require('axios');
  import pubapi from "../../api/pubapi"

  export default {
    name: "batchImport",
    data() {
      return {
        inpFile: {},
        inputFileFresh: true,
      }
    },
    mounted() {


    },

    components: {},

    methods: {
      /*选择文件，准备上传*/
      chooseFile() {
        let self = this;
        this.inpFile = this.$refs['inputFile'];
        this.inpFile.click();
        this.inputFileFresh = false;
        setTimeout(function () {
          self.inputFileFresh = true;
        }, 50)

      },

      //③创建fileUpload方法用来上传文件Authorization
      fileUpload(e) {
        let self = this;
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('filename', file);//通过append向form对象添加数据

        axios({
          method: "post",
          url: pubapi.apiRootURL + "/files/batchImport",
          data: param,
          // withCredentials: false,
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': pubapi.getCookie('token'),
          }
        }).then((res) => {
          if (200 === res.data.code) {
            self.$notify({
              title: '成功',
              message: '导入成功！',
              type: 'success'
            });
            self.$emit("importSuccess",true);
          } else {
            self.$notify.error({
              title: '错误',
              message: '导入失败！'
            });
            self.$emit("importSuccess",false);
          }

        })
          .catch((err) => {
            console.error(err);
            self.$emit("importSuccess",false);
          })

      },

    },
  }
</script>

<style scoped>

</style>
