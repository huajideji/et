<template>
  <div class="data-manage">
    <div class="header">
      <img src="@/assets/images/left.png" alt="" @click="goBack()" />
      <span class="title">{{ title }}</span>
    </div>
    <el-tabs v-model="activeName" @tab-click="handleTab">
      <el-tab-pane
        v-for="(item, index) in tabPage"
        :key="index"
        :label="item.name"
      >
        <TabContent
          v-if="activeName == index"
          :loading="loading"
          :key="item.id"
          :tab-data="tabData"
        />
      </el-tab-pane>
    </el-tabs>
    <div :class="[guideShow7 ? ['guideHigh', 'guideHigh7'] : '']" ref="guide7">
      <el-button
        :class="['changeCity', guideShow7 ? ['guide-add', 'btn-active'] : '']"
        @click="openshow()"
        v-if="$route.query.type != 0"
        >城市限制</el-button
      >
    </div>
    <el-dialog
      title="城市限制"
      :visible.sync="showChangeCity"
      width="50%"
      :before-close="handleClose"
    >
      <div
        class="tip-lock"
        :class="[showTips ? 'lock' : 'no-lock']"
        @mouseover="handleOver()"
        @mouseout="handleOut()"
        @click="changeLock"
      >
        <div style="position: relative">
          <div v-if="showLock">
            <img src="@/assets/images/locking1.png" v-show="showTips" />
            <img src="@/assets/images/locking3.png" v-show="!showTips" />
          </div>
          <div v-else>
            <img src="@/assets/images/locking2.png" v-show="showTips" />
            <img src="@/assets/images/locking4.png" v-show="!showTips" />
          </div>
          <div class="text" v-show="showTips">{{ showHoverText }}</div>
          <div class="sanjiao" v-show="showTips"></div>
        </div>
      </div>
      <div class="tips" v-show="!showLock">
        *当前展示城市已被锁定，如需更改请找专题创建人解除锁定
      </div>
      <span>选择展示城市</span>
      <div class="dia-body">
        <div class="selectwrap">
          <div class="block" v-if="showLock">
            <el-cascader
              v-model="citylist"
              :options="options"
              :props="props"
              collapse-tags
              clearable
              @change="getCityList"
            >
            </el-cascader>
          </div>
          <div class="block" v-else>
            <el-cascader
              disabled
              v-model="citylist"
              :options="options"
              :props="props"
              collapse-tags
              clearable
              @change="getCityList"
            >
            </el-cascader>
          </div>
        </div>
        <div class="showcity">当前展示城市:{{ getValue }}</div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showChangeCity = false">取 消</el-button>
        <el-button type="primary" @click="comfirCity()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 新手指引第七步 -->
    <div
      class="guideMask guideMask7 end"
      v-if="guideShow7"
      :style="{ 'padding-right': width - guideRight7 + 60 + 'px' }"
    >
      <div class="guide-box">
        <div class="flex">
          <div class="guide-card">
            <p class="guide-title">管理城市</p>
            <p class="guide-text">
              在首页找到需要进行城市限制的专题，点击数据管理进入数据管理页，即可在右上角进行城市限制。
            </p>
            <img src="@/assets/images/guide-step7.png" alt="" />
          </div>
          <img class="guide-line" src="@/assets/images/guide-line.png" alt="" />
        </div>
        <div class="guide-btns end">
          <span class="guide-exit" @click="guideExit7()">退出指引</span>
          <span class="guide-next" @click="guidePre7()">上一步</span>
          <span class="guide-next" @click="guideNext7()">下一步</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import areaData from '../../../utils/areaData.js'
