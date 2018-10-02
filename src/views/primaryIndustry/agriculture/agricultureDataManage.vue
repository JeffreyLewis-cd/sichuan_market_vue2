<template>
  <div class="agricultureDataManage">
    <div class="agrDataBtns">
      <!--      <el-select v-model="activeDate" placeholder="请选择" style="width: 120px;" size="small"
                       @change="switchDate">
              <el-option
                v-for="item in dateList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>-->
      <el-button type="primary" size="small" @click="showDialog_add">添 &nbsp;&nbsp;&nbsp; 加</el-button>
      <batchImport class="batchImport-btn" @importSuccess="importResult"></batchImport>
    </div>

    <div class="agrDataTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%"
        max-height="500"
      >
        <el-table-column
          prop="industryName"
          label="行业名称"
          width="180"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalOutPut"
          label="总产值"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="totalOutPut_unit"
          label="总产值单位"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="productionCosts"
          label="生产成本"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="productionCosts_unit"
          label="生产成本单位"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="industryProfit"
          label="行业利润"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="profit_unit"
          label="行业利润单位"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="employedPopulation"
          label="从业人数"
          width="100"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="employedPopulation_unit"
          label="从业人数单位"
          width="120"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="statisticDate"
          label="统计日期"
          sortable
          width="140"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="topCompanies"
          label="龙头企业"
          width="300"
          align="center"
        >
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="deleteAgrData_vue(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="showDialog_update(scope.row)" type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="agrDataDialog">
      <el-dialog title="添加农业数据" :visible.sync="dialogFormVisible">
        <div class="agrDataDialog-content">
          <!--新用户信息-->
          <div class="dialog-row-box" v-for="(item,index) in agrDataFieldsAndLabels" :key="index">
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
                :disabled="'industryName'===item.field"
                v-model="argData[item.field]">
              </el-input>
            </div>

          </div>

        </div>


        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="confirmAgrData" size="small">确 定</el-button>
        </div>
      </el-dialog>

    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import industryInfo_api from "../../../api/industryInfo";
  import batchImport from "../../../components/fileUpload/batchImport";

  export default {
    name: "agricultureDataManage",
    data() {
      return {
        tableData: [{
          industryCode: "",
          industryName: '',
          totalOutPut: '',
          totalOutPut_unit: '',
          productionCosts: '',
          productionCosts_unit: '',
          industryProfit: '',
          profit_unit: '',
          employedPopulation: '',
          employedPopulation_unit: '',
          statisticsDate: '',
          topCompanies: ""
        },],
        agrDataFieldsAndLabels: [
          {
            field: "industryName",
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
            field: "industryProfit",
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
            label: "龙头企业",
          },


        ],
        argData: {},
        dialogFormVisible: false,
        dateList: [
          {
            value: '2017年',
            label: '2017年'
          },
          {
            value: '2016年',
            label: '2016年'
          },
          {
            value: '2015年',
            label: '2015年'
          },
          {
            value: '2014年',
            label: '2014年'
          },
          {
            value: '2013年',
            label: '2013年'
          },
          {
            value: '2012年',
            label: '2012年'
          },
          {
            value: '2011年',
            label: '2011年'
          },
          {
            value: '2010年',
            label: '2010年'
          },
          {
            value: '2009年',
            label: '2009年'
          },
          {
            value: '2008年',
            label: '2008年'
          },
        ],
        activeDate: "2017年",
        dialogState: "add"
      }
    },
    mounted() {
      this.findIndustryInfoByCode_vue();  //查询某个行业的全部数据

    },

    components: {
      batchImport,
    },

    methods: {
      /*展示弹窗--添加*/
      showDialog_add() {
        this.dialogState = "add";
        this.dialogFormVisible = true;
        this.argData = {
          industryCode: "201",
          industryName: '农业',
          totalOutPut: '',
          totalOutPut_unit: '亿元',
          productionCosts: '',
          productionCosts_unit: '亿元',
          industryProfit: '',
          profit_unit: '亿元',
          employedPopulation: '',
          employedPopulation_unit: '万人',
          statisticDate: '2017年',
          topCompanies: ""
        }
      },

      /*展示弹窗--编辑*/
      showDialog_update(row) {
        this.dialogState = "update";
        this.dialogFormVisible = true;
        this.argData = row;
      },

      /*确认添加数据*/
      confirmAgrData() {

        if ('add' === this.dialogState) {
          this.addAindustryInfo_vue(); //添加一条行业数据
        } else if ("update" === this.dialogState) {
          this.updateAgrData_vue();  //修改一条行业数据
        }
      },

      /*添加一条行业数据*/
      addAindustryInfo_vue() {
        let self = this;

        let addResult = industryInfo_api.addAindustryInfo(this.argData);
        addResult.then((res) => {
          self.$notify({
            title: '成功',
            message: '成功添加一条行业信息！',
            type: 'success'
          });
          self.dialogFormVisible = false;
          self.findIndustryInfoByCode_vue();  //查询某个行业的全部数据
        });
        addResult.catch((err) => {
          console.error(err);
        })

      },

      /*删除一条数据*/
      deleteAgrData_vue(row) {
        let self = this;

        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          let param = {
            industryId: row.industryId
          };
          let deleteResult = industryInfo_api.deleteAgrData(param);
          deleteResult.then((res) => {
            self.$notify({
              title: '成功',
              message: '成功删除一条行业信息！',
              type: 'success'
            });
            self.findIndustryInfoByCode_vue();  //查询某个行业的全部数据


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
      updateAgrData_vue() {
        let self = this;
        let param = this.argData;
        let updateResult = industryInfo_api.updateAgrData(param);
        updateResult.then((res) => {
          self.$notify({
            title: '成功',
            message: '成功修改一条行业信息！',
            type: 'success'
          });
          self.dialogFormVisible = false;
          self.findIndustryInfoByCode_vue();  //查询某个行业的全部数据


        });
        updateResult.catch((err) => {
          console.error(err);


        })
      },

      /*查询某个行业的全部数据*/
      findIndustryInfoByCode_vue() {
        let self = this;
        let param = {
          industryCode: "201",
          // statisticDate: this.activeDate,
        };
        let findResult = industryInfo_api.findIndustryInfoByCode(param);
        findResult.then((res) => {
          if (res.data.industryInfo.length > 0) {
            self.$notify({
              title: '成功',
              message: '成功获取行业信息！',
              type: 'success'
            });
          }
          self.tableData = res.data.industryInfo;

        });
        findResult.catch((err) => {
          console.error(err);


        })

      },

      /*切换日期*/
      switchDate(val) {
        this.activeDate = val;
        this.findIndustryInfoByCode_vue();  //查询某个行业的全部数据
      },

      /*导入数据的结果*/
      importResult(res) {
        if (res) {
          this.findIndustryInfoByCode_vue(); //查询某个行业的全部数据
        }

      }
    },

  }
</script>

<style scoped lang="less">
  .agricultureDataManage {
    height: 100%;
    width: 100%;
    .agrDataBtns {
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
    .agrDataDialog {
      .agrDataDialog-content {
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
