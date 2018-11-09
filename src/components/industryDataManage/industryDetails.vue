<template>
  <div class="industryDetailsPage">
    <div class="industryDetailsBox" v-show="!comDetailsShow">
      <!--操作按钮-->
      <div class="indusDetailsBtns">
        <el-button type="primary" size="small" @click.native="backToIndustryList">返&nbsp;&nbsp;&nbsp;回</el-button>
      </div>
      <!--详情字段部分-->
      <div class="indusDetailsContent">
        <h3 class="industryBasicTitle">行业基本详情</h3>
        <ul class="industryBasicDetails">
          <li class="indusDetailsRow">
            <span class="title">行业名称：</span>
            <span>{{indusDetailProp.industryName}}</span>
          </li>
          <li class="indusDetailsRow">
            <span class="title">总产值：</span>
            <span>{{indusDetailProp.totalOutPut}}</span>
            <span>{{indusDetailProp.totalOutPutUnit}}</span>
          </li>
          <li class="indusDetailsRow">
            <span class="title">生产成本：</span>
            <span>{{indusDetailProp.productionCosts}}</span>
            <span>{{indusDetailProp.productionCostsUnit}}</span>
          </li>
          <li class="indusDetailsRow">
            <span class="title">行业利润：</span>
            <span>{{indusDetailProp.industryProfit}}</span>
            <span>{{indusDetailProp.profitUnit}}</span>
          </li>
          <li class="indusDetailsRow">
            <span class="title">从业人数：</span>
            <span>{{indusDetailProp.employedPopulation}}</span>
            <span>{{indusDetailProp.employedPopulationUnit}}</span>
          </li>
          <li class="indusDetailsRow">
            <span class="title">统计日期：</span>
            <span>{{indusDetailProp.statisticDate}}</span>
          </li>
        </ul>
        <h3 class="indRelatedComTitle">行业相关企业</h3>
        <ul class="industryCompanies">
          <li v-for="(comItem,index) in indusDetailProp.topCompanies" :key="index" class="companyRow">
            <el-button type="text" size="small" @click.native="showCompanyDetails(comItem.companyId)">
              <span class="circle"></span>
              {{comItem.companyName}}
            </el-button>
          </li>
        </ul>
      </div>
    </div>
    <!--企业详情-->
    <companyDetails :companyInfoProp="companyDetailGet" @showCompanyDetails="showCompanyDetailsFa"
                    v-if="comDetailsShow"></companyDetails>
  </div>

</template>

<script type="text/ecmascript-6">
  import companyInfo_api from "../../api/companyInfo";
  import companyDetails from "../companyDataManage/companyDetails";

  export default {
    name: "industryDetails",
    props: ['indusDetailProp'],
    data() {
      return {
        companyDetailGet: null,
        comDetailsShow: false,
      }
    },
    mounted() {

    },

    components: {
      companyDetails,
    },

    methods: {
      /*返回行业列表*/
      backToIndustryList() {
        this.$emit("backToInustryList", false);
      },

      /*展示企业详情*/
      showCompanyDetails(companyId) {
        let self = this;
        let param = {
          companyId: companyId,
        };
        let companyDetails = companyInfo_api.findCompanyInfoById(param);
        companyDetails.then((res) => {
          self.companyDetailGet = res.data.companyInfo;
          self.comDetailsShow = true;
        });
        companyDetails.catch((err) => {
          console.error(err);
        });
      },

      /*展示行业详情*/
      showCompanyDetailsFa(detailsShow) {
        this.comDetailsShow = detailsShow;
      }
    },

  }
</script>

<style scoped lang="less">
  .industryDetailsPage {
    .indusDetailsBtns {
      height: 38px;
      width: 100%;
      text-align: right;
    }
    .indusDetailsContent {
      padding: 0 20px;
      .industryBasicTitle {
        border-bottom: 1px solid #E8E8E8;
      }
      .industryBasicDetails {
        margin-bottom: 30px;
        .indusDetailsRow {
          height: 36px;
          width: 32%;
          display: inline-block;
          margin-bottom: 10px;
          .title {
          }
        }
      }
      .indRelatedComTitle {
        border-bottom: 1px solid #E8E8E8;
      }
      .industryCompanies {
        height: 300px;
        width: calc(100% - 40px);
        border: 1px solid #E8E8E8;
        border-radius: 5px;
        overflow: auto;
        padding: 15px 20px;
        margin-top: 10px;
        .companyRow {
          height: 36px;
          line-height: 36px;
          display: inline-block;
          margin-right: 20px;
          .circle {
            display: block;
            float: left;
            height: 5px;
            width: 5px;
            margin: 2px 5px;
            border: 1px solid #67C23A;
            border-radius: 5px;
            background-color: #67C23A;
          }

        }
      }

    }

  }

</style>
