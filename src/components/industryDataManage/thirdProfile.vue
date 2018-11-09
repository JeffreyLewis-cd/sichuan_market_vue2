<template>
  <div class="thirdProfile">
    <div id="thirdProfile" ref="thirdProfile" class="thirdProfileBox" v-if="thirdProfileShow"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  import industryInfo_api from "../../api/industryInfo";

  var echarts = require('echarts');
  import {mapGetters} from 'vuex'


  export default {
    name: "thirdProfile",
    data() {
      return {
        thirdIndustry: [
          {
            code: "210",
            name: "交通、邮政业"
          },
          {
            code: "209",
            name: "批发、零售业"
          },
          {
            code: "211",
            name: "住宿、餐饮业"
          },
          {
            code: "213",
            name: "金融业"
          },
          {
            code: "214",
            name: "房地产业"
          },
          {
            code: "222",
            name: "其他"
          },
        ],
        industryData: {
          '210': {
            name: "交通、邮政业",
            xAxisData: [],
            seriesData: [],
          },
          '209': {
            name: "批发、零售业",
            xAxisData: [],
            seriesData: [],
          },
          '211': {
            name: "住宿、餐饮业",
            xAxisData: [],
            seriesData: [],
          },
          '213': {
            name: "金融业",
            xAxisData: [],
            seriesData: [],
          },
          '214': {
            name: "房地产业",
            xAxisData: [],
            seriesData: [],
          },
          '222': {
            name: "其他",
            xAxisData: [],
            seriesData: [],
          },

        },
        dataCount: 0,
        thirdProfileShow: true,
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
        this.thirdIndustry.map((item) => {
          this.findIndustryInfoByCode_vue(item); //查询某个行业的全部数据
        });
      },


      /*画折线图*/
      drawLineChart() {
        let self = this;
        let myChart_line = echarts.init(this.$refs.thirdProfile); //这里是为了获得容器所在位置
        window.onresize = myChart_line.resize;
        myChart_line.setOption({ // 进行相关配置
          title: {
            text: '四川省第三产业统计折线图'
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
            data: ['交通、邮政业', '批发、零售业', '住宿、餐饮业', '金融业', '房地产业', '其他']
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
              data: self.industryData[210].xAxisData
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
              name: '交通、邮政业',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[210].seriesData
            },
            {
              name: '批发、零售业',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[209].seriesData
            },
            {
              name: '住宿、餐饮业',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[211].seriesData
            },
            {
              name: '金融业',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[213].seriesData
            },
            {
              name: '房地产业',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[214].seriesData
            },
            {
              name: '其他',
              type: 'line',
              stack: '总量',
              areaStyle: {},
              data: self.industryData[222].seriesData
            },
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
        if (this.dataCount === this.thirdIndustry.length) {
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
        this.thirdProfileShow = false;
        setTimeout(function () {
          self.thirdProfileShow = true;
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
  .thirdProfile {
    width: 100%;
    min-height: 500px;
    .thirdProfileBox {
      width: 100%;
      height: 500px;
      min-width: 1000px;
    }
  }
</style>
