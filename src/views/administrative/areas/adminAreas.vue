<template>
  <div class="adminAreas-page">

    <!--城市信息操作按钮-->
    <div class="adminAreas-operate">
      <h3 class="title">市级行政区域列表</h3>
      <div class="operates">
        <el-button type="primary" size="small" class="addCityInfo" @click="showCityInfoDialog">
          <i class="el-icon-plus"></i>&nbsp;&nbsp;添加城市信息
        </el-button>
        <el-select v-model="activeDate" placeholder="请选择" style="width: 120px;" size="small"
                   @change="switchDate">
          <el-option
            v-for="item in dateList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

    </div>

    <!--城市信息列表展示-->
    <el-table
      :data="adminAreasData"
      border
      :default-sort="{prop: 'city_gdp_total', order: 'descending'}"
      max-height="500"
      style="width: 100%;">
      <el-table-column
        v-for="(cityItem,index) in cityInfoFieldsAndLabels"
        :fixed="'city_name'===cityItem.field"
        :prop="cityItem.field"
        :label="cityItem.label"
        :key="index"
        sortable
        width="150px"
        align="center"
      >
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="deleteCityInfo(scope.row)" type="text" size="small">删除</el-button>
          <el-button @click="updateCityInfo(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--对话框-添加新用户-->
    <el-dialog class="cityInfo-dialog"
               :title="dialogTitle"
               :visible.sync="dialogVisible"
               width="70%">
      <!--新用户信息-->
      <div class="dialog-row-box" v-for="(item,index) in cityInfoFieldsAndLabels" :key="index">
        <p class="dialog-row-label">{{item.label}}:&nbsp;</p>

        <div class="selector" v-if="'city_name'===item.field">
          <el-select v-model="dialogPara[item.field]" placeholder="请选择" style="width: 50%;" @change="selectCity">
            <el-option
              v-for="item in cityList"
              :key="item.city_code"
              :label="item.city_name"
              :value="item.city_name">
            </el-option>
          </el-select>
        </div>
        <div class="selector" v-else-if="'statistic_date'===item.field">
          <el-select v-model="dialogPara[item.field]" placeholder="请选择" style="width: 50%;">
            <el-option
              v-for="item in dateList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>

        <div class="txtInput" v-else>
          <el-input
            style="width: 50%;"
            placeholder="请输入..."
            suffix-icon="el-icon-edit"
            v-model="dialogPara[item.field]">
          </el-input>
        </div>
      </div>

      <!--对话框-按钮-->
      <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small">取 消</el-button>
          <el-button type="primary" @click="dialogConfirm" size="small">确 定</el-button>
      </span>
    </el-dialog>


  </div>

</template>

