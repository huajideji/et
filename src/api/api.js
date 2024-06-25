/**请求路径
 * 
 */
import { post, get } from "@/api/request";

export default {
  // 获取用户登录信息
  reqGetUserLoginInfo: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetUserLoginInfo', params)
  },
  /** 专题列表页数据获取*/
  // 新增专题
  reqAddProject: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Zhuanti.Add', params)
  },
  //删除专题,副本，草稿
  reqDeleteProject: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Zhuanti.Delete', params)
  },
  // 获取专题配置列表
  reqGetList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetList', params)
  },
  //获取最近填写专题列表
  reqGetLatelyList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetLatelyList', params)
  },
  //获取热门专题列表
  reqGetHotList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetHotZhauntiList', params)
  },
  //获取最新动态列表
  reqGetLogList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetLogList', params)
  },
  //获取副本列表
  reqGetCopyList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetCopyList', params)
  },

  /** 草稿箱页数据获取*/
  // 获取草稿列表
  reqGetDraftList: () => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetDraftList')
  },

  /** 模块编辑数据获取*/
  //获取专题下的页面列表
  reqGetPageList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetPageList', params)
  },
  //获取专题主页面信息，包含模块以及数据
  reqGetProjectData: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhauntiData', params)
  },
  // 新增子页面
  reqAddPage: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.AddPage', params)
  },
  //删除子页面
  reqDeletePage: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.DeletePage', params)
  },
  //获取子页面信息，包含模块以及数据
  reqGetProjectPageData: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhauntiPageData', params)
  },
  //删除模块
  reqDeleteModule: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.DeleteModule', params)
  },


  /** 数据管理页面*/
  //获取专题页面下需要编辑的模块列表
  reqGetModuleList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetList', params)
  },
  reqGetModuleLists: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.getModuleList', params)
  },

  /** 数据管理详情页面*/
  //获取模块的字段列表(更改)
  reqGetModuleKeyList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetModuleKeyList', params)
  },
  //更改
  reqNewGetModuleKeyList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetNewModuleKeyList', params)
  },

  //获取模块信息
  reqGetModuleInfo: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetModuleInfo', params)
  },
  //获取模块数据
  reqGetModuleData: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetModuleData', params)
  },
  reqGetNewModuleData: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetNewModuleData', params)
  },
  // App.Zhuanti_Module.GetNewModuleData
  // 添加模块数据 
  reqAddModuleData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.AddModuleData', params)
  },
  reqAddNewModuleData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.AddNewModuleData', params)
  },
  //删除模块数据
  reqDeleteModuleData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.DeleteData', params)
  },
  //下载模块导入模板
  reqDownloadTemplate: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.DownloadTemplate', params)
  },
  reqDownloadNewTemplate: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.DownloadNewTemplate', params)
  },
  //导入模块数据
  reqImportData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.ImportData', params)
  },
  reqImportNewData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.ImportNewData', params)
  },
  /** 跳转链接页面*/
  // 添加跳转链接
  reqAddJumpLink: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.AddJumpLink', params)
  },
  // 获取跳转链接列表
  reqGetJumpLinkList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetJumpLinkList', params)
  },
  // 删除跳转链接
  reqDelJumpLink: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.DelJumpLink', params)
  },
  /** 模块名称页面*/
  // 添加模块名称
  reqAddModuleName: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.AddModuleName', params)
  },
  // 获取模块名称列表
  reqGetModuleNameList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetModuleNameList', params)
  },
  // 删除模块名称
  reqDelModuleName: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.DelModuleName', params)
  },
  // 修改勾选城市
  changeCityList: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Zhuanti.AddZhuantiCity', params)
  },
  // 获取勾选城市
  getZhuantiCity: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhuantiCity', params)
  },
  getClassify: params => {
    return get('/phalapi/public/?s=Robot_Problem.createPro', params)
  },



  /** 表格生成模块页面*/
  // 获取表格列表
  getModuleTableList: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.moduleTableList', params)
  },
  // 获取日志
  tableLogList: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.tableLogList', params)
  },
  // 导入表格
  addModuleTable: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.addModuleTable', params)
  },
  // 删除表格
  deleteTable: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.deleteTable', params)
  },
  // 获取表格详情搜索框列表
  getColumn: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetColumn', params)
  },
  // 获取表格详情
  getModuleTableDetail: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.moduleTableDetail', params)
  },
  // 新增表格列
  addColumn: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.add_column', params)
  },
  // 添加表格详情数据
  addTableData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.addTableData', params)
  },
  // 修改表格详情数据
  updateTableData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.updateTableData', params)
  },
  // 删除表格详情数据
  deleteTableData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.deleteTableData', params)
  },
  // 删除多个表格详情数据
  deleteTableDatas: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.deleteTableData', params)
  },
  // 表格详情导入数据
  importTableData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.importTableData', params)
  },
  // 表格详情导出数据
  exportTableData: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.exportTableData', params)
  },
  // 获取表格下的模块列表
  getTableModuleList: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.getTableModuleList', params)
  },
  // 删除模块
  deleteTableModule: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.deleteTableModule', params)
  },
  // 获取新建表格时预览数据
  createTableModuleScreen: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.createTableModuleScreen', params)
  },
  // 新建模块第一步
  createTableModule: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.createTableModule', params)
  },
  // 新建模块第二步
  tableModuleCompolete: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.tableModuleCompolete', params)
  },
  // 编辑模块
  updateTableModule: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.updateTableModule', params)
  },
  //  获取单个模块信息---预览模块
  getTableModule: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.getTableModule', params)
  },
  // 获取筛选类型
  getSelectValue: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Module.getSelectValue', params)
  },
  // 城市覆盖数弹框
  getCityListDetail: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhuantiCityList', params)
  },
  // 获取更多操作日志
  getMoreZhuantiLog: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhuantiLogList', params)
  },

  /* 模板页 */
  getTemplateListData: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.getTemplateList', params)
  },
  // 获取banner列表
  getBannerListData: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Module.getBannerList', params)
  },

  /** 数据中心页面*/
  // 获取专题流量概述
  GetZhuantiFlowSurvey:() => {
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhuantiFlowSurvey')
  },
  // 获取专题流量详情列表
  GetZhuantiFlowDetailList: params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhuantiFlowDetailList',params)
  },
  // 获取专题流量详情
  GetZhuantiFlowDetail: params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhuantiFlowDetail',params)
  },
  // 专题流量详情列表导出
  ExportZhuantiFlowDetailList: params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.ExportZhuantiFlowDetailList',params)
  },
  // 专题流量详情导出
  ExportZhuantiFlowDetail: params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.ExportZhuantiFlowDetail',params)
  },


  // 管理员权限列表
  getAuthorityList: params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Zhuanti.GetZhuantiUserList',params)
  },
  // 添加管理员
  addAuthority: params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Zhuanti.AddZhuantiUser',params)
  },
  // 删除管理员
  deleteAuthority: params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Zhuanti.DelZhuantiUser',params)
  },
  // 修改管理员
  editAuthority: params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Zhuanti.EditZhuantiCreater',params)
  },


  /* 帮助中心页面 */
  // 添加帮助中心文档
  addHelpFile: params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Help.Add',params)
  },
  // 获取帮助中心列表
  getHelpFileList: params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Help.GetList',params)
  },
  // 修改帮助中心文档
  modHelpFile: params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Help.Update',params)
  },
  // 删除帮助中心文档
  delHelpFile: params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Help.Delete',params)
  },
  // 添加阅读统计
  addHelpFileCount: params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Help.AddCount',params)
  },


  // 新手指引
  beginnerGuide: params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Zhuanti.HandelZhuantiPoint',params)
  },



  // 专题合计管理
  // 获取对应城市的专题列表
  getHuizongList:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Topic.GetList',params)
  },
  // 获取大分类数据
  getOneList:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Topic.getOneList',params)
  },
  // 获取二级分类数据
  getTwoList:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Topic.GetTwoList',params)
  },
  // 获取对应城市的分类数据
  getTypeList:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Topic.GetTypeList',params)
  },

  // 添加专题列表
  addHuizongList:params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Topic.Add',params)
  },
  // 修改专题列表
  updateHuizongList:params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Topic.Update',params)

  },
  // 删除专题列表
  delHuizongList:params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Topic.delete',params)
  },

  // 添加对应城市的二级分类
  addTypeList:params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Topic.addtype',params)
  },
  // 修改对应城市的二级分类
  updateTypeList:params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Topic.uptype',params)

  },
  // 删除对应城市的二级分类
  delTypeList:params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Topic.deltype',params)
  },
  // 栏目文章
  // 获取栏目信息
  getColumnList:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Module.GetClass',params)
  },
  // 获取导入专题的列表
  getInportzhuantiList:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_Topic.GetzhuantiList',params)
  },//添加导入专题合集
  addInportzhuanti:params=>{
    return post('/phalapi/public/?s=App.Zhuanti_Topic.Edit',params)
  },
  //获取数据中心
  getOtherData:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_OtherData.GetZhuantiFlowSurvey',params)
  },
  //获取数据中心列表
  getFlowDetailList:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_OtherData.GetZhuantiFlowDetailList',params)
  },
  //获取数据中心列表城市数据
  getFlowDetail:params=>{
    return get('/phalapi/public/?s=App.Zhuanti_OtherData.GetZhuantiFlowDetail',params)
  },
  //获取我的专题数据
  getmyzhuanti: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Center.AddList',params)
  },
  //获取我管理的专题数据
  getmanageList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Center.MyList', params)
  },
  //获取我的草稿箱
  getMydraftList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Center.MyList', params)
  },
  //获取我的帮助文档
  getmyhelpList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Center.HelpList', params)
  },
  //获取我的表格列表
  getMyEditableList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Center.TableList', params)
  },
  //获取我的数据
  getMyData: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Center.MyData', params)
  },
  //获取我的填写专题排行榜
  getMyPhb: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Center.AddPhb', params)
  },
  //获取我的专题排行榜
  getPhb: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Center.MyPhb', params)
  },
  //添加主题色
  addColorStyle: params => {
    return post('/phalapi/public/?s=App.Zhuanti_Colour.Add', params)
  },
  //主题色列表
  colorstyleList: params => {
    return get('/phalapi/public/?s=App.Zhuanti_Colour.GetList', params)
  }
}








