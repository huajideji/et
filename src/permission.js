import Vue from 'vue'

// 样式初始化
import 'css/reset.css'
import 'css/minx.less'
import 'css/tools.scss'

// 引入公共样式
import 'css/style.css'
//富文本编辑样式
import '@wangeditor/editor/dist/css/style.css'

// 引入路由配置
import '@/router/routingConfiguration.js'

// 引入字体图标
import 'iconfont/iconfont.css'
import 'iconfont/iconfont.js'

/* 引入elementUI */
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
// 修改 el-dialog 默认点击遮罩不关闭
ElementUI.Dialog.props.closeOnClickModal.default = false; 

/* 引入Vant */
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant)

// 导入api所有请求方法
import '@/api/request'
import api from '@/api/api'
Vue.prototype.$api = api


// 挂载 uitls
import Utils from './utils/index'
Vue.prototype.$utils = Utils

// 注册全局过滤器/时间戳转换日期
import globalFilter from '@/utils/filter'

Object.keys(globalFilter).forEach((key) => {
    Vue.filter(key, globalFilter[key])
})

// 组件自动化全局注册
const requireComponent = require.context(
    // 其组件目录的相对路径
    './components',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\.vue$/
)
requireComponent.keys().forEach(fileName => {
    // 获取组件配置
    const componentConfig = requireComponent(fileName)
        // 全局注册组件
    Vue.component(
        componentConfig.default.name, // 此处的name,是组件属性定义的name
        // 如果这个组件选项是通过 `export default` 导出的，
        // 那么就会优先使用 `.default`，
        // 否则回退到使用模块的根。
        componentConfig.default
    )
})