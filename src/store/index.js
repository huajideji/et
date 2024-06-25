import Vue from "vue";
import Vuex from "vuex";
// 引入各模块store
import icon from "./modules/icon"
import network from "./modules/network"
import latest_news from "./modules/latest_news"
import image_text from "./modules/image_text"
import article_list from "./modules/article_list"
import article_timeline from "./modules/article_timeline"
import table from "./modules/table"
import policy_points from "./modules/policy_points"
import powder_guide from "./modules/powder_guide"
import module_entry from "./modules/module_entry"
import disclaimer from "./modules/disclaimer"
Vue.use(Vuex)
// 暴露Store类的一个实例
export default new Vuex.Store({
  state: {
    colorStyle:'0',
    module_code: [
      {
        module_type_id: 1, //icon
        type: '1-1',
        text: 'icon工具箱',
        active: false,
        showFunction: false,
        component: 'icontoolkit',
        style: 'icontoolkitstyle',
      },
      {
        module_type_id: 2,
        type: '1-2',
        text: '轮播图', //banner_list
        active: false,
        showFunction: false,
        component: 'swiperbox',
        style: 'swiperboxstyle',
      },
      {
        module_type_id: 3, //share_blue
        type: '1-3',
        text: '分享',
        active: false,
        showFunction: false,
        component: 'sharebox',
        style: 'shareboxstyle',
      },
      {
        module_type_id: 4, //keyword
        type: '1-4',
        text: '关键词信息流',
        active: false,
        showFunction: false,
        component: 'keywordsInfo',
        style: 'keywordsInfostyle',
      },
      {
        module_type_id: 5, //disclaimer
        type: '1-5',
        text: '免责声明',
        active: false,
        showFunction: false,
        component: 'disclaimer',
        style: 'disclaimerstyle',
      },
      {
        module_type_id: 6, //banner
        type: '1-6',
        text: 'banner图',
        active: false,
        showFunction: false,
        component: 'banner',
        style: 'bannerstyle',
      },
      {
        module_type_id: 7,//module_entry
        type: '1-7',
        text: '模块入口',
        active: false,
        showFunction: false,
        component: 'moduleentry',
        style: 'moduleentrystyle',
      },
      {
        module_type_id: 8,//network
        type: '1-8',
        text: '网点模块',
        active: false,
        showFunction: false,
        component: 'networkmodule',
        style: 'networkmodulestyle',
      },
      {
        module_type_id: 9,//latest_news
        type: '1-9',
        text: '最新消息',
        active: false,
        showFunction: false,
        component: 'hotnews',
        style: 'hotnewsstyle',
      },
      {
        module_type_id: 10,//image_text
        type: '1-10',
        text: '图文模块',
        active: false,
        showFunction: false,
        component: 'graphicmodule',
        style: 'graphicmodulestyle',
      },
      {
        module_type_id: 11,//article_list
        type: '1-11',
        text: '文章列表',
        active: false,
        showFunction: false,
        component: 'articlelist',
        style: 'articleliststyle',
      },
      {
        module_type_id: 12,//article_timeline
        type: '1-12',
        text: '文章时间轴',
        active: false,
        showFunction: false,
        component: 'articletimeline',
        style: 'articletimelinestyle',
      },
      {
        module_type_id: 13,//powder_guide
        type: '1-13',
        text: '导粉',
        active: false,
        showFunction: false,
        component: 'importfans',
        style: 'importfansstyle',
      },
      {
        module_type_id: 14,//policy_points
        type: '1-14',
        text: '政策要点',
        active: false,
        showFunction: false,
        component: 'plank',
        style: 'plankstyle',
      },
      {
        module_type_id: 15,//table
        type: '1-15',
        text: '表格',
        active: false,
        showFunction: false,
        component: 'edittable',
        style: 'edittablestyle',
      },

      {
        module_type_id: 17,//editor_guide
        type: '1-17',
        text: '富文本模块',
        active: false,
        showFunction: false,
        component: 'richtext',
        style: 'richtextstyle',
      },
      {
        module_type_id: 18,//questionAnswer
        type: '1-18',
        text: '小宝问问QA',
        active: false,
        showFunction: false,
        component: 'question',
        style: 'questionstyle',
      }, {
        module_type_id: 19,//module_multiplexing
        type: '1-19',
        text: '复用模块',
        active: false,
        showFunction: false,
        component: 'module_multiplexing',
        style: 'module_multiplexingstyle',

      }, {
        module_type_id: 21,//module_multiplexing
        type: '1-21',
        text: '无限按钮',
        active: false,
        showFunction: false,
        component: 'unlimited_button',
        style: 'unlimited_buttonstyle',

      },
      {
        module_type_id: 20,//module_create
        type: '1-20',
        text: '表格生成模块',
        active: false,
        showFunction: false,
        component: 'module_create',
        style: 'module_createstyle'
      },
      {
        module_type_id: 22,//module_multiplexing
        type: '1-22',
        text: '无限按钮',
        active: false,
        showFunction: false,
        component: 'card_bag',
        style: 'card_bagstyle',

      },
      {
        module_type_id: 23, //banner
        type: '1-23',
        text: '倒计时banner图',
        active: false,
        showFunction: false,
        component: 'countdown_banner',
        style: 'countdown_bannerstyle',
      },
      {
        module_type_id: 24, //keyword_article
        type: '1-24',
        text: '关键词文章',
        active: false,
        showFunction: false,
        component: 'keyword_article',
        style: 'keyword_articlestyle',
      },
      {
        module_type_id: 25, //medal_table
        type: '1-25',
        text: '奖牌榜',
        active: false,
        showFunction: false,
        component: 'medal_table',
        style: 'medal_tablestyle',
      },
      {
        module_type_id: 26, //function_module
        type: '1-26',
        text: '功能模块',
        active: false,
        showFunction: false,
        component: 'function_module',
        style: 'function_modulestyle',
      },
      {
        module_type_id: 27, //column_article
        type: '1-27',
        text: '栏目文章',
        active: false,
        showFunction: false,
        component: 'column_article',
        style: 'column_articlestyle',
      },
    ],
    module_type: [
      {
        type: '1-1',
        name: 'icon',
        module_type_id: 1
      },
      {
        type: '1-2',
        name: 'banner_list',
        module_type_id: 2
      },
      {
        type: '1-3',
        name: 'share_blue',
        module_type_id: 3
      },
      {
        type: '1-4',
        name: 'keyword',
        module_type_id: 4
      },
      {
        type: '1-5',
        name: 'disclaimer',
        module_type_id: 5
      },
      {
        type: '1-6',
        name: 'banner',
        module_type_id: 6
      },
      {
        type: '1-7',
        name: 'module_entry',
        module_type_id: 7
      },
      {
        type: '1-8',
        name: 'network',
        module_type_id: 8
      },
      {
        type: '1-9',
        name: 'latest_news',
        module_type_id: 9
      },
      {
        type: '1-10',
        name: 'image_text',
        module_type_id: 10
      },
      {
        type: '1-11',
        name: 'article_list',
        module_type_id: 11
      },
      {
        type: '1-12',
        name: 'article_timeline',
        module_type_id: 12
      },
      {
        type: '1-13',
        name: 'powder_guide',
        module_type_id: 13
      },
      {
        type: '1-14',
        name: 'policy_points',
        module_type_id: 14
      },
      {
        type: '1-15',
        name: 'table',
        module_type_id: 15
      },
      {
        type: '1-16',
        name: 'pointToPointstyle',
        module_type_id: 16
      },
      {
        type: '1-17',
        name: 'editor_guide',
        module_type_id: 17
      },
      {
        type: '1-18',
        name: 'question',
        module_type_id: 18
      }, {
        type: '1-19',
        name: 'module_multiplexing',
        module_type_id: 19
      }, {
        type: '1-21',
        name: 'unlimited_button',
        module_type_id: 21
      },

      {
        type: '1-20',
        name: 'module_create',
        module_type_id: 20
      },


      {
        type: '1-22',
        name: 'card_bag',
        module_type_id: 22
      },
      {
        type: '1-23',
        name: 'countdown_banner',
        module_type_id: 23
      },
      {
        type: '1-24',
        name: 'keyword_article',
        module_type_id: 24
      },
      {
        type: '1-25',
        name: 'medal_table',
        module_type_id: 25
      },
      {
        type: '1-26',
        name: 'function_module',
        module_type_id: 26
      },
      {
        type: '1-27',
        name: 'column_article',
        module_type_id: 27
      },

    ],
    pageInfo: {
      // 页面设置属性
      // name: '',
      // details: '',
      // isPerson: false,
      // isBack: false,
      // zhuantiId: null,
      // type: 0,
      // isChild: 0, //判断是否为子页面
    },
    // banner图
    banner: [],
    // 轮播图
    banner_list: [],
    // 免责声明
    //  disclaimer: [],
    // 关键词信息流
    keyword: [],
    // 分享
    share_blue: []
  },
  mutations: {
    //获取页面信息
    setcolorStyle(state,data) {
      state.colorStyle = data
    },
    SETPAGEINFO(state, pageInfo) {
      state.pageInfo = pageInfo
    },
    // banner图
    setBanner(state, data) {
      state.banner = data[0]
    },
    // 轮播图
    setSwiper(state, data) {
      state.banner_list = data[0]
    },
    // 免责声明
    // setDesclaimer(state, data) {
    //   state.disclaimer[0] = data
    // },
    // 关键词信息流
    setKeywordsinfo(state, data) {
      state.keyword = data[0]
    },
    // 分享
    setSharebox(state, data) {
      state.share_blue = data[0]
    },
  },
  getters: {},
  actions: {},
  modules: {
    icon,
    network,
    latest_news,
    image_text,
    article_list,
    article_timeline,
    table,
    policy_points,
    powder_guide,
    module_entry,
    disclaimer
  },
})
