<template>
  <div class="subject-list">
    <el-row :gutter="20">
      <!-- 左侧表格 -->
      <el-col :span="17" style="height: 100%; overflow: hidden">
        <!-- 上方搜索 -->
        <div class="top-search">
          <el-form
            ref="form"
            :model="form"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item>
              <el-input
                v-model="form.name"
                placeholder="搜索专题名称/专题标识/创建人"
                clearable
                style="width: 500px"
                @clear="search"
                @keyup.enter.native="search"
              >
                <el-button
                  slot="suffix"
                  type="text"
                  style="color: #a9a9a9"
                  icon="el-icon-search"
                  @click="search"
                >
                </el-button>
              </el-input>
            </el-form-item>
            <el-form-item>
              <div class="extra">
                当前收录专题
                <span class="font-color">
                  {{ total }}
                </span>
                个
              </div>
            </el-form-item>
            <el-form-item style="float: right" class="newmodule">
              <div :class="[guideShow[1] ? 'guideHigh' : '']">
                <div ref="createTopic">
                  <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="small"
                    class="button-bg"
                    @click="showTemplate"
                    >新建专题</el-button
                  >
                </div>
              </div>
              <!-- <div :class="[guideShow6 ? ['guideHigh', 'guideHigh6'] : '']">
                <div
                  v-for="(item, index) in moduleList"
                  :key="index"
                  :class="[`module-button${index}`, guideShow6 ? 'guide-add' : '']"
                >
                  <el-button
                    icon="el-icon-circle-plus-outline"
                    size="small"
                    @click="addTopic(index + 1)"
                    :class="[guideShow6 ? 'btn-active' : '', '']"
                    >{{ item.name }}</el-button
                  >
                </div>
              </div> -->
            </el-form-item>
          </el-form>
        </div>
        <!-- 下方表格 -->
        <div class="bot-table">
          <SubjectTable
            :loading="loading"
            :table-data="tableData"
            @getList="getList"
          />
          <!-- <div class="pagination">
            <el-pagination :current-page="page" :page-sizes="[5, 10, 20]" :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div> -->
        </div>
        <footer>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page="page"
              :page-sizes="[10, 20, 50]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next, jumper"
              prev-text="上一页"
              next-text="下一页"
              :total="total"
            >
            </el-pagination>
          </div>
        </footer>
      </el-col>
      <!-- 右侧动态 -->
      <el-col :span="7" style="height: 100%; overflow: hidden">
        <RecentTopic :topic-data="topicData" :hot-data="hotData" />
        <NewNews :news-data="newsData" />
      </el-col>
    </el-row>

   

    <!-- <div :class="[guideShow[2] ? 'guideHigh' : '']"> -->
      <!-- 模板库 -->
      <templateLibrary v-if="templateVisible" :template-visible="templateVisible" @hideDialog="hideDialog"/>
    <!-- </div> -->
  </div>
</template>

