<template>
  <div class="pointToPointstyle">
    <el-form :model="datas" :rules="rules">
      <div class="block">
        <div class="title"><span>*</span>城市选择</div>
        <el-radio v-model="datas.type" :label="1">城市级点对点</el-radio>
        <el-radio v-model="datas.type" :label="2">区县级点对点</el-radio>
        <div class="block2" style="margin-top: 15px">
          <el-form-item label="a城市名称" prop="city_a">
            <el-input
              v-model="datas.city_a"
              placeholder="例:出发地"
            >
            </el-input>
          </el-form-item>
          <el-form-item
            label="b城市名称"
            style="margin-bottom: 0"
            prop="city_b"
          >
            <el-input
              v-model="datas.city_b"
              placeholder="例:目的地"
            >
            </el-input>
          </el-form-item>
        </div>
      </div>
      <div class="block">
        <el-form-item label="备注" style="margin-bottom: 0">
          <el-input
            v-model="datas.remark"
            placeholder="不填写则不备注"
          >
          </el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'pointToPointstyle',
  props: {
    datas: Object,
  },
  data() {
    return {
        rules: {
            city_a: [
                { required: true, message: '请输入a城市名称', trigger: 'blur' },
            ],
            city_b: [
                { required: true, message: '请输入b城市名称', trigger: 'blur' },
            ],
        },
    }
  },
  mounted() {
    if (this.datas.city_a == '' && this.datas.city_b == '') {
      this.datas.city_a = '出发地'
      this.datas.city_b = '目的地'
    }
  },
  methods: {
    // handleCityName(name, val) {
    //   if (name == 'city_a') {
    //     this.$EventBus.$emit('aMsg', { city_a: val })
    //   } else {
    //     this.$EventBus.$emit('aMsg', { city_b: val })
    //   }
    // },
    // handleMark(name, val) {
    //     this.$EventBus.$emit('remark', { remark: val })
    // },
  },
}
</script>

<style lang="less" scoped>
.pointToPointstyle {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 20px 18px;
  box-sizing: border-box;
  .block {
    margin-bottom: 12px;
    padding: 17px 20px 24px;
    border-radius: 4px;
    background-color: #f8f8f8;

    .title {
      font-size: 14px;
      color: #333;
      font-weight: 400;
      line-height: normal;

      span {
        margin-right: 4px;
        color: #f33f3f;
      }
    }

    .notice {
      margin-top: 9px;
      font-size: 12px;
      color: #999;
      text-align: justify;
      line-height: 16px;
    }

    .el-radio {
      display: flex;
      margin-top: 16px;
      margin-right: 0;
      color: #333;
      line-height: 19px;

      span {
        color: #999;
        white-space: break-spaces;
      }
    }
  }
}
</style>
