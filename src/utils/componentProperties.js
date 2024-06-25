const componentProperties = new Map()

// 数据版本  每次修改组件数据  需要对版本进行修改
// componentProperties.set('componentPropertiesVersion', 'V1.0.0')
componentProperties.set('icontoolkit', {
    component: 'icontoolkit',
    text: 'icon工具箱',
    type: '1-1',
    active: true,
    showFunction: false,
    style: 'icontoolkitstyle',
    setStyle: {
        text: 'icon工具箱',
        name: 'icon工具箱',
        sort: 0,
        is_hide: 0,
        is_show: 2,
        is_point: 0,
        jump_place: 4,
        jump_type: '',
        jump_code: '',
        value_list: [
            {
                id: 0,
                name: '演示',
                link_type: 1,
                link_url: '',
                image: 'https://imgbdb4.bendibao.com/robot/20229/18/2022918235214_63350.png',
            }
        ],
    },
})
componentProperties.set('swiperbox', {
    component: 'swiperbox',
    text: '轮播图',
    type: '1-2',
    active: true,
    showFunction: false,
    style: 'swiperboxstyle',
    setStyle: {
        text: '轮播图',
        swiperType: 1, // 选择模板
        pagingType: 'bullets', // 分页类型: 0/"bullets"/"fraction"/"progressbar"
        // imageList: [{ link_url: '' }], // 添加图片
        name: "轮播图",
        sort: 0,
        is_hide: 0,
        value_list: [{ id: 0, link_type: 1, image: 'https://imgbdb4.bendibao.com/whbdb/202211/09/20221109194042_42221.png',title:'' }],
    },
})
componentProperties.set('sharebox', {
    component: 'sharebox',
    text: '分享',
    type: '1-3',
    active: true,
    style: 'shareboxstyle',
    setStyle: {
        text: '分享',
        name: "分享",
        sort: 0,
        is_hide: 0,
        value_list: [
            {
                id: 0,
                link_type: 1,
                link_url: "",
                name: "返回本地宝首页"
            },
            {
                link_type: 1,
                link_url: "zhuantihuizong",
                name: "更多专题"
            }
        ],
    },
})
componentProperties.set('keywordsInfo', {
    component: 'keywordsInfo',
    text: '关键词信息流',
    type: '1-4',
    active: true,
    style: 'keywordsInfostyle',
    setStyle: {
        text: '关键词信息流',
        name: "关键词信息流",
        sort: 0,
        is_hide: 0,
        value_list: [
            {
                id: 0,
                title: "疫情资讯",
                keyword: "疫情"
            }
        ]
    },
})
componentProperties.set('disclaimer', {
    component: 'disclaimer',
    text: '免责声明',
    type: '1-5',
    active: true,
    style: 'disclaimerstyle',
    setStyle: {
        text: '免责声明',
        name: "免责声明",
        sort: 0,
        is_hide: 0,
        content: '本页面信息仅供参考，数据来源于卫健委，若前往某地街道社区或村镇建议直接咨询当地政府部门',
        value_list: [
            {
                id: 0,
                content: '本页面信息仅供参考，数据来源于卫健委，若前往某地街道社区或村镇建议直接咨询当地政府部门',
                link_word: '卫健委',
                link_word_url: 'https://www.baidu.com/'
            }
        ]
    },
})
componentProperties.set('banner', {
    component: 'banner',
    text: 'banner图',
    type: '1-6',
    active: true,
    style: 'bannerstyle',
    setStyle: {
        text: 'banner图',
        name: "banner图",
        sort: 0,
        is_hide: 0,
        value_list: [{
            "image": "https://imgbdb4.bendibao.com/robot/20243/01/2024301171352_76644.jpg",
            pc_image: 'https://imgbdb4.bendibao.com/szbdb/20228/16/2022816095503_33928.jpg', titleHaveCity: '1', title: ''
        }]
    },
})
componentProperties.set('moduleentry', {
    component: 'moduleentry',
    text: '模块入口',
    type: '1-7',
    active: true,
    showFunction: false,
    style: 'moduleentrystyle',
    setStyle: {
        text: '模块入口',
        sort: 0,
        is_hide: 0,
        name: '模块入口',
        is_show: 2,
        value_list: [
            {
                id: 0,
                link_type: 1,
                link_url: '',
                image: '',
                pc_image: '',
                name: '入口1'
            },
            {
                id: 0,
                link_type: 1,
                link_url: '',
                image: '',
                pc_image: '',
                name: '入口2'
            },
            {
                id: 0,
                link_type: 1,
                link_url: '',
                image: '',
                pc_image: '',
                name: '入口3'
            },

        ],
    },
})
componentProperties.set('networkmodule', {
    component: 'networkmodule',
    text: '网点模块',
    type: '1-8',
    active: true,
    showFunction: false,
    style: 'networkmodulestyle',
    setStyle: {
        text: '网点模块',
        sort: 0,
        is_hide: 0,
        name: '网点模块',
        is_show: 2,
        is_fold: 0,
        is_point: 0,
        is_option: 0,
        is_image: 0,//是否插入图片
        option_data: [],//选项卡数据
        is_address: 0, // isPosition: false,
        county_condition: 0, //区县筛选条件  0 1
        street_condition: 0,//街道筛选条件  0 1
        other_condition: "",	//其它筛选条件  ^符号隔开
        is_search: 0,	// 是否使用搜索框 0：不使用，1：使用
        search_field: "",//搜索字段
        guide_text: "",//引导文字
        no_tips: "",//无结果提示
        fold: 0,//折叠/展开行数 0 不折叠 大于0 为折叠相应行数
        value_list: [],
        remark:''
    },
})
componentProperties.set('hotnews', {
    component: 'hotnews',
    text: '最新消息',
    type: '1-9',
    active: true,
    showFunction: false,
    style: 'hotnewsstyle',
    setStyle: {
        text: '最新消息',
        name: '最新消息',
        sort: 0,
        is_hide: 0,
        value_list: [
            // {
            //     name: "电话1备注",	//字段名称
            //     type: 9,	//字段类型
            //     is_required: 0,//是否必填 0 不必填 1必填
            //     is_select: 0,	//是否运用筛选条件选择框
            //     default: 0 //是否默认字段
            // },
        ],

    },
})
componentProperties.set('graphicmodule', {
    component: 'graphicmodule',
    text: '图文模块',
    type: '1-10',
    active: true,
    showFunction: false,
    style: 'graphicmodulestyle',
    setStyle: {
        text: '图文模块',
        name: '限行区域',
        jump_place: 4,
        jump_type: 0,
        jump_code: '',
        is_show: 2,
        sort: 0,
        is_hide: 0,
        is_point: 0,
        value_list: [],
    },
})
componentProperties.set('articlelist', {
    component: 'articlelist',
    text: '文章列表',
    type: '1-11',
    active: true,
    showFunction: false,
    style: 'articleliststyle',
    setStyle: {
        text: '文章列表',
        name: '文章列表',
        is_show: 2,
        fold: 0,
        jump_type: 0,
        jump_code: '',
        jump_place: 4,
        is_update_time: 0,
        is_image: 0,
        article_detail: 0,
        sort: 0,
        is_point: 0,
        is_option: 0,
        option_data: [],//选项卡数据
        is_hide: 0,
        value_list: []
    },
})
componentProperties.set('articletimeline', {
    component: 'articletimeline',
    text: '文章时间轴',
    type: '1-12',
    active: true,
    showFunction: false,
    style: 'articletimelinestyle',
    setStyle: {
        text: '文章时间轴',
        name: '文章时间轴',
        sort: 0,
        is_hide: 0,
        is_show: 2,
        is_image: 0,
        is_title: 1,
        is_push_time: 1,
        is_city: 0,
        fold: 0,
        value_list: [],
    },
})
componentProperties.set('importfans', {
    component: 'importfans',
    text: '导粉',
    type: '1-13',
    active: true,
    showFunction: false,
    style: 'importfansstyle',
    setStyle: {
        text: '导粉',
        name: "导粉",
        sort: 0,
        value_list: [],
    },
})
componentProperties.set('plank', {
    component: 'plank',
    text: '政策要点',
    type: '1-14',
    active: true,
    showFunction: false,
    style: 'plankstyle',

    setStyle: {
        text: '政策要点',
        name: '限行区域',
        is_show: 2,
        sort: 0,
        is_hide: 0,
        
        value_list: [],
        fold: 0,
        is_fold:0,
    },
})
componentProperties.set('edittable', {
    component: 'edittable',
    text: '表格',
    type: '1-15',
    active: true,
    showFunction: true,
    style: 'edittablestyle',
    setStyle: {
        text: '表格',
        name: 'XXX表',
		is_option: 0,
		option_data: [],//选项卡数据
        is_show: 2,
        fold: 0,
        jump_type: 0,
        jump_code: '',
        jump_place: 4,
        is_search: 0,
        search_field: '',
        guide_text: '',
        no_tips: '',
        sort: 0,
        is_city: 0,
        is_county: 0,
        is_hide: 0,
        value_list: [],
    },
})
componentProperties.set('pointToPoint', {
    component: 'pointToPoint',
    text: '点对点模板',
    type: '1-16',
    active: true,
    showFunction: true,
    style: 'pointToPointstyle',
    setStyle: {
        text: '点对点模板',
        name: '',
        citya: '出发地',
        cityb: '目的地',
        topic_type: 1,
        remark: '',
        city_a:'出发地',
        city_b:'目的地',
        type:1
    },
})
componentProperties.set('richtext', {
    component: 'richtext',
    text: '富文本模块',
    type: '1-17',
    active: true,
    showFunction: false,
    style: 'richtextstyle',
    setStyle: {
        text: '富文本模块',
        name: "富文本编辑内容",
        is_show: 2,
        sort: 0,
        value_list: [],
    },
})
componentProperties.set('question', {
    component: 'question',
    text: '小宝问问QA',
    type: '1-18',
    active: true,
    showFunction: false,
    style: 'questionstyle',
    setStyle: {
        module_type_id: 18,
        text: '小宝问问',
        name: "相关回答",
        is_show: 2,
        sort: 0,
        value_list: [],
    },
})
componentProperties.set('module_multiplexing', {
    component: 'module_multiplexing',
    text: '复用模块',
    type: '1-19',
    active: true,
    showFunction: false,
    style: 'module_multiplexingstyle',
    setStyle: {
        module_name: '',
        module_type_id: 19,
        module_id: '',
        text: '复用模块',
        name: "",
        is_show: 0,
        sort: 0,
        value_list: [],
    },
})




