<template>
  <div class="moduleAdd">
    <el-dialog :visible.sync="addVisible" width="946px" @close="clearData">
      <div slot="title">
        <span class="moduleAdd-title">{{ dialogTitle }}</span>

        <span class="moduleAdd-delete" @click="addVisible = false">×</span>
      </div>
      <div class="content">
        <div class="step">第一步：选择字段</div>
        <div class="note">
          选择表格中所需字段，生成模块，当原表中数据修改时，模块数据随之变动
        </div>

        <div class="form">
          <!-- <div class="form-title"><span>*</span>模块名称</div>
          <el-input v-model="name" style="width: 250px"></el-input> -->
          <div class="form-title"><span>*</span>筛选包含字段</div>
          <el-checkbox-group v-model="shaixuan">
            <el-checkbox-button
              v-for="item in screenText"
              :label="item.id"
              :key="item.id"
              @change="screenChange"
              >{{ item.name }}</el-checkbox-button
            >
          </el-checkbox-group>
          <div class="form-title">筛选条件</div>
          <div class="screen">
            <div
              class="screen-list"
              :key="index"
              v-for="(item, index) in screenList"
            >
              <div class="screen-list-condition">{{ item.condition }}</div>
              <el-select
                v-model="item.valueList[0].value"
                placeholder="请选择"
                clearable
                style="width: 250px"
                @change="haederChange(item)"
              >
                <el-option
                  v-for="item in optionsHeader"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-select
                v-model="item.valueList[0].value1"
                placeholder="请选择"
                clearable
                style="width: 250px"
                @change="conditionChange($event, item)"
              >
                <el-option
                  v-for="item in optionsCondition"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                v-model="item.valueList[0].value2"
                :placeholder="getPlaceholder(item.valueList[0].value1)"
                clearable
                style="width: 250px"
                :disabled="getDisabled(item.valueList[0].value1, item)"
                @change="resultChange($event, item)"
              >
              </el-input>
              <!-- <el-select
                v-model="item.valueList[0].value2"
                placeholder="请选择"
                clearable
                style="width: 170xp"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> -->
              <div class="screen-list-delete" @click="deleteScreen(item.id)">
                ×
              </div>
            </div>
          </div>
          <el-button @click="addScreen" class="screen-list-add"
            ><img src="@/assets/images/screen-add.png" alt="" /> 筛选条件
          </el-button>
          <div class="form-title">
            调用数据预览
            <el-button @click="getList()" class="screen-list-add"
              ><img src="@/assets/images/refresh.png" alt="" /><span
                style="color: #6065ec"
                >点击刷新</span
              >
            </el-button>
          </div>
          <DataTable
            :loading="loading"
            :table-data="tableData"
            @getList="getList"
            :tableHeaderData="tableHeaderScreenData"
          />
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="openStepTwo"
          >字段选择完成，去选择样式</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { log } from 'console'
