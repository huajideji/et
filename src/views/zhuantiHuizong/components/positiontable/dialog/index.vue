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
          <el-input v-model="form.category_two"></el-input>
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
  name: 'PositionDialog',
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
        category_one: '',
        category_two: '',
        orderid: '',
      },
      twoList: [],
      dialogVisible: false,

      rules: {
        cityname: [{ required: true, message: '请输入城市', trigger: 'blur' }],

        category_one: [
          { required: true, message: '请选择一级位置', trigger: 'change' },
        ],
        category_two: [
          { required: true, message: '请选择二级位置', trigger: 'change' },
        ],

        orderid: [{ required: true, message: '请输入序号', trigger: 'blur' }],
      },
    }
  },
  methods: {
    async getTwoList(val) {
      if (val == 6) {
        this.form.category_two = ''
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
      if (this.title == '添加城市二级分类') {
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
    //
    getOneListId(val) {
      this.oneList.forEach((item) => {
        if (val == item.label) {
          this.form.category_one = item.value
        }
      })
    },
    async add() {
      this.getOneListId(this.form.category_one)

      try {
        this.form.category = this.form.category_two
        const res = await this.$api.addTypeList(this.form)
        this.dialogVisible = false
        this.$message.success('添加成功')

        this.getList()
      } catch (error) {
        this.$message.error(e)
      }
    },
    async update() {
      this.getOneListId(this.form.category_one)

      try {
        this.form.category = this.form.category_two

        const res = await this.$api.updateTypeList(this.form)
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
        // this.initTwoList()
      }
    },
  },
}
</script>

<style lang="less">
.huizong-dialog {
  .el-form {
    display: block !important;
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