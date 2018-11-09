<template>
  <div class="sichuanMap">
    <div class="sichuanMapBtns">
      <el-select v-model="activeDate" placeholder="请选择" style="width: 100%;" size="small"
                 @change="switchDate">
        <el-option
          v-for="item in dateList"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="mapVSbtns" @click.native="showAreasData" :type="'areas'==mapType?'primary':''"
                 size="small">各市面积比较
      </el-button>
      <el-button class="mapVSbtns" @click.native="showTotalGDP" :type="'totalGDP'==mapType?'primary':''"
                 size="small">各市总GDP比较
      </el-button>
      <el-button class="mapVSbtns" @click.native="showGDPpp" :type="'GDPpp'==mapType?'primary':''"
                 size="small">各市人均GDP比较
      </el-button>
      <el-button class="mapVSbtns" @click.native="showPopulation" :type="'population'==mapType?'primary':''"
                 size="small">各市总人口比较
      </el-button>
      <el-button class="mapVSbtns" @click.native="showPopuDensity" :type="'popuDensity'==mapType?'primary':''"
                 size="small">各市人口密度比较
      </el-button>
    </div>
    <div id="sichuan" ref="sichuan" class="sichuanMapBox"></div>
  </div>

</template>

<script type="text/ecmascript-6">
  var echarts = require('echarts');
  //   import '../../node_modules/echarts/map/js/world.js'
  import '../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
  import '../../../../node_modules/echarts/map/js/province/sichuan.js' // 引入中国地图数据
  import adminAreas from "@/api/adminAreas"


  export default {
    name: "sichuanMap",
    data() {
      return {
        optionData: {
          title: {
            text: '四川省各市面积比较 （2017）',
            subtext: '单位：平方千米',
          },
          min: 0,
          max: 180000,
          mapValue: {
            name: '面积(平方千米)', // 浮动框的标题
            type: 'map',
            geoIndex: 0,
            data: []
          }
        },
        allCityInfo: {},
        mapType: "areas",
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
      this.mapDisplay();//初始化地图
      this.findAllCityInfo();//获取四川省基本信息
    },

    components: {},

    methods: {

      /*初始化地图*/
      mapDisplay() {
        let myChart = echarts.init(this.$refs.sichuan); //这里是为了获得容器所在位置
        window.onresize = myChart.resize;
        myChart.setOption({ // 进行相关配置
          backgroundColor: "#F3F3F3",
          tooltip: {}, // 鼠标移到图里面的浮动提示框
          title: this.optionData.title,
          toolbox: {
            show: true,
            orient: 'vertical',
            left: 'right',
            top: 'center',
            feature: {
              dataView: {readOnly: false},
              restore: {},
              saveAsImage: {}
            }
          },
          visualMap: {
            min: this.optionData.min,
            max: this.optionData.max,
            text: ['高', '低'],
            realtime: true,
            calculable: true,
            inRange: {
              color: ['lightskyblue', 'yellow', 'orangered']
            }
          },
          geo: { // 这个是重点配置区
            map: '四川', // 表示中国地图
            roam: true,
            zoom: 1.2,
            label: {
              normal: {
                show: true, // 是否显示对应地名
                textStyle: {
                  color: 'rgba(0,0,0,0.8)'
                }
              }
            },
            itemStyle: {
              normal: {
                borderColor: 'rgba(0, 0, 0, 0.2)',
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          },
          series: [{
            type: 'scatter',
            coordinateSystem: 'geo' // 对应上方配置
          },
            this.optionData.mapValue,
          ]
        })

      },

      /*切换日期*/
      switchDate() {
        this.findAllCityInfo(); //获取四川省基本信息
      },


      /*获取四川省基本信息*/
      findAllCityInfo() {
        let self = this;
        let param = {
          statisticDate: this.activeDate,
        };
        let allCityInfoes = adminAreas.findAllCityInfo(param);
        allCityInfoes.then((res) => {

          self.allCityInfo = res;
          self.showAreasData(); //展示面积数据

        });
        allCityInfoes.catch((err) => {
          console.error(err);
        })
      },

      /*展示面积数据*/
      showAreasData() {
        this.mapType = "areas";
        this.optionData.mapValue.data = [];
        this.optionData.title.text = "四川省各市面积比较 （2017）";
        this.optionData.title.subtext = '单位：平方千米';
        this.optionData.min = 0;
        this.optionData.max = 180000;
        this.optionData.mapValue.name = "面积(平方千米)";


        this.allCityInfo.data.map((item) => {
          this.optionData.mapValue.data.push({
            name: item.cityName,
            value: item.cityAreas,
          })
        });
        this.mapDisplay()
      },

      /*展示GDP总量*/
      showTotalGDP() {
        this.mapType = "totalGDP";
        this.optionData.mapValue.data = [];
        this.optionData.title.text = "四川省各市总GDP比较 （2017）";
        this.optionData.title.subtext = "单位：亿元";
        this.optionData.min = 0;
        this.optionData.max = 14000;
        this.optionData.mapValue.name = "总GDP(亿元)";


        this.allCityInfo.data.map((item) => {
          this.optionData.mapValue.data.push({
            name: item.cityName,
            value: item.cityGdpTotal,
          })
        });
        this.mapDisplay()

      },

      /*展示人均GDP*/
      showGDPpp() {
        this.mapType = "GDPpp";
        this.optionData.mapValue.data = [];
        this.optionData.title.text = "四川省各市人均GDP比较 （2017）";
        this.optionData.title.subtext = "单位：元";
        this.optionData.min = 16000;
        this.optionData.max = 93000;
        this.optionData.mapValue.name = "人均GDP(元)";


        this.allCityInfo.data.map((item) => {
          this.optionData.mapValue.data.push({
            name: item.cityName,
            value: item.cityGdpPp,
          })
        });
        this.mapDisplay()

      },

      /*展示各市总人口*/
      showPopulation() {
        this.mapType = "population";
        this.optionData.mapValue.data = [];
        this.optionData.title.text = "四川省各市总人口比较 （2017）";
        this.optionData.title.subtext = "单位：万人";
        this.optionData.min = 90;
        this.optionData.max = 1700;
        this.optionData.mapValue.name = "人口(万人)";


        this.allCityInfo.data.map((item) => {
          this.optionData.mapValue.data.push({
            name: item.cityName,
            value: item.cityPopulation,
          })
        });
        this.mapDisplay()

      },

      /*展示人口密度*/
      showPopuDensity() {
        this.mapType = "popuDensity";
        this.optionData.mapValue.data = [];
        this.optionData.title.text = "四川省各市人口密度比较 （2017）";
        this.optionData.title.subtext = "单位：人/平方千米";
        this.optionData.min = 5;
        this.optionData.max = 1200;
        this.optionData.mapValue.name = "人口密度(人/平方千米)";


        this.allCityInfo.data.map((item) => {
          this.optionData.mapValue.data.push({
            name: item.cityName,
            value: Math.round(item.cityPopulation / item.cityAreas * 10000),
          })
        });
        this.mapDisplay()

      },

    },

  }
</script>

<style scoped lang="less">
  .sichuanMap {
    display: flex;
    justify-content: center !important;
    align-items: center !important;

    .sichuanMapBtns {
      height: calc(100% - 100px);
      width: 10%;
      min-height: 650px;
      min-width: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center !important;
      align-items: center !important;
      margin-right: 20px;
    }
    .sichuanMapBox {
      height: calc(100vh - 80px);
      width: 90%;
      min-height: 600px;
      min-width: 600px;
      margin: 15px 0;
      border: 1px solid #cccccc;
      border-radius: 5px;
      overflow: hidden;
    }
  }
</style>

<style lang="less">
  .sichuanMapBtns {
    .mapVSbtns {
      width: 130px;
      margin: 20px 0 !important;

    }
  }

</style>
