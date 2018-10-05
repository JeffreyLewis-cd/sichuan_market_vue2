<template>
  <div class="industryProfile">
    <div id="industryProfile" ref="industryProfile" class="industryProfileBox" v-if="industryProfileShow"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  import industryInfo_api from "../../api/industryInfo";

  var echarts = require('echarts');
  import {mapGetters} from 'vuex'


  export default {
    name: "industryProfile",
    data() {
      return {
        primaryIndustry: [
          {
            code: "201",
            name: "农业"
          },
          {
            code: "202",
            name: "林业"
          },
          {
            code: "203",
            name: "畜牧业"
          },
          {
            code: "204",
            name: "渔业"
          },
        ],
        industryData: {
          '201': {
            name: "农业",
            xAxisData: [],
            seriesData: [],
          },
          '202': {
            name: "林业",
            xAxisData: [],
            seriesData: [],
          },
          '203': {
            name: "畜牧业",
            xAxisData: [],
            seriesData: [],
          },
          '204': {
            name: "渔业",
            xAxisData: [],
            seriesData: [],
          },

        },
        dataCount: 0,
        industryProfileShow: true,
        myChart_line: null,


      }
    },
    mounted() {
      this.getIndustryData();  //获取行业数据

    },

    components: {},

    methods: {

      /*获取行业数据*/
      getIndustryData() {
        this.primaryIndustry.map((item) => {
          this.findIndustryInfoByCode_vue(item); //查询某个行业的全部数据
        });
      },


      /*画折线图*/
      drawLineChart() {
        let self = this;
        let myChart_line = echarts.init(this.$refs.industryProfile); //这里是为了获得容器所在位置
        window.onresize = myChart_line.resize;
        myChart_line.setOption({ // 进行相关配置
          title: {
            text: '四川省第一产业统计折线图'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          legend: {
            data: ['农业', '林业', '畜牧业', '渔业']
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: self.industryData[201].xAxisData
            }
          ],
          yAxis: [
            {
              name: "单位（亿元）",
              type: 'value'
            }
          ],
          series: [
            {
              name: '农业',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[201].seriesData
            },
            {
              name: '林业',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[202].seriesData
            },
            {
              name: '畜牧业',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[203].seriesData
            },
            {
              name: '渔业',
              type: 'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data: self.industryData[204].seriesData
            }
          ]
        });
      },


      /*查询某个行业的全部数据*/
      findIndustryInfoByCode_vue(industryInfoProp) {
        let self = this;
        let param = {
          industryCode: industryInfoProp.code,
        };
        let findResult = industryInfo_api.findIndustryInfoByCode(param);
        findResult.then((res) => {
          if (res.data.industryInfo.length > 0) {
            /*            self.$notify({
                          title: '成功',
                          message: '成功获取_' + industryInfoProp.name + '_信息！',
                          type: 'success'
                        });*/


            let xAxisData = [];
            let seriesData = [];
            let industryCode = res.data.industryInfo[0] ? res.data.industryInfo[0].industryCode : null;
            res.data.industryInfo.map((item) => {
              xAxisData.push(item.statisticDate);
              seriesData.push(item.totalOutPut)
            });

            /*匹配数据*/
            let industryData_code = self.industryData[industryCode];
            if (industryData_code) {
              industryData_code.xAxisData = xAxisData;
              industryData_code.seriesData = seriesData;
            }
            self.dataCount += 1;  //获取数据就计数一次；


          }

        });
        findResult.catch((err) => {
          console.error(err);
          self.$notify({
            title: '失败',
            message: '获取_' + industryInfoProp.name + '_信息失败！',
            type: 'error'
          });
        })
      },
    },
    watch: {
      dataCount() {
        if (this.dataCount === this.primaryIndustry.length) {
          /*          this.$notify({
                      title: '成功',
                      message: '成功获取第一产业信息！',
                      type: 'success'
                    });*/
          this.drawLineChart();  //所有数据加载以后，才开始画折线图
        }
      },
      leftSideNavCollapse() {
        let self = this;
        this.industryProfileShow = false;
        setTimeout(function () {
          self.industryProfileShow = true;
        }, 60);

        setTimeout(function () {
          self.drawLineChart();  //刷新折线图
        }, 360)

      }
    },
    computed: {

      ...mapGetters({
        leftSideNavCollapse: 'leftSideNavCollapse',
      })
    }

  }
</script>

<style scoped lang="less">
  .industryProfile {
    width: 100%;
    min-height: 500px;
    .industryProfileBox {
      width: 100%;
      height: 500px;
      min-width: 1000px;
    }
  }

</style>
