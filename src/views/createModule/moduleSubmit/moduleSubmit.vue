<template>
  <div class="home">
    <div class="header-module">
      <img src="@/assets/images/left.png" alt="" @click="goBack()" />
      <el-button @click="submitModule()" v-show="moduletype == 0">
        <img src="@/assets/images/submit.png" alt />提交模块
      </el-button>
    </div>

    <!-- 装修操作 -->
    <section class="operation">
      <!-- 组件 -->
      <sliderassembly2 :pointer="pointer" />
      <!-- 提示组件 -->
      <!-- <Tipcomponent
        v-if="showTip && !guideShow2 && !guideShow3 && !guideShow4"
      /> -->

      <div class="center-box flex-column">
        <div class="title">{{ moduletype == 0 ? '新建模块' : '预览模块' }}</div>
        <div class="step">第二步：放置字段</div>
        <div class="text">将所需字段安排入模块</div>
        <div class="phone-box">
          <div class="scrollSensitivity-top" v-show="allowDrag">
           拖动组件到边缘可滑动
           </div>
          <!-- 手机 -->
          <div class="phone" ref='mydraggable'>
            <section class="phoneAll" ref="imageTofile" id="imageTofile">
              <!-- <img src="@/assets/images/phoneTop.png" alt class="statusBar" /> -->

              <!-- 头部导航 -->
              <!-- <headerTop :pageSetup="pageSetup" @click.native="headTop" /> -->

              <!-- 主体内容 -->
              <section
                class="phone-container"
                :style="{
                  'min-height': phoneHeight + 'px',
                }"
                @drop="drop($event)"
                @dragover="allowDrop($event)"
                @dragleave="dragleaves($event)"
              >
                <div
                  id="savePicDom"
                  :class="pointer.show ? 'pointer-events' : ''"
                  style="padding: 0 0 10px 0; background: #f5f5f9"
                >
                  <!-- 动态组件 -->
                  <vuedraggable
                    v-model="pageComponents"
                    :options="dragOptions"
                    :forceFallback="true"
                    @end.stop="dragComponents"
                    @start.stop="startdragComponents"
                  >
                    <component
                      :is="item.component"
                      v-for="(item, index) in pageComponents"
                      :key="index"
                      :datas="item.setStyle"
                      :style="{
                        border: item.active
                          ? '2px solid #155bd4 !important'
                          : '',
                      }"
                      @click.native="activeComponent(item, index)"
                      @mouseenter.native="showFunctions(item, index)"
                      @mouseleave.native="hideFunctions(item)"
                      class="componentsClass"
                      :data-type="item.type"
                    >
                      <!-- 添加功能插槽 -->
                      <div
                        v-show="item.showFunction"
                        class="functions"
                        slot="functions"
                      >
                        <!-- <span class="iconfont icon-sanjiaoxingzuo"></span> -->
                        <span class="iconfont"></span>
                        <!-- 编辑组件 -->
                        <div
                          class="func"
                          @click.stop="activeComponent(item, index)"
                        >
                          <i class="el-icon-edit-outline" />
                        </div>
                        <!-- 向上移动组件 -->
                        <div class="func" @click.stop="upObj(item, index)">
                          <i class="el-icon-arrow-up" />
                        </div>
                        <!-- 向下移动组件 -->
                        <div class="func" @click.stop="downObj(item, index)">
                          <i class="el-icon-arrow-down" />
                        </div>
                        <!-- 删除组件 -->
                        <div class="func" @click.stop="deleteObj(item, index)">
                          <i class="el-icon-delete-solid" />
                        </div>
                        <!-- 隐藏组件 -->
                        <div class="func" @click.stop="hideObj(index)">
                          <i
                            class="el-icon-view"
                            :class="{ hide: item.hide }"
                          />
                        </div>
                      </div>
                    </component>
                  </vuedraggable>
                </div>
                <Showtoast />
                <shareTools />
              </section>

              <!-- 手机高度 -->
              <!-- <div class="phoneSize">iPhone 8手机高度</div> -->

              <!-- 底部 -->
              <!-- <phoneBottom /> -->
            </section>
          </div>
          <div class="scrollSensitivity-bottom"  v-show="allowDrag">
           拖动组件到边缘可滑动
           </div>
        </div>
        <div style="height: 20px"></div>
        <!-- 撤回和还原 -->
        <div class="withdraw flex-between">
          <img @click="ctrlZ" src="@/assets/images/ctrlZ.png" alt />
          <img @click="ctrlY" src="@/assets/images/ctrlY.png" alt />
        </div>
      </div>

      <!-- 页面设置tab -->
      <div class="decorateTab">
        <span class="active">
          <i class="iconfont icon-zujian" />
          组件设置
        </span>
      </div>

      <!-- 右侧工具栏 -->
      <div class="decorateAll">
        <!-- 页面设置 -->
        <!-- <transition name="decorateAnima"> -->
        <!-- 动态组件 -->
        <!-- <keep-alive> -->
        <component
          :is="rightcom"
          :datas="currentproperties"
          @componenmanagement="componenmanagement"
          :key="index"
          :style="clickStyle"
        />
        <!-- </keep-alive> -->
        <!-- </transition> -->
      </div>
    </section>

    <realTimeView
      :datas="realTimeView"
      :val="{
        id,
        name: pageSetup.name,
        templateJson: JSON.stringify(pageSetup),
        component: JSON.stringify(pageComponents),
      }"
    />
  </div>
</template>

