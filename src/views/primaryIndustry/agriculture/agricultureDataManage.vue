<template>
  <div class="agricultureDataManage">
    <div class="agrDataBtns">
      <el-button type="primary" size="small" @click="dialogFormVisible = true">添 &nbsp;&nbsp;&nbsp; 加</el-button>
    </div>

    <div class="agrDataTable">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
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
          prop="statisticsDate"
          label="统计日期"
          width=""
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
            <el-button @click="deleteAgrData(scope.row)" type="text" size="small">删除</el-button>
            <el-button type="text" size="small">编辑</el-button>
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
  import industryInfo_api from "../../../api/industryInfo"

  export default {
    name: "agricultureDataManage",
    data() {
      return {
        tableData: [{
          industryId: "201",
          industryName: '农业',
          totalOutPut: '100',
          totalOutPut_unit: '亿元',
          productionCosts: '50',
          productionCosts_unit: '亿元',
          industryProfit: '50',
          profit_unit: '亿元',
          employedPopulation: '100',
          employedPopulation_unit: '万人',
          statisticsDate: '2017',
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
        argData: {
          industryId: "201",
          industryName: '农业',
          totalOutPut: '100',
          totalOutPut_unit: '亿元',
          productionCosts: '50',
          productionCosts_unit: '亿元',
          industryProfit: '50',
          profit_unit: '亿元',
          employedPopulation: '100',
          employedPopulation_unit: '万人',
          statisticDate: '2017年',
          topCompanies: ""
        },
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
      }
    },
    mounted() {

    },

    components: {},

    methods: {
      /*确认添加数据*/
      confirmAgrData() {
        console.log("确认添加数据");
        console.log(this.argData);
        this.addAindustryInfo_vue(); //添加一条行业数据

      },

      /*添加一条行业数据*/
      addAindustryInfo_vue(){
        let self=this;
        let addResult=industryInfo_api.addAindustryInfo(this.argData);
        addResult.then((res)=>{
          console.log(res);
          self.$notify({
            title: '成功',
            message: '成功添加一条行业信息！',
            type: 'success'
          });
          self.dialogFormVisible = false;


        });
        addResult.catch((err)=>{
          console.log(err);


        })

      },

      /*删除一条数据*/
      deleteAgrData(row){
        console.log('删除一条数据');
        console.log(row);

      }
    },

  }
</script>

<style scoped lang="less">
  .agricultureDataManage {
    height: 100%;
    width: 100%;
    border: 1px solid red;
    .agrDataBtns {
      text-align: right;
      padding-bottom: 10px;
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
