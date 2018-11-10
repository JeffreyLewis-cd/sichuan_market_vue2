<template>
  <div class="companyDataManage">
    <!--企业基本信息-->
    <div class="companyBasicInfo" v-show="!comDetailsShow">
      <!--操作按钮-->
      <div class="companyDataBtns">
        <el-button type="primary" size="small" @click="showDialog_add_com">添 &nbsp;&nbsp;&nbsp; 加</el-button>
        <el-button type="primary" size="small" @click="aquireComInfoByIndustryCode">刷新</el-button>
        <!--<batchImport class="batchImport-btn" @importSuccess="importResult_com"></batchImport>-->
      </div>
      <div class="companyDataTable">
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          height="calc(100vh - 180px)"
        >
          <el-table-column
            prop="companyName"
            label="企业名称"
            width="300"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="companyHeadcount"
            label="员工总数"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="companyAssets"
            label="注册资本"
            width="120"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="companyEstablishDate"
            label="成立日期"
            width="150"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="companyAddress"
            label="注册地址"
            width="300"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="companyLegalRepre"
            label="法人代表"
            width="100"
            align="center"
          >
          </el-table-column>
          <el-table-column
            prop="companyType"
            label="企业类型"
            width="120"
            align="center"
          >
            <template slot-scope="scope">
              {{comTypeCode2Word(scope.row.companyType)}}
            </template>
          </el-table-column>
          <el-table-column
            prop="companyRegistrationNum"
            label="注册号"
            width="200"
            align="center"
          >
          </el-table-column>

          <el-table-column
            fixed="right"
            label="操作"
            align="center"
            width="150">
            <template slot-scope="scope">
              <el-button @click="deleteCompanyData_com(scope.row)" type="text" size="small" style="color: #F56C6C;">删除
              </el-button>
              <el-button @click="showDialog_update_com(scope.row)" type="text" size="small">编辑</el-button>
              <el-button @click="showDialog_details_com(scope.row)" type="text" size="small" style="color: #67C23A;">详情
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--弹窗-->
      <div class="companyDataDialog">
        <el-dialog :title="dialogState.title" :visible.sync="dialogVisibleCom">
          <div class="companyDataDialog-content">
            <!--新用户信息-->
            <div class="dialog-row-box" v-for="(item,index) in dataFieldsAndLabels" :key="index">
              <p class="dialog-row-label">{{item.label}}:&nbsp;</p>

              <div v-if="'companyType'===item.field">
                <el-select v-model="companyData[item.field]" placeholder="请选择" style="width: 65%;" size="small">
                  <el-option
                    v-for="item in companyTypeListPub"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div v-else-if="'companyIndustryCode'===item.field">
                <el-select v-model="companyData[item.field]" placeholder="请选择" style="width: 65%;" size="small">
                  <el-option
                    v-for="item in industryCodeListPub"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </div>
              <div v-else>
                <el-input
                  style="width: 65%;"
                  placeholder="请输入..."
                  suffix-icon="el-icon-edit"
                  v-model="companyData[item.field]">
                </el-input>
              </div>
            </div>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisibleCom = false" size="small">取 消</el-button>
            <el-button type="primary" @click="confirmData_com" size="small">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </div>
    <!--企业详情-->
    <companyDetails :companyInfoProp="activeCompanyInfo" @showCompanyDetails="showCompanyDetailsFa"
                    v-if="comDetailsShow"></companyDetails>
  </div>
</template>

