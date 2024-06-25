<template>
    <div class="create">
      <el-row>
        <el-col :span="17">
          <div class="top-search">
            <el-form
              ref="form"
              :model="form"
              :inline="true"
              @keyup.enter.native="search"
            >
              <el-form-item>
                <el-input
                  v-model="form.keyword"
                  placeholder="搜索表格名称/关联专题"
                  clearable
                  style="width: 500px"
                  @clear="search"
                >
                  <el-button
                    slot="suffix"
                    type="text"
                    class="font-color"
                    icon="el-icon-search"
                    @click="search"
                  >
                  </el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <div class="extra">
                  当前收录表格
                  <span class="font-color">
                    {{ editableData.data_count }}
                  </span>
                  个
                </div>
              </el-form-item>
  
              <el-form-item style="float: right">
                <div>
                  <!-- <el-upload
                    class="avatar-uploader"
                    action="https://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :before-upload="beforeAvatarUpload"
                  > -->
                  <el-button
                    type="primary"
                    icon="el-icon-circle-plus-outline"
                    size="small"
                    class="theme-bg"
                    @click="openImportDialog()"
                    >导入表格</el-button
                  >
                  <!-- </el-upload> -->
                </div>
              </el-form-item>
            </el-form>
          </div>
  
          <!-- 下方表格 -->
          <div class="bot-table">
            <ModuleTable
              :loading="loading"
              :table-data="editableData.data"
              @getList="getList"
              @getNews="getNews"
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
                :total="editableData.data_count"
              >
              </el-pagination>
            </div>
          </footer>
        </el-col>
        <el-col :span="7">
        </el-col>
      </el-row>
  
      <!-- 导入数据弹出框 -->
      <el-dialog
        title="导入数据"
        :visible.sync="importDialogVisible"
        center
        :before-close="handleClose"
        width="60%"
      >
        <div class="import-box">
          <div class="warning">
            注意：上传后，请先预览数据，确定数据正确再提交导入！
          </div>
          <!-- <div>
            <img
              src="@/assets/images/import-notice.jpg"
              alt=""
              style="width: 100%"
            />
          </div> -->
          <div class="upload">
            <span class="chosen">选择Excel文件：</span>
            <input
              type="file"
              name="file"
              @change="getExcel"
              ref="file"
              id="file"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            />
            <span class="tip">
              请把模板文件另存为Excel文件(*.xlsx) 后再上传
            </span>
            <a href="/static/images/demo.png" target="_blank" class="sample"
              >查看示例</a
            >
          </div>
          <div class="submit-box">
            <el-button class="submit" @click="importData()">提交</el-button>
          </div>
          <el-table
            tooltip-effect="dark"
            style="width: 100%"
            :data="exportTableData"
            :header-cell-style="{ background: '#FAFAFA', color: '#333' }"
            stripe
          >
            <!-- <el-table-column label="id" width="40px">
              <template slot-scope="scope">
                {{ scope.row.ID ? scope.row.ID : 0 }}
              </template>
            </el-table-column> -->
            <el-table-column
              :label="item"
              align="center"
              :prop="item"
              v-for="(item, index) of tableHeaderData"
              :key="index"
              :width="labelWidth(item)"
            >
            </el-table-column>
          </el-table>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import ModuleTable from '@/views/createModule/components/moduleTable/index.vue'
  import * as XLSX from 'xlsx'
  export default {
    name: 'createModule',
    components: {
      ModuleTable,
    },
      props: {
            editableData: Object,
            default:{}  
    },
    data() {
      return {
        form: {
          keyword: '',
        },
        total: 0,
        page: 1,
        pageSize: 10,
        loading: false,
        tableData: [],
  
        //其他数据
        topicData: [],
        newsData: [],
  
        tableHeaderData: [],
        importDialogVisible: false,
        exportTableData: [],
        file: {},
      }
    },
    mounted() {
      this.getList()
      this.getNews()
    },
    methods: {
      async getList() {
        let params = {
          page: this.page,
          page_num: this.pageSize,
          keyword: this.form.keyword,
          name:JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
        }
        const res = await this.$api.getMyEditableList(params)
  
        this.editableData = res
      },
      openImportDialog() {
        this.importDialogVisible = true
      },
      // 设置表格宽度
      labelWidth(item) {
        let width = 0
        if (item.length < 10) {
          width = ''
        } else {
          width = item.length * 20
        }
        return width
      },
      // 选取文件
      getExcel() {
        const _this = this
        let file = this.$refs.file.files[0]
        _this.readExcel(file).then((tabJson) => {
          if (tabJson && tabJson.length > 0) {
            //成功解析出数据
            let xlsxJson = tabJson
            console.log(xlsxJson,'xlsxJson');
  
            _this.file = file
            _this.tableHeaderData = Object.keys(xlsxJson[0].sheet[0])
            console.log(Object.keys(xlsxJson[0].sheet[0]),'sssss');
            _this.exportTableData = xlsxJson[0].sheet
            console.log( _this.exportTableData ,'sssss');
          }
        })
      },
      // 解析Excel内容
      readExcel(file) {
        // 解析Excel
        return new Promise(function (resolve, reject) {
          const reader = new FileReader()
          reader.onload = function (e) {
            const data = e.target.result
            this.wb = XLSX.read(data, {
              type: 'binary',
            })
            const result = []
            this.wb.SheetNames.forEach((sheetName) => {
              // console.log(sheetName)
              result.push({
                sheetName: sheetName,
                sheet: XLSX.utils.sheet_to_json(this.wb.Sheets[sheetName]),
              })
            })
            resolve(result)
          }
          // reader.readAsBinaryString(file.raw);
          reader.readAsBinaryString(file) // 传统input方法
        })
      },
      async importData() {
        // 将上传文件类型转换未FormData类型
        let excelFiles = new FormData()
  
        excelFiles.append('file', this.file)
  
        const { ret, data } = await this.$api.addModuleTable(excelFiles)
  
        if (ret == 200) {
          this.$message.success('导入成功')
          this.importDialogVisible = false
         this.clearFile()
          this.getList()
          this.getNews()
        } else {
          this.clearFile()
      
        }
      },
      //防止误触关闭
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then((_) => {
            done()
            this.file = {}
            this.clearFile()
          })
          .catch((_) => {})
      },
      clearFile() {
        this.exportTableData = []
        let uploadinput = document.getElementById('file')
        uploadinput.value = []
        this.tableHeaderData = []
      },
      // 获取日志
      async getNews() {
        let params = {}
        const { ret, data } = await this.$api.tableLogList(params)
        if (ret == 200) {
          this.newsData = data.log
          this.topicData = data.new_log
        }
      },
      search() {
        this.page = 1
        this.pageSize = 10
        this.getList()
      },
      exportTable() {},
      async beforeAvatarUpload(file) {
        // 将上传文件类型转换未FormData类型
        let excelFiles = new FormData()
  
        excelFiles.append('file', file)
  
        const { ret, data } = await this.$api.addModuleTable(excelFiles)
  
        if (ret == 200) {
          this.$message.success('导入成功')
          this.getList()
          this.getNews()
        }
      },
      handleCurrentChange(val) {
        this.page = val
        this.getList()
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.getList()
      },
    },
  }
  </script>
  
  <style lang="scss" scoped>
  @import "@/assets/css/mixin.scss";
  .search-button{
    background-color:#6065ec;
    border-color: #6065ec !important;
}
  .create {
    width: 100%;
    height: 100%;
    position: relative;
    padding: 0 20px;
    .el-row {
      height: 100%;
  
      .el-col {
        height: 100%;
      }
    }
    .top-search {
      width: 100%;
  
      .extra {
        font-size: 14px;
        color: #999;
      }
    }
    .bot-table {
      height: calc(100% - 134px) !important;
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
  }
  .import-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    // padding-top: 20px;
    padding-bottom: 20px;
    color: #135294;
  
    .title {
      font-weight: 700;
      margin-bottom: 4px;
  
      span {
        color: red;
        cursor: pointer;
        margin-left: 4px;
      }
    }
  
    .warning {
      font-weight: 700;
      margin-bottom: 4px;
      text-align: center;
    }
  
    .upload {
      .chosen {
        color: #666666;
        margin-right: 8px;
      }
  
      > input {
        position: relative;
        display: inline-block;
        border-radius: 4px;
        padding: 4px 12px;
        overflow: hidden;
        text-decoration: none;
        text-indent: 0;
        line-height: 20px;
        border: 1px solid #e5e5ea;
      }
  
      .tip {
        color: rgb(255, 0, 0);
        margin-left: 6px;
      }
  
      > a {
        // color: #6065ec;
        @include font_color;
        text-decoration: underline;
      }
    }
  
    .submit-box {
      margin-top: 12px;
      margin-bottom: 12px;
  
      .submit {
        width: 200px;
        height: 50px;
        font-size: 24px;
      }
    }
  }
  </style>
  <style lang="scss">
  @import "@/assets/css/mixin.scss";
  .create {
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
          // border-color: #2932fc;
          @include border_color1;
          // color: #2932fc;
          @include font_color1
        }
      }
  
      .el-pagination__sizes .el-input .el-input__inner:hover {
        // border-color: #2932fc;
        @include border_color1;
      }
  
      .el-pager li {
        border: 1px solid #d8d8d8;
        color: #d8d8d8;
        border-radius: 2px;
        margin: 0 5px;
  
        &:hover {
          // border-color: #2932fc;
          @include border_color1;
          // color: #2932fc;
          @include font_color1;
        }
  
        &:first-child {
          margin-left: 10px;
        }
  
        &:last-child {
          margin-right: 10px;
        }
  
        &.active {
          // background-color: #2932fc;
          @include background_color1;
          color: #fff;
        }
      }
    }
  }
  </style>