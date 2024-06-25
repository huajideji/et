<template>
  <div class="more-log">
    <div class="to-back">
      <img
        style="vertical-align: middle"
        @click="toMorePage"
        src="@/assets/images/left.png"
        alt
      />
      <p
        style="
          margin-left: 12px;
          cursor: pointer;
          font-size: 16px;
          line-height: 22px;
        "
        @click="toMorePage"
      >
        全部动态
      </p>
    </div>
    <div class="top-search">
      <!-- 根据模块不同，筛选条件不同 -->
      <div class="left">
        <span class="title">筛选条件：</span>
        <div class="condition">
          <span>操作人</span>
          <el-input
            placeholder="请输入操作人"
            v-model="keyWords.username"
            clearable
            class="search-input"
            @keyup.enter.native="searchData()"
            @clear="searchData()"
          >
          </el-input>
        </div>
        <div class="condition">
          <span>专题名称</span>
          <el-input
            placeholder="请输入专题名称"
            v-model="keyWords.zt_name"
            clearable
            class="search-input"
            @keyup.enter.native="searchData()"
            @clear="searchData()"
          >
          </el-input>
        </div>
        <div class="condition">
          <span>专题标识</span>
          <el-input
            placeholder="专题标识"
            v-model="keyWords.code"
            clearable
            class="search-input"
            @keyup.enter.native="searchData()"
            @clear="searchData()"
          >
          </el-input>
        </div>
        <div class="condition">
          <span>选择时间</span>
          <el-date-picker
            @change="searchData()"
            class="mytime-picker"
            v-model="keyWords.time"
            style="width: 240px; margin-left: 10px"
            type="daterange"
            align="center"
            :editable="false"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </div>
        <div class="condition">
          <span>操作状态</span>
          <el-select
            style="width: 120px"
            v-model="keyWords.type"
            placeholder="请选择企业主体"
            @change="searchData()"
            filterable
          >
            <el-option
              v-for="(item, index) in typelist"
              :key="index"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <!--  只有网店模块才具有筛选类型
                <div class="condition" v-if="ModuleInfo.module_type_id == 8 && ModuleInfo.other_condition.length">
                    <span>筛选类型</span>
                    <el-select v-model="keyWords.conditions" placeholder="请选择筛选条件">
                        <el-option v-for="(item, index) in other_conditions" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div> -->
        <button class="search" @click="searchData()">搜索</button>
      </div>
    </div>
    <div v-show="!isData" style="text-align: center">暂无数据</div>
    <div style="margin-top: 48px">
      <div
        v-for="(value, key) in logInfo"
        :key="key"
        class="detail"
        :style="{ height: value.mark ? '' : '90px' }"
      >
        <div class="font-title">
          <p>
            <img
              @click="change(key)"
              v-show="!value.mark"
              style="cursor: pointer"
              src="@/assets/images/down_arrows.png"
              alt=""
            />
            <img
              @click="change(key)"
              v-show="value.mark"
              style="cursor: pointer"
              src="@/assets/images/up_arrows.png"
              alt=""
            />{{ key }}
          </p>
          <div class="timeline1"></div>
          <!-- <img src="@/assets/images/up_arrows.png" alt="" /> -->
        </div>
        <div class="containerdown" v-show="!value.mark">
          <ul>
            <li>
              <div class="add-time">
                <span>
                  {{ value.list[0].time }}
                </span>
              </div>
              <div class="timeline">
                <div class="content">
                  <span>
                    {{ value.list[0].username }}
                  </span>
                  <span>{{ value.list[0].type_name }}了</span>
                  <span class="font-color">
                    {{ value.list[0].name }}
                  </span>
                  <span
                    v-if="value.list[0].type == 1 || value.list[0].type == 5"
                  >
                    专题数据
                  </span>
                  <span v-if="value.list[0].type == 4"> 城市限制 </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="container" v-show="value.mark">
          <ul>
            <li v-for="(item, index) in value.list" :key="index">
              <div class="add-time">
                <span>
                  {{ item.time }}
                </span>
              </div>
              <div class="timeline">
                <div class="content">
                  <span>
                    {{ item.username }}
                  </span>
                  <span>{{ item.type_name }}了</span>
                  <span class="font-color">
                    {{ item.name }}
                  </span>
                  <span v-if="item.type == 1 || item.type == 5">
                    专题数据
                  </span>
                  <span v-if="item.type == 4"> 城市限制 </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <!-- <p v-for="(item, index) in value" :key="index">{{ item.time }}</p> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'more_page',
  data() {
    return {
      keyWords: {
        username: '',
        zt_name: '',
        code: '',
        time: [],
        type: 0,
      },
      logInfo: {},
      //阻止选择未来时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      typelist: [
        {
          label: '全部',
          value: 0,
        },
        {
          label: '填写数据',
          value: 1,
        },
        {
          label: '修改专题',
          value: 2,
        },
        {
          label: '删除专题',
          value: 3,
        },
        {
          label: '修改数据',
          value: 4,
        },
        {
          label: '删除数据',
          value: 5,
        },
        {
          label: '新增专题',
          value: 6,
        },
      ],
      //是否有数据
      isData: true,
    }
  },
  props: {
    newsData: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log('当前是日志详情页')
    this.getWeek()
    this.format_time()
    this.searchData()
  },
  methods: {
    // 格式化后端返回时间
    format_time(time = '2022-08-23 15:00:45') {
      return time.slice(0, -3)
    },
    //去更多页面
    toMorePage() {
      this.$router.push({
        name: 'subjectList',
      })
    },
    //点击显示
    change(mykey) {
      for (let key in this.logInfo) {
        if (mykey == key) {
          this.logInfo[key].mark = !this.logInfo[key].mark
          console.log(mykey, this.logInfo[key].mark, '当前点击的数据')
        }
      }
    },
    //搜索函数
    async searchData() {
      if (!this.keyWords.time || this.keyWords.time.length == 0) {
        this.getWeek()
      }
      let data = {
        username: this.keyWords.username,
        zt_name: this.keyWords.zt_name,
        code: this.keyWords.code,
        start_time: this.keyWords.time[0],
        end_time: this.keyWords.time[1],
        type: this.keyWords.type,
      }
      let res = await this.$api.getMoreZhuantiLog(data)
      this.logInfo = res
      let arr = Object.keys(this.logInfo)
      if (arr.length != 0) {
        for (let key in this.logInfo) {
          this.logInfo[key] = {
            list: this.logInfo[key],
            mark: false,
          }
        }
        this.isData = true
      } else {
        this.isData = false
      }
      // console.log(this.isData, '是否有数据')
    },
    //获取时间
    getDateStr(AddDayCount) {
      var dd = new Date()
      dd.setDate(dd.getDate() + AddDayCount) //获取AddDayCount天后的日期
      var y = dd.getFullYear()
      var m = dd.getMonth() + 1 //获取当前月份的日期
      var d = dd.getDate()
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
    },
    //获取周时间段
    getWeek() {
      // const now = new Date().getDay()
      this.keyWords.time = []
      this.keyWords.time.push(this.getDateStr(-7))
      this.keyWords.time.push(this.getDateStr(0))
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.to-back {
  display: flex;
  height: 20px;
  cursor: pointer;
}

.search-input {
  width: 170px;
}
.top-search {
  display: flex;
  // align-items: center;
  justify-content: space-between;
  margin: 24px 0;
  .left {
    display: flex;
    white-space: nowrap;
    // align-items: center;
    flex-wrap: wrap;

    .title {
      color: #666666;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }

    .condition {
      font-size: 14px;
      color: #333;
      margin-right: 17px;
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      > span {
        margin-right: 9px;
      }
    }

    .search {
      height: 32px;
      width: 48px;
      border: none;
      color: #fff;
      border-radius: 2px;
      @include background_color;
      margin-right: 17px;
      font-size: 12px;
    }

    .tip {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      > span {
        @include font_color;
        font-size: 16px;
      }
    }
  }
}
.detail {
  display: flex;
  width: 100%;
  &:last-child {
    .timeline1 {
      border-left: none !important;
    }
  }
  .font-title {
    width: 173px;
    display: flex;

    > p {
      font-size: 18px;
      margin-top: -10px;
      > img {
        margin-right: 14px;
        vertical-align: middle;
      }
    }
    .timeline1 {
      flex-grow: 1;
      padding-bottom: 10px;
      margin-left: 24px;
      padding-left: 13px;
      border-left: 1px dashed #d9d9d9;
      position: relative;
      min-height: 30px;

      &::before {
        content: '';
        position: absolute;
        display: block;
        width: 6px;
        height: 6px;
        border: 3px solid #6065ec;
        @include border_color;
        background-color: white;
        border-radius: 50%;
        left: -6.5px;
        top: -4.5px;
      }
    }
  }

  .container {
    width: 87%;
    border-radius: 2px;
    margin-top: -30px;
    margin-bottom: 60px;
    opacity: 1;
    border: 1px solid rgba(96, 101, 236, 0.8);
    @include border_color;
    ul {
      padding: 30px 25px 0px;
      @include background_color2;
      li {
        display: flex;
        &:last-child {
          .timeline {
            border-left: none !important;
          }
        }
        div {
          font-size: 13px;
          &.add-time {
            position: relative;
            min-width: 110px;
            margin-top: -9px;
            > span {
              position: absolute;
            }
          }

          &.timeline {
            flex-grow: 1;
            padding-bottom: 10px;
            margin-left: 8px;
            padding-left: 13px;
            border-left: 1px dashed #d9d9d9;
            position: relative;
            min-height: 30px;

            &::before {
              content: '';
              position: absolute;
              display: block;
              width: 7px;
              height: 7px;
              background-color: #d9d9d9;
              border-radius: 50%;
              left: -4px;
              top: -3.5px;
            }

            .content {
              margin-top: -9px;
            }
          }
        }
      }
    }
  }
  .containerdown {
    width: 87%;
    margin-top: -25px;
    height: 60px;
    margin-bottom: 20px;
    border-radius: 2px;
    opacity: 1;
    border: 1px solid rgba(230, 230, 230, 1);

    ul {
      padding: 0px 25px;
      padding-top: 20px;
      background: rgba(255, 255, 255, 1);
      li {
        display: flex;
        &:last-child {
          .timeline {
            border-left: none !important;
          }
        }

        div {
          font-size: 13px;
          &.add-time {
            position: relative;
            min-width: 110px;

            > span {
              position: absolute;
            }
          }

          &.timeline {
            flex-grow: 1;
            padding-bottom: 10px;
            margin-left: 8px;
            padding-left: 13px;
            border-left: 1px dashed #d9d9d9;
            position: relative;
            min-height: 30px;

            &::before {
              content: '';
              position: absolute;
              display: block;
              width: 7px;
              height: 7px;
              background-color: #d9d9d9;
              border-radius: 50%;
              left: -4px;
              top: 6px;
            }
          }
        }
      }
    }
  }
}
.more-log {
  width: 100%;
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