componentProperties.set('module_create', {
    component: 'module_create',
    text: '表格关联模块',
    type: '1-20',
    active: true,
    showFunction: false,
    style: 'module_createstyle',
    setStyle: {
        module_name: '',
        module_type_id: 20,
        real_module_id: '',
        text: '表格关联模块',
        name: "可复用关联表生成的模块，当关联表数据更新时，此模块数据同步更新",
        is_show: 0,
        sort: 0,
        value_list: [],
    },
})

componentProperties.set('unlimited_button', {
    component: 'unlimited_button',
    text: '复用模块',
    type: '1-21',
    active: true,
    showFunction: false,
    style: 'unlimited_buttonstyle',
    setStyle: {
        module_type_id: 21,
        text: '',
        name: "无限按钮",
        is_show: 0,
        sort: 0,
        fold: 0,
        value_list: [],
    },
})

componentProperties.set('card_bag', {
    component: 'card_bag',
    text: '卡包模块',
    type: '1-22',
    active: true,
    showFunction: false,
    style: 'card_bagstyle',
    setStyle: {
        module_name: '',
        module_type_id: 22,
        module_id: '',
        text: '卡包模块',
        name: "卡包模块",
        is_show: 2,
        sort: 0,
        value_list: [
            {
                id: 0,
                link_type: 1,
                keyword: '卡包简介1',
                image: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202143755_69036.png',
                name: '卡包1',
                link_url: '',
            },
            {
                id: 0,
                link_type: 1,
                keyword: '卡包简介2',
                image: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202152650_19782.png',
                name: '卡包2',
                link_url: '',
            },
            {
                id: 0,
                link_type: 1,
                keyword: '卡包简介3',
                image: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202152724_61274.png',
                name: '卡包3',
                link_url: '',
            },
            {
                id: 0,
                link_type: 1,
                keyword: '卡包简介4',
                image: 'https://imgbdb4.bendibao.com/robot/202212/02/20221202152736_18305.png',
                name: '卡包4',
                link_url: '',
            },
        ],
    },
})

