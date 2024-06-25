<template>
  <div class="data-center">
    <div class="data-city">
      <p class="fontSize-16 fontWeight-700">全国</p>
      <div></div>
    </div>
    <div class="data-survey content">
      <p class="fontSize-16 fontWeight-700">专题流量概况</p>
      <div class="survey-flex flex" style="height: 40px">
        <p class="survey-flex-start"></p>
        <div class="survey-flex-second title">今日</div>
        <div class="title">昨日</div>
        <div class="title">本周</div>
        <div class="title">本月</div>
        <div class="survey-flex-last title">截至目前</div>
      </div>
      <div
        class="survey-flex flex fontSize-16 fontWeight-700"
        style="height: 88px"
      >
        <p class="survey-flex-start zt-new-num">
          <img src="@/assets/images/dataCenter_num.png" alt="" />
          <span>新建专题数</span>
        </p>
        <div class="survey-flex-second">
          <p>{{ newZhuanti.today_new_zhuanti_count }}</p>
        </div>
        <div>
          <p>{{ newZhuanti.yesterday_new_zhuanti_count }}</p>
        </div>
        <div>
          <p>{{ newZhuanti.week_new_zhuanti_count }}</p>
        </div>
        <div>
          <p>{{ newZhuanti.month_new_zhuanti_count }}</p>
        </div>
        <div class="survey-flex-last">
          <p class="border-none">{{ newZhuanti.zhuanti_count }}</p>
        </div>
      </div>
      <div
        class="survey-flex flex fontSize-16 fontWeight-700"
        style="height: 88px; margin-top: 5px"
      >
        <p class="survey-flex-start zt-all-num">
          <img src="@/assets/images/dataCenter_read.png" alt="" />
          <span>专题总浏览量</span>
        </p>
        <div class="survey-flex-second">
          <p>{{ zhuantiFlow.today_zhuanti_flow_count }}</p>
        </div>
        <div>
          <p>{{ zhuantiFlow.yesterday_zhuanti_flow_count }}</p>
        </div>
        <div>
          <p>{{ zhuantiFlow.week_zhuanti_flow_count }}</p>
        </div>
        <div>
          <p>{{ zhuantiFlow.month_zhuanti_flow_count }}</p>
        </div>
        <div class="survey-flex-last">
          <p class="border-none">{{ zhuantiFlow.zhuanti_flow_count }}</p>
        </div>
      </div>
    </div>

    <div class="data-table content">
      <p class="fontSize-16 fontWeight-700">专题流量明细</p>
      <div class="table-search">
        <div :class="guideShow[10] ? ['guideHigh','guidePad10-1']:''">
          <div class="left">
            <div class="searchBar">
              <el-radio-group
                v-model="typeText"
                style="margin-right: 24px"
                @change="typeChange"
              >
                <el-radio-button label="ET专题"></el-radio-button>
                <el-radio-button label="专题配置"></el-radio-button>
                <el-radio-button label="独立开发专题"></el-radio-button>
              </el-radio-group>
            </div>
            <div class="searchBar">
              <el-radio-group
                v-model="dateText"
                style="margin-right: 24px"
                @change="textChange"
              >
                <el-radio-button label="今日"></el-radio-button>
                <el-radio-button label="昨日"></el-radio-button>
                <el-radio-button label="近7天"></el-radio-button>
                <el-radio-button label="近30天"></el-radio-button>
              </el-radio-group>
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
                @clear="searchData()"
              >
              </el-date-picker>
            </div>
            <div class="searchBar">
              <el-input
                v-model="params.keyword"
                style="width: 233px; margin-right: 24px"
                placeholder="请输入专题名称/标识/创建人"
                clearable
                @keyup.enter.native="searchData()"
                @clear="searchData()"
              ></el-input>
            </div>
            <div class="searchBar">
              <el-select
                style="width: 121px; margin-right: 24px"
                v-model="params.type"
                placeholder="请选择平台"
              >
                <el-option
                  v-for="(item, index) in typelist"
                  :key="index"
                  :label="item.label"
                  :value="item.value"
                  :disabled="item.disabled"
                ></el-option>
              </el-select>
            </div>
            <div class="searchBar">
              <el-button
                type="primary"
                size="small"
                class="search-button"
                @click="searchData()"
                >查询</el-button
              >
            </div>
          </div>
        </div>
        <div class="right end">
          <el-button class="export-button" @click="exportData()">
            <img src="@/assets/images/export.png" alt="" />
            导出
          </el-button>
        </div>
      </div>

      <data-table
        :tableData="tableData"
        :params="params"
        :getList="getList"
        :typeText="typeText"
      ></data-table>

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


    <!-- 新手指引导航条 -->
    <div class="guide-nav-box" v-if="guideShow[10]" style="right:4%;">
      <guideNav></guideNav>
    </div>

    <!-- 新手指引第十步 (数据中心) -->
    <div
      class="guideMask guideMask10"
      v-if="guideShow[10]"
      :style="{ 'padding-left': '165px' }"
    >
      <div class="guide-box" style="margin-top: 200px;">
        <div class="flex-center">
          <!-- <img class="guide-line" src="@/assets/images/guide-line-left.png" alt="" /> -->
          <div class="guide-arrow flex-center">
            <div class="cir1"><span class="cir2"></span></div>
            <div class="line-x"></div>
          </div>
          <div class="guide-card">
            <p>这里就是入口啦~</p>
          </div>
        </div>
      </div>
      <div class="guide-box" style="position: relative;padding-left: 5%;margin-top: 7%;">
        <div class="">
          <div class="guide-card">
            <img class="starImg-left" src="@/assets/images/guide-star.png" alt="">
            <img class="starImg-right" src="@/assets/images/guide-star2.png" alt="">
            <p>您可以看到专题流量的概况,<br>同时也可以根据需求搜索具体的专题流量数据,<br>我们也支持专题不同城市的浏览量查看哦</p>
            <p>到这,您已经可以熟练的使用ET的基本功能了,我们最后<br>去看看<span style="color:#FFEA7D;">帮助中心</span>吧~</p>
          </div>
          <!-- <img class="guide-line" src="@/assets/images/guide-line-top.png" alt="" /> -->
          <div class="guide-arrow flex-column flex-center">
            <div class="line-y"></div>
            <div class="cir1"><span class="cir2"></span></div>
          </div>
        </div>
        <div class="guide-btns center" style="position: absolute;top: 250px;">
          <div style="width:390px;display: flex;justify-content: center;">
            <span class="guide-exit" @click="guideExit(10)">学会啦</span>
            <span class="guide-next" @click="guideNext(10)">下一步</span>
          </div>
          
        </div>
      </div>
    </div>




  </div>
