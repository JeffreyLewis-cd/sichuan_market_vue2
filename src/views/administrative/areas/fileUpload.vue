<template>
  <div class="fileUpload-component">

    <el-upload
      class="upload-demo"
      :action="uploadURL"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :headers="headersSetting"
      :auto-upload="false"
      ref="upload"
      :file-list="fileList">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">单个文件不超过10G</div>
    </el-upload>

  </div>

</template>

<!--  -->

<script type="text/ecmascript-6">
  import pubapi from "../../../api/pubapi"

  export default {
    name: "fileUpload",
    data() {
      return {
        fileList: [],
        uploadURL: pubapi.apiRootURL + "/files/fileUpload",
        headersSetting: {
          'Authorization': this.getCookie('token'),
        }
      }
    },
    mounted() {

    },

    components: {},

    methods: {
      handleRemove(file, fileList) {
      },
      handlePreview(file) {
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      },
      submitUpload() {
        this.$refs.upload.submit();
      },

      //读取cookies
      getCookie(name) {
        let arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
        if (arr = document.cookie.match(reg))
          return unescape(arr[2]);
        else
          return null;
      }
    },

  }
</script>

<style scoped lang="less">
  .fileUpload-component {
    width: calc(100% - 40px);
    height: calc(100vh - 220px);
    min-height: 300px;
    min-width: 1200px;
    overflow: hidden;
    background: #fff;
    padding: 20px;
    margin-top: 20px;
  }

</style>