<script>
import utils from 'utils/index' // 方法类
import componentProperties from '@/utils/componentProperties' // 组件数据
import html2canvas from 'html2canvas' // 生成图片
import FileSaver from 'file-saver' // 导出JSON
import Showtoast from '../../../components/componentscom/showtoast/index.vue' //遮罩层组件
import Tipcomponent from '../../../components/componentscom/tipcomponent/index.vue' //提示组件
import shareTools from '../../../components/commonComponents/shareTools/index.vue' //分享工具箱
// import { areaList } from '@vant/area-data'   //城市插件省市区数据
import { mapState, mapMutations } from 'vuex'
import '@/assets/css/style.css'
import console, { log } from 'console'
// import HanziToPinyin from "@/utils/hanziToPinyin.ts"
import cityData from '@/utils/cityData.js' //每个城市对应的citycode码
import areaData from '@/utils/areaData.js'
import sliderassembly2 from '../../../components/sliderassembly2/index.vue'
import axios from 'axios'
import vuedraggable from 'vuedraggable' //拖拽组件
export default {
  name: 'home',
  inject: ['reload'],
  component: {
    Showtoast,
    Tipcomponent,
    shareTools,
    sliderassembly2,
  },
  data() {
    return {
      moudleDatas: [
        {
          title: '基础组件',
          comList: [
            {
              text: 'icon工具箱',
              type: '1-1',
              icon: 'el-icon-picture',
              name: 'icontoolkit',
            },
            {
              text: '轮播图',
              type: '1-2',
              name: 'swiperbox',
              icon: 'el-icon-picture-outline',
            },
            {
              text: '分享',
              type: '1-3',
              name: 'sharebox',
              icon: 'el-icon-share',
            },
            {
              text: '关键词信息流',
              type: '1-4',
              name: 'keywordsInfo',
              icon: 'el-icon-chat-dot-square',
            },
            {
              text: '免责声明',
              type: '1-5',
              name: 'disclaimer',
              icon: 'el-icon-tickets',
            },
            {
              text: 'banner图',
              type: '1-6',
              name: 'banner',
              icon: 'el-icon-picture-outline',
            },
            {
              text: '模块入口',
              type: '1-7',
              name: 'moduleentry',
              icon: 'el-icon-menu',
            },
            {
              text: '网点模块',
              type: '1-8',
              name: 'networkmodule',
              icon: 'el-icon-place',
            },
            {
              text: '最新消息',
              type: '1-9',
              name: 'hotnews',
              icon: 'el-icon-news',
            },
            {
              text: '图文模块',
              type: '1-10',
              name: 'graphicmodule',
              icon: 'el-icon-reading',
            },
            {
              text: '文章列表',
              type: '1-11',
              name: 'articlelist',
              icon: 'el-icon-reading',
            },
            {
              text: '文章时间轴',
              type: '1-12',
              name: 'articletimeline',
              icon: 'el-icon-s-operation',
            },
            {
              text: '导粉',
              type: '1-13',
              name: 'importfans',
              icon: 'el-icon-d-arrow-right',
            },
            {
              text: '政策要点',
              type: '1-14',
              name: 'plank',
              icon: 'el-icon-document',
            },
            {
              text: '表格',
              type: '1-15',
              icon: 'el-icon-date',
              name: 'edittable',
            },
            {
              text: '点对点模板',
              type: '1-16',
              icon: 'el-icon-date',
              name: 'pointToPoint',
            },
            {
              text: '小宝问问QA',
              type: '1-18',
              icon: 'el-icon-date',
              name: 'question',
            },
          ],
        },
      ],
      moduletype: 0,
      clickStyle: 'pointer-events:auto',
      subjectType: 0,
      // areaList, //省市区数据
      columns: areaData, //省市区数据
      shengshiData: [], //省市数据
      codeObj: {}, //每个城市对应的citycode
      cityVal: '深圳',
      showPicker: false, //是否显示城市选择组件
      phoneHeight: '',
      recordListZ: [], //撤回记录
      recordListY: [], //还原记录
      hasComponents: false, //判断页面加载时是否含有组件
      realTimeView: {
        show: false, // 是否显示预览
      },
      id: null,
      // deleShow: true, //删除标签显示
      index: 0,
      showTip: true, //提示卡展示
      rightcom: 'decorate',
      currentproperties: {},
      childrenPageList: [], //子页面数据存储
      addChild: true,
      ChildIndex: null,
      creatAttr: false,
      pageSetup: {
        name: '',
        code: '',
        title: '',
        describe: '',
        category_one:'',
        category_two:'',
        is_draft: 1,
        pid: 0,
        type: 1,
        html: '-',
        city_a: '',
        city_b: '',
        is_child: 0, //判断是否为子页面
        topic_type: 0,
        city_select: 0,
      },
      // saveDraft: '保存到草稿箱',
      pageComponents: [],
      module_info: [],
      offsetY: 0,
      pointer: { show: true },
      // onlyOne: ['1-5', '1-16', '1-23'],
      onlyOne: ['1-3'], // 只能存在一个的组件(组件的type)
      guideShow2: false,
      guideShow3: false,
      guideShow4: false,
      guideRight2: '',
      guideRight3: '',
      guideRight4: '',
      width: document.body.clientWidth,
      dragOptions: {
        //拖拽配置
        animation: 500,
        // scrollSensitivity: 200,
        scrollSpeed:10,
        scrollSensitivity:80,
      },
      isDragEnd: true, //拖拽切换是否结束
      allowDrag:false,//是否拖拽滑动提示
    }
  },
  async mounted() {
    this.moduletype = this.$route.query.moduletype
    if (this.moduletype == 1) {
      this.clickStyle = 'pointer-events:none'
    } else {
      this.clickStyle = 'pointer-events:auto'
    }
    let initData = JSON.parse(sessionStorage.getItem('moduleList'))
    if (initData) {
      this.currentproperties = initData
      let obj = {}
      if (initData.module_type_id == 8) {
        obj = {
          active: true,
          component: 'networkmodule',
          setStyle: initData,
          showFunction: false,
          style: 'networkmodulestyle',
          text: '网点模块',
          type: '1-8',
        }
      } else {
        obj = {
          active: true,
          component: 'edittable',
          setStyle: initData,
          showFunction: false,
          style: 'edittablestyle',
          text: '表格模块',
          type: '1-15',
        }
      }
      this.pageComponents.push(obj)
    }

    await this.getProjectData()
    this.phoneHeight = document.querySelector('.phone-box').clientHeight
    // 新建一份省市数据
    let arr = [] //省市数据
    let textArr = [] //省数据
    let childrenArr = [] //市区数据
    for (let j = 0; j < areaData.length; j++) {
      textArr.push(areaData[j].text)
      childrenArr.push(areaData[j].children)
    }
    let childTextArr = [] //市数据
    for (let x = 0; x < childrenArr.length; x++) {
      let childArr = []
      for (let y = 0; y < childrenArr[x].length; y++) {
        let childObj = { text: '' }
        childObj.text = childrenArr[x][y].text
        childArr.push(childObj)
      }
      childTextArr.push(childArr)
    }
    for (let k = 0; k < textArr.length; k++) {
      let obj = { text: '', children: [{ text: '' }] }
      obj.text = textArr[k]
      obj.children = childTextArr[k]
      arr.push(obj)
    }
    this.shengshiData = arr

    let code = 'lj'
    // 取出每个城市对应的citycode
    for (const key in cityData) {
      const ele = cityData[key].citylist
      this.extend(this.codeObj, ele)
    }
    // console.log(this.getCityName(this.codeObj, code), "getCityName");

    if (this.pageComponents.length > 0) {
      this.hasComponents = true
    }
    this.record()
    this.handleMargin()

    console.log('初始数据', this.pageComponents)
    if (!this.$route.query.id) {
      this.initSet(this.$route.query.type)
    }
  },
  beforeDestroy() {
    // 移除对 sessionStorage 的监听
    window.removeEventListener('setItem', () => {})
  },
  methods: {
     //拖拽开始
    startdragComponents() {
      // if(this.$refs.mydraggable.offsetHeight>791){
      //      this.allowDrag=true
      // }
      this.isDragEnd = false
    },
    //中间组件拖拽结束
    dragComponents(obj) {
      this.isDragEnd = true
      // console.log(obj, '拖拽结束',this.pageComponents)
      // let [...data] = this.pageComponents
      // console.log(obj.oldIndex, obj.newIndex)
      // if (obj.oldIndex > obj.newIndex) {
      //   let obj1 = this.pageComponents[obj.oldIndex]
      //   this.pageComponents.splice(obj.newIndex, 0, obj1)
      //   this.pageComponents.splice(obj.oldIndex + 1, 1)
      // } else {
      //   let obj1 = this.pageComponents[obj.oldIndex]
      //   this.pageComponents.splice(obj.newIndex+1, 0, obj1)
      //   this.pageComponents.splice(obj.oldIndex, 1)
      //   console.log(this.pageComponents)
      // }
      // this.pageComponents = data
      // console.log(this.pageComponents, '修改结束1')
    },
    goBack() {
      this.$confirm('返回列表您添加或者修改的数据将会失效, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(() => {
          let data = JSON.parse(sessionStorage.getItem('moduleList'))
          if (data) {
            sessionStorage.removeItem('moduleList')
          }
          this.$router.push({ name: 'createModule' })

          if (sessionStorage.getItem('screenList')) {
            sessionStorage.removeItem('screenList')
          }
          this.$router.push({ name: 'createModule' })
        })
        .catch(() => {})
    },
    initSet(type) {
      let modlueList = []
      let newlist = []
      // event.preventDefault()
      if (type) {
        switch (parseInt(type)) {
          case 1:
            {
              modlueList = [1, 0, 15, 7, 9, 10, 12, 2]
              this.pageSetup.topic_type = 1
            }
            break
        }
        for (var i = 0; i < modlueList.length; i++) {
          let data = utils.deepClone(
            componentProperties.get(
              this.moudleDatas[0].comList[modlueList[i]].name
            )
          )
          /* 切换组件 */
          let someOne = this.pageComponents.some((item, index) => {
            return (
              item.component === 'placementarea' &&
              index === 0 &&
              this.onlyOne.includes(data.type)
            )
          })
          this.$set(this.pageComponents, 0, data)

          // utils.forEach(this.pageComponents, (res, index) => {
          // 	/* 修改选中 */
          // 	console.log(res)
          // 	if (res.active === true) res.active = false
          // 	/* 替换提示 */
          // 	this.index = index
          // 	if (res.component === 'placementarea')

          // })
          this.rightcom = data.style
          this.index = i + 1
          /* 丢样式 */
          this.currentproperties = data.setStyle
          /* 替换 */
        }
        // let data = utils.deepClone(
        // 	componentProperties.get(event.dataTransfer.getData('componentName'))
        // )
        this.handleMargin()
        this.record()
        this.pointer.show = false // 防止第一次填充数据鼠标事件丢失
      }
    },
    // 获取vuex中方法
    ...mapMutations(['SETPAGEINFO']),
    // 模块信息转化成创建专题格式数据
    pageComponentsToParams() {
      let params = {}
      console.log(this.pageComponents, this.module_type)
      this.pageComponents.forEach((component, index) => {
        this.module_type.forEach((module) => {
          if (component.type == module.type) {
            if (params[module.name] == undefined) {
              params[module.name] = []
            }
            component.setStyle.sort = index
            params[module.name].push(component.setStyle)
          }
        })
      })
      return params
    },
    // 补全创建模块信息
    getModules(modules) {
      this.pageComponents = []
      modules.forEach((module) => {
        this.module_code.forEach((code) => {
          if (module.module_type_id == code.module_type_id) {
            let item = { ...code }
            module.value_list = [...module.key_list]
            item.setStyle = module
            this.pageComponents.push(item)
          }
        })
      })
    },
    async getProjectData() {
      if (this.$route.query.id) {
        let params = { id: this.$route.query.id }
        const res = await this.$api.reqGetProjectData(params)

        this.pageSetup = res.zhuanti_info
        this.id = res.zhuanti_info.id
        this.pageSetup.is_child = 0 // 区分子父页面
        this.pageSetup.html = '-'
        if (this.$route.query.pid) {
          this.pageSetup.pid = +this.$route.query.pid // 创建副本标识
        }
        this.currentproperties = res.zhuanti_info
        this.getModules(res.module_info)
        if (res.zhuanti_info.topic_type == 1) {
          let data = utils.deepClone(componentProperties.get('pointToPoint'))
          this.pageComponents.splice(res.zhuanti_info.point_sort, 0, data)
        }
        this.pointer.show = false // 防止第一次填充数据鼠标事件丢失
      } else {
        this.pointer.show = false
        // this.currentproperties = this.pageSetup
      }
    },
    // 城市选择--确认
    onConfirm(value, index) {
      if (this.pageSetup.type == '2' && value[2] != '全部') {
        this.cityVal = value[2]
      } else {
        this.cityVal = value[1]
      }
      this.showPicker = false
      // console.log(value, `当前索引：${index}`)
      let citycode = cityData[value[0]]['citylist'][value[1]]['code']
      // console.log(citycode, "citycode");
    },
    onChange(picker, value, index) {
      // console.log(`当前值：${value}, 当前索引：${index}`)
    },
    // 记录放置的组件
    record() {
      this.recordListZ.push(this.pageComponents.concat())
      // console.log(this.recordListZ)
    },
    // 撤回
    ctrlZ() {
      // if (this.recordListZ.length === 0) {
      // 	alert('没有可以撤回的了')
      // 	return
      // }
      if (this.hasComponents) {
        if (this.recordListZ.length === 1) {
          alert('没有可以撤回的了')
          return
        }
      } else {
        if (this.recordListZ.length === 0) {
          alert('没有可以撤回的了')
          return
        }
      }
      const idx = this.recordListZ.length - 2
      if (idx === -1) {
        this.pageComponents = []
      } else {
        this.pageComponents = this.recordListZ[idx]
      }
      const tmp = this.recordListZ.pop()
      this.recordListY.push(tmp)
      this.handleMargin()
    },
    // 还原
    ctrlY() {
      if (this.recordListY.length === 0) {
        alert('没有可以还原的了')
        return
      }
      this.pageComponents = this.recordListY.pop()
      this.record()
      this.handleMargin()
    },
    // 合并对象
    extend(target, source) {
      for (var obj in source) {
        target[obj] = source[obj]
      }
      return target
    },
    // 根据citycode获取城市名
    getCityName(objname, citycode) {
      for (let i in objname) {
        if (objname[i].code == citycode) {
          return i
        }
      }
    },
    // 查看JSON
    catJson() {
      this.$alert(
        `{
							<br/>
							"id": ${this.id},
							<br/>
							"name": "${this.pageSetup.name}",
							<br/>
							"templateJson": '${JSON.stringify(this.pageSetup)}',
							<br/>
							"component": '${JSON.stringify(this.pageComponents)}',
							<br/>
						}`,
        '查看JSON',
        {
          confirmButtonText: '确定',
          customClass: 'JSONView',
          dangerouslyUseHTMLString: true,
          callback: () => {},
        }
      )
    },
    /**
     * 保存
     */
    Preservation() {
      /* 隐藏border和删除图标 */
      this.deleShow = false
      /* 渲染结束截图 */
      this.$nextTick(() => {
        /* 截图 */
        this.toImage()
      })
    },
    /**
     * 页面截图
     *
     * @param {Function} callBack 回调函数
     */
    toImage() {
      /* 加载 */
      const loading = this.$loading({
        lock: true,
        text: '保存中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      const imageTofiles = document.querySelector('#imageTofile')
      /* 截图 */
      html2canvas(this.$refs.imageTofile, {
        backgroundColor: null,
        height: imageTofiles.scrollHeight,
        width: imageTofiles.scrollWidth,
        useCORS: true,
      }).then((canvas) => {
        /* 显示border和删除图标 */
        this.deleShow = true
        let url = canvas.toDataURL('image/png')
        const formData = new FormData()
        formData.append('base64File', url)
        // console.log(formData, '--------------页面图片formData')
        loading.close()
      })
    },
    /**
     * 当将元素或文本选择拖动到有效放置目标（每几百毫秒）上时，会触发此事件
     *
     * @param {Object} event event对象
     */
    allowDrop(event) {
      //阻止浏览器的默认事件
      event.preventDefault()
      /* 获取鼠标高度 */
      let eventoffset = event.offsetY
      /* 如果没有移动不触发事件减少损耗 */
      if (this.offsetY === eventoffset) return
      else this.offsetY = eventoffset
      /* 获取组件 */
      const childrenObject = event.target.children[0]
      // console.log(childrenObject)
      // 一个以上的组件计算
      if (this.isDragEnd) {
        if (this.pageComponents.length) {
          // console.log(this.pageComponents.length);
          if (this.pageComponents.length > 1) {
            this.$alert('不能加入模块了，如要替换请先删除已有模块', '提示', {
              confirmButtonText: '确定',
            })
          }

          /* 如果只有一个组件并且第一个是提示组件直接返回 */
          if (
            this.pageComponents.length === 1 &&
            this.pageComponents[0].type === 0
          )
            return
          /* 如果鼠标的高度小于第一个的一半直接放到第一个 */
          if (eventoffset < childrenObject.children[0].clientHeight / 2) {
            /* 如果第一个是提示组件直接返回 */
            if (this.pageComponents[0].type === 0) return
            /* 删除提示组件 */
            this.pageComponents = this.pageComponents.filter(
              (res) => res.component !== 'placementarea'
            )
            /* 最后面添加提示组件 */
            this.pageComponents.unshift({
              component: 'placementarea',
              type: 0,
            })
            return
          }
          /* 记录距离父元素高度 */
          const childOff = childrenObject.offsetTop
          /* 鼠标在所有组件下面 */
          if (
            eventoffset > childrenObject.clientHeight ||
            childrenObject.lastChild.offsetTop -
              childOff +
              childrenObject.lastChild.clientHeight / 2 <
              eventoffset
          ) {
            /* 最后一个组件是提示组件返回 */
            if (this.pageComponents[this.pageComponents.length - 1].type === 0)
              return
            /* 清除提示组件 */
            this.pageComponents = this.pageComponents.filter(
              (res) => res.component !== 'placementarea'
            )
            /* 最后一个不是提示组件添加 */
            this.pageComponents.push({
              component: 'placementarea',
              type: 0,
            })
            return
          }
          const childrens = childrenObject.children
          /* 在两个组件中间，插入 */
          for (let i = 0, l = childrens.length; i < l; i++) {
            const childoffset = childrens[i].offsetTop - childOff
            if (childoffset + childrens[i].clientHeight / 2 > event.offsetY) {
              /* 如果是提示组件直接返回 */
              if (this.pageComponents[i].type === 0) break
              if (this.pageComponents[i - 1].type === 0) break
              /* 清除提示组件 */
              this.pageComponents = this.pageComponents.filter(
                (res) => res.component !== 'placementarea'
              )
              this.pageComponents.splice(i, 0, {
                component: 'placementarea',
                type: 0,
              })
              break
            } else if (
              childoffset + childrens[i].clientHeight >
              event.offsetY
            ) {
              if (this.pageComponents[i].type === 0) break
              if (
                !this.pageComponents[i + 1] ||
                this.pageComponents[i + 1].type === 0
              )
                break
              this.pageComponents = this.pageComponents.filter(
                (res) => res.component !== 'placementarea'
              )
              this.pageComponents.splice(i, 0, {
                component: 'placementarea',
                type: 0,
              })
              break
            }
          }
        } else {
          /* 一个组件都没有直接push */
          // this.pageComponents[0] = { component: 'placementarea',
          //   type: 0,}
          this.pageComponents.push({
            component: 'placementarea',
            type: 0,
          })
          //   if (this.pageComponents.length >= 1) {
          //   for (let i = this.pageComponents.length - 1; i >= 0; i--) {
          //     if (this.pageComponents[i].type == 0) {
          //       this.pageComponents.splice(i, 1)
          //     }
          //   }
          // }
        }
      }
    },
    /**
     * 当在有效放置目标上放置元素或选择文本时触发此事件
     *
     * @param {Object} event event对象
     */
    drop(event) {
      if (!this.isHomeFinish) {
        if (this.pageSetup.is_child == 1) {
          this.$message.warning('请先完成子页面属性编辑！')
        } else {
          this.$message.warning('请先完成主页面属性编辑！')
        }
        /* 删除提示组件 */
        this.dragleaves()
        return
      }
      /* 获取数据 */
      let data = utils.deepClone(
        componentProperties.get(event.dataTransfer.getData('componentName'))
      )
      if (data) {
        /* 查询是否只能存在一个的组件且在第一个 */
        let someOne = this.pageComponents.some((item, index) => {
          return (
            item.component === 'placementarea' &&
            index === 0 &&
            this.onlyOne.includes(data.type)
          )
        })
        if (someOne) {
          this.$message.info(
            '固定位置的组件(如: 底部导航、悬浮)不能放在第一个!'
          )
          /* 删除提示组件 */
          this.dragleaves()
          return
        }
        /* 查询是否只能存在一个的组件 */
        let someResult = this.pageComponents.some((item) => {
          return (
            this.onlyOne.includes(item.type) &&
            item.component === event.dataTransfer.getData('componentName')
          )
        })
        if (someResult) {
          this.$message.info('当前组件只能添加一个!')
          /* 删除提示组件 */
          this.dragleaves()
          return
        }
        /* 替换 */
        utils.forEach(this.pageComponents, (res, index) => {
          /* 修改选中 */
          if (res.active === true) res.active = false
          /* 替换提示 */
          this.index = index
          if (res.component === 'placementarea')
            this.$set(this.pageComponents, 0, data)

          console.log('切换后的', this.pageComponents)
        })
        /* 切换组件 */
        this.rightcom = data.style
        /* 丢样式 */
        this.currentproperties = data.setStyle
        // console.log(
        // 	data,
        // 	this.rightcom,
        // 	this.currentproperties,
        // 	'----------components data'
        // )
        this.handleMargin()
        this.record()
      }
    },

    /* 设置banner图下的第一个模块的margin-top */
    handleMargin() {
      console.log(this.pageComponents[0].component,"componentaaaaaaaaaaaaaaaaaaaa");
      if (
        this.pageComponents.length > 0 &&
        this.pageComponents[0].component == 'banner'
      ) {
        if (
          this.pageComponents.length > 1 &&
          this.pageComponents[1].component != 'disclaimer'
        ) {
          // console.log(this.pageComponents[1].component,"component");
          setTimeout(() => {
            document
              .querySelector(`.${this.pageComponents[1].component}`)
              .classList.add('marginTop')
          }, 100)
        }
      }
    },

    /**
     * 当拖动的元素或文本选择离开有效的放置目标时，会触发此事件
     *
     * @param {Object} event event对象
     */
    dragleaves() {
      /* 删除提示组件 */
      this.pageComponents = this.pageComponents.filter(
        (res) => res.component !== 'placementarea'
      )
    },
    /**
     * 切换组件位置
     *
     * @param {Object} res 组件切换后返回的位置
     */
    componenmanagement(res) {
      this.pageComponents = res
      this.record()
      this.handleMargin()
    },
    /**
     * 选择组件
     *
     * @param {Object} res 当前组件对象
     */
    activeComponent(res, index) {
      console.log(res)
      this.index = index
      /* 切换组件 */
      this.rightcom = res.style
      /* 丢样式 */
      this.currentproperties = res.setStyle
      /* 替换 */
      utils.forEach(this.pageComponents, (res) => {
        /* 修改选中 */
        if (res.active === true) res.active = false
      })
      /* 选中样式 */
      res.active = true
    },
    /**
     * 选择需要展示功能模块的组件
     *
     * @param {Object} res 当前组件对象
     */
    showFunctions(res) {
      /* 替换 */
      utils.forEach(this.pageComponents, (res) => {
        /* 修改选中 */
        if (res.showFunction === true) res.showFunction = false
      })
      res.showFunction = true
    },
    /**
     * 鼠标滑出隐藏功能展示
     *
     * @param {Object} res 当前组件对象
     */
    hideFunctions() {
      /* 替换 */
      utils.forEach(this.pageComponents, (res) => {
        /* 修改选中 */
        if (res.showFunction === true) res.showFunction = false
      })
    },
    /**
     * 标题切换
     *
     * @param {Object} res 当前组件对象
     */
    headTop() {
      this.rightcom = 'decorate'
      /* 替换 */
      utils.forEach(this.pageComponents, (res) => {
        /* 修改选中 */
        if (res.active === true) res.active = false
      })
    },
    /* 向上移动组件 */
    upObj(res, index) {
      let [...data] = this.pageComponents
      if (index && res.component != this.pageComponents[index - 1].component) {
        data[index] = data[index - 1]
        data[index - 1] = res
      } else if (
        index &&
        res.component == this.pageComponents[index - 1].component
      ) {
        let obj = data[index]
        data[index] = data[index - 1]
        data[index - 1] = obj
      }
      this.pageComponents = data
      this.record()
      // 某些组件不可以移动，暂未做处理
    },
    /* 向下组件 */
    downObj(res, index) {
      let [...data] = this.pageComponents
      if (
        index < this.pageComponents.length - 1 &&
        res.component != this.pageComponents[index + 1].component
      ) {
        data[index] = data[index + 1]
        data[index + 1] = res
      } else if (
        index < this.pageComponents.length - 1 &&
        res.component == this.pageComponents[index + 1].component
      ) {
        let obj = data[index]
        data[index] = data[index + 1]
        data[index + 1] = obj
      }
      this.pageComponents = data
      this.record()
      // 某些组件不可以移动，暂未做处理
    },
    /* 删除组件 */
    deleteObj(item, index) {
      this.$confirm(
        '建议导出数据后删除模块，若直接删除，该模块中的数据将会丢失，点击确认直接删除。',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        }
      )
        .then(async () => {
          if (item.setStyle.id) {
            let { id } = item.setStyle
            this.$api.reqDeleteModule({ id })
          }
          this.pageComponents.splice(index, 1)
          this.currentproperties = {}
          console.log(this.pageComponents, '删除后的')
          if (this.index === index) this.rightcom = 'decorate'
          if (index < this.index) this.index = this.index - 1
          this.record()
        })
        .catch(() => {})
    },
    /* 隐藏组件 */
    hideObj(index) {
      if (this.pageComponents[index].setStyle.is_hide) {
        this.pageComponents[index].setStyle.is_hide = 0
      } else {
        this.pageComponents[index].setStyle.is_hide = 1
      }
      // 通过hide属性控制组件的隐藏与显示
      // this.pageComponents[index].hide = !this.pageComponents[index].hide
    },
    /* 页面刷新 */
    reloads() {
      this.$confirm('重置后您添加或者修改的数据将会失效, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(() => {
          this.reload()
        })
        .catch(() => {})
    },
    // 返回上一步
    Previous() {
      this.$confirm('返回列表您添加或者修改的数据将会失效, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(() => {
          this.$router.go(-1)
        })
        .catch(() => {})
    },

    async submitModule() {
      console.log(this.currentproperties, 'currentproperties')
      console.log(this.pageComponents, 'pageComponents')
      if (this.pageComponents.length) {
        let typeArr = this.pageComponents[0].type.split('-')
        let module_type_id = typeArr[1]
        let params = {
          id: this.$route.query.module_id,
          module_type_id: parseInt(module_type_id),
          data: this.currentproperties,
        }
        const res = await this.$api.tableModuleCompolete(params)
        const { code, data } = res
        if (code == 200) {
          this.$router.push({
            name: 'success',
            query: {
              moduleId: this.$route.query.module_id,
            },
          })
          this.$message.success('添加成功')
          sessionStorage.removeItem('moduleList')
        }
      } else {
        this.$message.error('请选择模块样式')
      }
    },

    // 重置页面模块数据
    resetdData() {
      this.pageComponents = []
      this.pageSetup = {
        // 页面设置属性
        name: '',
        id: this.id,
        code: '',
        title: '-',
        describe: '-',
        is_draft: 0,
        html: '-',
        is_child: 1,
        category_one:'',
        category_two:''
      }
      this.currentproperties = this.pageSetup
    },
    // 检验专题信息是否有空
    pageInfoeHaveEmpty(obj) {
      let isEmpty = false
      console.log(obj,'专题信息')
      Object.keys(obj).forEach((item) => {
        if (obj[item] === '') {
          isEmpty = true
        }
      })
      return isEmpty
    },
  },
  computed: {
    ...mapState(['module_code', 'module_type']),
    isHomeFinish() {
      //   if (
      //     !this.pageSetup.name ||
      //     !this.pageSetup.code ||
      //     !this.pageSetup.title ||
      //     !this.pageSetup.describe
      //   ) {
      //     return false
      //   } else {
      //     return true
      //   }
      return true
    },
    decorateTip() {
      if (this.pageSetup.is_child == 1) {
        return '修改专题子页面属性'
      } else {
        return '修改专题主页面属性'
      }
    },
    submit_project() {
      return this.pageSetup.is_child ? '保存子页面' : '提交专题'
    },
    save_draft() {
      if (this.pageSetup.is_child) {
        return '保存到草稿箱'
      } else {
        return this.pageSetup.is_draft ? '保存到草稿箱' : '移动到草稿箱'
      }
    },
  },
  watch: {
    /* 监听右侧属性设置切换 */
    rightcom(newval) {
      if (newval === 'decorate') {
        utils.forEach(this.pageComponents, (res) => {
          /* 修改选中 */
          if (res.active === true) res.active = false
        })
        this.currentproperties = this.pageSetup
        return
      }
      if (newval === 'componenmanagement') {
        /* 替换 */
        utils.forEach(this.pageComponents, (res) => {
          /* 修改选中 */
          if (res.active === true) res.active = false
        })
        this.currentproperties = this.pageComponents
      }
    },
    pageSetup: {
      handler(newVal) {
        if (this.childrenPageList[this.ChildIndex]) {
          this.childrenPageList[this.ChildIndex].name = newVal.name
        }
      },
      deep: true,
    },
  },
  components: { Showtoast, Tipcomponent, vuedraggable },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.marginTop {
  margin-top: -40px;
  border-top: transparent !important;
}
.pointer-events {
  pointer-events: none;
}

