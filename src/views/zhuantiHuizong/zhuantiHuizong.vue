<template>
  <div class="huizong">
    <el-row>
      <el-col :span="24" style="height: 100%; overflow: hidden">
        <div class="top-search">
          <el-form
            ref="form"
            :model="form"
            :inline="true"
            @submit.native.prevent
          >
            <el-form-item>
              <span style="margin-right: 20px">城市</span>
              <el-input v-model="form.cityname" @keyup.enter.native="getList()">
              </el-input>
            </el-form-item>
            <el-form-item>
              <span class="form-margin">专题名称</span>
              <el-input
                v-model="form.keyword"
                clearable
                @keyup.enter.native="search()"
                @clear="search()"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <span class="form-margin">位置</span>
              <el-select
                v-model="form.category_one"
                clearable
                @change="getTwoList($event)"
                @clear="categoryOneClear()"
              >
                <el-option
                  v-for="item in oneList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              -
              <el-select
                v-model="form.category_two"
                clearable
                @change="changeCategoryTwo()"
                @clear="search()"
              >
                <el-option
                  v-for="item in twoList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="search-btn">
              <el-button
                type="primary"
                size="small"
                class="button-bg"
                @click="exportData"
              >
              一键导入et专题
              </el-button>
              <el-button
                type="primary"
                icon="el-icon-circle-plus-outline"
                size="small"
                class="button-bg"
                @click="addList"
                >新增</el-button
              >
            </el-form-item>
            <export-dialog
              ref="export"
              :oneList="oneList"
              :getList="getList"
            ></export-dialog>

               <hui-zong-dialog
              ref="huizong"
              :oneList="oneList"
              :getList="getList"
            ></hui-zong-dialog>
          </el-form>
        </div>
        <!-- 下方表格 -->
        <div class="bot-table">
          <HuizongTable
            :oneList="oneList"
            :table-data="tableData"
            :params="form"
            :getList="getList"
          />
        </div>
        <footer>
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page="form.page"
              :page-sizes="[10, 20, 50]"
              :page-size="form.page_num"
              layout="sizes, prev, pager, next, jumper"
              prev-text="上一页"
              next-text="下一页"
              :total="total"
            >
            </el-pagination>
          </div>
        </footer>
      </el-col>
    </el-row>

    <!-- 新手指引导航条 -->
    <div class="guide-nav-box" v-if="guideShow[12]">
      <guideNav></guideNav>
    </div>

    <!-- 新手指引第十二步 (专题合集) -->
    <div
      class="guideMask guideMask11"
      v-if="guideShow[12]"
      :style="{ 'padding-left': 0+'px' }"
      >
          <div class="guide-box" style="margin-top: 270px;margin-left: 20px;">
              <div class="flex-center">
                  <div class="guide-arrow flex-center" style="margin-left: 140px;">
                    <div class="cir1"><span class="cir2"></span></div>
                    <div class="line-x"></div>
                  </div>    
                  <div class="guide-card">
                    <img class="starImg-left" src="@/assets/images/guide-star.png" alt="">
                    <img class="starImg-right" src="@/assets/images/guide-star2.png" alt="">
                    <p>这里就是我们的专题合集管理页<br>您可以在此管理当前城市的专题合集页的专题，<br>您可以将热门专题汇总在专题合集页，方便用户进行专题查询</p>
                  </div>
              </div>
          </div>

            <div class="end-box flex" style="position: absolute;top: 60%;left: 50%;transform: translate(-50%,-50%);">
              <img class="ET-img" src="@/assets/images/ET.png" alt="">
              <div class="right">
                <p>您已经初步了解ET啦~ 开始去<span style="color:#6065EC;">新建专题</span>吧~</p>
                <div class="guide-btns end">
                  <span class="guide-exit" @click="guideExit(12)">谢谢</span>
                  <span class="guide-next" @click="guideNext(12)">新建专题</span>
                </div>
              </div>
            </div>

      </div>


  </div>
</template>

