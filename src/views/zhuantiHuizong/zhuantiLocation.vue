<template>
  <div class="huizong">
    <el-row>
      <el-col
        :span="24"
        style="height: 100%; overflow: hidden; padding-left: 20px"
      >
        <div class="position-manage">
          <el-form>
            <el-form-item>
              <p>专题位置管理</p>
            </el-form-item>
            <el-form-item class="position-add">
              <el-button
                type="primary"
                size="small"
                class="button-bg"
                @click="addPositionList"
                >新增</el-button
              >
            </el-form-item>
            <position-dialog
              ref="position"
              :oneList="oneList"
              :getList="getTypeList"
            ></position-dialog>
          </el-form>
          <div class="top-search">
            <el-form
              ref="typeform"
              :model="typeform"
              :inline="true"
              @submit.native.prevent
            >
              <el-form-item>
                <span style="margin-right: 10px">城市</span>
                <el-input
                  v-model="typeform.cityname"
                  clearable
                  @keyup.enter.native="searchTypeList()"
                  @clear="searchTypeList()"
                >
                </el-input>
              </el-form-item>
              <el-form-item>
                <span style="margin: 20px 10px 20px 0px">位置</span>
                <el-select
                  v-model="typeform.pid"
                  clearable
                  @change="getTwoList"
                  @clear="categoryOneClear"
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
                  v-model="typeform.category"
                  clearable
                  @change="changeCategoryTwo"
                  @clear="getTypeList()"
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
            </el-form>
          </div>
          <!-- 下方表格 -->
          <div class="manage-table">
            <PositionTable
              :oneList="oneList"
              :table-data2="tableData"
              :getList="getTypeList"
            />
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
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import HuizongTable from './components/huizongtable/index.vue'
import PositionTable from './components/positiontable/index.vue'
import HuiZongDialog from './components/huizongtable/dialog/index.vue'
import PositionDialog from './components/positiontable/dialog/index.vue'
export default {
  name: 'HuizongList',

  components: { HuizongTable, PositionTable, HuiZongDialog, PositionDialog },
  data() {
    return {
      typeform: {
        cityname: '',
        pid: '',
        category: '',
      },
      oneList: [],
      twoList: [],
      tableData: [],
      total: 0,
      page: 1,
      pageSize: 10,
    }
  },
  async mounted() {
    await this.GetUserLoginInfo()
    await this.getOneList()
    await this.getTypeList()
  },
  methods: {
    // 获取城市信息
    async GetUserLoginInfo() {
      try {
        const res = await this.$api.reqGetUserLoginInfo()
        let { cityname } = res.city_info
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
    async getTwoList(val, index) {
      this.twoList = []
      this.typeform.category = ''
      let params = {
        id: val,
      }
      if (params.id != 0) {
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

          this.getOneListName(val, '2')
        } else {
          this.twoList = []
          this.getOneListName(val, '2')
        }
      } catch (error) {
        this.$message.error(error)
      }
      }
      
    },

    categoryOneClear(index) {
      this.searchTypeList()
      setTimeout(() => {
        this.twoList = []
      }, 1000)
    },
    //
    getOneListName(id, index) {
      this.oneList.forEach((item) => {
        if (id == item.value) {
          this.typeform.pid = item.value
          this.searchTypeList()
        }
      })
    },
    //
    changeCategoryTwo(val, index) {
      this.searchTypeList()
    },


    // 获取对应城市的分类数据
    async getTypeList(
      params = {
        page: this.page,
        page_num: this.pageSize,
        cityname: this.typeform.cityname,
        pid: this.typeform.pid,
        category: this.typeform.category,
      }
    ) {
      try {
        const res = await this.$api.getTypeList(params)
        this.tableData = res.data

        this.total = res.data_count
      } catch (e) {
        this.$message.error(e)
      }
    },
    searchTypeList() {
      this.page = 1
      this.pageSize = 10
      this.getTypeList()
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
    //
    addPositionList() {
      this.$refs.position.dialogVisible = true
      this.$refs.position.title = '添加城市二级分类'
    },
    /* 
    

    /* 
     @handleSizeChange
     @description:分页大小改变
     */
    handleSizeChange(val) {
      this.pageSize = val
      this.getTypeList()
    },
    /* 
     @handleCurrentChange
     @description:当前页码改变
     */
    handleCurrentChange(val) {
      this.page = val
      this.getTypeList()
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
}
</style>