<script>
import SubjectTable from './components/subjectTable/index.vue'
import RecentTopic from './components/recentTopic/index.vue'
import NewNews from './components/newNews/index.vue'
import templateLibrary from './components/templateLibrary/index.vue'
import guideNav from '../../components/commonComponents/guideNav/index.vue'
import { mapState, mapMutations } from 'vuex'
import { json } from 'body-parser'
export default {
  name: 'SubjectList',
  components: {
    SubjectTable,
    RecentTopic,
    NewNews,
    templateLibrary,
    guideNav
  },
  data() {
    return {
      buttonheight: 0,
      moduleList: [
        {
          name: '点对点模板',
        },
        {
          name: '通办模板',
        },
      ], //模板列表
      guideShow: [], //新手指引
      guideRight: '',
      guideRight8: '',
      width: document.body.clientWidth,
      form: {
        name: '',
      },
      //表格数据
      tableData: [
        // {
        //   id: 1,
        //   name: '隔离政策',
        //   mark: 'gelizhengce',
        //   city_num: 100,
        //   sub_num: 10,
        //   create_user: '阿柴',
        //   is_me: 1,
        // },
      ],
      //其他数据
      topicData: [
        // {
        //   name: '病例数据',
        //   link: 'www.baidu.com',
        // },
      ],
      hotData: [],
      newsData: [
        // {
        //   content: '活动按期开始',
        //   timestamp: '2018-04-15',
        // },
        // {
        //   content: '通过审核',
        //   timestamp: '2018-04-13',
        // },
        // {
        //   content: '创建成功',
        //   timestamp: '2018-04-11',
        // },
      ],
      //分页
      page: 1,
      pageSize: 10,
      total: null,
      loading: false,
      templateVisible: false,//模板库的显示
    }
  },
  async mounted() {
    console.log(this.module_code)
    if (sessionStorage.getItem('pageSize')) {
      this.pageSize = Number(sessionStorage.getItem('pageSize'))
    }
    if (sessionStorage.getItem('page')) {
      this.page = Number(sessionStorage.getItem('page'))
    }
    if (sessionStorage.getItem('templateVisible') != null) {
      this.templateVisible = JSON.parse(sessionStorage.getItem('templateVisible'))
    }
    this.getList()
    this.getLatelyList() // 最近填写专题数据更换
    this.getHotList()
    this.getLogList()
    console.log(this.$route.params.name)

    if (!sessionStorage.getItem('guideRight')) {
      this.setSessionItem(
        'guideRight',
        parseInt(this.$refs.createTopic.getBoundingClientRect().right)
      )
    }
    console.log(this.$refs.createTopic.getBoundingClientRect())
    this.guideRight = sessionStorage.getItem('guideRight')
  },
  beforeDestroy() {
    // 移除对 sessionStorage 的监听
    window.removeEventListener('setItem', () => {})
  },
  computed: {
    ...mapState(['module_code', 'module_type']),
    getheight: function () {
      return this.buttonheight + 'px'
    },
  },
  methods: {
    /* 
     @getList
     @description:获取数据
     */
    async getList(
      params = {
        keyword: this.form.name,
        page: this.page,
        page_num: this.pageSize,
      }
    ) {
      // this.loading = true
      try {
        const res = await this.$api.reqGetList(params)
        this.tableData = res.data
        this.total = res.data_count
      } catch (e) {
        this.$message.error(e)
      }
    },
    /* 
     @getLatelyList
     @description:获取最近填写专题列表
     */
    async getLatelyList(
      params = {
        show_num: 7,
      }
    ) {
      try {
        const res = await this.$api.reqGetLatelyList(params)
        this.topicData = res
      } catch (e) {}
    },
     /* 
     @getHotList
     @description:获取最近热门专题列表
     */
    async getHotList() {
    // params = {
    //   show_num: 10,
    // }
      try {
        const res = await this.$api.reqGetHotList()
        this.hotData = res
      } catch (e) {}
    },  
    /* 
     @getLogList
     @description:获取最新动态列表
     */
    async getLogList(
      params = {
        show_num: 10,
      }
    ) {
      try {
        const res = await this.$api.reqGetLogList(params)
        this.newsData = res
      } catch (e) {}
    },
    /* 
     @search
     @description:搜索
     */
    search() {
      this.page = 1
      this.pageSize = 10
      this.getList()
    },
    /* 
     @addTopic
     @description:点击新建专题
     */
    addTopic(i) {
      this.$router.push({
        name: 'editor',
        query: {
          type: i,
        },
      })
    },
    /* 
     @showTemplate
     @description:展示模板库
     */
    showTemplate() {
      this.templateVisible = true
      this.setSessionItem('templateVisible', true)
    },
    hideDialog(){
      this.templateVisible = false
      this.setSessionItem('templateVisible', false)
    },
    /* 
     @handleSizeChange
     @description:分页大小改变
     */
    handleSizeChange(val) {
       if (sessionStorage.getItem('page')) {
        this.page = Number(sessionStorage.getItem('page'))
      }else {
        this.page = 1
      }
      this.pageSize = val
      sessionStorage.setItem('pageSize',val)
      this.getList()
    },
    /* 
     @handleCurrentChange
     @description:当前页码改变
     */
    handleCurrentChange(val) {
      this.page = val
      sessionStorage.setItem('page',val)
      this.getList()
    },
  },
}
</script>

<style lang="less" scoped>
.newmodule:hover .module-button0 {
  height: 100px;
}
.newmodule:hover .module-button1 {
  height: 100px;
}
.module-button0 {
  position: absolute;
  height: 0px;
  overflow: hidden;
  transition: 0.5s;
  z-index: 999;
}
.module-button1 {
  position: absolute;
  height: 0px;
  top: 80px;
  overflow: hidden;
  transition: 0.5s;
  z-index: 999;
}
.guide-add {
  height: 40px;
}
.subject-list {
  width: 100%;

  .top-search {
    width: 100%;

    .extra {
      font-size: 14px;
      color: #999;
    }
  }
  .bot-table {
    height: calc(100% - 134px);
  }

  .subject-table {
    // max-height: 600px;
    overflow-x: auto;
  }

  footer {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }

  .guideMask {
    justify-content: flex-end;
  }

  .guide-box {
    .guide-line {
      width: auto;
      height: 160px;
    }
  }

  .guide-nav-box {
    position: absolute;
    top: 10%;
    right: 6%;
    z-index: 3000;
  }

  .welcome-box {
    
    .ET-img {
      width: 291px;
      height: 285px;
      position: relative;
      margin: -25px -177px 0 0;
    }
    .right {
      width: 568px;
      height: 233px;
      padding: 40px 30px 0 197px;
      border-radius: 0 8px 8px 0;
      background: #fff;
      p {
        margin-bottom: 5px;
        font-size: 16px;
      }
      .btns {
        margin-top: 32px;
        text-align: right;
        /deep/.el-button--small {
          width: 93px;
          height: 32px;
          border: 1px solid #6065EC;
          color: #6065EC;
        }
        /deep/.el-button--primary {
          color: #fff;
          background-color: #6065EC;
        }
        /deep/.el-button+.el-button {
          margin-left: 20px;
        }
        
      }
    }
  }
}
</style>
<style lang="less">
.subject-list {
  .el-row {
    height: 100%;
  }
  .el-pagination {
    .btn-prev,
    .btn-next {
      border: 1px solid #d8d8d8;
      color: #999;
      border-radius: 2px;

      > span {
        font-weight: 400;
      }

      &:hover {
        border-color: #2932fc;
        color: #2932fc;
      }
    }

    .el-pagination__sizes .el-input .el-input__inner:hover {
      border-color: #2932fc;
    }

    .el-pager li {
      border: 1px solid #d8d8d8;
      color: #d8d8d8;
      border-radius: 2px;
      margin: 0 5px;

      &:hover {
        border-color: #2932fc;
        color: #2932fc;
      }

      &:first-child {
        margin-left: 10px;
      }

      &:last-child {
        margin-right: 10px;
      }

      &.active {
        background-color: #2932fc;
        color: #fff;
      }
    }
  }
}
</style>
