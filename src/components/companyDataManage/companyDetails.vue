<template>
  <div class="companyDetailsPage">
    <div class="comDetailsBtns">
      <el-button type="primary" size="small" @click.native="backToCompanyList">返&nbsp;&nbsp;&nbsp;回</el-button>
    </div>
    <h3 class="comDetailsTitle">企业详情</h3>
    <ul class="comDetailsBox">
      <li class="comDetailsItem">
        <span>企业名称：</span>
        <span>{{companyInfoProp.companyName}}</span>
      </li>
      <li class="comDetailsItem">
        <span>企业性质：</span>
        <span>{{companyInfoProp.companyType}}</span>
      </li>
      <li class="comDetailsItem">
        <span>注册号：</span>
        <span>{{companyInfoProp.companyRegistrationNum}}</span>
      </li>
      <li class="comDetailsItem">
        <span>法人代表：</span>
        <span>{{companyInfoProp.companyLegalRepre}}</span>
      </li>

      <li class="comDetailsItem">
        <span>注册资本：</span>
        <span>{{companyInfoProp.companyAssets}}</span>
        <span>万元</span>
      </li>
      <li class="comDetailsItem">
        <span>成立日期：</span>
        <span>{{companyInfoProp.companyEstablishDate}}</span>
      </li>
      <li class="comDetailsItem">
        <span>员工人数：</span>
        <span>{{companyInfoProp.companyHeadcount}}</span>
      </li>
      <li class="comDetailsItem">
        <span>所属行业：</span>
        <span>{{companyInfoProp.companyIndustryCode}}</span>
      </li>
      <li class="comDetailsItem" style="width:64%">
        <span>企业地址：</span>
        <span>{{companyInfoProp.companyAddress}}</span>
      </li>
    </ul>
  </div>

</template>

<script type="text/ecmascript-6">
  export default {
    name: "companyDetails",
    props: ['companyInfoProp'],
    data() {
      return {}
    },
    mounted() {

    },

    components: {},

    methods: {
      /*返回企业列表*/
      backToCompanyList() {
        this.$emit("showCompanyDetails", false)
      }
    },

  }
</script>

<style scoped lang="less">
  .companyDetailsPage {
    padding: 0 20px;
    .comDetailsBtns {
      text-align: right;
    }
    .comDetailsTitle{
      margin-bottom: 15px;
      border-bottom: 1px solid #E8E8E8;
    }
    .comDetailsBox {
      .comDetailsItem {
        display: inline-block;
        width: 32%;
        margin-bottom: 20px;
      }

    }
  }

</style>
