import Vue from 'vue'
import VueRouter from 'vue-router'
import utils from '../utils/index'
import { Notification } from 'element-ui';
Vue.use(VueRouter)
const pageArr = ['draftBox', 'subjectList', 'editor']

let localInfo = JSON.parse(localStorage.getItem('ET_User_Info2.0'))
if (localInfo) {
  if (localInfo.info) {
    let now = new Date().getTime();
    if (now - localInfo.startTime > localInfo.expires) {
      localStorage.removeItem('ET_User_Info2.0')
    }
  }
}
let routeTo = '';
if (localInfo) {
  routeTo = '/subjectList'
} else {
  routeTo = '/login'
}
const routes = [
  {
    // 登录页
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/login.vue'),
  },
  {
    path: '/',
    name: 'layout',
    redirect: routeTo,
    component: () => import('@/layout'),
    children: [
      {
        //  表格生成模块数据详情
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/my.vue'),
      },
      /* {
        //  首页
        path: '/home',
        name: 'home',
        component: () => import('@/views/homePage/homePage.vue'),
      }, */
      {
        //  专题列表页
        path: '/subjectList',
        name: 'subjectList',
        component: () => import('@/views/subjectList/subjectList.vue'),
        children: [
          {
            path: '/subjectList/:name',
            component: () => import('@/views/subjectList/subjectList.vue'),
          }
        ]
      },
      {
        //  表格生成模块
        path: '/createModule',
        name: 'createModule',
        component: () => import('@/views/createModule/createModule.vue'),
      },
      {
        //  表格生成模块数据详情
        path: '/moduleData',
        name: 'moduleData',
        component: () => import('@/views/createModule/moduleData/moduleData.vue'),
      },
      {
        //  草稿箱
        path: '/draftBox',
        name: 'draftBox',
        component: () => import('@/views/draftBox/draftBox.vue'),
      },
      {
        //  数据中心
        path: '/dataCenter',
        name: 'dataCenter',
        component: () => import('@/views/dataCenter/dataCenter.vue'),
      },
      {
        //  专题合集管理
        path: '/zhuantiHuizong',
        name: 'zhuantiHuizong',
        component: () => import('@/views/zhuantiHuizong/zhuantiHuizong.vue'),
      },{
        //  专题位置管理
        path: '/zhuantiLocation',
        name: 'zhuantiLocation',
        component: () => import('@/views/zhuantiHuizong/zhuantiLocation.vue'),
      },
      {
        //  帮助中心
        path: '/helpCenter',
        name: 'helpCenter',
        component: () => import('@/views/helpCenter/helpCenter.vue'),
      },
      {
        //  数据管理
        path: '/dataManage',
        name: 'dataManage',
        component: () => import('@/views/subjectList/dataManage/dataManage.vue'),
      },
      {
        //  数据详情
        path: '/dataDetail',
        name: 'dataDetail',
        component: () => import('@/views/subjectList/dataManage/dataDetail/dataDetail.vue'),
      },
      {
        //  跳转链接
        path: '/jumpLink',
        name: 'jumpLink',
        component: () => import('@/views/subjectList/dataManage/dataDetail/jumpLink/jumpLink.vue'),
      },
      {
        //  模块名称
        path: '/moduleName',
        name: 'moduleName',
        component: () => import('@/views/subjectList/dataManage/dataDetail/moduleName/moduleName.vue'),
      },
      {
        //  更多日志
        path: '/more_page',
        name: 'more_page',
        component: () => import('@/views/subjectList/dataMore'),
      },
    ],
  },
  {
    //  表格模块生成页
    path: '/moduleSubmit',
    name: 'moduleSubmit',
    component: () => import('@/views/createModule/moduleSubmit/moduleSubmit.vue'),
  },
  {
    //  配置页
    path: '/editor',
    name: 'editor',
    component: () => import('@/components/editor/index.vue'),
    beforeEnter: (to, from, next) => {
      next()
      // if (pageArr.includes(from.name)) {
      //   next()
      // }
      // else {
      //   next({
      //     name:'subjectList'
      //   })
      // }
    },
  },
  {
    //  提交成功页面
    path: '/editor/submit',
    name: 'submit',
    component: () => import('@/components/editor/submit/submit.vue'),
  },
  {
    //  提交成功页面
    path: '/module/success',
    name: 'success',
    component: () => import('@/views/createModule/moduleSubmit/submit/index.vue'),
  },
]
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  let localInfo = JSON.parse(localStorage.getItem('ET_User_Info2.0'))
  if (localInfo) {
    let now = new Date().getTime();
    if (now - localInfo.startTime > localInfo.expires) {
      localStorage.removeItem('ET_User_Info2.0')
      localInfo = ''
    }
  }
  if (to.name != 'login' && !localInfo) next({ name: 'login' })
  else next()
})

export default router