</template>

<script>
import dataTable from './dataTable/index.vue'
import utils from '@/utils/index.js'
export default {
  components: {
    dataTable,
  },
  data() {
    return {
      newZhuanti: {
        month_new_zhuanti_count: 0,
        today_new_zhuanti_count: 0,
        week_new_zhuanti_count: 0,
        yesterday_new_zhuanti_count: 0,
        zhuanti_count: 0,
      },
      zhuantiFlow: {
        month_zhuanti_flow_count: 0,
        today_zhuanti_flow_count: 0,
        week_zhuanti_flow_count: 0,
        yesterday_zhuanti_flow_count: 0,
        zhuanti_flow_count: 0,
      },
      // 设置日期无法选择今日之后
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      typeText:'ET专题',
      dateText: '今日',
      date: [],
      params: {
        start_time: '',
        end_time: '',
        page: 1,
        page_num: 10,
        sort: 1,
        keyword: '',
        type: '1',
        zt_type:1
      },
      //
      typelist: [
        {
          label: 'H5',
          value: '1',
        },
        {
          label: 'PC',
          value: '2',
          disabled: true,
        },
        {
          label: '小程序',
          value: '3',
          disabled: true,
        },
      ],
      tableData: [],
      // 分页选择器
      total: 100,
      guideShow: []
    }
  },
  mounted() {
    this.getSurvey()
    this.textChange('今日')
    this.getList()
    this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		window.addEventListener("setItem", () => {
			this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		});
  },
  methods: {
    // 获取专题流量
    async getSurvey() {
      let res
      switch (this.typeText) {
        case 'ET专题':{ res = await this.$api.GetZhuantiFlowSurvey(this.params)}; break
        case '专题配置':{ res = await this.$api.getOtherData({type:1})};break
        case '独立开发专题': { res = await this.$api.getOtherData({type:2})};break
      }
      this.zhuantiFlow.month_zhuanti_flow_count = res.month_zhuanti_flow_count
      this.zhuantiFlow.yesterday_zhuanti_flow_count =
        res.yesterday_zhuanti_flow_count
      this.zhuantiFlow.week_zhuanti_flow_count = res.week_zhuanti_flow_count
      this.zhuantiFlow.today_zhuanti_flow_count = res.today_zhuanti_flow_count
      this.zhuantiFlow.zhuanti_flow_count = res.zhuanti_flow_count
      this.newZhuanti.month_new_zhuanti_count = res.month_new_zhuanti_count
      this.newZhuanti.yesterday_new_zhuanti_count =
        res.yesterday_new_zhuanti_count
      this.newZhuanti.week_new_zhuanti_count = res.week_new_zhuanti_count
      this.newZhuanti.today_new_zhuanti_count = res.today_new_zhuanti_count
      this.newZhuanti.zhuanti_count = res.zhuanti_count
      console.log(res, 'res')
    },
    // 获取表格数据
    async getList() {
      let res
      switch (this.typeText) {
        case 'ET专题':{ res = await this.$api.GetZhuantiFlowDetailList(this.params)}; break
        case '专题配置':{this.params.zt_type=1;  res = await this.$api.getFlowDetailList(this.params)};break
        case '独立开发专题': { this.params.zt_type =2;  res = await this.$api.getFlowDetailList(this.params)};break
        
      }
      console.log(res)
      this.tableData = res.list
      this.total = res.count
    },
    // 将日期转化为时间戳
    time(time) {
      return utils.getTimeAccurate(
        new Date(new Date().toLocaleDateString()).getTime() + time
      )
    },
    typeChange(val) {
      this.typeText = val 
      this.getList()
      this.getSurvey()
    },
    // 文本按钮切换
    textChange(val) {
      //开始时间
      let start = ''
      //结束时间
      let end = ''
      switch (val) {
        case '今日':
          start = this.time(0)
          end = this.time(24 * 60 * 60 * 1000 - 1)
          break
        case '昨日':
          start = this.time(-3600 * 24 * 1000)
          end = this.time(-1)
          break
        case '近7天':
          start = this.time(-7 * 3600 * 24 * 1000)
          end = this.time(-1)
          break
        case '近30天':
          start = this.time(-30 * 3600 * 24 * 1000)
          end = this.time(-1)
          break
      }
      let time = utils.getTimeSection(start, end)
      this.date = time
      this.params.start_time = time[0].substring(0, 10)
      this.params.end_time = time[1].substring(0, 10)

      this.params.page = 1
      this.getList()
    },
    // 日期切换
    dateChange(val) {
      this.dateText = ''
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
    // 搜索
    searchData() {
      this.params.page = 1
      this.getList()
    },
    // 导出数据
    exportData() {
      switch (this.typeText) { 
        case 'ET专题':{ window.location.href = `/api/phalapi/public/?s=App.Zhuanti_Zhuanti.ExportZhuantiFlowDetailList&start_time=${this.params.start_time}&end_time=${this.params.end_time}&keyword=${this.params.keyword}&sort=${this.params.sort}&type=${this.params.type}`}; break
        case '专题配置':{window.location.href = `/api/phalapi/public/?s=App.Zhuanti_OtherData.ExportZhuantiFlowDetailList&start_time=${this.params.start_time}&end_time=${this.params.end_time}&keyword=${this.params.keyword}&sort=${this.params.sort}&type=${this.params.type}&zt_type=1`};break
        case '独立开发专题': { window.location.href = `/api/phalapi/public/?s=App.Zhuanti_OtherData.ExportZhuantiFlowDetailList&start_time=${this.params.start_time}&end_time=${this.params.end_time}&keyword=${this.params.keyword}&sort=${this.params.sort}&type=${this.params.type}&zt_type=2`};break
      }
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getList()
    },
    handleSizeChange(val) {
      this.params.page_num = val
      this.getList()
    },
    /* 退出指引 */ 
		guideExit() {
			this.guideShow = [false]
      this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
      this.$router.push('/subjectList')
		},
		/* 新手指引下一步 */ 
		guideNext(index) {
      this.guideShow = [false]
      this.guideShow[index+1] = true
      this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
      this.setSessionItem('guideIndex', 5)
      this.setSessionItem('clickIndex', 4)
      this.$router.push('/helpCenter')
		},
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.data-center {
  width: calc(100% + 40px);
  margin: -20px;
  background-color: #f9fafc;
  padding: 20px;
  .data-city {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 35px;
    color: #333;
    div {
      width: 21px;
      border-radius: 20px;
      border-bottom: 3px solid #f9fafc;
      @include border-bottom-color;
    }
  }
  .data-survey {
    .survey-flex:nth-child(2) {
      color: #333;
    }
    .survey-flex:nth-child(3) {
      color: #5037e3;
    }
    .survey-flex:nth-child(4) {
      color: #17ac42;
    }
    .survey-flex {
      width: 100%;
      .survey-flex-start {
        width: 136px !important;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        span {
          margin-top: 5px;
        }
        img {
          width: 25px;
          height: 25px;
        }
      }
      .zt-new-num {
        background-color: #f0eeff;
        color: #634de2;
      }
      .zt-all-num {
        background-color: #e6fbe6;
        color: #17ac42;
      }

      .survey-flex-second {
        flex: 3;
      }
      .survey-flex-last {
        flex: 5;
      }
      .title {
        background-color: #fff;
      }
      div {
        flex: 4;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(139, 122, 240, 0.05);
        p {
          width: 100%;
          text-align: center;
          height: 40px;
          line-height: 40px;
          border-right: 1px solid #e5e5e5;
        }
        .border-none {
          border-right: none;
        }
      }
    }
  }
  .data-table {
    .table-search {
      margin-top: 14px;
      display: flex;
      align-items: center;
      .left {
        flex-wrap: wrap;
        display: flex;
        .searchBar {
          margin-top: 10px;
        }
        .search-button {
          @include background_color;
          border: none;
        }
      }
      .right {
        // width: 100px;
        flex: 1;
        margin-top: 9px;

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
    .pagination {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: 24px;
    }
  }
  .content {
    background: #fff;
    color: #333;
    margin-top: 23px;
    padding: 25px 31px 25px 27px;
    border-radius: 16px;
  }
}
</style>
<style >
.el-input__inner {
  height: 32px !important;
  line-height: 32px !important;
}
.el-date-editor .el-range__icon,
.el-date-editor .el-range-separator,
.el-date-editor .el-range__close-icon {
  line-height: 25px !important;
}
</style>