<script type="text/ecmascript-6">
  import adminAreas from "../../../api/adminAreas"

  export default {
    name: "areas",
    data() {
      return {
        cityInfoFieldsAndLabels: [
          {
            field: "city_name",
            label: "城市名称",
          },
          {
            field: "city_gdp_total",
            label: "GDP总量",
          },
          {
            field: "city_gdp_total_unit",
            label: "GDP总量单位",
          },
          {
            field: "city_gdp_pp",
            label: "人均GDP",
          },
          {
            field: "city_gdp_pp_unit",
            label: "人均GDP单位",
          },
          {
            field: "city_areas",
            label: "面积",
          },
          {
            field: "city_areas_unit",
            label: "面积单位",
          },
          {
            field: "city_population",
            label: "人口",
          },
          {
            field: "city_population_unit",
            label: "人口单位",
          },
          {
            field: "city_gov_address",
            label: "政府驻地",
          },
          {
            field: "city_scenic_spots",
            label: "热门景点数",
          },
          {
            field: "city_airlines",
            label: "航班数",
          },
          {
            field: "city_airlines_unit",
            label: "航班数单位",
          },
          {
            field: "city_train",
            label: "列车班数",
          },
          {
            field: "city_train_unit",
            label: "列车班数单位",
          },
          {
            field: "city_cars_counts",
            label: "汽车保有量",
          },
          {
            field: "statistic_date",
            label: "统计时间",
          },

        ],
        adminAreasData: [],
        dialogVisible: false,
        dialogPara: {},
        dialogTitle: "添加城市信息",
        dialogFunction: "add",
        cityList: [],
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
      this.findAllCityInfo();//查询所有的城市信息
    },

    components: {},

    methods: {
      /*小数点后两位，不足补0*/
      toDecimal(x) {
        var f = parseFloat(x);
        if (isNaN(f)) {
          return false;
        }
        var f = Math.round(x * 100) / 100;
        var s = f.toString();
        var rs = s.indexOf('.');
        if (rs < 0) {
          rs = s.length;
          s += '.';
        }
        while (s.length <= rs + 2) {
          s += '0';
        }
        return s;
      },

      /*切换日期*/
      switchDate() {
        this.findAllCityInfo(); //获取四川省基本信息
      },


      /*查询所有的城市信息*/
      findAllCityInfo() {
        let self = this;
        let param = {
          statistic_date: this.activeDate,
        };
        let allCityInfoes = adminAreas.findAllCityInfo(param);
        allCityInfoes.then((res) => {

          self.adminAreasData = res.data;
          /*小数点后两位*/
          /*          self.adminAreasData.map((item) => {
                      item.city_areas = self.toDecimal(item.city_areas);
                      item.city_population = self.toDecimal(item.city_population);
                      item.city_gdp_total = self.toDecimal(item.city_gdp_total);
                    });*/
        });
        allCityInfoes.catch((err) => {
          console.error(err);
          self.adminAreasData = []
        })

      },

      /*删除城市信息*/
      deleteCityInfo(row) {
        let self = this;
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          /*确定要删除*/
          let deleteResult = adminAreas.deleteCityInfo(row);
          deleteResult.then((res) => {
            self.$notify({
              title: '成功',
              message: '成功删除一条城市信息！',
              type: 'success'
            });
            self.dialogVisible = false;
            self.findAllCityInfo();//查询所有的城市信息
          });
          deleteResult.catch((err) => {
            console.error(err);
            self.$notify.error({
              title: '错误',
              message: '操作失败！'
            });
          })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      /*编辑城市信息*/
      updateCityInfo(row) {
        this.dialogPara = row;
        this.dialogVisible = true;
        this.dialogFunction = "update";
        this.dialogTitle = "编辑城市信息";
      },

      /*展示添加城市信息对话框*/
      showCityInfoDialog() {
        let self = this;
        let cityListResponse = adminAreas.findCityList();
        cityListResponse.then((res) => {
          self.cityList = res.data.cityList;
        }).catch((err) => {
          console.error(err);
        });


        this.dialogPara = {
          city_id: "",
          city_name: "",
          city_code: "",
          city_gdp_total: 0,
          city_gdp_total_unit: "亿元",
          city_gdp_pp: 0,
          city_gdp_pp_unit: "元",
          city_areas: 0.00,
          city_areas_unit: "平方千米",
          city_population: 0,
          city_population_unit: "万人",
          city_gov_address: "",
          city_scenic_spots: 0,
          city_airlines: 0,
          city_airlines_unit: "条",
          city_train: 0,
          city_train_unit: "",
          city_cars_counts: 0,
          statistic_date: "2017",

        };
        this.dialogVisible = true;
        this.dialogFunction = "add";
        this.dialogTitle = "添加城市信息";
      },

      /*确认*/
      dialogConfirm() {
        if ("add" === this.dialogFunction) {
          this.confirmAddCityInfo();
        } else if ("update" === this.dialogFunction) {
          this.confirmUpdateCityInfo();
        }
      },

      /*确认添加城市信息*/
      confirmAddCityInfo() {
        let self = this;
        let addResult = adminAreas.addAnewCityInfo(this.dialogPara);
        addResult.then((res) => {
          self.$notify({
            title: '成功',
            message: '成功添加一条城市信息！',
            type: 'success'
          });
          self.dialogVisible = false;
          self.findAllCityInfo();//查询所有的城市信息
        });
        addResult.catch((err) => {
          console.error(err);
          self.$notify.error({
            title: '错误',
            message: '操作失败！'
          });
        })
      },

      /*确认编辑城市信息*/
      confirmUpdateCityInfo() {
        let self = this;
        let updateResult = adminAreas.updateCityInfo(this.dialogPara);
        updateResult.then((res) => {
          self.$notify({
            title: '成功',
            message: '成功编辑一条城市信息！',
            type: 'success'
          });
          self.dialogVisible = false;
          self.findAllCityInfo();//查询所有的城市信息
        });
        updateResult.catch((err) => {
          console.error(err);
          self.$notify.error({
            title: '错误',
            message: '操作失败！'
          });
        })
      },

      /*对话框选择城市*/
      selectCity(selectedCity) {
        let city_code = '';
        this.cityList.map((item) => {
          if (selectedCity === item.city_name) {
            city_code = item.city_code;
          }
        });
        this.dialogPara.city_code = city_code;

      }

    },

  }
</script>

<style scoped lang="less">
  .adminAreas-page {
    width: 100%;
    height: calc(100vh - 100px);
    min-height: 300px;
    min-width: 1200px;
    overflow: hidden;
    .adminAreas-operate {
      height: 40px;
      widht: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .cityInfo-dialog {
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


</style>

<style lang="less">
  .cityInfo-dialog {
    .el-dialog {
      margin-top: 5vh !important;
    }
  }

</style>