componentProperties.set('countdown_banner', {
    component: 'countdown_banner',
    text: '倒计时banner图',
    type: '1-23',
    active: true,
    style: 'countdown_bannerstyle',
    setStyle: {
        text: '倒计时banner图',
        name: "倒计时banner图",
        module_type_id: 23,
        sort: 0,
        is_hide: 0,
        value_list: [
            {
                image: 'https://imgbdb4.bendibao.com/xcxbdb/20233/24/2023324165631_23536.png', 
                content: '',
                target_date: '',
                pc_image:'https://imgbdb4.bendibao.com/xcxbdb/20233/24/2023324165631_23536.png'
            }]
    },
})

componentProperties.set('keyword_article', {
    component: 'keyword_article',
    text: '关键词文章',
    type: '1-24',
    active: true,
    showFunction: false,
    style: 'keyword_articlestyle',
    setStyle: {
        text: '关键词文章',
        name: '关键词文章',
        is_show: 2,
        fold: 0,
        jump_type: 0,
        jump_code: '',
        jump_place: 4,
        is_update_time: 0,
        is_image: 0,
        article_detail: 0,
        sort: 0,
        is_point: 0,
        is_option: 0,
        option_data: [],//选项卡数据
        is_hide: 0,
        value_list: [{
            keyword:''
        }]
    },
})

componentProperties.set('medal_table', {
    component: 'medal_table',
    text: '奖牌榜',
    type: '1-25',
    active: true,
    style: 'medal_tablestyle',
    setStyle: {
        text: '奖牌榜',
        name: "奖牌榜",
        module_type_id: 25,
        sort: 0,
        is_show: 2,
        fold:0,
        value_list: []
    },
})