<script>
import HuizongTable from './components/huizongtable/index.vue'
import PositionTable from './components/positiontable/index.vue'
import HuiZongDialog from './components/huizongtable/dialog/index.vue'
import PositionDialog from './components/positiontable/dialog/index.vue'
import exportDialog from './components/exportData/index.vue'
export default {
  name: 'HuizongList',

  components: { HuizongTable, PositionTable, HuiZongDialog, PositionDialog,exportDialog },
  data() {
    return {
      form: {
        cityname: '',
        keyword: '',
        category_one: '',
        category_two: '',
        sortname: 'add_time',
        sorttype: '升序',
        page: 1,
        page_num: 10,
      },
      typeform: {
        cityname: '',
        pid: '',
        category: '',
      },
      oneList: [],
      twoList: [],
      tableData: [],
      total: 0,
      guideShow: [] //新手指引
    }
  },
  async mounted() {
    this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		window.addEventListener("setItem", () => {
			this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		});
    await this.GetUserLoginInfo()
    await this.getOneList()
    await this.getList()
    await this.getTypeList()
  },
  methods: {
    // 获取城市信息
    async GetUserLoginInfo() {
      try {
        const res = await this.$api.reqGetUserLoginInfo()
        let { cityname } = res.city_info
        this.form.cityname = cityname
        this.typeform.cityname = cityname
      } catch (error) {
        this.$message.error(error)
      }
    },

    // 获取大分类数据
    async getOneList() {
      try {
        const res = await this.$api.getOneList()
        res.forEach((item) => {
          let obj = {
            value: item.id,
            label: item.name,
          }
          this.oneList.push(obj)
        })
      } catch (error) {
        this.$message.error(error)
      }
    },
    //  获取二级分类数据
    async getTwoList(val) {
      this.twoList = []
      this.form.category_two = ''

      let params = {
        id: val,
      }
      if (params.id) {
        try {
        const res = await this.$api.getTwoList(params)
        if (res.length) {
          res.forEach((item) => {
            let obj = {
              value: item.name,
              label: item.name,
            }
            this.twoList.push(obj)
          })
        } else {
          this.twoList = []
        }
        this.getOneListName(val)
      } catch (error) {
        this.$message.error(error)
      }
      }
    },

    categoryOneClear(index) {
      this.search()
      setTimeout(() => {
        this.twoList = []
      }, 1000)
    },
    //
    getOneListName(id, index) {
      this.oneList.forEach((item) => {
        if (id == item.value) {
          this.form.category_one = item.label
          this.search()
        }
      })
    },
    //
    changeCategoryTwo(val, index) {
      this.search()
    },
    // 获取专题列表
    async getList() {
      if (this.form.cityname == '') {
        this.$message.error('城市必填')
      } else {
        try {
          const res = await this.$api.getHuizongList(this.form)
          this.updateTimeFormat(res.data)
          this.tableData = res.data
          this.total = res.data_count
        } catch (e) {
          this.$message.error(e)
        }
      }
    },
    search() {
      this.form.page = 1
      this.form.page_num = 10
      this.getList()
    },

    // 修改时间格式
    updateTimeFormat(arr) {
      arr.forEach((item) => {
        let add_time = new Date(item.add_time)
        let year = add_time.getFullYear()
        let month = add_time.getMonth() + 1
        let day = add_time.getDate()
        item.add_time = year + '/' + month + '/' + day

        if (item.modify_time) {
          let modify_time = new Date(item.modify_time)
          let year2 = modify_time.getFullYear()
          let month2 = modify_time.getMonth() + 1
          let day2 = modify_time.getDate()
          item.modify_time = year2 + '/' + month2 + '/' + day2
        } else {
          item.modify_time = ''
        }
      })
    },
    //
    addList() {
      this.$refs.huizong.dialogVisible = true
      this.$refs.huizong.title = '添加专题'
    },
    exportData(){
      this.$refs.export.dialogVisible = true
    },
    //
    addPositionList() {
      this.$refs.position.dialogVisible = true
      this.$refs.position.title = '添加城市二级分类'
    },

    // 

    /* 
  
    /* 
     @handleSizeChange
     @description:分页大小改变
     */
    handleSizeChange(val) {
      console.log(val)
      this.form.page_num = val
      this.getList()
    },
    /* 
     @handleCurrentChange
     @description:当前页码改变
     */
    handleCurrentChange(val) {
      this.form.page = val
      this.getList()
    },
     /* 退出指引 */ 
		guideExit() {
			this.guideShow = [false]
      this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
		},
		/* 新手指引下一步 */ 
		guideNext(index) {
      this.guideShow = [false]
      this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
      this.setSessionItem('templateVisible', true)
      this.$router.push('/subjectList')
		},
  },
}
</script>

<style lang="less" >
.huizong {
  .el-row {
    height: 100%;
  }
  width: 100%;
  height: 100%;
  .top-search {
    flex-wrap: wrap;
    .el-form {
      display: flex;
      flex-wrap: wrap;

      .el-form-item {
        display: flex;
        .form-margin {
          margin: 20px;
        }

        .el-input {
          width: 104px;
        }
      }
      .search-btn {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
  .position-manage {
    height: 100%;
    overflow: auto;
    .el-form {
      display: flex;
      p {
        font-weight: 700;
        font-size: 16px;
      }
      .position-add {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
    .manage-table {
      height: calc(100% - 195px) !important;
    }
  }
  .bot-table {
    height: calc(100% - 134px);
  }

  footer {
    margin-top: 20px;
    display: flex;
    justify-content: end;
  }

  .end-box {
    
    .ET-img {
      width: 202px;
      height: 198px;
      position: relative;
      margin: -31px -122px 0 0;
    }
    .right {
      width: 469px;
      height: 150px;
      padding: 30px 30px 0 130px;
      border-radius: 0 8px 8px 0;
      background: #fff;
      p {
        margin-bottom: 5px;
        font-size: 16px;
      }
      .guide-btns {
        margin-top: 28px;
        span {
          width: 94px;
          height: 32px;
          line-height: 32px;
          border-radius: 4px;
          text-align: center;
          cursor: pointer;
        }
        .guide-exit {
          height: 30px;
          line-height: 30px;
          border: 1px solid #6065EC;
          color: #6065EC;
          background-color: #fff;
        }
        .guide-next {
          margin-left: 20px;
          color: #fff;
          background-color: #6065EC;
        }
      }
    }
  }
}
</style>