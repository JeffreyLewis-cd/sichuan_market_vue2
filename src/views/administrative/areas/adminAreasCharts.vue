<template>
  <div class="adminAreasCharts">
    <div id="GDPChart" :style="{width: '100%', height: '500px'}"></div>

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

      }
    },
    mounted() {
      this.findTotalGDPList();
    },

    components: {},

    methods: {

      /*获取总的GDP数据*/
      findTotalGDPList() {
        let self = this;
        let totalGDP = adminAreas.findTotalGDPList();
        totalGDP.then((res) => {
          self.GDPList = res.data;
          self.drawLine();
        });
        totalGDP.catch((err) => {
          console.log(err);
        })


      },

      /*画柱状图*/
      drawLine() {
        this.cityCategory = [];
        this.totalGDPList = [];
        this.ppGDPList = [];
        this.population = [];

        /*抽取相关数据*/
        this.GDPList.map((item) => {
          this.cityCategory.push(item.city_name);
          this.totalGDPList.push(item.city_gdp_total);
          this.ppGDPList.push(item.city_gdp_pp);
          this.population.push(item.city_population);
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
    height: 70vh;
    width: 100%;
    min-height: 500px;
    background-color: #fff;
    overflow: hidden;
    margin-top: 20px;
    #GDPChart{
      margin:0 auto;
    }
  }

</style>
