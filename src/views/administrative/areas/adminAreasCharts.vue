<template>
  <div class="adminAreasCharts">
    <div class="switchDate">
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
    <div id="GDPChart" :style="{width: 'calc(100% - 2px)', height: 'calc(100vh - 170px'}"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  import adminAreas from "../../../api/adminAreas"
  import {mapGetters} from "vuex"

  export default {
    name: "adminAreasCharts",
    data() {
      return {
        GDPList: [],
        cityCategory: [],
        totalGDPList: [],
        ppGDPList: [],
        population: [],
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
      this.findTotalGDPList();
    },

    components: {},

    methods: {


      /*切换日期*/
      switchDate() {
        this.findTotalGDPList(); //获取四川省基本信息
      },

      /*获取总的GDP数据*/
      findTotalGDPList() {
        let self = this;
        let param = {
          statisticDate: this.activeDate,
        };
        let totalGDP = adminAreas.findTotalGDPList(param);
        totalGDP.then((res) => {
          self.GDPList = res.data;
          self.drawCharts();
        });
        totalGDP.catch((err) => {
          console.error(err);
          self.GDPList = [];
          self.drawCharts();
        })


      },

      /*画柱状图*/
      drawCharts() {
        this.cityCategory = [];
        this.totalGDPList = [];
        this.ppGDPList = [];
        this.population = [];

        /*抽取相关数据*/
        this.GDPList.map((item) => {
          this.cityCategory.push(item.cityName);
          this.totalGDPList.push(item.cityGdpTotal);
          this.ppGDPList.push(item.cityGdpPp);
          this.population.push(item.cityPopulation);
        });

        // 基于准备好的dom，初始化echarts实例
        let GDPChart = this.$echarts.init(document.getElementById('GDPChart'))
        // 绘制图表
        GDPChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          toolbox: {
            left: 0,
            feature: {
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['GDP总量', '人均GDP', '总人口']
          },
          xAxis: [
            {
              type: 'category',
              data: this.cityCategory,
              axisLabel: {
                interval: 0,
                rotate: 20
              },
              axisPointer: {
                type: 'shadow'
              },
              splitLine: {show: false}
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'GDP总量',
              min: 0,
              max: 15000,
              interval: 5000,
              axisLabel: {
                formatter: '{value} 亿元',
                rotate: 30
              }
            },
            {
              type: 'value',
              name: '人均GDP',
              min: 0,
              max: 100000,
              interval: 20000,
              offset: 70,
              position: 'left',
              axisLabel: {
                formatter: '{value} 元',
                rotate: 30
              }
            },
            {
              type: 'value',
              name: '总人口',
              min: 0,
              max: 2000,
              interval: 500,
              axisLabel: {
                formatter: '{value} 万人'
              }
            }
          ],
          series: [
            {
              name: 'GDP总量',
              type: 'bar',
              data: this.totalGDPList
            },
            {
              name: '人均GDP',
              type: 'bar',
              yAxisIndex: 1,
              data: this.ppGDPList
            },
            {
              name: '总人口',
              type: 'line',
              yAxisIndex: 2,
              data: this.population
            }
          ]
        });
      }
    },
    computed: {

      ...mapGetters({
        leftSideNavCollapse: 'leftSideNavCollapse',
      })
    },
    watch: {}
  }
</script>

<style scoped lang="less">

  .adminAreasCharts {
    height: calc(100vh - 130px);
    width: 100%;
    min-height: 360px;
    background-color: #f0f2f5;
    overflow: hidden;
    margin-top: 5px;

    .switchDate {
      height: 40px;
      background-color: #f0f2f5;
      text-align: right;
    }
    #GDPChart {
      margin: 0 auto;
      border: 1px solid #DCDFE6;
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
    }
  }

</style>
