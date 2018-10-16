<template>
  <div class="companyDataManage">
    <div class="companyDataBtns">
      <el-button type="primary" size="small" @click="showDialog_add_com">添 &nbsp;&nbsp;&nbsp; 加</el-button>
      <!--<batchImport class="batchImport-btn" @importSuccess="importResult_com"></batchImport>-->
    </div>

    <div class="companyDataTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        height="60vh"
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
          width="100">
          <template slot-scope="scope">
            <el-button @click="deleteCompanyData_com(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="showDialog_update_com(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="companyDataDialog">
      <el-dialog title="添加相关企业" :visible.sync="dialogVisibleCom">
        <div class="companyDataDialog-content">
          <!--新用户信息-->
          <div class="dialog-row-box" v-for="(item,index) in dataFieldsAndLabels" :key="index">
            <p class="dialog-row-label">{{item.label}}:&nbsp;</p>

            <div v-if="'companyType'===item.field">
              <el-select v-model="companyData[item.field]" placeholder="请选择" style="width: 65%;" size="small">
                <el-option
                  v-for="item in companyTypeList"
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

</template>

<script type="text/ecmascript-6">
  import companyInfo_api from "../../api/companyInfo";

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
        ],
        companyData: {},
        dialogVisibleCom: false,
        companyTypeList: [
          {
            value: 31,
            label: '有限责任公司'
          }, {
            value: 32,
            label: '股份有限公司'
          }, {
            value: 33,
            label: '国有独资公司'
          }, {
            value: 34,
            label: '个人独资企业'
          }, {
            value: 35,
            label: '合伙企业'
          }, {
            value: 36,
            label: '个体工商户'
          }, {
            value: 37,
            label: '外商投资企业'
          }, {
            value: 38,
            label: '私营企业'
          },

        ],
        activeDate: "2017年",
        dialogState: "add"
      }
    },
    mounted() {

    },

    components: {},

    methods: {
      /*删除一条企业信息*/
      deleteCompanyData_com() {

      },

      /*展示弹窗*/
      showDialog_update_com() {
        this.dialogVisibleCom = true;
      },

      /*展示弹窗-添加企业信息*/
      showDialog_add_com() {
        this.dialogVisibleCom = true;
        this.dialogState = "add";
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
        if ("add" === this.dialogState) {
          let companyDataAPI = JSON.parse(JSON.stringify(this.companyData));
          let estabDate = new Date(Date.parse(companyDataAPI.companyEstablishDate.replace('年', '-').replace('月', '-').replace('日', '')));
          console.log(estabDate);


          companyDataAPI.companyEstablishDate = estabDate;

          let addComRes = companyInfo_api.addAindustryInfo(companyDataAPI);
          addComRes.then((res) => {
            console.log(res)
          });
          addComRes.catch((err) => {
            console.error(err)
          })

        }

      }

    },

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
