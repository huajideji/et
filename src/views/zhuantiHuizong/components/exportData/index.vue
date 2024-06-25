<template>
  <div class="export-data">
    <el-dialog
      title="一键导入专题"
      :visible.sync="dialogVisible"
      width="1000px"
      @close="closeDialog"
    >
      <span class="daoyu"
        >一键导入ET专题，导入位置默认为专题分类，若当前城市无该分类，则默认新增此分类，随后可修改</span
      >
      <div class="top-search">
        <el-form ref="form" :model="form" :inline="true" @submit.native.prevent>
          <el-form-item>
            <span class="form-margin">专题名称</span>
            <el-input
              v-model="form.name"
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
                :value="item"
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
          <el-button type="primary" style="margin-bottom: 10px; margin-left:10px" @click="search()">查询</el-button>
        </el-form>
      </div>
      
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :row-key="getRowKey"
        @selection-change="handleChangeSelection"
        :stripe="true"
        border
      >
        <el-table-column type="selection" width="55 " reserve-selection> </el-table-column>
        <el-table-column label="专题名称" >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column prop="code" label="专题标识" >
        </el-table-column>
        <el-table-column prop="address" label="导入位置" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.category_one+'-'+scope.row.category_two }}</template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <span>已选{{arrSelection.length}}条</span>
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page.sync="form.page"
              :page-sizes="[10, 15, 20]"
              :page-size.sync="form.page_num"
              layout="sizes, prev, pager, next, jumper"
              prev-text="上一页"
              next-text="下一页"
              :total="total"
            >
            </el-pagination>
          </div>
      <span slot="footer" class="dialog-footer tablefooter">
        <div class="dia-body">
        <div class="selectwrap">
          <span>*导入城市:</span>
          <div class="block">
            <el-cascader
              v-model="citylist"
              :options="options"
              :props="props"
              collapse-tags
              clearable
            >
            </el-cascader>
          </div>
        </div>
        <el-button type="primary" @click="add">确认添加</el-button>
      </div>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import areaData from '../../../../utils/areaData'
export default {
  name: 'exportDialog',
  props: {
    oneList: {
      type: Array,
      default: [],
    },
    getList: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      props: {
        multiple: true,
        label: 'text', //匹配响应数据中的name
        value: 'text',
      },
      optionss: [],
      defaultData: [],
      citylist: [],
      dialogVisible: false,
      form: {
        name: '',
        category_one: '',
        category_two: '',
        page: 1,
        page_num: 10,
      },
      tableData: [
      ],
      multipleSelection: [],
      arrSelection:[],
      oneList: [],
      twoList: [],
      total: 0,
    }
  },
  watch: {
    dialogVisible(newVal) {
      this.form = {
        cityname: '',
        keyword: '',
        category_one: '',
        category_two: '',
        page: 1,
        page_num: 10,
      }
      this.citylist = []
      this.arrSelection = []
      let params = this.form
      if (newVal == true) {
        this.getListData(params)
      } else {
        
      }
      console.log(newVal)
    }
  },
  mounted() {
    this.options = {
      code: '0',
      text: '全国',
      children:[],
    }

    this.options.children = JSON.parse(JSON.stringify(areaData))
    console.log(this.options)
    this.citylist = this.options
    let defaultData = []
    this.citylist.children.forEach((item) => {
      item.children.forEach((aitem) => {
        delete aitem.children
      })
    })
  },
  methods: {
    getRowKey(row) {
      return row.code;
    },
    handleSizeChange() {
      this.form.page = 1
      this.getListData(this.form)
    },
    handleCurrentChange() {
      this.getListData(this.form)
    },
    search() {
      this.getListData(this.form)
    },
    async getListData(params) {
      const res = await this.$api.getInportzhuantiList(params)
      this.tableData = res.data
      console.log(res.data)
      this.total = res.data_count
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
      this.form.category_one = val.label
      this.form.category_two = ''

      let params = {
        id: val.value,
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
      } catch (error) {
        this.$message.error(error)
      }
      }
    },

    closeDialog() {},
    add() {
      let pushArr = []
      this.citylist.forEach((item) => {
        if (item[2]) {
        pushArr.push(item[2])
        }
      })
      if (pushArr.length == 362) {
        pushArr = ['全国']
      }
      let params = {
        cityname: pushArr,
        data:this.arrSelection
      }
      console.log(params.cityname)
      if (params.cityname.length==0) {
        this.$message.error('请选择城市')
      } else if (params.data.length==0) {
        this.$message.error('请选择专题')
      } else {
        this.$api.addInportzhuanti(params).then((res) => {
        this.$message.success(res.msg)
        this.dialogVisible = false
      })
      }
    },
    handleChangeSelection(selection) {
      this.arrSelection = selection;
      console.log(this.arrSelection)
    },
    SaveTheSelectionResult() {
      if (this.arrSelection[this.form.page - 1]) {
        this.arrSelection[this.form.page - 1].forEach((value) => {
          this.tableDate.forEach((val, index) => {
            if (value.id === val.id) {
              this.$refs.multipleTable.toggleRowSelection(this.tableDate[index], true);
            }
          });
        });
       
      }
    },
  },
}
</script>

<style lang="less" scoped>

/deep/.el-dialog__header{
  border-bottom: 1px solid #d9d9d9ff;
}
.selectwrap{
  display: flex;
  align-items: center;
}
.dia-body {
  display: flex;
  justify-content: space-between;
  .dia-tips {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    margin: auto;
    background-color: #fff;
    border: 3px solid #000;
    padding: 20px 0px;
    border-radius: 7px;
    text-align: center;
  }
}
 .pagination{
  >span{
    color: #999999ff;
 font-size: 12px;
 font-weight: 400;
 font-family: "PingFang SC";
 text-align: left;
  }
  margin-top: 20px;
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: space-between;
 }
.export-data {
  /deep/.el-pager li{
    color:#d8d8d8;
  }
  .daoyu{
    display: block;
    margin: 10px 10px 20px 10px;
    font-size: 14px;
 font-weight: 400;
 font-family: "PingFang SC";
 text-align: left;
  }
  /deep/.el-dialog__body{
  padding: 20px !important;
}
     .top-search {
      margin-top:10px;
  display: flex;
    flex-wrap: wrap;
    .el-form {
      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .el-form-item {
        display: flex;
        margin-bottom: 10px !important;
        .form-margin {
          margin: 20px;
        }
        .el-input {
      width: 104px !important;
    }
      }
      .search-btn {
        flex: 1;
        display: flex;
        justify-content: flex-end;
      }
    }
  }
}

</style>