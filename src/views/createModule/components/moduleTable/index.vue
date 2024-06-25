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
      >
        <el-table-column align="center" label="id">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="表格名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="关联专题">
          <template slot-scope="scope">
            <span
              :key="index"
              v-for="(item, index) in scope.row.zhuanti"
              class="font-color"
            >
              <span v-if="scope.row.zhuanti.length">
                <span v-if="index < scope.row.zhuanti.length - 1">
                  {{ item.name + '、' }}
                </span>
                <span v-else>{{ item.name }}</span>
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="覆盖城市数">
          <template slot-scope="scope">
            {{ scope.row.city_num }}
          </template>
        </el-table-column>
        <el-table-column align="left" label="操作">
          <template slot-scope="scope">
            <div class="operation">
              <span @click="detail(scope.row)">详情</span>
              <span :class="scope.row.zhuanti ? ['disabled'] : ''">
                <span
                  @click="cut(scope.row)"
                  :class="scope.row.zhuanti ? ['has'] : ''"
                  >删除</span
                >
              </span>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import RelationDialog from './components/relationDialog/index.vue'
import axios from 'axios'
export default {
  name: 'moduleTable',
  components: {
    RelationDialog,
  },
  props: {
    tableData: {
      type: Array,
      default: () => [],
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
    detail(row) {
      this.$router.push({
        name: 'moduleData',
        query: { id: row.id, name: row.name },
      })
    },
    async cut(row) {
      this.$confirm('确定删除该表格吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(async () => {
          try {
            let params = {
              id: row.id,
            }
            const { ret, data } = await this.$api.deleteTable(params)
            if (ret == 200) {
              this.$message.success('删除成功')
              this.$emit('getList')
              this.$emit('getNews')
            }
          } catch (error) {}
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
  },
}
</script>


<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.subject-table {
  height: 100%;
  .disabled {
    color: #c0c4cc !important;
  }

  a {
    color: inherit;
  }
  .operation {
    // color: #6065ec;
    @include font_color;
    span {
      cursor: pointer;
    }
    span:nth-child(1) {
      margin-right: 25px;
    }
  }
}
.disabled {
  cursor: not-allowed !important;
}
.has {
  color: #c0c4cc;
  pointer-events: none;
}
</style>
