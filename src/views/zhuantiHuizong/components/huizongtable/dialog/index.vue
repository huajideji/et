<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="600px"
      class="huizong-dialog"
      @close="closeDialog"
    >
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="城市" prop="cityname">
          <el-input v-model="form.cityname"></el-input>
        </el-form-item>
        <el-form-item label="专题名称" prop="name">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="专题标识" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="一级位置" prop="category_one">
          <el-select
            v-model="form.category_one"
            placeholder="请选择一级位置"
            @change="getTwoList"
          >
            <el-option
              v-for="item in oneList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="二级位置"
          prop="category_two"
          v-if="form.category_one != 6 && form.category_one != '热门服务'"
        >
          <el-select v-model="form.category_two" placeholder="请选择二级位置">
            <el-option
              v-for="item in twoList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="专题链接" prop="url">
          <el-input v-model="form.url"></el-input>
        </el-form-item>

        <el-form-item label="icon链接">
          <el-input v-model="form.icon"></el-input>
        </el-form-item>

        <el-form-item label="排序" prop="orderid">
          <el-input v-model="form.orderid"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="saveData">保 存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'HuizongDialog',
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
      title: '',
      form: {
        cityname: '',
        name: '',
        code:'',
        category_one: '',
        category_two: '',
        url: '',
        icon:'',
        orderid: '',
      },
      twoList: [],
      dialogVisible: false,

      rules: {
        cityname: [{ required: true, message: '请输入城市', trigger: 'blur' }],
        name: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入专题标识', trigger: 'blur' }],
        category_one: [
          { required: true, message: '请选择一级位置', trigger: 'change' },
        ],
        category_two: [
          { required: true, message: '请选择二级位置', trigger: 'change' },
        ],
        url: [{ required: true, message: '请输入链接', trigger: 'blur' }],
        orderid: [{ required: true, message: '请输入序号', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async getTwoList(val, flag) {
      console.log(val, 'val')
      if (val != 6) {
        if (!flag) {
          this.twoList = []
          this.form.category_two = ''
        }

        let params = {
          id: val,
        }
        try {
          const res = await this.$api.getTwoList(params)
          if (res.length) {
            res.forEach((item) => {
              let obj = {
                value: item.name,
                label: item.name,
              }
              this.twoList.push(obj)
              this.getOneListName(val)
            })
          } else {
            this.twoList = []
            this.getOneListName(val)
          }
        } catch (error) {
          this.$message.error(error)
        }
      } else {
        this.form.category_two = ''
      }
    },

    //
    getOneListName(id) {
      this.oneList.forEach((item) => {
        if (id == item.value) {
          this.form.category_one = item.label
        }
      })
    },
    // 点击修改时初始化二级列表
    initTwoList() {
      if (this.form.category_one) {
        this.oneList.forEach((item) => {
          if (this.form.category_one == item.label) {
            this.getTwoList(item.value, 'init')
          }
        })
      }
    },
    closeDialog() {
      Object.keys(this.form).forEach((key) => (this.form[key] = ''))
      this.$nextTick(() => {
        this.$refs['form'].clearValidate()
      })
    },
    //
    saveData() {
      if (this.title == '添加专题') {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.add()
          } else {
            return false
          }
        })
      } else {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.update()
          } else {
            return false
          }
        })
      }
    },

    async add() {
      try {
        if (this.form.category_one == 6) {
          this.form.category_one = '热门服务'
        }
        const res = await this.$api.addHuizongList(this.form)
        this.dialogVisible = false
        this.$message.success('添加成功')

        this.getList()
      } catch (error) {
        this.$message.error(error)
      }
    },
    async update() {
      try {
        if (this.form.category_one == 6) {
          this.form.category_one = '热门服务'
        }
        const res = await this.$api.updateHuizongList(this.form)
        this.dialogVisible = false

        this.getList()
      } catch (error) {
        this.$message.error(error)
      }
    },
  },

  watch: {
    dialogVisible(val, oldVal) {
      if (val == true) {
        this.initTwoList()
      }
    },
  },
}
</script>

<style lang="less" scoped>
/deep/.huizong-dialog {
  .el-form {
    .el-form-item {
      display: flex;
      align-items: center;
      .el-form-item__content {
        margin-left: 0px !important;
      }
      .el-form-item__label {
        text-align: left !important;
      }
    }
    .el-input {
      width: 400px !important;
    }
  }
}
</style>