componentProperties.set('function_module', {
    component: 'function_module',
    text: '功能模块',
    type: '1-26',
    active: true,
    showFunction: false,
    style: 'function_modulestyle',
    setStyle: {
        text: '功能模块',
        sort: 0,
        is_hide: 0,
        name: '功能模块',
        is_show: 2,
        is_fold: 0,
        is_point: 0,
        is_option: 0,
        is_image: '0',//是否插入图片
        option_data: [],//选项卡数据
        is_address: 0, // isPosition: false,
        county_condition: 0, //区县筛选条件  0 1
        street_condition: 0,//街道筛选条件  0 1
        other_condition: "",	//其它筛选条件  ^符号隔开
        is_search: 0,	// 是否使用搜索框 0：不使用，1：使用
        search_field: "",//搜索字段
        guide_text: "",//引导文字
        no_tips: "",//无结果提示
        fold: 0,//折叠/展开行数 0 不折叠 大于0 为折叠相应行数
        value_list: []
    },
})


componentProperties.set('column_article', {
    component: 'column_article',
    text: '栏目文章',
    type: '1-27',
    active: true,
    showFunction: false,
    style: 'column_articlestyle',
    setStyle: {
        text: '栏目文章',
        name: '栏目文章',
        is_show: 2,
        fold: 0,
        jump_type: 0,
        jump_code: '',
        jump_place: 4,
        is_update_time: 0,
        is_image: 0,
        article_detail: 0,
        sort: 0,
        is_point: 0,
        is_option: 0,
        option_data: [],//选项卡数据
        is_hide: 0,
        value_list: [{
            keyword:''
        }]
    },
})
// 选项卡模块暂不能创建(前后端字段未统一)
// componentProperties.set('tabcontrol', {
//     component: 'tabcontrol',
//     text: '选项卡',
//     type: '1-20',
//     active: true,
//     showFunction: false,
//     style: 'tabcontrolstyle',
//     setStyle: {
//         text: '选项卡',
//         moduleName: '选项卡',
//         tabList: [
//             {
//                 isChecked: false,
//                 text: '政策要点',
//                 moduleName: '限行区域',
//                 titleHide: false,
//             },
//             {
//                 isChecked: false,
//                 text: '文章列表',
//                 moduleName: '文章',
//                 titleHide: false,
//                 elementList: [],
//                 detail: 0,
//                 foldingNum: 0,
//                 jump_type: '',
//                 redirect: {
//                     type: 0,
//                     url: 'https://www.baidu.com/',
//                 }
//             },
//             {
//                 isChecked: false,
//                 text: '网点模块',
//                 moduleName: '旅游景点',
//                 titleHide: false,
//                 // county: '雁塔区',
//                 type: [], // 模块类型选项
//                 others: [], // 其它选项
//                 isPosition: false,
//                 foldingNum: 0,
//                 addSearch: {
//                     field: [],
//                     guideWords: '',
//                     emptyPrompt: '',
//                 },
//                 network: {
//                     contentList: [{
//                         name: 'test',
//                         type: 1,
//                         optional: '', // 选填控制
//                     },
//                     {
//                         name: 'test',
//                         type: 1,
//                         optional: '', // 选填控制
//                     }
//                     ],
//                     btnList: [
//                         {
//                             name: '旅游景点',
//                             // url: 'www.baidu.com',
//                             type: '11',
//                             optional: '', // 选填控制
//                         },
//                         {
//                             name: '游玩攻略',
//                             type: '11',
//                             optional: '', // 选填控制
//                         },
//                         {
//                             name: '旅游景点',
//                             // url: 'www.baidu.com',
//                             type: '11',
//                             optional: '', // 选填控制
//                         },
//                     ]
//                 }, //模块数据列表
//             },
//             {
//                 isChecked: false,
//                 text: '表格',
//                 moduleName: 'XXX表',
//                 titleHide: false,
//                 foldingNum: 0,
//                 redirect: {
//                     type: 0,
//                     url: 'www.baidu.com',
//                 },
//                 jump_type: '',
//                 headerList: [{
//                     name: '第一列',
//                     optional: '',
//                     type: 1,
//                     btnName: '',
//                 },
//                 {
//                     name: '第二列',
//                     optional: '',
//                     type: 8,
//                     btnName: '旅游景点',
//                 },
//                 {
//                     name: '第三列',
//                     optional: '',
//                     type: 5,
//                     btnName: '',
//                 },
//                 {
//                     name: '第一列',
//                     optional: '',
//                     type: 9,
//                     btnName: '',
//                 },
//                 ],
//                 addSearch: {
//                     field: [],
//                     guideWords: '',
//                     emptyPrompt: '',
//                 },
//             },
//         ],

//     },
// })
export default componentProperties