.home {
  width: 100%;
  height: 100%;
  position: relative;
  .header-module {
    position: relative;
    display: flex;
    align-items: center;
    height: 63px;
    box-shadow: 0 4px 4px 0 rgba(210, 205, 205, 0.5);
    img {
      width: 13px;
      height: 23px;
      object-fit: cover;
      cursor: pointer;
      margin-left: 25px;
    }
    .el-button {
      position: absolute;
      right: 20px;
      height: 32px;
      background-color: rgba(96, 101, 236, 0.1);
      color: #6065ec;
      display: inline-flex;
      align-items: center;
      border: none;
      img {
        margin: 0px;
        width: 12px;
        height: 12px;
        margin-right: 7px;
      }
    }
  }
  /* 删除组件 */
  .functions {
    position: absolute;
    padding: 5px 5px 5px 15px;
    text-align: center;
    font-size: 12px;
    left: 100%;
    top: 0;
    // transform: translateY(-50%);

    .iconfont {
      position: absolute;
      left: -11px;
      color: #fff;
      font-size: 12px;
      top: 50%;
      transform: translateY(-50%);
      height: 100%;
      display: flex;
      align-items: center;
    }

    .func {
      display: flex;
      width: 25px;
      height: 25px;
      align-items: center;
      justify-content: center;
      background: #fff;
      margin-bottom: 5px;

      .hide {
        color: red;
      }

      &:hover {
        background: rgba(182, 178, 178, 0.36);
        color: #a2a2a2;
      }
    }
  }

  /* 按钮集合 */
  .buttons {
    height: 60px;
    border-bottom: 1px solid #ebedf0;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding-right: 15px;
    align-items: center;
    box-shadow: 0 3px 3px 0 rgba(210, 205, 205, 0.02);

    .btn {
      height: 38px;
      line-height: 38px;
      margin-left: 14px;
      padding: 0 12px;
      border: 0;
      border-radius: 4px;
      color: #6065ec;
      background-color: rgba(96, 101, 236, 0.1);

      img {
        width: 13px;
        height: 13px;
        margin-right: 8px;
        vertical-align: middle;
      }
    }

    /* 下拉 */
    .frop {
      padding-right: 15px;

      .el-button.el-button--primary.el-dropdown-selfdefine {
        background: #fff;
        color: #000;
        border: 1px solid #dcdee0;
      }
    }

    .el-button {
      font-size: 14px;
      padding: 0 16px;
      height: 30px;

      &.el-button--primary {
        background: #155bd4;
      }

      &.el-button--danger {
        background: red;
      }
    }
  }

  /* 操作主体 */
  .operation {
    width: 100%;
    height: calc(100% - 63px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background: #f7f8fa;
    position: relative;

    .page-tab {
      position: absolute;
      left: 480px;
      top: 200px;
      display: flex;
      flex-direction: column;

      > div {
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 2px 8px 0 rgb(189 189 189 / 10%);
        border-radius: 2px;
        width: 94px;
        height: 32px;
        background-color: #fff;
        transition: all 0.8s;
        cursor: pointer;
        margin-bottom: 15px;

        &.children {
          position: relative;

          .fnc {
            position: absolute;
            left: 94px;
            color: #555;
            padding: 5px;

            .delete {
              padding: 5px 0;
            }
          }
        }

        &.active {
          // background-color: #6065ec;
          @include background_color;
          color: #fff;
        }
      }
    }
  }

  /* 手机 */
  .phone {
    // width: 55%;
    // height: 100%;
    // height: 90%;
    // overflow-y: scroll;
    display: flex;
    justify-content: center;
    // background: #f7f8fa;
    // box-shadow: 0 4px 4px 0 rgba(175,175,175,0.25);

    &::-webkit-scrollbar {
      width: 1px;
    }

    // &::-webkit-scrollbar-thumb {
    //   background-color: #155bd4;
    // }

    /* 手机样式 */
    .phoneAll {
      width: 375px;
      // min-height: 760px;
      box-shadow: 0 0 14px 0 rgba(0, 0, 0, 0.1);
      box-shadow: 0 4px 4px 0 rgba(175, 175, 175, 0.25);
      // margin: 45px 0;
      position: relative;

      /* 手机高度 */
      .phoneSize {
        position: absolute;
        left: -137px;
        top: 640px;
        font-size: 12px;
        color: #a2a2a2;
        border-bottom: 1px solid #dedede;
        width: 130px;
        height: 21px;
        line-height: 21px;
      }

      /* 状态栏 */
      .statusBar {
        width: 100%;
        display: block;
      }

      /* 主体内容 */
      .phone-container {
        // min-height: 603px;
        box-sizing: border-box;
        cursor: pointer;
        width: 100%;
        position: relative;
        padding-bottom: 60px;
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-color: #f5f5f9;

        .componentsClass {
          border: 1px solid #f5f5f9;

          &:hover {
            border: 1px dashed #155bd4 !important;
          }
        }
      }
    }
  }

  /* 右侧工具栏 */
  .decorateAll {
    width: 400px;
    height: 100%;
    overflow-y: scroll;
    overflow-x: hidden;
    position: relative;
    padding: 0 18px;
    background: #fff;
    flex-shrink: 0;

    &::-webkit-scrollbar {
      width: 1px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #155bd4;
    }
  }

  /* 页面设置tab */
  .decorateTab {
    position: fixed;
    display: flex;
    right: 410px;
    top: 88px;
    flex-direction: column;
    align-items: flex-end;

    .decorateTip {
      height: 32px;
      line-height: 32px;
      margin: 0 0 7px 0;
      padding: 0 10px;
      border-radius: 3px;
      border: 1px solid rgba(240, 240, 240, 1);
      box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);
      font-size: 12px;
      color: #999;
      background-color: #fff;
    }

    span {
      background-color: #fff;
      box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      width: 94px;
      height: 32px;
      display: inline-block;
      text-align: center;
      line-height: 32px;
      margin-bottom: 12px;
      transition: all 0.8s;
      cursor: pointer;

      &.active {
        // background-color: #6065ec;
        @include background_color;
        color: #fff;
      }

      /* 图标 */
      i {
        font-size: 12px;
        margin-right: 5px;
      }
    }
  }

  .add-child-page {
    position: fixed;
    display: flex;
    right: 400px;
    top: 280px;
    // transform: translateY(-50%);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 68px;
    height: 400px;
    border: 1px dashed rgba(96, 101, 236, 1);
    border-right: none;
    background: rgba(241, 241, 241, 1);
    cursor: pointer;

    span {
      writing-mode: vertical-lr;
      letter-spacing: 3px;
      margin-top: 12px;
    }

    > img {
      width: 30px;
      height: 30px;
    }
  }

  /* 撤回和还原 */
  .withdraw {
    width: 110px;
    margin-top: 12px;
    padding: 11px 22px;
    border-radius: 4px;
    border: 1px solid rgba(240, 240, 240, 1);
    background-color: #fff;
    box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.05);

    img {
      width: 18px;
      height: 15px;
    }
  }
}