import TabContent from './components/tabContent/index.vue'
export default {
  name: 'DataManage',
  components: {
    TabContent,
  },
  data() {
    return {
      optionss: [],
      defaultData: [],
      citylist: [],
      precityList: [],
      props: {
        multiple: true,
        label: 'text', //匹配响应数据中的name
        value: 'text',
      },
      id: '',
      title: '',
      showChangeCity: false,
      activeName: 0,
      tabPage: [
        {
          id: 0,
          name: '主页面',
        },
      ],
      options: [],
      value1: [],
      //表格数据
      tabData: [
        // {
        //   id: 1,
        //   name: '最新消息',
        //   link: 'https://imgbdb4.bendibao.com/jbsbdb/20228/01/2022801151553_94174.png',
        //   img: 'https://imgbdb4.bendibao.com/jbsbdb/20228/01/2022801151553_94174.png',
        // },
      ],
      loading: false,
      guideShow7: false, //新手指引
      guideRight7: '',
      width: document.body.clientWidth,
      showTips: false,
      showLock: false,
      create: '',
      DataList: {},
      tipsText: '',
      lockState: 0,
      showHoverText: '',
    }
  },
  computed: {
    getValue() {
      if (this.lockState == 0) {
        let arr = []
        this.citylist.forEach((item) => {
          if (item[1] != '全部') arr.push(item[1])
        })
        if (arr.length == 360) {
          return '全部'
        } else {
          return arr.join(',')
        }
      }
    },
  },
  async mounted() {
    let params = { id: this.$route.query.id }
    this.DataList = await this.$api.reqGetProjectData(params)
    console.log('DataList', this.DataList)
    this.lockState = this.DataList.zhuanti_info.lock_status
    this.create = this.DataList.zhuanti_info.creater
    if (this.lockState == 0) {
      this.showLock = true
      this.showHoverText = '点击即可锁定当前展示城市(仅创建人可操作)'
    } else {
      this.showLock = false
      this.showHoverText = '点击即可解锁当前展示城市(仅创建人可操作)'
    }
    let defaultData = []
    this.optionss = JSON.parse(JSON.stringify(areaData))
    this.optionss.forEach((item) => {
      if (!['台湾', '澳门', '香港'].includes(item.text)) {
        this.options.push(item)
      }
      item.children.forEach((aitem) => {
        console.log('澳门'.includes('澳门'))
        if (!['台湾', '澳门', '香港'].includes(item.text)) {
          defaultData.push([item.text, aitem.text])
        }
        delete aitem.children
      })
    })
    let obj = {
      text: '全部',
      code: 0,
      children: [
        {
          text: '全部',
          code: '1000',
          sort: 1,
        },
      ],
    }
    this.options.unshift(obj)
    this.defaultData = defaultData
    this.citylist = defaultData
    if (this.citylist.length == 360) {
      this.citylist.unshift(['全部', '全部'])
    }
    this.precityList = this.citylist
    console.log(defaultData, 'defaultData')
    const res = await this.$api.getZhuantiCity({
      id: this.$route.query.id,
    })
    if (res[0]) {
      this.citylist = JSON.parse(res[0].cityname)
      if (this.citylist.length == 360) {
        this.citylist.unshift(['全部', '全部'])
      }
      this.precityList = this.citylist
    }

    this.setData()
    this.setTabPage()
    this.getModuleList()

    if (JSON.parse(sessionStorage.getItem('guideShow7'))) {
      this.guideShow7 = true
    }
    // 添加对 sessionStorage 的监听
    window.addEventListener('setItem', () => {
      this.guideShow7 = JSON.parse(sessionStorage.getItem('guideShow7'))
    })
    this.guideRight7 = parseInt(this.$refs.guide7.getBoundingClientRect().width)
  },
  methods: {
    handleClose(run) {
      run()
    },
    getCityList(val) {
      let current = []
      if (val.length >= this.precityList.length) {
        let keys = this.precityList.map((item) => JSON.stringify(item))
        current = val.filter((item) => !keys.includes(JSON.stringify(item)))
        // console.log('选中某项', current)
        if (current[0][0] == '全部') {
          this.citylist = this.getAllCitySelect()
          val = this.citylist
        } else {
          // console.log(val.length, 'length')
          if (val.length == 360) {
            this.citylist = this.getAllCitySelect()
            val = this.citylist
          }
        }
      } else {
        // 取消选中
        let keys = val.map((item) => JSON.stringify(item))
        current = this.precityList.filter(
          (item) => !keys.includes(JSON.stringify(item))
        )
        console.log('取消选中', current)

        if (current[0][0] == '全部') {
          this.citylist = []
          val = this.citylist
        } else {
          this.citylist = this.citylist.filter((item) => {
            return item[1] !== '全部'
          })
          val = this.citylist
        }
      }

      this.precityList = val
    },
	// 选中全部
    getAllCitySelect() {
      let commitData = []
      let data = JSON.parse(JSON.stringify(areaData))
      data.forEach((item) => {
        item.children.forEach((aitem) => {
          if (!['台湾', '澳门', '香港'].includes(item.text)) {
            commitData.push([item.text, aitem.text])
          }
        })
      })
      commitData.unshift(['全部', '全部'])
      // console.log(commitData, 'commitData')
      return commitData
    },
    async openshow() {
      this.citylist = this.defaultData
      const res = await this.$api.getZhuantiCity({
        id: this.$route.query.id,
      })
      if (res[0]) {
        this.citylist = JSON.parse(res[0].cityname)
      }
      this.showChangeCity = true
    },
    async comfirCity() {
      if (this.DataList.zhuanti_info.lock_status == 0) {
        this.showChangeCity = false
        let params = {
          id: this.$route.query.id,
          city: JSON.stringify(this.citylist),
        }
        const res = await this.$api.changeCityList(params)
      }
    },
    /*
     @setData
     @description:设置数据
     */
    setData() {
      let { id, title } = this.$route.query
      this.id = id
      this.title = title
    },
    /*
     @setTabPage
     @description:获取子页面列表
     */
    async setTabPage(
      params = {
        id: this.id,
      }
    ) {
      try {
        const res = await this.$api.reqGetPageList(params)
        this.tabPage = [...this.tabPage, ...res]
      } catch (e) {}
    },
    /*
     @getModuleList
     @description:获取专题页面下需要编辑的模块列表
     */
    async getModuleList(
      params = {
        id: this.id,
        page_id: this.tabPage[+this.activeName].id,
      }
    ) {
      try {
        const res = await this.$api.reqGetModuleList(params)
        if (res instanceof Array) {
          this.tabData = res
        }
      } catch (e) {}
    },
    /*
     @handleTab
     @description:切换tab
     */
    handleTab() {
      this.tabData = [] // 重置成空数组
      this.getModuleList()
    },
    /*
     @goBack
     @description:返回上一页
     */
    goBack() {
      this.$router.go(-1)
    },
    /* 退出指引 */
    guideExit7() {
      this.guideShow7 = false
      sessionStorage.setItem('guideShow7', false)
    },
    /* 新手指引下一步 */
    guideNext7() {
      this.setSessionItem('guideShow8', true)
      this.setSessionItem('guideShow7', false)
      this.$router.push('/subjectList')
    },
    /*新手指引上一步*/
    guidePre7() {
      this.setSessionItem('guideShow6', true)
      this.setSessionItem('guideShow7', false)
      this.$router.push('/subjectList')
    },
    handleOver() {
      this.showTips = true
    },
    handleOut() {
      this.showTips = false
    },
    async isLock() {
      let params = { id: this.$route.query.id }
      this.DataList = await this.$api.reqGetProjectData(params)
      console.log('DataList', this.DataList)
      this.lockState = this.DataList.zhuanti_info.lock_status
      this.create = this.DataList.zhuanti_info.creater
      if (this.lockState == 0) {
        this.showLock = true
        this.showHoverText = '点击即可锁定当前展示城市(仅创建人可操作)'
      } else {
        this.showLock = false
        this.showHoverText = '点击即可解锁当前展示城市(仅创建人可操作)'
      }
    },
    async changeLock() {
      this.isLock()
      let realname = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
      if (realname == this.create) {
        let List = this.DataList.zhuanti_info
        let lock
        let that = this
        if (List.lock_status == 0) {
          lock = 1
        } else {
          lock = 0
        }
        let params = {
          name: List.name,
          code: List.code,
          title: List.title,
          describe: List.describe,
          id: List.id,
          is_draft: 0,
          pid: 0,
          type: 1,
          html: '-',
          city_a: '',
          city_b: '',
          is_child: 0, //判断是否为子页面
          topic_type: 0,
          city_select: 0,
          lock_status: lock,
        }
        let AddLock = await this.$api.reqAddProject(params)
        if (AddLock.code == 200) {
          // debugger
          console.log('lockState', this.lockState)
          if (this.lockState === 0) {
            this.showLock = false

            this.$forceUpdate()
            this.$message.success('当前展示城市已锁定，如需解锁请再次点击')
          } else {
            this.showLock = true
            this.$forceUpdate()
            this.$message.success('当前展示城市已解锁，如需锁定请再次点击')
          }
        }
      } else {
        this.$message.error('您不是该专题的创建人，暂无此权限锁定/解锁展示城市')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.guide-add {
  right: 14% !important;
  top: 24% !important;
}
.selectwrap {
  width: 20% !important;
}
.showcity {
  width: 80%;
}
.tips {
  background-color: rgba(96, 101, 236, 0.28);
  height: 30px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-bottom: 10px;
  margin-top: -20px;
  color: #515151;
}
.tip-lock {
  position: fixed;
  top: 17%;
  left: 31%;
  width: 30px;
  height: 30px;

  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.lock {
  // background-color: #6065EC;
  @include background_color;
}
.no-lock {
  background-color: #ececec;
}
.tip-lock .text {
  position: absolute;
  left: -100px;
  top: 32px;
  width: 300px;
  background-color: #d9d9d9;
  height: 20px;
  text-align: center;
}
.tip-lock .sanjiao {
  position: absolute;
  width: 0;
  top: 20px;
  height: 0;
  border: transparent 7px solid;
  border-color: transparent transparent #d9d9d9 transparent;
}
.tip-lock img {
  width: 15px;
  height: 15px;
  margin-top: 3px;
}
.dia-body {
  display: flex;

  > div:last-of-type {
    margin-left: 30px;
  }
  .dia-tips {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    margin: auto;
    background-color: #fff;
    border: 3px solid #000;
    padding: 20px 0px;
    border-radius: 7px;
    text-align: center;
  }
}

.changeCity {
  position: absolute;
  right: 5%;
  top: 9%;
  font-size: 16px;
}

.data-manage {
  width: 100%;

  .header {
    display: flex;
    align-items: center;
    position: relative;
    > img {
      width: 10px;
      height: 17px;
    }

    .title {
      margin-left: 14px;
      color: #333;
      font-size: 16px;
    }
  }
}
.data-manage {
  width: 100%;

  /* tabs选中颜色 */
  .el-tabs__item.is-active {
    // color: #6065ec;
    @include font_color;
    font-size: 18px;
  }

  /* tabs  hover 颜色 */
  .el-tabs__item:hover {
    // color: #6065ec;
    @include font_color;
  }

  /* tabs 下方导航条颜色 */
  .el-tabs__active-bar {
    // background-color: #6065ec;
    @include background_color;
  }
}
</style>
