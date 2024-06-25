<template>
  <div class="home">
    <!-- 按钮集合 -->
    <section class="buttons">
      <!-- <p style="
          font-size: 12px;
          color: #4f4f4f;
          margin-left: 15px;
          cursor: pointer;
        " @click="Previous">返回</p> -->
      <span style="margin-left: 22px; cursor: pointer" @click="Previous">
        <img src="@/assets/images/left.png" alt />
      </span>

      <!-- <el-button @click="ctrlZ">撤回</el-button>
        <el-button @click="ctrlY">还原</el-button> -->
      <!-- <el-button @click="reloads" type="danger">
                    <i class="el-icon-delete-solid el-icon--left"></i>重置
                </el-button>
                <el-button @click="realTimeView.show = true">预览</el-button>
                <el-button @click="catJson">查看JSON</el-button>
                <el-button @click="$refs.file.click()">导入JSON</el-button>
                <el-button @click="exportJSON">导出JSON</el-button>
                <input type="file" ref="file" id="file" accept=".json" @change="importJSON" style="display: none" /> -->
      <!-- <el-button @click="Preservation"
          ><i class="el-icon-s-claim el-icon--left"></i>保存</el-button
        >-->
        <div>
      <!-- <button class="btn">
        <div class="flex-center" @click="preview()">
          <img src="@/assets/images/view.png" alt />
          <span>预览</span>
        </div>
      </button> -->
      <div ref="topBtn">
        <button class="btn" @click="saveDrafts()">
          <div class="flex-center">
            <img src="@/assets/images/saveDraft.png" alt />
            <span>{{ save_draft }}</span>
          </div>
        </button>
        <button class="btn" @click="submitProject()" :disabled="clickDisabled">
          <div class="flex-center">
            <img src="@/assets/images/submit.png" alt />
            <span>{{ submit_project }}</span>
          </div>
        </button>
      </div>
    </div>
    </section>

    <!-- 装修操作 -->
    <section class="operation">
      <!-- 组件 -->
      <sliderassembly :pointer="pointer" @sendcolorvalue="getcolorValue"/>
      <!-- 提示组件 -->
      <Tipcomponent
        v-if="showTip"
      />
      <!-- 子页面tab -->
      <div class="page-tab">
        <div :class="{ active: !pageSetup.is_child }" @click="showParent()">
          主页面
        </div>
        <div
          v-for="(item, index) of childrenPageList"
          :key="index"
          @click="showChild(item, index)"
          :class="{ active: index === ChildIndex }"
          class="children"
        >
          {{ item.name.length ? item.name : '子页面' }}
          <div class="fnc" v-show="index === ChildIndex">
            <div class="delete" @click.stop="delChild(index)">
              <i class="el-icon-delete-solid" />
            </div>
          </div>
        </div>
      </div>

      
      <div class="center-box flex-column">
          <div class="phone-box">
            <div class="scrollSensitivity-top" v-show="allowDrag">
            拖动组件到边缘可滑动
            </div>
            <div>
            <!-- 手机 -->
            <div class="phone"  ref='mydraggable'>
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
                    <!-- 城市选择 -->
                    <!-- <div
                      v-if="pageSetup.type !== 0&&pageSetup.city_select_type==0"
                      class="city-select flex-center"
                      @click="showPicker = true"
                    >
                      <img src="@/assets/images/city.png" alt />
                      {{ cityVal }}
                    </div> -->

                    <p
                      v-if="pageComponents.length == 0"
                      style="
                        position: absolute;
                        width: 100%;
                        margin-top: 150px;
                        text-align: center;
                        color: #999;
                      "
                    >
                      <i class="el-icon-circle-plus-outline" />
                      *新增模块从左边拖入画布
                    </p>

                    <van-popup v-model="showPicker" round position="bottom">
                      <!-- <van-area title="请滑动屏幕选择" :area-list="areaList"
                        :columns-num="pageSetup.type === 2 ? 3 : 2" @cancel="showPicker = false"
                        @confirm="onConfirm" /> -->
                      <van-picker
                        show-toolbar
                        title="请滑动屏幕选择"
                        :columns="pageSetup.type === 1 ? shengshiData : columns"
                        @cancel="showPicker = false"
                        @confirm="onConfirm"
                      />
                    </van-popup>

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
                        :pageset="pageSetup"
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
        <div class="decorateTip" v-if="!isHomeFinish">{{ decorateTip }}</div>
        <span
          :class="rightcom === 'decorate' ? 'active' : ''"
          @click="rightcom = 'decorate'"
        >
          <i class="iconfont icon-wangye" />
          页面设置
        </span>
        <span
          :class="rightcom === 'componenmanagement' ? 'active' : ''"
          @click="rightcom = 'componenmanagement'"
        >
          <i class="iconfont icon-zujian " />
          模块顺序
        </span>
        <span
          class="active"
          v-show="rightcom != 'componenmanagement' && rightcom != 'decorate'"
        >
          <i class="iconfont icon-zujian" />
          组件设置
        </span>
      </div>
      <div class="add-child-page" @click="addChildren()" v-show="addChild">
        <img src="@/assets/images/plus.png" alt />
        <span>点击新增子页面</span>
      </div>
      <div>
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
        />
        <!-- </keep-alive> -->
        <!-- </transition> -->
      </div>
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
import Showtoast from '../componentscom/showtoast/index.vue' //遮罩层组件
import Tipcomponent from '../componentscom/tipcomponent/index.vue' //提示组件
import shareTools from '../commonComponents/shareTools/index.vue' //分享工具箱
// import { areaList } from '@vant/area-data'   //城市插件省市区数据
import { mapState, mapMutations } from 'vuex'
import '@/assets/css/style.css'
import console, { log } from 'console'
// import HanziToPinyin from "@/utils/hanziToPinyin.ts"
import cityData from '@/utils/cityData.js' //每个城市对应的citycode码
import areaData from '@/utils/areaData.js'
import axios from 'axios'
import vuedraggable from 'vuedraggable' //拖拽组件
import { color } from 'echarts/core'
export default {
  name: 'home',
  inject: ['reload'],
  component: {
    Showtoast,
    Tipcomponent,
    shareTools,
  },
  data() {
    return {
      colorList:[],
      clickDisabled: false,
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
            {
              text: '模块复用',
              type: '1-19',
              icon: 'el-icon-date',
              name: 'module_multiplexing',
            },
            {
              text: '表格生成模块',
              type: '1-20',
              icon: 'el-icon-date',
              name: 'module_create',
            },
            {
              text: '无限按钮',
              type: '1-21',
              icon: 'el-icon-date',
              name: 'unlimited_button',
            },
            {
              text: '卡包模块',
              type: '1-22',
              icon: 'el-icon-date',
              name: 'card_bag',
            },
            {
              text: '倒计时banner图',
              type: '1-23',
              icon: 'el-icon-date',
              name: 'countdown_banner',
            }, {
              text: '关键词文章',
              type: '1-24',
              icon: 'el-icon-date',
              name: 'keyword_article',
            },
            {
              text: '奖牌榜',
              type: '1-25',
              icon: 'el-icon-date',
              name: 'medal_table',
            },
            {
              text: '功能模块',
              type: '1-26',
              icon: 'el-icon-date',
              name: 'function_module',
            }, {
              text: '栏目文章',
              type: '1-27',
              icon: 'el-icon-date',
              name: 'column_article',
            },
          ],
        },
      ],
      chuanyuList: [
        {
          img: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202143653_92289.jpg',
          biaoshi: 'chuanyushenfenzheng',
        },
        {
          img: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202143842_44536.jpg',
          biaoshi: 'chuanyugongjijindaikuan',
        },
        {
          img: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202143713_15946.jpg',
          biaoshi: 'chuanyuluohutongban',
        },
        {
          img: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202143718_40872.jpg',
          biaoshi: 'cyxinshengerrh',
        },
        {
          img: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202143906_71917.jpg',
          biaoshi: 'cywfzzm',
        },
        {
          img: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202143916_31897.jpg',
          biaoshi: 'cyyingyezhizhao',
        },
      ],
      chuanyuCardBag: [
        {
          name: '电子身份证',
          keyword: '网吧、旅店登记',
          image:
            'https://imgbdb4.bendibao.com/robot/202212/02/20221202152724_61274.png',
          link_url:
            'https://wsga.gaj.cq.gov.cn/weixin/#/login?returnUrl=%252Fe-card%252Fid-card',
        },
        {
          name: '电子社保卡',
          keyword: '随时亮证',
          image:
            'https://imgbdb4.bendibao.com/robot/202212/02/20221202152736_18305.png',
          link_url:
            'http://imgbdb3.bendibao.com/cqbdb/news/20207/31/2020731094652_90043.png',
        },
        {
          name: '居住证',
          keyword: '卡包简介',
          image:
            'https://imgbdb4.bendibao.com/robot/202212/02/20221202143755_69036.png',
          link_url:
            'https://wsga.gaj.cq.gov.cn/weixin/#/login?returnUrl=%252Fe-card%252Fid-card',
        },
        {
          name: '营业执照',
          keyword: '卡包简介',
          image:
            'https://imgbdb4.bendibao.com/robot/202212/02/20221202152650_19782.png',
          link_url: 'https://wsga.gaj.cq.gov.cn/wei',
        },
      ],
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
            colorstyle:'0',
        is_child: 0, //判断是否为子页面
        topic_type: 0,
        city_select: 0,
        is_template: 0,
        remark: '',
        city_select_type:0
      },
      // saveDraft: '保存到草稿箱',
      pageComponents: [],
      module_info: [],
      offsetY: 0,
      pointer: { show: true },
      // onlyOne: ['1-5', '1-16', '1-23'],
      onlyOne: ['1-3'], // 只能存在一个的组件(组件的type)
      guideRight3: '',
      guideRight4: '',
      guideRight5: '',
      width: document.body.clientWidth,
      dragOptions: {
        //拖拽配置
        animation:500,
        scrollSpeed:10,
        scrollSensitivity:80,
        fallbackTolerance:10
      },
      isDragEnd: true, //拖拽切换是否结束
      allowDrag:false,//是否拖拽滑动提示
    }
  },
  created () {
    // 阻止火狐浏览器默认的拖拽搜索行为
    document.body.ondrop = (event) => {
        // 阻止事件默认行为
        event.preventDefault()
        // 阻止时间冒泡
        event.stopPropagation()
    }
  },
  async mounted() {
    await this.getProjectData()
    await this.getPageList()
    this.phoneHeight = document.querySelector('.phone-box').clientHeight
    let colorstyleList
    let colorstr = JSON.parse(this.pageSetup.colorstyle)
    if(colorstr.colour){
          colorstyleList= colorstr.colour
    let newstr = colorstyleList[3].replace(/0.05/g, "0.1")
    colorstyleList.push(newstr)
    var r = document.querySelector(":root");
    r.style.setProperty("--basecolor", colorstyleList[0]);
    r.style.setProperty("--linear-color",colorstyleList[1]);
    r.style.setProperty("--linear-colorbef",colorstyleList[2]);
    r.style.setProperty("--fivePercent-color",colorstyleList[3]);
    r.style.setProperty("--tenPercent-color",colorstyleList[4]);
    }
    // 新建一份省市数据
    let arr = [] //省市数据
    let textArr = [] //省数据
    let childrenArr = [] //市区数据
    for (let j = 0; j < areaData.length; j++) {
      textArr.push(areaData[j].text)
      childrenArr.push(areaData[j].children)
    }
    console.log('12')
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
    console.log('32')
    for (let k = 0; k < textArr.length; k++) {
      let obj = { text: '', children: [{ text: '' }] }
      obj.text = textArr[k]
      obj.children = childTextArr[k]
      arr.push(obj)
    }
    this.shengshiData = arr

    let code = 'lj'
    console.log('42')
    // 取出每个城市对应的citycode
    for (const key in cityData) {
      const ele = cityData[key].citylist
      this.extend(this.codeObj, ele)
    }

    if (this.pageComponents.length > 0) {
      this.hasComponents = true
    }

    this.record()

    if (!this.$route.query.id) {
      this.initSet(this.$route.query.type)
    }
    this.handleMargin()
  },
  beforeDestroy() {
    // 移除对 sessionStorage 的监听
    window.removeEventListener('setItem', () => {})
  },
  methods: {
    getcolorValue(value) {
      value = JSON.stringify(value)
      this.pageSetup.colorstyle = value
    },
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
      // this.allowDrag=false
      // let [...data] = this.pageComponents
      // if (obj.oldIndex > obj.newIndex) {
      //   let obj1 = this.pageComponents[obj.oldIndex]
      //   this.pageComponents.splice(obj.newIndex, 0, obj1)
      //   this.pageComponents.splice(obj.oldIndex + 1, 1)
      // } else {
      //   let obj1 = this.pageComponents[obj.oldIndex]
      //   this.pageComponents.splice(obj.newIndex+1, 0, obj1)
      //   this.pageComponents.splice(obj.oldIndex, 1)
      // }
      // this.pageComponents = data
    },
    initSet(type) {
      let modlueList = []
      let newlist = []
      // event.preventDefault()
      console.log(type, '22')
      if (type) {
        switch (parseInt(type)) {
          case 1:
            {
              modlueList = [1, 0, 15, 7, 9, 10, 12, 2]
              this.pageSetup.topic_type = 1
            }
            break
          case 2:
            {
              modlueList = [5, 20, 1, 1, 1, 1, 1, 1, 19, 12, 2]
              this.pageSetup.topic_type = 2
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
          this.$set(this.pageComponents, i, data)

          // utils.forEach(this.pageComponents, (res, index) => {
          // 	/* 修改选中 */
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
      if (type) {
        if (type == 2) {
          let chuanyu = []
          this.pageComponents.forEach((item) => {
            if (item.type == '1-2') {
              chuanyu.push(item)
            } else if (item.type == '1-6') {
              item.setStyle.value_list[0].image =
                'https://imgbdb4.bendibao.com/robot/202212/02/20221202144841_43399.jpg'
              item.setStyle.value_list[0].pc_image =
                'https://imgbdb4.bendibao.com/szbdb/20228/16/2022816095503_33928.jpg'
            } else if (item.type == '1-22') {
              item.setStyle.value_list.forEach((item2, index) => {
                item2.name = this.chuanyuCardBag[index].name
                item2.keyword = this.chuanyuCardBag[index].keyword
                item2.image = this.chuanyuCardBag[index].image
                item2.link_url = this.chuanyuCardBag[index].link_url
                item2.link_type = 3
              })
            } else if (item.type == '1-21') {
              item.setStyle.is_show = 2
              item.setStyle.name = '常用服务'
            }
          })
          chuanyu.forEach((item, index) => {
            item.setStyle.value_list[0].link_url =
              this.chuanyuList[index].biaoshi
            item.setStyle.value_list[0].image = this.chuanyuList[index].img
            item.setStyle.value_list[0].link_type = 2
          })
        }
      }

    },
    // 获取vuex中方法
    ...mapMutations(['SETPAGEINFO']),
    // 模块信息转化成创建专题格式数据
    pageComponentsToParams() {
      let params = {}

      this.pageComponents.forEach((component, index) => {
        this.module_type.forEach((module) => {
          if (component.type == module.type) {
            if (params[module.name] == undefined) {
              params[module.name] = []
            }
            // 如果使用的是模板专题，提交就新增
            if (this.$route.query.isTemp == 1 && component.setStyle.zt_id) {
              component.setStyle.id = 0
              component.setStyle.zt_id = 0
              component.setStyle.value_list.forEach((item) => {
                item.id = 0
                item.module_id = 0
              })
            }
            component.setStyle.sort = index
            params[module.name].push(component.setStyle)
          }
        })
      })
      return params
    },
    // 模板专题提交专题时使用
    moduleToParams(arr) {
      let params = {}
      arr.forEach((component, index) => {
        this.module_type.forEach((module) => {
          if (component.module_type_id == module.module_type_id) {
            if (params[module.name] == undefined) {
              params[module.name] = []
            }
            component.value_list = component.key_list
            component.sort = index
            params[module.name].push(component)
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
            if (module.key_list) {
              module.value_list = [...module.key_list]
            }
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
        // 倒计时banner倒计日处理
        let modeleInfo = res.module_info;
        if (modeleInfo) {
          modeleInfo.forEach((item) => {
            if (item.module_type_id == 23) {

              item.key_list[0].dateArr = this.getDaojishi(item.key_list[0].target_date)
            }
          })
        }
        if (this.$route.query.pid) {
          this.pageSetup.pid = +this.$route.query.pid // 创建副本标识
        }
        if (this.$route.query.isTemp == 1) {
          sessionStorage.setItem('pageSetup', JSON.stringify(this.pageSetup))
          sessionStorage.setItem('moduleInfo', JSON.stringify(res.module_info))
        }
        this.currentproperties = res.zhuanti_info
        this.getModules(res.module_info)
        if (res.zhuanti_info.topic_type == 1) {
          let data = utils.deepClone(componentProperties.get('pointToPoint'))
          this.pageComponents.splice(res.zhuanti_info.point_sort, 0, data)
        }
        this.pointer.show = false // 防止第一次填充数据鼠标事件丢失
      } else {
        this.currentproperties = this.pageSetup
      }
    },
    getDaojishi(target_date) {
      let val = new Date(target_date)
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let d1 = new Date(year + '/' + month + '/' + day)
      let dd = new Date()
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1
      let d = dd.getDate()
      let d2 = new Date(y + '/' + m + '/' + d)
      let iday = (parseInt(d1 - d2) / 1000 / 60 / 60 / 24).toString()
      let arr = []
      for (let i = 0; i < iday.length; i++) {
        arr.push(iday.charAt(i))
      }
      return arr
    },
    async getPageList() {
      // 获取子页面页表
      if (this.$route.query.id) {
        let params = { id: this.$route.query.id }
        const resPage = await this.$api.reqGetPageList(params)
        this.childrenPageList = resPage
      }
    },
    async getProjectPageData(params) {
      const res = await this.$api.reqGetProjectPageData(params)

      this.pageSetup = res.page_info
      this.id = res.page_info.zt_id
      this.pageSetup.is_child = 1 // 区分子父页面

      // 倒计时banner倒计日处理
      let modeleInfo = res.module_info;
      if (modeleInfo) {
        modeleInfo.forEach((item) => {
          if (item.module_type_id == 23) {

            item.key_list[0].dateArr = this.getDaojishi(item.key_list[0].target_date)
          }
        })
      }
      // 填充空白
      Object.keys(this.pageSetup).forEach((item) => {
        if (this.pageSetup[item] === '') {
          this.pageSetup[item] = '-'
        }
      })
      this.pageSetup.html = '-'

      this.currentproperties = res.page_info
      this.getModules(res.module_info)
      this.pointer.show = false // 防止第一次填充数据鼠标事件丢失
    },
    // 城市选择--确认
    onConfirm(value, index) {
      if (this.pageSetup.type == '2' && value[2] != '全部') {
        this.cityVal = value[2]
      } else {
        this.cityVal = value[1]
      }
      this.showPicker = FileSystemWritableFileStream
      let citycode = cityData[value[0]]['citylist'][value[1]]['code']
    },
    onChange(picker, value, index) {
    },
    // 记录放置的组件
    record() {
      this.recordListZ.push(this.pageComponents.concat())
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
          callback: () => { },
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
      if (this.isDragEnd) {
        if (this.pageComponents.length) {
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
          this.pageComponents.push({
            component: 'placementarea',
            type: 0,
          })
        }
      }
      // 一个以上的组件计算
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
            this.$set(this.pageComponents, index, data)
        })
        /* 切换组件 */
        this.rightcom = data.style
        /* 丢样式 */
        this.currentproperties = data.setStyle
        this.handleMargin()
        this.record()
      }
    },

    /* 设置banner图下的第一个模块的margin-top */
    handleMargin() {
      if (
        this.pageComponents.length > 0 &&
        (this.pageComponents[0].component == 'banner' || this.pageComponents[0].component == 'countdown_banner')
      ) {
        if (
          this.pageComponents.length > 1 &&
          this.pageComponents[1].component != 'disclaimer'
        ) {
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
          if (item.setStyle.id && this.$route.query.isTemp != 1) {
            //如果是从模板库过来的，就不请求删除接口
            let { id } = item.setStyle
            this.$api.reqDeleteModule({ id })
          }
          this.pageComponents.splice(index, 1)
          if (this.index === index) this.rightcom = 'decorate'
          if (index < this.index) this.index = this.index - 1
          this.record()
        })
        .catch(() => { })
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
        .catch(() => { })
    },
    // 返回上一步
    Previous() {
      this.$confirm('返回列表您添加或者修改的数据将会失效, 是否继续?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(() => {
          if (this.$route.query.isTemp == 1) {
            //如果是从模板库过来的
            sessionStorage.setItem('templateVisible', true) //打开模板库弹窗
          } else {
            sessionStorage.setItem('templateVisible', false)
          }
          this.$router.go(-1)
        })
        .catch(() => { })
    },
    //预览
    async preview() {
      // window.location.href = `http://localhost:8081/#/home?name=${this.pageSetup.code}`
      try {
        this.pageComponentsToParams()
        if (!this.pageInfoeHaveEmpty(this.pageSetup)) {
          // 提交专题
          if (this.pageSetup.pid == this.pageSetup.id) {
            this.pageSetup.id = 0 // 创建副本重置id
          }
          this.pageSetup.is_draft = 0
          let params = { ...this.pageSetup, ...this.pageComponentsToParams() }
          // const res = await this.$api.reqAddProject(params)
          // if (res.code == 200) {
          // 	const ret = await this.$api.reqGetUserLoginInfo()
          // 	let { citycode } = ret.city_info
          // 	if (citycode == 'sz') {
          // 		window.open(`http://m.bendibao.com/zhuanti_new/#/?name=${this.pageSetup.code}`, "_blank");
          // 	} else {
          // 		window.open(`http://m.${citycode}.bendibao.com/zhuanti_new/#/?name=${this.pageSetup.code}`, "_blank");
          // 	}
          // 	// window.location.href = `http://m.wh.bendibao.com/zhuanti_new/#/home?name=${this.pageSetup.code}`
          // 	// window.open(`http://m.wh.bendibao.com/zhuanti_new/#/?name=${this.pageSetup.code}`, "_blank");
          // }
        } else {
          this.$message({
            message: '专题页面基本信息未完成',
            type: 'warning',
          })
        }
      } catch (e) {
        this.$message({
          message: '预览失败',
          type: 'error',
        })
      }
    },
    // 保存草稿
    async saveDrafts() {
      let flag = true
      this.pageComponents.forEach((item) => {
        if (item.type == '1-20' && item.setStyle.real_module_id == '') {
          this.$message({
            message: '请选择关联模块ID',
            type: 'warning',
          })
          flag = false
        }
      })
      if (flag) {
        // 表格生成模块--模块切换
        this.tableModuleChange(this.pageComponents)
        setTimeout(() => {
          this.confirmSaveDrafts()
        }, 1000)
      }
    },
    async confirmSaveDrafts() {
      try {
        if (!this.pageSetup.is_child) {
          this.pageComponents.forEach((item, index) => {
            if (item.type == '1-16') {
              this.pageSetup.point_sort = index
            }
          })
          let params = { ...this.pageSetup, ...this.pageComponentsToParams() }
          params.is_draft = 1
          if (this.$route.query.isTemp == 1) {
            params.id = 0
            params.is_template = 0
          }
          const res = await this.$api.reqAddProject(params)
          if (res.code == 200) {
            sessionStorage.setItem('clickIndex', 2)
            this.$router.push({
              name: 'my',
              query: {
                location: 'draft'
              }
            })
          }
        } else {
          this.$message('子页面不可操作，请切换到主页面进行操作')
        }
      } catch (e) { }
    },
    // 提交专题
    async submitProject() {
      this.clickDisabled = true
      setTimeout(() => {
        this.clickDisabled = false;
      }, 3000)
      let flag = true
      this.pageComponents.forEach((item) => {
        if (item.type == '1-20' && item.setStyle.real_module_id == '') {
          this.$message({
            message: '请选择关联模块ID',
            type: 'warning',
          })
          flag = false
        }
      })
      if (flag) {
        // 表格生成模块--模块切换
        this.tableModuleChange(this.pageComponents)
        setTimeout(() => {
          this.confirmSubmit()
        }, 1000)
      }
    },
    async confirmSubmit() {
      if (!this.pageSetup.is_child) {
        try {
          if (parseInt(this.pageSetup.topic_type) != 1) {
            delete this.pageSetup.city_a
            delete this.pageSetup.city_b
            delete this.pageSetup.remark
          } else {
            let flag = true
            let check_arr = []
            this.pageComponents.forEach((item, index) => {
              if (item.type == '1-16') {
                this.pageSetup.point_sort = index
                this.pageSetup.city_a = item.setStyle.city_a
                this.pageSetup.city_b = item.setStyle.city_b
                this.pageSetup.remark = item.setStyle.remark
                this.pageSetup.type = item.setStyle.type
                if (!this.pageSetup.remark) {
                  delete this.pageSetup.remark
                }
              }
              if (item.type == '1-19' && item.setStyle.module_id == 0) {
                if (flag) {
                  this.$message({
                    message: '请选择复用模块ID',
                    type: 'warning',
                  })
                  flag = false
                }
              }

              if (item.type == '1-6' || item.type == '1-23') {
                check_arr.push(item.type)
              }

            })
            if (check_arr.length != 1) {
              this.$message({
                message: 'banner模块数量必须为1',
                type: 'warning',
              })
              flag = false
            }
            if (!flag) {
              return
            }
          }
          let check_arr = []
          this.pageComponents.forEach((item, index) => {
            if (item.type == '1-6' || item.type == '1-23') {
              check_arr.push(item.type)
            }
          })
          if (check_arr.length != 1) {
            this.$message({
              message: 'banner模块数量必须为1',
              type: 'warning',
            })
            return
          }
          // if (false) {
          if (!this.pageInfoeHaveEmpty(this.pageSetup)) {
            // 提交专题
            if (
              this.pageSetup.pid == this.pageSetup.id ||
              this.$route.query.isTemp == 1
            ) {
              this.pageSetup.id = 0 // 创建副本重置id
              this.pageSetup.is_template = 0
            }
            this.pageSetup.is_draft = 0
            let params = { ...this.pageSetup, ...this.pageComponentsToParams() }
            // let params = await this.pageComponentsToParams();
            const res = this.$api.reqAddProject(params)
            res.then((e) => {
              if (e.code == 200) {
                //如果是模板专题
                if (this.$route.query.isTemp == 1) {
                  let pageSet = JSON.parse(sessionStorage.getItem('pageSetup'))
                  let moduleSet = JSON.parse(
                    sessionStorage.getItem('moduleInfo')
                  )
                  pageSet.template_count += 1
                  let params = { ...pageSet, ...this.moduleToParams(moduleSet) }
                  this.$api.reqAddProject(params)
                }

                this.$router.push({
                  name: 'submit',
                })
              }
            })
          } else {
            this.$message({
              message: '专题页面基本信息未完成',
              type: 'warning',
            })
          }
        } catch (e) {
          this.$message({
            message: '创建专题失败',
            type: 'error',
          })
        }
      } else {
        //保存子页面
        let info = { ...this.pageSetup, ...this.pageComponentsToParams() }
        if (this.ChildIndex != null) {
          info.page_id = this.childrenPageList[this.ChildIndex].id
        }
        if (this.id) {
          info.id = this.id
        }
        const res = await this.$api.reqAddPage(info)
        if (res.ret == 200) {
          await this.getPageList() // 更新子页面列表
          if (this.ChildIndex == null)
            this.ChildIndex = this.childrenPageList.length - 1
          this.$message.success('保存子页面成功')
        }
      }
    },
    // 模块切换
    tableModuleChange(pageComponents) {
      let arr = []
      pageComponents.forEach((item, index) => {
        if (item.type == '1-20') {
          let obj = {
            sort: index,
            id: item.setStyle.real_module_id,
          }
          arr.push(obj)
        }
      })
      if (arr.length > 0) {
        arr.forEach((item) => {
          this.getTableModuleDetail(item.id, item.sort)
        })
      }
    },
    // 获取数据详情
    async getTableModuleDetail(id, index) {
      let params = {
        id: id,
      }
      const res = await this.$api.getTableModule(params)
      let data = res
      let obj = {}
      if (data.module_type_id == 15) {
        obj = {
          active: true,
          component: 'edittable',
          setStyle: data,
          showFunction: false,
          style: 'edittablestyle',
          text: '表格模块',
          type: '1-15',
        }
      } else if (data.module_type_id == 8) {
        obj = {
          active: true,
          component: 'networkmodule',
          setStyle: data,
          showFunction: false,
          style: 'networkmodulestyle',
          text: '网点模块',
          type: '1-8',
        }
      }
      this.pageComponents.splice(index, 1, obj)
    },
    async addChildren() {
      let value = true
      const childPage = this.$children.filter(
        (child) => child.name == 'decorate'
      )
      // return
      if (childPage.length) {
        childPage[0].$refs.datas.validate((valid) => {
          if (!valid) {
            this.$message({
              message: '专题页面基本信息未完成',
              type: 'warning',
            })
            value = false
            return false
          }
        })
      } else {
        if (this.pageInfoeHaveEmpty(this.pageSetup)) {
          value = false
          this.$message({
            message: '专题页面基本信息未完成',
            type: 'warning',
          })
        }
      }

      // 有必填值为空直接返回
      if (!value) return
      if (!this.pageSetup.is_child) {
        try {
          if (this.id) {
            let params = { ...this.pageSetup, ...this.pageComponentsToParams() }
            const res = await this.$api.reqAddProject(params)
            if (res.code == 200) {
              this.resetdData() // 重置成子页面
              this.rightcom = 'decorate'
              this.addChild = false
            } else {
              this.$message.error('创建子页面失败')
            }
          } else {
            if (this.pageSetup.pid == this.pageSetup.id) {
              this.pageSetup.id = 0 // 创建副本重置id
            }
            this.pageSetup.is_draft = 1
            let params = { ...this.pageSetup, ...this.pageComponentsToParams() }
            const res = await this.$api.reqAddProject(params)
            if (res.code == 200) {
              this.id = res.data.id
              this.resetdData() // 重置成子页面
              this.rightcom = 'decorate'
              this.addChild = false
              this.$router.push({
                query: {
                  id: res.data.id,
                },
              })
            }
          }
        } catch (e) {
          this.$message.error('创建子页面失败')
        }
      }
    },
    // 删除某个子页面
    delChild(index) {
      this.$confirm('确认删除所选子页面吗', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(async () => {
          if (this.childrenPageList[index].id !== this.id) {
            await this.$api.reqDeletePage({
              id: this.childrenPageList[index].id,
            })
            this.$message.success('子页面删除成功')
          }
          window.location.reload()
        })
        .catch(() => { })
    },
    // 展示子页面
    async showChild(item, index) {
      if (this.ChildIndex != index) {
        this.$confirm(
          '确定已保存当前页面内容吗？直接离开本次编辑内容将会丢失。',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            showClose: false,
          }
        )
          .then(async () => {
            this.addChild = false
            this.ChildIndex = index
            this.getProjectPageData({ id: item.id })
            this.rightcom = 'decorate'
          })
          .catch(() => { })
      }
    },
    showParent() {
      this.$confirm(
        '确定已保存当前页面内容吗？直接离开本次编辑内容将会丢失。',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        }
      )
        .then(async () => {
          this.ChildIndex = null
          this.addChild = true
          this.getProjectData()
          this.rightcom = 'decorate'
        })
        .catch(() => { })
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
        category_one: '',
        category_two: '',
      }
      this.currentproperties = this.pageSetup
    },
    // 检验专题信息是否有空
    pageInfoeHaveEmpty(obj) {
      let isEmpty = false
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
       if(this.pageSetup.is_child){
           if( !this.pageSetup.name ||
              !this.pageSetup.code ){
                 return false
           }else{
                 return true
           }
        }else{
        if (
        !this.pageSetup.name ||
        !this.pageSetup.code ||
        !this.pageSetup.title ||
        !this.pageSetup.describe||
        !this.pageSetup.category_one||
        !this.pageSetup.category_two
      ) {
        return false
      } else {
        return true
      }
        }
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
  margin-top:-40px;
  border-top: transparent !important;
}
.pointer-events {
  pointer-events: none;
}

.home {
  width: 100%;
  height: 100%;
  position: relative;

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
      // color: #6065ec;
      // @include font_color;
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
    height: calc(100% - 60px);
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
      // background-color: #155bd4;
      @include background_color4;
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
    @include border_color2;
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
  width: 470px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  background: #f7f8fa;
  position: relative;
  .phone-box {
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
  @include border_color2;
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
</style>
