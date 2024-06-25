<template>
  <div>
    <div class="subject-table">
      <el-table
        ref="table"
        v-loading="loading"
        :data="tableData"
        element-loading-text="Loading"
        stripe
        :header-cell-style="tableHeader"
        max-height="500"
      >
        <el-table-column align="center" :label="item" v-for="item,index in tableHeaderData" :key="index">
          <template slot-scope="scope">
            {{ scope.row[item] }}
          </template>
        </el-table-column>
       
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataTable',
  props: {
    tableData: {
      type: Array,
      default: () => [],
    },
    tableHeaderData:{
      type:Array,
      default:()=>{}
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      tableHeader: {
        background: '#f6f6f6',
        color: '#333',
      },
    }
  },
  methods: {
    openRelation() {
      this.$refs.relationDialog.relationVisible = true
    },
    detail(row) {},
    cut(row) {},
  },
}
</script>


<style lang="less" scoped>
.subject-table {
  height: 100%;
  .disabled {
    color: #c0c4cc !important;
  }

  a {
    color: inherit;
  }
  .operation {
    color: #6065ec;
    span {
      cursor: pointer;
    }
    span:nth-child(1) {
      margin-right: 25px;
    }
  }
}
</style>
