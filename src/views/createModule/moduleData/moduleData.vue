<template>
  <div class="module-detail">
    <div class="header">
      <img src="@/assets/images/left.png" alt="" @click="goBack()" />
      <span class="title">返回首页</span>
      <div class="button">
        <el-button @click="openRelation()">管理模块</el-button>
        <el-button @click="addRelation()">新建模块</el-button>
      </div>
    </div>
    <!-- 顶部搜索筛选 -->
    <div class="top-search">
         <div class="right">
        <button class="addData" @click="addColumn()" style="width: 110px">
          <img class="icon" src="@/assets/images/addData.png" alt="" />
          添加数据列
        </button>
        <button class="addData" @click="addData()">
          <img class="icon" src="@/assets/images/addData.png" alt="" />
          添加数据
        </button>
        <button class="importData" @click="openImportDialog()">
          <img class="icon" src="@/assets/images/import.png" alt="" />
          导入数据
        </button>
      </div>
      <!-- 根据模块不同，筛选条件不同 -->
      <div class="left">
        <!-- <span class="title">筛选条件：</span> -->
        <div class="condition">
          <span>城市</span>
          <el-input
            placeholder="请输入内容"
            v-model="keyWords.cityname"
            clearable
            class="search-input"
            @keyup.enter.native="searchData()"
            @clear="searchData()"
          >
          </el-input>
        </div>
        <div class="condition">
          <span>区县</span>
          <el-input
            placeholder="请输入内容"
            v-model="keyWords.county"
            clearable
            class="search-input"
            @keyup.enter.native="searchData()"
            @clear="searchData()"
          >
          </el-input>
        </div>
        <div class="condition" :key="index" v-for="(item, index) in column">
          <span>{{ item }}</span>
          <el-input
            placeholder="请输入内容"
            v-model="keyWords[item]"
            clearable
            class="search-input"
            @keyup.enter.native="searchData()"
            @clear="searchData()"
          >
          </el-input>
        </div>
        <!-- <div class="condition" v-if="ModuleInfo.module_type_id == 8">
                    <span>网点名称</span>
                    <el-input placeholder="请输入内容" v-model="keyWords.title" clearable class="search-input"
                        @keyup.enter.native="searchData()" @clear="searchData()">
                    </el-input>
                </div>
				<div class="condition" v-for="(item,index) in tableHeaderData" v-show="item.type==11" :key="index">
				   <el-select v-model="item.sxvalue" :placeholder="item.name" @change="changesx(item)">
				       <el-option v-for="(aitem, index) in item.select_value.split('^')" :key="index" :label="aitem" :value="aitem">
				       </el-option>
				   </el-select>
				</div> -->
        <!--  只有网店模块才具有筛选类型
                <div class="condition" v-if="ModuleInfo.module_type_id == 8 && ModuleInfo.other_condition.length">
                    <span>筛选类型</span>
                    <el-select v-model="keyWords.conditions" placeholder="请选择筛选条件">
                        <el-option v-for="(item, index) in other_conditions" :key="index" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </div> -->
                
       
      </div>

      <div class="operation">
         <button class="search" @click="searchData()">搜索</button>
        <button class="search" @click="clearsx()" style="width: 64px">
          清空筛选
        </button>
        <span class="tip">
          筛选到数据 <span>{{ total }}</span> 条
        </span>
      </div>
   
    </div>
    <!-- 表格 -->
    <div class="container">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        max-height="500"
        :header-cell-style="{ background: '#FAFAFA', color: '#333' }"
        stripe
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" label="ID">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="城市">
          <template slot-scope="scope">
            {{ scope.row.data['城市'] }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          :label="item"
          v-for="(item, index) in tableHeaderData"
          :key="index"
          v-if="item != '城市'"
        >
          <template slot-scope="scope">
            {{ scope.row.data[`${item}`] }}
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center" width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              class="theme-color edit-button"
              size="small"
              @click="handleEdit(scope.row)"
              >修改</el-button
            >
            <el-button
              type="text"
              class="theme-color delete-button"
              size="small"
              @click="handleDel(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 新增数据列模块 -->
    <el-dialog
      title="新增数据列"
      :visible.sync="columnVisible"
      width="463px"
      @close="closeColumn"
    >
      <div class="add-data">
        <el-form ref="form" :model="columnParams" label-width="80px">
          <el-form-item>
            <span slot="label"> 列名 </span>
            <el-input
              v-model="columnParams.columnName"
              style="width: 423px; display: block"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveColumn()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 新增数据模块 -->
    <el-dialog
      :title="dataTitle"
      :visible.sync="dataVisible"
      width="463px"
      @close="closeDia"
    >
      <div class="add-data">
        <el-form ref="form" :model="addParams" label-width="80px">
          <el-form-item v-for="(item, index) in addParamsList" :key="index">
            <span slot="label">
              <span v-if="item.name == '城市'">
                <span style="color: red">*</span>{{ item.name }}
              </span>
              <span v-else>
                {{ item.name }}
              </span>
            </span>
            <el-input
              v-if="item.name == '城市' || item.name == '区县'"
              :value="addParams[`${item.name}`]"
              @input="(val) => changeInputEvent(val, item)"
              style="width: 423px; display: block"
            ></el-input>
            <el-input
              v-else-if="item.name.includes('排序')"
              type="number"
              min="0"
              :value="addParams[`${item.name}`]"
              @input="(val) => changeInputEvent(val, item)"
              style="width: 423px; display: block"
            ></el-input>
            <el-date-picker
              v-else-if="item.name.includes('发布时间')"
              :value="addParams[`${item.name}`]"
              format="yyyy-MM-dd HH:mm:ss"
              type="datetime"
              @input="(val) => changeInputEvent(val, item)"
              style="width: 423px; display: block"
            >
            </el-date-picker>
            <el-input
              v-else
              :value="addParams[`${item.name}`]"
              type="textarea"
              @input="(val) => changeInputEvent(val, item)"
              style="width: 423px; display: block"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="saveData()">保 存</el-button>
      </span>
    </el-dialog>

    <footer>
      <div class="left flex-center">
        <button class="delData" @click="delData()">
          <img class="icon" src="@/assets/images/del.png" alt="" />
          删除
        </button>
        <button class="addData" @click="addData()">
          <img class="icon" src="@/assets/images/addData.png" alt="" />
          添加数据
        </button>
        <button class="importData" @click="openImportDialog()">
          <img class="icon" src="@/assets/images/import.png" alt="" />
          导入数据
        </button>
        <button class="exportData" @click="exportData()">
          <img class="icon" src="@/assets/images/export.png" alt="" />
          导出数据
        </button>
        <!-- <div @click="setJumpLink()" class="links" v-if="ModuleInfo.jump_type == 3">跳转链接</div>
                <div @click="setName()" class="links" v-if="ModuleInfo.is_show == 1">模块名称</div> -->
      </div>
      <div class="right">
        <el-pagination
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
          :current-page="page"
          :page-sizes="[10, 20, 50]"
          :page-size="page_num"
          layout="sizes, prev, pager, next, jumper"
          prev-text="上一页"
          next-text="下一页"
          :total="total"
        >
        </el-pagination>
      </div>
    </footer>
    <!-- 导入数据弹出框 -->
    <el-dialog
      title="导入数据"
      :visible.sync="importDialogVisible"
      center
      :before-close="handleClose"
      width="60%"
      @close="clearFile()"
    >
      <div class="import-box">
        <div class="title">
          新增数据，请先下载Excel模板，按模板的格式填充数据在上传。<span
            @click="downloadTemplate()"
            >[点击下载Excel模板]</span
          >
        </div>
        <div class="warning">
          注意：如果是新增数据，ID为空或0；如果是修改数据，ID不可以修改。上传后，请先预览数据，确定数据正确再提交导入！
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
          <el-table-column label="id" width="40px">
            <template slot-scope="scope">
              {{ scope.row.ID ? scope.row.ID : 0 }}
            </template>
          </el-table-column>
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
    <RelationDialog ref="relationDialog" />
    <RelationAdd ref="relationAdd" />
  </div>
</template>

<script>
import RelationDialog from '../components/moduleTable/components/relationDialog/index.vue'
import RelationAdd from '../components/moduleTable/components/relationAdd/index.vue'
import axios from 'axios'
import utils from '@/utils'
import * as XLSX from 'xlsx'
export default {
  name: 'moduleData',
  components: {
    RelationDialog,
    RelationAdd,
  },
  data() {
    return {
      keyWords: {
        cityname: '',
        county: '',
        title: '',
      },
      column: [],
      total: 20,
      multipleSelection: [],
      tableHeaderData: [],
      tableData: [],
      dataTitle: '',
      dataVisible: false,

      addParams: {},
      addParamsList: [],
      rowData: {},

      page: 1,
      page_num: 10,

      importDialogVisible: false,
      file: {},
      exportTableData: [],
      // 是否导出全部数据
      exportAll: 1,

      columnVisible: false,
      columnParams: {
        columnName: '',
      },
    }
  },
  async mounted() {
    await this.GetUserLoginInfo()
    await this.getList()
    await this.getColumn()
  },
  methods: {
    // 获取模块列表搜索字段
    async getColumn() {
      let params = {
        id: this.$route.query.id,
      }
      const res = await this.$api.getColumn(params)
      this.column = res
      console.log(res, '表格筛选列表')
    },
    // 获取城市信息
    async GetUserLoginInfo() {
      try {
        const res = await this.$api.reqGetUserLoginInfo()
        let { cityname } = res.city_info
        this.keyWords.cityname = cityname
      } catch (error) {
        this.$message.error(error)
      }
    },
    // 强制更新表单
    changeInputEvent(val, item) {
      if (item.name.includes('发布时间')) {
        this.addParams[`${item.name}`] = utils.formatDate(val)
        this.$forceUpdate()
      } else {
        this.addParams[`${item.name}`] = val
        this.$forceUpdate()
      }
    },
    // 返回
    goBack() {
      this.$router.push({
        name: 'createModule',
        // params: { id: row.id, title: row.name },
      })
    },
    async getList() {
      this.addParamsList = []
      let searchList = JSON.parse(JSON.stringify(this.keyWords))
      delete searchList.cityname
      delete searchList.county
      delete searchList.title

      console.log(searchList, 'searchList')
      let params = {
        id: this.$route.query.id,
        page: this.page,
        page_num: this.page_num,
        city: this.keyWords.cityname,
        county: this.keyWords.county,
        search_list: searchList,
      }
      const res = await this.$api.getModuleTableDetail(params)

      this.tableHeaderData = res.table.column_name.split('^')
      this.tableData = res.table_data
      this.total = res.count
      this.tableHeaderData.forEach((item) => {
        if (item != '城市') {
          let obj = {
            name: item,
          }
          if (item.includes('排序')) {
            this.addParams[`${item}`] = 0
          } else {
            this.addParams[`${item}`] = ''
          }
          this.addParamsList.push(obj)
        } else {
          let obj = {
            name: item,
          }
          this.addParamsList.unshift(obj)
        }
      })
      // console.log(this.addParams, this.addParamsList, 'addparams')

      console.log(res, 'res')
    },

    openRelation() {
      this.$refs.relationDialog.relationVisible = true
      this.$refs.relationDialog.tableHeaderData = this.tableHeaderData
    },
    addRelation() {
      this.$refs.relationAdd.addVisible = true
      this.$refs.relationAdd.tableHeaderData = this.tableHeaderData
    },
    // 筛选
    searchData() {
      this.page = 1
      console.log(this.keyWords, '搜索')
      this.getList()
    },
    // 清除删选
    clearsx() {
      this.page = 1
      // this.keyWords.cityname = ''
      // this.keyWords.county = ''
      for (let key in this.keyWords) {
        this.keyWords[key] = ''
      }
      this.getList()
    },
    // 打开数据导入界面
    openImportDialog() {
      this.importDialogVisible = true
    },
    // 模板下载
    downloadTemplate() {
      window.location.href = `/api/phalapi/public/?s=App.Zhuanti_Module.exportTableTemplate&id=${this.$route.query.id}`
    },
    // 提交
    async importData() {
      // 将上传文件类型转换未FormData类型
      let excelFiles = new FormData()
      excelFiles.append('file', this.file)
      excelFiles.append('id', this.$route.query.id)
      const { ret, data } = await this.$api.importTableData(excelFiles)

      if (ret == 200) {
        this.$message.success('导入成功')
        this.importDialogVisible = false
        this.exportTableData = []
        let uploadinput = document.getElementById('file')
        uploadinput.value = []
        this.getList()
      } else {
        this.exportTableData = []
        let uploadinput = document.getElementById('file')
        uploadinput.value = []
      }
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
          // console.log(xlsxJson)
          // console.log(_this.tableHeaderData.length)
          // console.log(Object.keys(xlsxJson[0].sheet[0]).length)
          // console.log(xlsxJson[0].sheet)
          _this.file = file
          _this.exportTableData = xlsxJson[0].sheet
          // console.log(xlsxJson, 'xlsxJson')
          // if ( Object.keys(xlsxJson[0].sheet[0]).length <= _this.tableHeaderData.length + 1) {
          //     _this.file = file
          //     _this.exportTableData = xlsxJson[0].sheet
          //     console.log(_this.file)
          // } else {
          //     _this.$message.error('该数据与当前模块数据列数不一样，请选择合适的excel数据')
          // }
          // console.log(Object.entries(_this.exportTableData))
          // this.$refs.file.value = ''
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
    // 添加列数据
    addColumn() {
      this.columnVisible = true
    },
    async saveColumn() {
      if (!this.columnParams.columnName) {
        this.$message.error('列名不能为空')
      } else {
        this.$confirm('确定添加该列吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        })
          .then(async () => {
            try {
              let params = {
                table_id: this.$route.query.id,
                column_name: this.columnParams.columnName,
              }
              const { ret, data } = await this.$api.addColumn(params)
              if (ret == 200) {
                this.columnVisible = false
                this.$message.success('添加成功')
                this.getColumn()
                this.getList()
              }
            } catch (error) {}
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消添加',
            })
          })
      }
    },
    // 添加数据
    addData() {
      this.dataTitle = '添加数据'
      this.dataVisible = true
    },
    saveData() {
      if (!this.addParams['城市']) {
        this.$message.error('请填写城市数据')
      } else {
        if (this.dataTitle == '添加数据') {
          this.confirmAdd()
        } else {
          this.confirmEdit()
        }
      }
    },
    // 确认添加
    async confirmAdd() {
      let params = {
        id: this.$route.query.id,
        data: this.addParams,
      }
      const { ret, data } = await this.$api.addTableData(params)
      if (ret == 200) {
        this.$message.success('添加成功')
        this.dataVisible = false
        this.page = 1
        this.getList()
      }
    },
    // 确认修改
    async confirmEdit() {
      let params = {
        table_id: this.$route.query.id,
        id: this.rowData.id,
        data: this.addParams,
      }
      const { ret, data } = await this.$api.updateTableData(params)
      if (ret == 200) {
        this.$message.success('修改成功')
        this.dataVisible = false
        this.getList()
      }
    },
    closeDia() {
      Object.keys(this.addParams).forEach((key) => (this.addParams[key] = ''))
    },
    closeColumn() {
      this.columnParams.columnName = ''
    },
    handleEdit(row) {
      this.dataTitle = '修改数据'
      this.dataVisible = true
      this.rowData = row
      let data = JSON.parse(JSON.stringify(row.data))
      this.addParams = data
      // console.log(row)
    },
    async handleDel(row) {
      this.$confirm('确定删除所选项吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(async () => {
          try {
            let params = {
              id: [row.id],
            }
            const { ret, data } = await this.$api.deleteTableData(params)
            if (ret == 200) {
              this.$message.success('删除成功')

              if ((parseInt(this.total) - 1) % this.page_num == 0) {
                this.page = this.page - 1
                this.getList()
              } else {
                this.getList()
              }
            }
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    /*表格选中状态更改 */
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    // 多项删除
    delData() {
      let idList = []
      this.multipleSelection.forEach((item) => {
        idList.push(item.id)
      })
      if (idList.length) {
        this.$confirm('确定删除所选数据吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        })
          .then(async () => {
            try {
              let params = {
                id: idList,
              }
              const { ret, code } = await this.$api.deleteTableData(params)
              if (ret == 200) {
                this.$message.success('删除成功')
                if (
                  (parseInt(this.total) - idList.length) % this.page_num ==
                  0
                ) {
                  this.page = this.page - 1
                  this.getList()
                } else {
                  this.getList()
                }
              }
            } catch (error) {}
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除',
            })
          })
      } else {
        this.$message.error('未选择删除项')
      }
    },
    // 数据导出
    exportData() {
      let idList = []
      this.multipleSelection.forEach((item) => {
        idList.push(item.id)
      })
      if (idList.length > 0) {
        this.exportAll = 0
      }
      let demo = axios.create({
        baseURL: '/api', //请求的域名（基本地址）
        timeout: 10000, //请求的超时时长，单位毫秒，默认。
        responseType: 'blob',
        headers: {
          'Content-Type': 'multipart/form-data',
        }, //设置请求头
      })
      // 调用axios的post请求
      demo
        .post('/phalapi/public/?s=App.Zhuanti_Module.exportTableData', {
          id: this.$route.query.id,
          is_all: this.exportAll,
          id_list: idList,
          cityname: this.keyWords.cityname,
          county: this.keyWords.county,
        })
        .then((res) => {
          let blob = res.data
          let reader = new FileReader()
          reader.readAsDataURL(blob)
          reader.onload = (e) => {
            let a = document.createElement('a')
            a.download = this.$route.query.name
            a.href = e.target.result
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
          }
        })
    },
    handleCurrentChange(val) {
      this.page = val
      this.getList()
    },
    handleSizeChange(val) {
      this.page_num = val
      this.getList()
    },
    //防止误触关闭
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
          this.file = {}
          this.exportTableData = []
          this.$refs.file.value = ''
        })
        .catch((_) => {})
    },
    clearFile() {
      // this.exportTableData = [];
      // this.file = {}
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/css/mixin.scss";
.module-detail {
  width: 100%;
  height: 100%;
  .header {
    display: flex;
    align-items: center;

    position: relative;
    > img {
      width: 10px;
      height: 17px;
    }

    .title {
      margin-left: 14px;
      color: #333;
      font-size: 16px;
    }
    .button {
      position: absolute;
      height: 32px;
      right: 0px;
      .el-button {
        height: 32px;
        display: inline-flex;
        align-items: center;
        // background-color: #6065ec;
        @include background_color;
        color: white;
        font-size: 14px;
      }
    }
  }
  .top-search {
    // display: flex;
    // align-items: center;
    // justify-content: space-between;
    margin: 24px 0;

    .left {
      background-color: #F2F3F5;
      display: flex;
      white-space: nowrap;
      // align-items: center;
      flex-wrap: wrap;
      padding-top: 30px;
      margin-top: 22px;

      .title {
        color: #666666;
        font-size: 14px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;
      }

      .condition {
        font-size: 14px;
        color: #333;
        margin-right: 17px;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        > span {
          margin-right: 9px;
          width: 80px;
          text-align: right;
        }
      }

      

      .tip {
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        > span {
          // color: #6065ec;
          @include font_color;
          font-size: 16px;
        }
      }
    }
    .operation{
         background-color: #F2F3F5;
      padding-left: 88px;
        padding-bottom: 30px;
      .search {
        height: 32px;
        width: 48px;
        border: none;
        color: #fff;
        border-radius: 2px;
        // background-color: #6065ec;
        @include background_color;
        margin-right: 17px;
        font-size: 12px;
      }
    }
    .right {
      display: flex;
      // justify-content: end;

      .addData {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        // background-color: #6065ec;
        @include background_color;
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
          width: 12px;
          height: 12px;
        }
      }

      .importData {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        // color: #6065ec;
        @include font_color;
        background-color: #fff;
        border: 1px solid #6065ec;
        @include border_color;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
          width: 12px;
          height: 12px;
        }
      }
    }
  }
  .container {
    .edit-button {
      // color: #6065ec;
      @include font_color;
    }

    .delete-button {
      color: #f33f3f;
    }

    .nowrap {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
  footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;

    .left {
      display: flex;

      .delData {
        background-color: #fff;
        margin-right: 6px;
        width: 67px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        border: 1px solid #d9d9d9;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
          width: 12px;
          height: 12px;
        }

        &:hover {
          // background-color: #6065ec;
          // color: #6065ec;
        }
      }

      .addData {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        // background-color: #6065ec;
        @include background_color;
        color: #fff;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
          width: 12px;
          height: 12px;
        }
      }

      .importData,
      .exportData {
        width: 90px;
        height: 32px;
        box-sizing: border-box;
        border-radius: 4px;
        // color: #6065ec;
        @include font_color;
        background-color: #fff;
        border: 1px solid #6065ec;
        @include border_color;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 18px;

        > img {
          margin-right: 6px;
          width: 12px;
          height: 12px;
        }
      }

      .links {
        margin-right: 18px;
        // color: #6065ec;
        @include font_color;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss">
@import "@/assets/css/mixin.scss";
.module-detail {
  .search-input {
    width: 170px;
    height: 32px;
  }

  .el-select__caret {
    line-height: 32px;
  }

  .el-date-editor {
    width: 100%;
  }

  .top-search {
    .el-input__inner {
      height: 32px;
      line-height: 32px;
    }
  }

  .el-table__fixed-right-patch {
    background: #fafafa;
  }

  .el-dialog {
    width: 463px;

    .el-dialog__body {
      padding: 0 20px;
    }

    .el-form-item {
      // margin-bottom: 16px;

      .el-input {
        height: 40px;
        line-height: 40px;
      }
    }
  }

  .edit-box {
    .el-select {
      width: 100%;
    }
  }

  .el-cascader {
    display: block !important;
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
        @include font_color1
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

  .dialog-footer {
    .el-button {
      // background-color: #6065ec;
      @include background_color;
    }
  }

  button {
    // display:flex;
    // align-items: center;
  }

  .el-upload-list {
    display: none;
  }

  .el-upload--text {
    font-size: 12px;
  }
}

.theme-color {
  font-size: 14px;
}
.add-data {
  display: flex;
  flex-wrap: wrap;

  .el-form-item:nth-child(1) {
    margin-top: 0px;
  }
  .el-form-item {
    .el-form-item__label {
      float: none;
      word-break: break-word;
    }
    .el-form-item__error {
      margin-left: -80px;
    }
    .el-input {
      margin-left: -80px;
      margin-top: 10px;
    }
    .el-textarea__inner {
      margin-left: -80px;
      margin-top: 10px;
    }
  }
}

.import-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
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