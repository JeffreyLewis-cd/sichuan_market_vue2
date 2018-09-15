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
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>

  </div>

</template>

<script type="text/ecmascript-6">
  import pubapi from "../../../api/pubapi"

  export default {
    name: "fileUpload",
    data() {
      return {
        fileList: [
          {
            name: 'food.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          },
          {
            name: 'food2.jpeg',
            url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
          }
        ],
        uploadURL: pubapi.apiRootURL + "/files/fileUpload",
      }
    },
    mounted() {

    },

    components: {},

    methods: {
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },

  }
</script>

<style scoped lang="less">
  .fileUpload-component {
    width: calc(100% - 40px);
    height: calc(100vh - 220px);
    min-height: 500px;
    min-width: 1200px;
    overflow: hidden;
    background: #fff;
    padding: 20px;
    margin-top: 20px;
  }

</style>