<script type="text/ecmascript-6">
  import companyInfo_api from "../../api/companyInfo";
  import companyDetails from "./companyDetails"

  import * as MUTATIONS from '../../store/mutations'
  import {mapGetters} from "vuex"

  export default {
    name: "companyDataManage",
    props: ['companyInfoProp'],
    data() {
      return {
        tableData: [
          {
            companyName: "1",
            companyHeadcount: '11',
            companyAssets: '1',
            companyEstablishDate: '11',
            companyAddress: '2',
            companyLegalRepre: '22',
            companyType: '2',
            companyRegistrationNum: '22',
            companyIndustryCode: "201",
          },
        ],
        dataFieldsAndLabels: [
          {
            field: "companyName",
            label: "企业名称",
          },
          {
            field: "companyHeadcount",
            label: "员工人数",
          },
          {
            field: "companyAssets",
            label: "资产规模",
          },
          {
            field: "companyEstablishDate",
            label: "成立日期",
          },
          {
            field: "companyAddress",
            label: "企业地址",
          },
          {
            field: "companyLegalRepre",
            label: "法人代表",
          },
          {
            field: "companyType",
            label: "企业性质",
          },

          {
            field: "companyRegistrationNum",
            label: "注册号",
          },

          {
            field: "companyIndustryCode",
            label: "所属行业",
          },
        ],
        companyData: {},
        dialogVisibleCom: false,
        activeDate: "2017年",
        dialogState: {
          title: "",
          func: ""
        },
        companyIndustryCode: "201",
        activeCompanyInfo: null,
        comDetailsShow: false,
      }
    },

    mounted() {
      /*获取企业列表*/
      this.aquireComInfoByIndustryCode();
    },

    components: {
      companyDetails,
    },

    methods: {
      /*获取企业列表*/
      aquireComInfoByIndustryCode() {
        let self = this;
        let param = {
          companyIndustryCode: this.companyIndustryCode,
        };
        let res = companyInfo_api.findComInfoByIndustryCode(param);
        res.then((res) => {
          self.tableData = res.data.companyInfo;
          self.$store.commit(MUTATIONS.companyListByIndustryCode_mu, self.tableData);
        });
        res.catch((err) => {
          console.error(err)
        })
      },

      /*删除一条企业信息*/
      deleteCompanyData_com(row) {
        let self = this;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            let param = {
              companyId: row.companyId
            };
            let deleteResult = companyInfo_api.deleteACompanyInfo(param);
            deleteResult.then((res) => {
              self.$notify({
                title: '成功',
                message: '成功删除一条企业信息！',
                type: 'success'
              });
              self.aquireComInfoByIndustryCode();//获取企业列表
            });
            deleteResult.catch((err) => {
              console.error(err);
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
      },

      /*展示弹窗-编辑企业信息*/
      showDialog_update_com(row) {
        this.dialogVisibleCom = true;
        this.companyData = row;
        this.dialogState.title = "编辑企业信息";
        this.dialogState.func = "update";
      },

      /*展示弹窗-添加企业信息*/
      showDialog_add_com() {
        this.dialogVisibleCom = true;
        this.dialogState.func = "add";
        this.dialogState.title = "添加企业信息";
        this.companyData = {
          companyName: "",
          companyHeadcount: '',
          companyAssets: '',
          companyEstablishDate: '',
          companyAddress: '',
          companyLegalRepre: '',
          companyType: '',
          companyRegistrationNum: '',
          companyIndustryId: '666'
        };
      },
      /*批量导入*/
      importResult_com() {

      },
      /*数据确定*/
      confirmData_com() {
        let self = this;
        if ("add" === this.dialogState.func) {
          let companyDataAPI = JSON.parse(JSON.stringify(this.companyData));
          let addComRes = companyInfo_api.addACompanyInfo(companyDataAPI);
          /*添加成功*/
          addComRes.then((res) => {
            self.aquireComInfoByIndustryCode();//获取企业列表
            self.dialogVisibleCom = false;
          });
          addComRes.catch((err) => {
            console.error(err)
          })
        }
        else if ("update" === this.dialogState.func) {
          let updateRes = companyInfo_api.updateACompanyInfo(self.companyData);
          updateRes.then((res) => {
            self.aquireComInfoByIndustryCode();//获取企业列表
            self.dialogVisibleCom = false;
          }).catch((err) => {
            console.error(err);
          })
        }
      },
      /*企业类型-编码转文字*/
      comTypeCode2Word(code) {
        let typeLable = "";
        if (this.companyTypeListPub) {
          this.companyTypeListPub.map((item, index) => {
            if (code === item.value) {
              typeLable = item.label;
            }
          });
        }

        return typeLable;
      },
      /*企业详情*/
      showDialog_details_com(comRow) {
        this.activeCompanyInfo = comRow;
        this.comDetailsShow = true;
      },
      /*展示企业列表*/
      showCompanyDetailsFa(detailsShow) {
        this.comDetailsShow = detailsShow;
      }
    },

    computed: {
      ...mapGetters({
        companyListByIndustryCode: "companyListByIndustryCode",
        companyTypeListPub: "companyTypeListPub",
        industryCodeListPub: "industryCodeListPub",
      })
    }
  }
</script>

<style scoped lang="less">
  .companyDataManage {
    height: 100%;
    width: 100%;
    .companyDataBtns {
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
    .companyDataDialog {
      .companyDataDialog-content {
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
        }
      }
    }
  }

</style>
<style lang="less">
  .companyDataDialog {
    .el-dialog {
      margin-top: 5vh !important;
      .el-dialog__body {
        padding: 10px 20px;
      }
    }
  }
</style>
