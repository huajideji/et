<template>
  <div class="huizong-table">
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      :header-cell-style="isEditor ? tableHeader2 : tableHeader"
      :default-sort="defaultSort"
      @sort-change="sortChange"
    >
      <el-table-column prop="id" label="ID" > </el-table-column>
      <el-table-column prop="cityname" label="城市" > </el-table-column>
      <el-table-column prop="name" label="专题名称"> </el-table-column>

      <el-table-column label="位置" show-overflow-tooltip >
        <template slot-scope="scope">
          {{ scope.row.category_one }}{{ scope.row.category_two?'-'+scope.row.category_two:'' }}
        </template>
      </el-table-column>
      <el-table-column label="专题链接" width="500" show-overflow-tooltip>
        <template slot-scope="scope">
          <a
            class="jumpUrl"
            :href="`${scope.row.url}`"
            target="_blank"
            >{{ `${scope.row.url}` }}
          </a>
        </template>
      </el-table-column>
      <el-table-column
        prop="add_time"
        sortable="add_time"
        label="放入时间"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        prop="modify_time"
        sortable="modify_time"
        label="上次更新时间"
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column prop="orderid" label="排序" > </el-table-column>
      <el-table-column label="操作" >
        <template slot-scope="scope">
          <div class="operation">
            <span @click="edit(scope.row)">编辑</span>
            <span @click="del(scope.row)">删除</span>
          </div>
        </template>
      </el-table-column>

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
    </el-table>

    <hui-zong-dialog
      ref="huizong"
      :oneList="oneList"
      :getList="getList"
    ></hui-zong-dialog>
  </div>
</template>

<script>
import HuiZongDialog from './dialog/index.vue'
export default {
  name: 'HuizongTable',
  components: { HuiZongDialog },
  props: {
    isEditor: {
      type: Boolean,
      default: false,
    },
    params: {
      type: Object,
      default: {},
    },
    tableData: {
      type: Array,
      default: () => [],
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
      defaultSort: {
        prop: 'add_time',
        order: 'ascending',
      },
      deleteVisible: false,
      rowData: {},
      cityCode: '',
    }
  },
  mounted() {
    this.setCityCode()
  },
  methods: {
    // 获取城市citycode
    async setCityCode() {
      const res = await this.$api.reqGetUserLoginInfo()
      if (res.city_info) {
        let { citycode } = res.city_info
        // if (citycode !== 'sz') {
        this.cityCode = citycode

        // }
      }
    },
    sortChange({ column }) {
      if (column.order) {
        this.params.sortname = column.sortable
        if (column.order == 'descending') {
          this.params.sorttype = '降序'
        } else {
          this.params.sorttype = '升序'
        }
      } else {
        this.params.sortname = 'add_time'
        this.params.sorttype = '升序'
      }
      this.getList()
    },

    edit(row) {
      console.log(row,123123)
      this.$refs.huizong.dialogVisible = true
      this.$refs.huizong.form = JSON.parse(JSON.stringify(row))
      this.$refs.huizong.title = '修改'
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
        const res = await this.$api.delHuizongList(params)
        this.deleteVisible = false
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
.jumpUrl {
  @include font_color;
}
.el-table{
   ::v-deep.el-table__cell{
    padding: 24px 0px !important;
  }
}
</style>