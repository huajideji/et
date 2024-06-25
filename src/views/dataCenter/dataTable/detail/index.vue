<template>
  <div class="data-detail">
    <el-dialog :visible.sync="visible" width="1320px" @close="closeDia">
      <div slot="title">
        <span class="title">
          <span>{{ title }}</span
          >专题城市浏览量排行
        </span>
      </div>
      <div class="content">
        <div class="left">
          <div class="table-search">
            <div class="search-left">
              <div class="searchBar">
                <el-input
                  v-model="params.keyword"
                  style="width: 233px; margin-right: 24px"
                  placeholder="请输入城市名称"
                  clearable
                  @keyup.enter.native="search()"
                  @clear="search()"
                ></el-input>
              </div>
              <div class="searchBar">
                <el-date-picker
                  class="mytime-picker"
                  v-model="date"
                  style="width: 286px; margin-right: 24px"
                  type="daterange"
                  align="center"
                  :editable="false"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd"
                  @change="dateChange"
                  @clear="search()"
                >
                </el-date-picker>
              </div>
              <div class="searchBar" @click="search">
                <el-button type="primary" size="small" class="search-button"
                  >查询</el-button
                >
              </div>
            </div>
            <div class="search-right end" v-if="tableData.length">
              <el-button class="export-button" @click="exportData">
                <img src="@/assets/images/export.png" alt="" />
                导出
              </el-button>
            </div>
          </div>
          <el-table
            class="detail-table"
            ref="table"
            :data="tableData"
            stripe
            :header-cell-style="isEditor ? tableHeader2 : tableHeader"
          >
            <el-table-column align="center" label="排序" min-width="60">
              <template slot-scope="scope">
                <span
                  :class="
                    (params.page - 1) * params.page_num + scope.$index + 1 == 1
                      ? 'first'
                      : (params.page - 1) * params.page_num +
                          scope.$index +
                          1 ==
                        2
                      ? 'second'
                      : (params.page - 1) * params.page_num +
                          scope.$index +
                          1 ==
                        3
                      ? 'third'
                      : ''
                  "
                >
                  {{ (params.page - 1) * params.page_num + scope.$index + 1 }}
                </span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="城市">
              <template slot-scope="scope">
                {{ scope.row.cityname }}
              </template>
            </el-table-column>
			<!-- <el-table-column align="center" label="收录情况">
			  <template slot-scope="scope">
			    <span class="el-icon-success" style="font-size:24px" v-if="scope.row.is_employ==1"></span>
				<span class="el-icon-error" style="font-size:24px;color:red" v-if="scope.row.is_employ==0"></span>
			  </template>
			</el-table-column> -->
            <el-table-column
              align="center"
              label="访问次数"
              width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.visit_count }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="访客数"
              width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.visitor_count }}
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="平均访问时长"
              prop="avg_visit_time"
              width="130"
            >
              <template slot-scope="scope">
                {{ scope.row.avg_visit_time }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="浏览量">
              <template slot-scope="scope">
                {{ scope.row.view_count }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="浏览量占比">
              <template slot-scope="scope">
                {{ scope.row.proportion }}
              </template>
            </el-table-column>
          </el-table>

          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page="params.page"
              :page-sizes="[10, 20, 50]"
              :page-size="params.page_num"
              layout="sizes, prev, pager, next, jumper"
              prev-text="上一页"
              next-text="下一页"
              :total="total"
            >
            </el-pagination>
          </div>
        </div>
        <div class="right">
          <div id="myChart" v-if="tableData.length"></div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import utils from '@/utils/index.js'

// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core'
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LegendComponent,
} from 'echarts/components'
// 标签自动布局、全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  LegendComponent,
])
export default {
  props: {
    isEditor: {
      type: Boolean,
      default: false,
    },
    typeText:{
      type: String,
      default:'ET专题'
    }
  },
  data() {
    return {
      title: '',
      visible: false,
      date: [],
      params: {
        zt_id: '',
        start_time: '',
        end_time: '',
        keyword: '',
        page: 1,
        page_num: 10,
        zt_type:1
      },
      // 设置不让选今天之后的日期
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      tableData: [],
      tableHeader: {
        background: '#f6f6f6',
        color: '#333',
      },
      tableHeader2: {
        background: '#f1f1f1',
        color: '#333',
      },
      // 分页选择器

      total: 100,
      // 图表数据
      data: [
        { name: '成都', value: 1105 },
        { name: '杭州', value: 775 },
        { name: '北京', value: 908 },
        { name: '武汉', value: 1344 },
      ],
      // 图表提示数据
      tooltipData: [
        [
          { fatherName: '成都', toolName: '浏览量', toolValue: '1105' },
          { fatherName: '成都', toolName: '浏览量排行', toolValue: '23' },
          { fatherName: '成都', toolName: '浏览量占比', toolValue: '22.5%' },
        ],
        [
          { fatherName: '杭州', toolName: '浏览量', toolValue: '1105' },
          { fatherName: '杭州', toolName: '浏览量排行', toolValue: '23' },
          { fatherName: '杭州', toolName: '浏览量占比', toolValue: '22.5%' },
        ],
        [
          { fatherName: '北京', toolName: '浏览量', toolValue: '1105' },
          { fatherName: '北京', toolName: '浏览量排行', toolValue: '23' },
          { fatherName: '北京', toolName: '浏览量占比', toolValue: '22.5%' },
        ],
        [
          { fatherName: '武汉', toolName: '浏览量', toolValue: '1105' },
          { fatherName: '武汉', toolName: '浏览量排行', toolValue: '23' },
          { fatherName: '武汉', toolName: '浏览量占比', toolValue: '22.5%' },
        ],
      ],
    }
  },
  created() {},
  mounted() {
  },
  methods: {
    // 获取表格数据
    async getList() {
      this.tableData = []
      let res
      console.log(this.params)
      switch (this.typeText) {
        case 'ET专题':{ res = await this.$api.GetZhuantiFlowDetail(this.params)}; break
        case '专题配置':{this.params.zt_type=1;  res = await this.$api.getFlowDetail(this.params)};break
        case '独立开发专题': { this.params.zt_type = 2;  res = await this.$api.getFlowDetail(this.params)};break
        
      }
      this.tableData = res.list
      this.total = res.count
      this.getChartData(res.total_list)

      if (this.tableData.length >= 1) {
        this.getChart()
      }

      console.log(res, 'detailList')
    },
    // 获取图表数据
    getChartData(data) {
      this.data = []
      data.forEach((item) => {
        let obj = {
          name: item.cityname,
          value: item.view_count,
        }
        this.data.push(obj)
      })

      this.tooltipData = []
      data.forEach((item, index) => {
        let arr = [
          {
            fatherName: item.cityname,
            toolName: '访问次数',
            toolValue: item.visit_count,
          },
          {
            fatherName: item.cityname,
            toolName: '访客数',
            toolValue: item.visitor_count,
          },
          {
            fatherName: item.cityname,
            toolName: '平均访问时长',
            toolValue: item.avg_visit_time,
          },
          {
            fatherName: item.cityname,
            toolName: '浏览量',
            toolValue: item.view_count,
          },
          {
            fatherName: item.cityname,
            toolName: '浏览量排行',
            toolValue: index + 1,
          },
          {
            fatherName: item.cityname,
            toolName: '浏览量占比',
            toolValue: item.proportion,
          },
        ]
        this.tooltipData.push(arr)
      })
    },
    // 画图
    getChart() {
      setTimeout(() => {
        let tooltipData = this.tooltipData
        var myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          tooltip: {
            trigger: 'item',
            formatter: function (params) {
              // 将16进制颜色转换为rgb
              let color =
                'rgba(' +
                parseInt('0x' + params.color.slice(1, 3)) +
                ',' +
                parseInt('0x' + params.color.slice(3, 5)) +
                ',' +
                parseInt('0x' + params.color.slice(5, 7)) +
                ',' +
                '0.2' +
                ')'
              // 设置显示文本样式
              let res =
                ` <div style="width: 240px;margin:-10px;height: 230px;color:#333;z-index:999"><div style="height: 40px;background:` +
                color +
                `;padding-left: 10px;line-height: 40px; ">` +
                params.data.name +
                `</div>`

              for (var i = 0; i < tooltipData.length; i++) {
                for (var j = 0; j < tooltipData[i].length; j++) {
                  if (tooltipData[i][j].fatherName == params.data.name) {
                    let str =
                      `<div style="display: flex;height: 30px;line-height: 30px;padding: 0px 10px; "><div style="flex: 1">` +
                      tooltipData[i][j].toolName +
                      `</div><div style="flex: 1; font-weight: 700; text-align: right">` +
                      tooltipData[i][j].toolValue +
                      `
                      </div></div>`
                    res += str
                  }
                }
              }
              return res + '</div>'
            },
          },

          series: [
            {
              name: 'Access From',
              type: 'pie',
              radius: ['40%', '70%'],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: 'center',
              },

              labelLine: {
                show: false,
              },
              data: this.data,
            },
          ],
        })
      }, 1000)
    },
    dateChange(val) {
       if (val) {
        this.params.start_time = utils.getTimeAccurate(val[0]).substring(0, 10)
        this.params.end_time = utils.getTimeAccurate(val[1]).substring(0, 10)
      } else {
        this.params.start_time = ''
        this.params.end_time = ''
      }
   
      this.params.page = 1
      this.getList()
    },
    search() {
      this.params.page = 1
      this.getList()
      // this.getChart()
    },
    // 导出数据
    exportData() {
      switch (this.typeText) { 
        case 'ET专题':{ window.location.href = `/api/phalapi/public/?s=App.Zhuanti_Zhuanti.ExportZhuantiFlowDetail&start_time=${this.params.start_time}&end_time=${this.params.end_time}&keyword=${this.params.keyword}&zt_id=${this.params.zt_id}`}; break
        case '专题配置':{window.location.href = `/api/phalapi/public/?s=App.Zhuanti_OtherData.ExportZhuantiFlowDetail&start_time=${this.params.start_time}&end_time=${this.params.end_time}&keyword=${this.params.keyword}&zt_type=1&zt_id=${this.params.zt_id}`};break
        case '独立开发专题': { window.location.href = `/api/phalapi/public/?s=App.Zhuanti_OtherData.ExportZhuantiFlowDetail&start_time=${this.params.start_time}&end_time=${this.params.end_time}&keyword=${this.params.keyword}&zt_type=2&zt_id=${this.params.zt_id}`};break
      }
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getList()
      // this.getChart()
    },
    handleSizeChange(val) {
      this.params.page_num = val
      this.getList()
      // this.getChart()
    },
    closeDia() {
      this.date = []
      this.params.keyword = ''
      this.params.page = 1
      this.params.page_num = 10
      if (this.tableData.length) {
        echarts.init(document.getElementById('myChart')).dispose() // 销毁
      }
    },
  },
  watch: {
    visible(val, oldVal) {
      if (val == true) {
        console.log(this.typeText);
        this.params.start_time = this.date[0]
        this.params.end_time = this.date[1]
        this.getList()
        this.getChart()
      } else {
        // echarts.init(document.getElementById('myChart')).dispose() // 销毁
        // this.date = []
        // this.params.keyword = ''
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';

.data-detail {
  .title {
    font-size: 18px;
    font-weight: 700;
    color: #333;
    span {
      @include font_color;
    }
  }
  .content {
    display: flex;
    .left {
      flex: 5;
      .table-search {
        display: flex;
        align-items: center;
        .search-left {
          flex-wrap: wrap;

          display: flex;
          .searchBar {
            margin-bottom: 10px;
          }
          .search-button {
            @include background_color;
            border: none;
          }
        }
        .search-right {
          // width: 100px;
          flex: 1;
          margin-bottom: 9px;

          .export-button {
            height: 32px;
            box-sizing: border-box;
            border-radius: 4px;
            // color: #6065ec;
            @include font_color;
            background-color: #fff;
            border: 1px solid #6065ec;
            @include border_color;
            display: flex;
            align-items: center;
            justify-content: center;
            img {
              width: 12px;
              height: 12px;
              margin-right: 6px;
            }
          }
        }
      }
      .detail-table {
        margin-top: 14px;
      }
      .pagination {
        text-align: right;
        margin-top: 24px;
      }
    }
    .right {
      flex: 3;
      display: flex;
      align-items: center;
      justify-content: center;
      #myChart {
        width: 467px;
        height: 467px;
      }
    }
  }
}
.first {
  color: #f01a1a;
}
.second {
  color: #ff6b00;
}
.third {
  color: #ffb800;
}
</style>