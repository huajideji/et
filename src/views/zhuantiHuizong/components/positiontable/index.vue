<template>
  <div class="huizong-table">
    <el-table
      :data="tableData2"
      stripe
      style="width: 100%"
      :header-cell-style="isEditor ? tableHeader2 : tableHeader"
    >
      <el-table-column prop="id" label="ID"> </el-table-column>
      <el-table-column prop="cityname" label="城市"> </el-table-column>
      <el-table-column label="位置">
        <template slot-scope="scope">
          {{ scope.row.category_one }}-{{ scope.row.category_two }}
        </template>
      </el-table-column>
      <el-table-column prop="orderid" label="排序"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div class="operation" v-if="scope.row.pid != 0">
            <span @click="edit(scope.row)">编辑</span>
            <span @click="del(scope.row)">删除</span>
          </div>
        </template>
      </el-table-column>
    </el-table>
     <el-dialog
        title="删除"
        :visible.sync="deleteVisible"
        width="385px"
        append-to-body
      >
        <span>
          删除后，该位置下的专题将不会展示在专题合集中，确定删除吗？
        </span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="confirmDel" class="delete">删 除</el-button>
          <el-button type="primary" @click="deleteVisible = false"
            >取 消</el-button
          >
        </span>
      </el-dialog>
    <position-dialog
      ref="position"
      :oneList="oneList"
      :getList="getList"
    ></position-dialog>
  </div>
</template>

<script>
import PositionDialog from './dialog/index.vue'

export default {
  components: { PositionDialog },
  name: 'PositionTable',
  props: {
    isEditor: {
      type: Boolean,
      default: false,
    },
    tableData2: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
    oneList: {
      type: Array,
      default: () => [],
    },
    getList: {
      type: Function,
      default: null,
    },
  },
  data() {
    return {
      tableHeader: {
        background: '#f6f6f6',
        color: '#333',
      },
      tableHeader2: {
        background: '#f1f1f1',
        color: '#333',
      },
      deleteVisible:false
    }
  },
  methods: {
      edit(row) {
      this.$refs.position.dialogVisible = true
      this.$refs.position.form = JSON.parse(JSON.stringify(row))
      this.$refs.position.title = '修改'
    },
    del(row) {
      this.deleteVisible = true
      this.rowData = row
    },

    async confirmDel() {
      let params = {
        id: this.rowData.id,
      }
      try {
        const res = await this.$api.delTypeList(params)
        this.deleteVisible = false;
        this.$message.success('删除成功')
        this.getList()
      } catch (e) {
        this.$message.error(e)
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';

.huizong-table {
  height: 100%;
  overflow: auto;

  .operation {
    span:nth-child(1) {
      cursor: pointer;
      color: #5176ea;
      padding-right: 10px;
      border-right: 1px solid #f2f2f2;
    }
    span:nth-child(2) {
      cursor: pointer;
      color: #ff4b4b;
      padding-left: 10px;
    }
  }
}
.delete {
  @include font_color;
  @include border_color2;
}
.el-table{
   ::v-deep.el-table__cell{
    padding: 24px 0px !important;
  }
}
</style>