<template>
  <div class="module_createstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>
    <div class="desc">
      {{ datas.name }}
    </div>
    <div class="card header">
      <span class="idname">关联模块id</span>
      <el-input v-model="realModuleId"></el-input>
      <!-- <div class="choseBtn">
        <el-button type="primary" @click="openList">选择关联模块</el-button>
      </div> -->
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'module_createstyle',
  props: {
    datas: Object,
  },
  data() {
    return {
      realModuleId: '',
      moduleArr: [],
    }
  },
  created() {
    this.realModuleId =   this.datas.real_module_id ;
  
  },
  methods: {
    openList() {
      
    },
  },
  watch: {
    realModuleId(val) {
      this.datas.real_module_id = val
    },
  },
}
</script>
<style lang="less">
.module_createstyle {
  h2{

    color: #333333;
    font-size: 16px;
    font-weight: 700;
    margin-top: 20px;
  }
  .desc{

    color: #666;
    font-size: 12px;
    margin-top: 5px;
  }
  .card {
    background: #f8f8f8;
    border-radius: 5px;
    padding: 18px 10px;
    margin: 12px 0;
    position: relative;

    // height: 160px;
    .choseBtn {
      margin-top: 10px;
      position: absolute;
      right: 10px;
      .el-button {
        border: 1px solid #6065ec;
        background-color: #f8f8f8;
        color: #6065ec;
      }
    }
    .idname {
      display: block;
      color: #000;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    &.header {
      margin: 25px 0;
    }
  }
}
</style>