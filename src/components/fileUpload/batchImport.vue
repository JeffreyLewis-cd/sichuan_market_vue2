<template>
  <div class="batchImport">
    <p @click="chooseFile"> 批量导入数据 </p>
    <input type="file" name="filename" accept="xlsx" ref="inputFile"
           @change="fileUpload" style="display: none;"/>
  </div>

</template>

<script type="text/ecmascript-6">
  let axios = require('axios');
  import pubapi from "../../api/pubapi"

  export default {
    name: "batchImport",
    data() {
      return {
        inpFile: {},
      }
    },
    mounted() {


    },

    components: {},

    methods: {
      /*选择文件，准备上传*/
      chooseFile() {
        this.inpFile = this.$refs['inputFile'];
        this.inpFile.click();
        console.log(this.inpFile);

      },

      //③创建fileUpload方法用来上传文件
      fileUpload(e) {
        let file = e.target.files[0];
        let param = new FormData(); //创建form对象
        param.append('filename', file);//通过append向form对象添加数据
        console.log(param.get('filename')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去


        axios.post(pubapi.apiRootURL + "files/batchImport", param,
          {'Content-Type': 'multipart/form-data'}
        ).then((res) => {
          console.log(res);
        }).catch((err) => {
          console.log(err);
        });
      },

    },
  }
</script>

<style scoped>

</style>
