<template>
  <div class="batchImport">
    <p @click="chooseFile"> 批量导入数据 </p>
    <form action="" style="display: none;">
      <input type="file" ref="inputFile" @change="fileUpload()" style="display: none;"/>
    </form>
  </div>

</template>

<script type="text/ecmascript-6">
  let axios = require('axios');
  import apiRootURL from "../../api/pubapi"

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
      fileUpload() {
        //④创建一个formData对象
        var formData = new formData();
        //⑤获取传入元素的val
        var name = this.inpFile.val();
        //⑥获取files
        var files = this.inpFile[0].files[0];
        //⑦将name 和 files 添加到formData中，键值对形式
        formData.append("file", files);
        formData.append("name", name);
        axios({
          url: apiRootURL + "files/batchImport",
          type: 'POST',
          data: formData,
          contentType: false, // ⑨告诉jQuery不要去设置Content-Type请求头

          then(responseStr) {
            //11成功后的动作
            alert("成功啦");
          }
          ,
          catch(responseStr) {
            //12出错后的动作
            alert("出错啦");
          }
        });
      },

    },
  }
</script>

<style scoped>

</style>
