<template>
  <div class="data-center-table">
    <el-table
      ref="table"
      :data="tableData"
      :default-sort="defaultSort"
      @sort-change="sortChange"
      element-loading-text="Loading"
      stripe
      :header-cell-style="isEditor ? tableHeader2 : tableHeader"
    >
      <el-table-column align="center" label="排序" width="60">
        <template slot-scope="scope">
          <span
            :class="
              (params.page - 1) * params.page_num + scope.$index + 1 == 1
                ? 'first'
                : (params.page - 1) * params.page_num + scope.$index + 1 == 2
                ? 'second'
                : (params.page - 1) * params.page_num + scope.$index + 1 == 3
                ? 'third'
                : ''
            "
          >
            {{ (params.page - 1) * params.page_num + scope.$index + 1 }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="专题名称" width="300" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="专题标识" width="250" show-overflow-tooltip>
        <template slot-scope="scope">
          {{ scope.row.code }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="专题链接"  show-overflow-tooltip>
        <template slot-scope="scope">
          <a class="jumpUrl"
            :href="`${scope.row.url}`"
            target="_blank"
            >{{scope.row.url}}
            </a>
        </template>
      </el-table-column>
      <el-table-column align="center" label="创建人" width="100">
        <template slot-scope="scope">
          {{ scope.row.creater }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="访问次数"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.visit_count }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="访客数"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.visitor_count }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="平均访问时长"
        sortable="avg_visit_time"
        prop="avg_visit_time"
        width="130"
      >
        <template slot-scope="scope">
          {{ scope.row.avg_visit_time }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="浏览量"
        sortable="num"
        prop="num"
        width="100"
      >
        <template slot-scope="scope">
          {{ scope.row.view_count }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="浏览量城市排行" width="150">
        <template slot-scope="scope">
          <span class="more" @click="more(scope.row)">查看</span>
        </template>
      </el-table-column>
    </el-table>
    <data-detail ref="detail" :typeText="typeText"></data-detail>
  </div>
</template>

<script>
import dataDetail from './detail/index.vue'
export default {
  components: {
    dataDetail,
  },
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
      default: [],
    },
    getList: {
      type: Function,
      default: null,
    },
    typeText: {
      type: String,
      default:'ET专题'
    }
  },
  data() {
    return {
      cityCode: '',
      // 表格
      tableHeader: {
        background: '#f6f6f6',
        color: '#333',
      },
      tableHeader2: {
        background: '#f1f1f1',
        color: '#333',
      },
      defaultSort: {
        prop: 'num',
        order: 'descending',
      },
    }
  },
  mounted() {
    this.setCityCode()
  },
  methods: {
    // 获取城市citycode
    async setCityCode() {
      const res = await this.$api.reqGetUserLoginInfo()
      this.usermsg = res.user_info
      if (res.city_info) {
        let { citycode } = res.city_info
        // if (citycode !== 'sz') {
          this.cityCode = citycode

        // }
      }
    },
    more(row) {
      this.$refs.detail.title = row.title
      this.$refs.detail.params.zt_id = row.id
      console.log(row.id)
      this.$refs.detail.date = [
        this.params.start_time.substring(0, 10),
        this.params.end_time.substring(0, 10),
      ]
      this.$refs.detail.visible = true
    },
    sortChange({ column }) {
      // if (column.order) {
      //   if (column.order == 'descending') {
      //     this.params.sort = 0
      //   } else {
      //     this.params.sort = 1
      //   }
      // } else {
      //   this.params.sort = 0
      // }
      if (column.property == 'num') {//按浏览量排序
        if (column.order == 'descending') {
          this.params.sort = 1  //降序
        } else {
          this.params.sort = 2  //升序
        }
        this.params.time = 0
      }else if (column.property == 'avg_visit_time') { //按平均访问时长排序
        if (column.order == 'descending') {
          this.params.time = 1 //降序
        } else {
          this.params.time = 2 //升序
        }
        this.params.sort = 0
      }else {
        this.params.sort = 1
      }
      
      console.log(column,"column");
      this.getList()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';

.data-center-table {
  margin-top: 24px;
  .jumpUrl {
    @include font_color;
  }
  .more {
    @include font_color;
    cursor: pointer;
  }
}
.first {
  color: #f01a1a;
}
.second {
  color: #ff6b00;
}
.third {
  color: #ffb800;
}
</style>