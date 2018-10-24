<template>
  <div class="industryDataManage">
    <!--行业部分-->
    <div class="industryPart" v-show="!comDetailsShow">
      <!--行业列表-->
      <div class="industryList" v-show="!industryDetailsShow">
        <!--操作按钮-->
        <div class="industryDataBtns">
          <el-button type="primary" size="small" @click="showDialog_add_ind">添 &nbsp;&nbsp;&nbsp; 加</el-button>
          <el-button type="primary" size="small" @click="findIndustryInfoByCode_ind">刷新</el-button>
          <batchImport class="batchImport-btn" @importSuccess="importResult_ind"></batchImport>
        </div>
        <!--行业信息表格-->
        <div class="industryDataTable">
          <el-table :data="tableData" border style="width: 100%" height="60vh">
            <el-table-column prop="industryName" label="行业名称" width="180" align="center"></el-table-column>
            <el-table-column prop="totalOutPut" label="总产值" width="100" align="center"></el-table-column>
            <el-table-column prop="totalOutPutUnit" label="总产值单位" width="120" align="center"></el-table-column>
            <el-table-column prop="productionCosts" label="生产成本" width="100" align="center"></el-table-column>
            <el-table-column prop="productionCostsUnit" label="生产成本单位" width="120" align="center"></el-table-column>
            <el-table-column prop="industryProfit" label="行业利润" width="100" align="center"></el-table-column>
            <el-table-column prop="profitUnit" label="行业利润单位" width="120" align="center"></el-table-column>
            <el-table-column prop="employedPopulation" label="从业人数" width="100" align="center"></el-table-column>
            <el-table-column prop="employedPopulationUnit" label="从业人数单位" width="120" align="center"></el-table-column>
            <el-table-column prop="statisticDate" label="统计日期" sortable width="140" align="center"></el-table-column>
            <el-table-column prop="topCompanies" label="相关企业" width="600" align="center" class="relatedCompanyCell">
              <template slot-scope="scope">
                <el-button v-for="(company,index) in formatTopCompanies(scope.row.topCompanies).companies"
                           @click="showCompanyDetails(company.companyId)"
                           :key="index" type="text" size="small">{{company.companyName}}
                </el-button>
                <el-button v-if="formatTopCompanies(scope.row.topCompanies).length>3"
                           @click="showDialog_details_ind(scope.row)" type="text" size="small" style="color: #67C23A;">
                  更多...
                </el-button>
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width="150">
              <template slot-scope="scope">
                <el-button @click="deleteIndustryData_ind(scope.row)" type="text" size="small" style="color: #F56C6C;">
                  删除
                </el-button>
                <el-button @click="showDialog_update_ind(scope.row)" type="text" size="small">编辑</el-button>
                <el-button @click="showDialog_details_ind(scope.row)" type="text" size="small" style="color: #67C23A;">
                  详情
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!--弹窗-->
        <div class="industryDataDialog" v-if="dialogFormVisible">
          <el-dialog :title="dialog_title" :visible.sync="dialogFormVisible">
            <div class="industryDataDialog-content">
              <!--新用户信息-->
              <div class="dialog-row-box" v-for="(item,index) in dataFieldsAndLabels" :key="index">
                <p class="dialog-row-label">{{item.label}}:&nbsp;</p>
                <!--选择日期-->
                <div v-if="'statisticDate'===item.field">
                  <el-select v-model="industryDialogData[item.field]" placeholder="请选择" style="width: 68%;"
                             size="small">
                    <el-option
                      v-for="(item,index) in dateList"
                      :key="index"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <!--设置相关企业-->
                <div v-else-if="'topCompanies'===item.field">
                  <div class="related_company_box">
                    <el-checkbox-group v-model="checkedCompanies" v-if="dialogFormVisible"
                                       @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="(company,index) in companyList" :label="company"
                                   :checked="company.checked"
                                   style="margin-left: 10px !important"
                                   :key="index">{{company.label}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>
                </div>
                <!--普通字段-->
                <div v-else>
                  <el-input
                    style="width: 68%;"
                    placeholder="请输入..."
                    suffix-icon="el-icon-edit"
                    :disabled="'industryName'===item.field"
                    v-model="industryDialogData[item.field]">
                  </el-input>
                </div>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
              <el-button type="primary" @click="confirmData_ind" size="small">确 定</el-button>
            </div>
          </el-dialog>
        </div>
      </div>
      <!--行业详情-->
      <industryDetails v-if="industryDetailsShow" :indusDetailProp="activeIndustryInfo"
                       @backToInustryList="showIndustryList"></industryDetails>
    </div>
    <!--企业详情-->
    <companyDetails :companyInfoProp="companyDetailGet" @showCompanyDetails="showCompanyDetailsFa"
                    v-if="comDetailsShow"></companyDetails>
  </div>
</template>

<script type="text/ecmascript-6">
  import industryInfo_api from "../../api/industryInfo";
  import batchImport from "../fileUpload/batchImport";
  import industryDetails from "./industryDetails"
  import companyInfo_api from "../../api/companyInfo";
  import companyDetails from "../companyDataManage/companyDetails";
  import {mapGetters} from "vuex"

  export default {
    name: "industryDataManage",
    props: ['industryInfoProp'],
    data() {
      return {
        tableData: [{
          industryCode: "",
          industryName: '',
          totalOutPut: '',
          totalOutPutUnit: '',
          productionCosts: '',
          productionCostsUnit: '',
          industryProfit: '',
          profitUnit: '',
          employedPopulation: '',
          employedPopulationUnit: '',
          statisticsDate: '',
          topCompanies: ""
        }],
        dataFieldsAndLabels: [
          {
            field: "industryName",
            label: "行业名称",
          },
          {
            field: "totalOutPut",
            label: "总产值",
          },
          {
            field: "totalOutPutUnit",
            label: "总产值单位",
          },
          {
            field: "productionCosts",
            label: "生产成本",
          },
          {
            field: "productionCostsUnit",
            label: "生产成本单位",
          },
          {
            field: "industryProfit",
            label: "行业利润",
          },
          {
            field: "profitUnit",
            label: "行业利润单位",
          },
          {
            field: "employedPopulation",
            label: "从业人数",
          },
          {
            field: "employedPopulationUnit",
            label: "从业人数单位",
          },
          {
            field: "statisticDate",
            label: "统计日期",
          },
          {
            field: "topCompanies",
            label: "相关企业",
          },
        ],
        industryDialogData: {},
        dialogFormVisible: false,
        dateList: [],
        activeDate: "2017年",
        dialogState: "add",
        dialog_title: "",
        checkedCompanies: [],
        companyList: [],
        industryDetailsShow: false,
        activeIndustryInfo: null,
        companyDetailGet: null,
        comDetailsShow: false,
      }
    },
    mounted() {
      this.dateList = [];
      for (let key = 1978; key < 2018; key++) {
        this.dateList.push({
          value: key + "年",
          label: key + "年",
        })
      }
      this.findIndustryInfoByCode_ind();  //查询某个行业的全部数据
    },
    components: {
      batchImport,
      industryDetails,
      companyDetails,
    },
    methods: {
      /*展示弹窗--添加*/
      showDialog_add_ind() {
        this.checkedCompanies = []; //清空已经勾选的企业
        this.dialog_title = "添加行业信息";
        this.dialogState = "add";
        this.dialogFormVisible = true;
        this.industryDialogData = {
          industryCode: this.industryInfoProp.code,
          industryName: this.industryInfoProp.name,
          totalOutPut: '',
          totalOutPutUnit: '亿元',
          productionCosts: '',
          productionCostsUnit: '亿元',
          industryProfit: '',
          profitUnit: '亿元',
          employedPopulation: '',
          employedPopulationUnit: '万人',
          statisticDate: '2017年',
          topCompanies: ""
        };
        this.setCompanyList(); //设置备选企业列表
      },

      /*展示弹窗--编辑*/
      showDialog_update_ind(row) {
        this.checkedCompanies = []; //清空已经勾选的企业
        this.dialog_title = "编辑行业信息";
        this.dialogState = "update";
        this.dialogFormVisible = true;
        this.industryDialogData = JSON.parse(JSON.stringify(row));
        this.setCompanyList(this.industryDialogData.topCompanies); //设置备选企业列表
      },

      /*确认添加数据*/
      confirmData_ind() {
        if ('add' === this.dialogState) {
          this.addAindustryInfo_ind(); //添加一条行业数据
        } else if ("update" === this.dialogState) {
          this.updateIndustryData_ind();  //修改一条行业数据
        }
      },

      /*添加一条行业数据*/
      addAindustryInfo_ind() {
        let self = this;
        let addResult = industryInfo_api.addAindustryInfo(this.industryDialogData);
        addResult.then((res) => {
          self.$notify({
            title: '成功',
            message: '成功添加一条行业信息！',
            type: 'success'
          });
          self.dialogFormVisible = false;
          self.findIndustryInfoByCode_ind();  //查询某个行业的全部数据
        });
        addResult.catch((err) => {
          console.error(err);
        })
      },

      /*删除一条数据*/
      deleteIndustryData_ind(row) {
        let self = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let param = {
            industryId: row.industryId
          };
          let deleteResult = industryInfo_api.deleteIndustryData(param);
          deleteResult.then((res) => {
            self.$notify({
              title: '成功',
              message: '成功删除一条行业信息！',
              type: 'success'
            });
            self.findIndustryInfoByCode_ind();  //查询某个行业的全部数据
          });
          deleteResult.catch((err) => {
            console.error(err);
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      /*修改一条行业数据*/
      updateIndustryData_ind() {
        let self = this;
        let param = this.industryDialogData;
        let updateResult = industryInfo_api.updateIndustryData(param);
        updateResult.then((res) => {
          self.$notify({
            title: '成功',
            message: '成功修改一条行业信息！',
            type: 'success'
          });
          self.dialogFormVisible = false;
          self.findIndustryInfoByCode_ind();  //查询某个行业的全部数据
        });
        updateResult.catch((err) => {
          console.error(err);
        })
      },

      /*查询某个行业的全部数据*/
      findIndustryInfoByCode_ind() {
        let self = this;
        let param = {
          industryCode: this.industryInfoProp.code,
        };
        let findResult = industryInfo_api.findIndustryInfoByCode(param);
        findResult.then((res) => {
          if (res.data.industryInfo.length > 0) {
            self.tableData = res.data.industryInfo;
          }
        });
        findResult.catch((err) => {
          console.error(err);
        })
      },

      /*切换日期*/
      switchDate(val) {
        this.activeDate = val;
        this.findIndustryInfoByCode_ind();  //查询某个行业的全部数据
      },

      /*导入数据的结果*/
      importResult_ind(res) {
        if (res) {
          this.findIndustryInfoByCode_ind(); //查询某个行业的全部数据
        }
      },

      /*行业详情*/
      showDialog_details_ind(rowData) {
        this.dialog_title = "行业信息详情";
        this.industryDetailsShow = true; //展示行业详情
        this.activeIndustryInfo = rowData;
      },

      /*多选-相关企业*/
      handleCheckedCitiesChange(value) {
        let checkedCom = JSON.parse(JSON.stringify(value));
        let checkedComFormat = [];
        checkedCom.map((item) => {
          let repeatOrNot = false;
          /*查看有沒有重複的*/
          checkedComFormat.map((subItem) => {
            if (subItem.companyId == item.value) {
              repeatOrNot = true;
            }
          });
          if (!repeatOrNot) {
            checkedComFormat.push({
              companyName: item.label,
              companyId: item.value
            })
          }
        });
        this.industryDialogData.topCompanies = JSON.parse(JSON.stringify(checkedComFormat));
      },

      /*设置备选企业列表*/
      setCompanyList(topCompanies) {
        if (this.companyListByIndustryCode) {
          this.companyList = [];
          this.companyListByIndustryCode.map((item, index) => {
            let checkOrNot = false;
            /*设置已经关联的相关企业*/
            if (topCompanies && topCompanies.length > 0) {
              topCompanies.map((comItem) => {
                if (comItem.companyId === item.companyId) {
                  checkOrNot = true;
                }
              });
            }
            this.companyList.push({
              label: item.companyName,
              value: item.companyId,
              checked: checkOrNot,
            })
          })
        }
      },

      /*展示行业列表信息*/
      showIndustryList(value) {
        console.log("展示行业列表信息-father");
        console.log(value);
        this.industryDetailsShow = value;
      },

      /*展示企业详情*/
      showCompanyDetails(companyId) {
        console.log("展示企业详情");
        console.log(companyId);
        let self = this;
        let param = {
          companyId: companyId,
        };
        let companyDetails = companyInfo_api.findCompanyInfoById(param);
        companyDetails.then((res) => {
          console.log(res);
          self.companyDetailGet = res.data.companyInfo;
          self.comDetailsShow = true;
        });
        companyDetails.catch((err) => {
          console.log(err);
        });
      },

      /*展示行业部分*/
      showCompanyDetailsFa(detailsShow) {
        this.comDetailsShow = detailsShow;
      },
      /*相关企业格式化*/
      formatTopCompanies(topCompanies) {
        let formatCom = {
          companies: topCompanies.slice(0, 3),
          length: topCompanies.length
        };
        return formatCom;
      }
    },
    computed: {
      ...mapGetters({
        companyListByIndustryCode: "companyListByIndustryCode"
      })
    },
    watch: {}
  }
</script>

<style scoped lang="less">
  .industryDataManage {
    height: 100%;
    width: 100%;
    .industryDataBtns {
      text-align: left;
      padding-bottom: 10px;
      .batchImport-btn {
        height: 32px;
        line-height: 32px;
        width: 120px;
        float: right;
        background: #409EFF;
        border: 1px solid #409EFF;
        border-radius: 3px;
        text-align: center;
        color: #fff;
        cursor: pointer;
      }
      .batchImport-btn:hover {
        background: #66b1ff;
        border: 1px solid #66b1ff;
      }
    }
    .industryDataTable {

    }
    .industryDataDialog {
      .industryDataDialog-content {
        .dialog-row-box {
          margin-bottom: 20px;
          width: 48%;
          display: inline-block;
          .dialog-row-label {
            float: left;
            width: 30%;
            text-align: right;
            height: 40px;
            line-height: 40px;
          }

          .related_company_box {
            border: 1px solid #c0c4cc;
            border-radius: 5px;
            width: calc(200% - 50px);
            height: 130px;
            margin-left: 4%;
            margin-bottom: 0;
            padding: 5px 15px;
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            overflow: auto;
            .add_company {
              height: 30px;
              line-height: 26px;
              width: 30px;
              font-size: 36px;
              text-align: center;
              border: 1px solid green;
              border-radius: 5px;
            }
            .company_item {
              height: 30px;
              line-height: 30px;
              border-radius: 5px;
              padding: 0 10px;
              margin-left: 20px;
              border: 1px solid green;
            }
          }
        }
      }
    }
  }
</style>

<style lang="less">
  .industryDataDialog {
    .el-dialog {
      margin-top: 8vh !important;
      .el-dialog__body {
        padding: 0 20px !important;
        .related_company_box {
          .checkbox-group {
            .el-checkbox {
              margin-left: 30px !important;
            }
          }
        }
      }
    }
  }
</style>