import DataTable from './components/dataTable/index.vue'
import axios from 'axios'
export default {
  name: 'relationAdd',
  components: {
    DataTable,
  },
  data() {
    return {
      dialogTitle: '新增模块',
      addVisible: false,
      name: '',
      checked: false,
      shaixuan: [],
      screenText: [],

      optionsHeader: [],
      optionsCondition: [
        {
          value: '=',
          label: '等于',
        },
        {
          value: '!=',
          label: '不等于',
        },
        {
          value: 'in',
          label: '包含',
        },
        {
          value: 'not in',
          label: '不包含',
        },
        {
          value: 'is',
          label: '为空',
        },
        {
          value: 'not is',
          label: '不为空',
        },
      ],
      screenList: [
        {
          id: 1,
          condition: '当',
          valueList: [
            {
              value: '',
              value1: '',
              value2: '',
            },
          ],
        },
      ],
      loading: false,
      tableData: [],

      tableHeaderData: [],
      tableHeaderScreenData: ['城市'],

      module_id: '',
    }
  },
  methods: {
    // 默认提示消息
    getPlaceholder(val) {
      if (val == 'in' || val == 'not in' || val == '') {
        return '请输入'
      } else if (val == '=' || val == '!=') {
        return '筛选条件之间用^隔开'
      } else {
        return '不可输入'
      }
    },
    // 是否是可编辑
    getDisabled(val, item) {
      if (val == 'is' || val == 'not is') {
        item.valueList[0].value2 = ''
        return true
      } else {
        return false
      }
    },
    // 获取筛选字段
    getScreenText() {
      this.screenText = []
      this.tableHeaderData.forEach((item, index) => {
        if (item != '城市') {
          let obj = {
            id: item,
            name: item,
          }
          this.screenText.push(obj)
        }
      })
    },
    // 筛选表头切换
    screenChange(val) {
      this.optionsHeader = []
      this.tableHeaderScreenData = ['城市']
      this.shaixuan.forEach((item) => {
        let headerObj = {
          value: item,
          label: item,
        }
        this.optionsHeader.push(headerObj)
        this.tableHeaderScreenData.push(item)
      })

      // this.getList()
    },
    haederChange(item) {
      // if (
      //   item.valueList[0].value != '' &&
      //   item.valueList[0].value1 != '' &&
      //   item.valueList[0].value2 != ''
      // ) {
      //   this.getList()
      // } else if (
      //   item.valueList[0].value1 == 'is' ||
      //   item.valueList[0].value1 == 'not is'
      // ) {
      //   this.getList()
      // }
    },
    conditionChange(val, item) {
      // if (
      //   item.valueList[0].value != '' &&
      //   item.valueList[0].value1 != '' &&
      //   item.valueList[0].value2 != ''
      // ) {
      //   this.getList()
      // } else if (val == 'is' || val == 'not is') {
      //   this.getList()
      // }
    },
    //
    resultChange(val, item) {
      // if (item.valueList[0].value != '' && item.valueList[0].value1 != '') {
      //   this.getList()
      // }
    },
    // 添加筛选条件
    addScreen() {
      let len = this.screenList.length
      let obj = {
        id: parseInt(len) + 1,
        condition: '且',
        valueList: [
          {
            value: '',
            value1: '',
            value2: '',
          },
        ],
      }
      if (len == 0) {
        obj.condition = '当'
      }
      this.screenList.push(obj)
      this.screenSort()
    },
    screenSort() {
      this.screenList.forEach((item, index) => {
        item.id = index + 1
      })
    },
    // 删除筛选条件
    deleteScreen(id) {
      for (let i = this.screenList.length - 1; i >= 0; i--) {
        if (this.screenList[i].id == id) {
          this.screenList.splice(i, 1)
        }
      }

      this.screenList.forEach((item, index) => {
        if (index == 0) {
          item.condition = '当'
        }
      })
      this.screenSort()
      // this.getList()
    },
    // 获取预览数据
    async getList() {
      let screen = []
      let column = {
        0: '城市',
      }
      this.shaixuan.forEach((item, index) => {
        let num = index + 1
        column[num] = item
      })

      if (this.screenList.length > 0) {
        this.screenList.forEach((item) => {
          let obj = {
            0: item.valueList[0].value,
            1: item.valueList[0].value1,
            2: item.valueList[0].value2,
          }
          screen.push(obj)
        })
      }

      // console.log(screen, '筛选条件2222222')
      let params = {
        id: this.$route.query.id,
        column_name: column,
        screen: screen,
      }
      const res = await this.$api.createTableModuleScreen(params)
      // console.log(res, 'createTableModuleScreen')
      this.tableData = res.table_data
    },
    // 新建模块，打开新建模块第二步
    async openStepTwo() {
      let screen = []
      this.screenList.forEach((item) => {
        let obj = {
          0: item.valueList[0].value,
          1: item.valueList[0].value1,
          2: item.valueList[0].value2,
        }
        screen.push(obj)
      })
      if (this.shaixuan.length == 0) {
        this.$message.error('请选择包含字段')
      } else {
        this.shaixuan.push('城市')
        if (this.dialogTitle == '新增模块') {
          this.confirmAdd(screen)
        } else {
          this.confirmEdit(screen)
        }
      }
    },
    async confirmAdd(screen) {
      let params = {
        id: this.$route.query.id,
        column_name: this.shaixuan,
        screen: screen,
      }
      const res = await this.$api.createTableModule(params)
      console.log(res, 'createTableModule')

      sessionStorage.setItem('screenList', JSON.stringify(this.shaixuan))
      if (sessionStorage.getItem('moduleList')) {
        sessionStorage.removeItem('moduleList')
      }

      this.$router.push({
        name: 'moduleSubmit',
        query: {
          table_id: this.$route.query.id,
          module_id: res,
          moduletype: 0,
        },
      })
    },
    async confirmEdit(screen) {
      console.log(this.shaixuan, '修改')
      let params = {
        id: this.module_id,
        column_name: this.shaixuan,
        screen: screen,
      }

      const { ret, data } = await this.$api.updateTableModule(params)
      if (ret == 200) {
        sessionStorage.setItem('screenList', JSON.stringify(data.column_name))
        if (data.module_type_id != 0) {
          sessionStorage.setItem('moduleList', JSON.stringify(data))
        }
        this.$router.push({
          name: 'moduleSubmit',
          query: {
            table_id: this.$route.query.id,
            module_id: this.module_id,
            moduletype: 0,
          },
        })
      }
    },
    // 清除数据
    clearData() {
      this.name = ''
      this.shaixuan = []
      ;(this.screenList = [
        {
          id: 1,
          condition: '当',
          valueList: [
            {
              value: '',
              value1: '',
              value2: '',
            },
          ],
        },
      ]),
        (this.tableData = [])
    },
  },
  watch: {
    addVisible(val, oldVal) {
      if (val == true) {
        console.log(this.tableHeaderData, 'tableHeaderData')
        this.getScreenText()
        if (this.shaixuan.length) {
          this.getList()
        }
      }
    },
  },
}
</script>
<style lang="scss">
@import '@/assets/css/mixin.scss';
.moduleAdd {
  .el-dialog__header {
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0px;
    .moduleAdd-title {
      font-size: #333333;
      font-size: 22px;
      font-weight: 700;
      padding-left: 20px;
    }
    .moduleAdd-delete {
      position: absolute;
      right: 20px;
      font-size: 30px;
      cursor: pointer;
    }
    .el-icon-close:before {
      content: '';
    }
  }
  .el-dialog__body {
    padding-top: 0px;
    .content {
      .step {
        color: #333333;
        font-size: 16px;
      }
      .note {
        margin-top: 9px;
        padding-left: 13px;
        background-color: rgba(41, 50, 252, 0.05);
        color: #666666;
        height: 34px;
        line-height: 34px;
        font-size: 16px;
      }
      .form {
        .form-title {
          margin-top: 27px;
          margin-bottom: 11px;
          display: flex;
          align-items: center;
          span {
            color: #f33f3f;
            margin-left: 4px;
          }
          color: #333333;
          font-size: 14px;
          .el-button {
            margin-left: 10px;
          }
        }
        .el-checkbox-group {
          // .el-checkbox-button:nth-child(1) {
          //   // margin-left: 0px;
          // }
          .el-checkbox-button {
            margin-right: 14px;
            margin-top: 5px;

            .el-checkbox-button__inner {
              border: none;
              background-color: #f0f0f0;
              color: #999999;
              border-radius: 4px;
            }
            .el-checkbox-button__inner:hover {
              // background-color: #6065ec;
              @include background_color;
              color: #fff;
            }
          }
        }
      }
      .screen {
        // .screen-list:nth-last-child(1){
        // //     margin-top: 0px;
        // // }
        .screen-list {
          display: flex;
          align-items: center;
          margin-bottom: 14px;

          .screen-list-condition {
            width: 70px;
          }
          .el-select {
            margin-right: 20px;
          }
          .screen-list-delete {
            margin-left: 20px;
            color: #999;
            font-size: 30px;
            cursor: pointer;
          }
        }
      }
      .screen-list-add {
        color: #6065ec;
        font-size: 12px;
        display: inline-flex;
        padding: 0px;
        align-items: center;
        justify-content: center;
        height: 32px;
        width: 90px;
        border: 1px solid #6065ec;
        img {
          width: 12px;
          height: 12px;
          object-fit: cover;
        }
      }
    }
  }
}
.el-checkbox-button.is-checked .el-checkbox-button__inner {
  // background-color: #6065ec !important;
  @include background_color;
  color: #fff !important;
}
</style>