/* 动画 */
.decorateAnima-enter-active {
  transition: all 1.5s ease;
}

.decorateAnima-leave-active {
  transition: all 1.5s ease;
}

.decorateAnima-enter {
  transform: translate(8px, 8px);
  opacity: 0;
}

.decorateAnima-leave-to {
  transform: translate(8px, 8px);
  opacity: 0;
}

.center-box {
  width: calc(100% - 880px);
  padding: 0px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  background: #f9fafc;
  .title {
    color: #333;
    font-size: 16px;
    font-weight: 700;
    width: 100%;
  }
  .step {
    font-size: 14px;
    font-weight: 400;
    margin-top: 4px;
    width: 100%;
  }
  .text {
    padding-left: 12px;
    margin-top: 4px;
    color: #666;
    font-size: 12px;
    background: rgba(41, 50, 252, 0.05);
    height: 34px;
    line-height: 34px;
    width: 100%;
  }

  .phone-box {
    margin-top: 20px;
    width: 470px;
    height: 90%;
    background: #f7f8fa;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 1px;
    }
    .scrollSensitivity-bottom{
      width: 375px;
      margin: 0 auto;
      position: absolute;
      bottom: 75px;
      height: 25px;
      line-height: 25px;
      left: 47px;
      text-align: center;
      z-index: 9999999;
      background-image: linear-gradient(rgb(245,245,245), rgb(205,205,205));
      opacity: 0.5;
    }
    .scrollSensitivity-top{
     width: 375px;
      margin: 0 auto;
      position: absolute;
      top: 8px;
      height: 25px;
      line-height: 25px;
      left: 47px;
      text-align: center;
      z-index: 9999999;
      background-image: linear-gradient(rgb(205,205,205),rgb(245,245,245));
      opacity: 0.5;
    }
  }
}

.putModule {
  height: 144px;
  margin: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4.5px;
  border: 1px dashed rgba(126, 155, 255, 1);
  background-color: #fff;

  img {
    width: 40px;
    height: 40px;
    margin-right: 15px;
  }
}

.city-select {
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 999;
  padding: 7px 14px 7px 18px;
  border-radius: 17px;
  background-color: #eee;

  img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
  }
}

::v-deep .van-overlay,
.van-popup {
  position: absolute;
}

.guideMask2 {
  justify-content: flex-end;
  padding-left: 0;
  padding-right: 27%;
  .guide-box {
    margin-top: 60px;
  }
}

.guideMask3 {
  padding-left: 31%;
  .guide-box {
    margin-top: 225px;
    .guide-card {
      padding: 30px 40px 24px 48px;
      background-image: url('~@/assets/images/guide-bg-left.png');
    }
    .guide-btns {
      margin: 40px 0 0 89px;
    }
    .guide-line {
      margin-top: 29px;
    }
  }
}

.guideMask4 {
  justify-content: flex-end;
  padding-left: 0;
  padding-right: 21%;
  .guide-box {
    margin-top: 2px;
  }
}

</style>
