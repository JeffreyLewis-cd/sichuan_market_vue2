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
          prop="company_name"
          label="公司名称"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="company_headcount"
          label="员工总数"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="company_assets"
          label="注册资本"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="company_established_date"
          label="注册时间"
          width="150"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="company_address"
          label="注册地址"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="company_legal_representative"
          label="法人代表"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="company_type"
          label="公司类型"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="company_registration_num"
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
      <el-dialog title="添加农业数据" :visible.sync="dialogFormVisible">
        <div class="companyDataDialog-content">
          <!--新用户信息-->
          <div class="dialog-row-box" v-for="(item,index) in dataFieldsAndLabels" :key="index">
            <p class="dialog-row-label">{{item.label}}:&nbsp;</p>

            <div v-if="'statisticDate'===item.field">
              <el-select v-model="argData[item.field]" placeholder="请选择" style="width: 50%;" size="small">
                <el-option
                  v-for="item in dateList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

            <div v-else>
              <el-input
                style="width: 50%;"
                placeholder="请输入..."
                suffix-icon="el-icon-edit"
                :disabled="'companyName'===item.field"
                v-model="argData[item.field]">
              </el-input>
            </div>

          </div>

        </div>


        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
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
            company_name: "1",
            company_headcount: '11',
            company_assets: '1',
            company_established_date: '11',
            company_address: '2',
            company_legal_representative: '22',
            company_type: '2',
            company_registration_num: '22',
          },
        ],
        dataFieldsAndLabels: [
          {
            field: "companyName",
            label: "行业名称",
          },
          {
            field: "totalOutPut",
            label: "总产值",
          },
          {
            field: "totalOutPut_unit",
            label: "总产值单位",
          },
          {
            field: "productionCosts",
            label: "生产成本",
          },
          {
            field: "productionCosts_unit",
            label: "生产成本单位",
          },
          {
            field: "companyProfit",
            label: "行业利润",
          },
          {
            field: "profit_unit",
            label: "行业利润单位",
          },
          {
            field: "employedPopulation",
            label: "从业人数",
          },
          {
            field: "employedPopulation_unit",
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
        argData: {},
        dialogFormVisible: false,
        dateList: [
          /*          {
                      value: '2017年',
                      label: '2017年'
                    },*/

        ],
        activeDate: "2017年",
        dialogState: "add"
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


    },

    components: {},

    methods: {
      /*删除一条公司信息*/
      deleteCompanyData_com() {

      },

      /*展示弹窗*/
      showDialog_update_com() {

      },

      /*展示弹窗-添加公司信息*/
      showDialog_add_com() {

      },

      /*批量导入*/
      importResult_com() {

      },

      /*数据确定*/
      confirmData_com() {

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
