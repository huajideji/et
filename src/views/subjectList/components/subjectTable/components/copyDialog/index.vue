<template>
  <div class="copy-dialog">
    <el-dialog :title="`${title}副本`" :close-on-click-modal="false" :visible="copyVisible" @close="cancel">
      <el-table ref="table" v-loading="loading" :data="tableData" element-loading-text="Loading" :stripe="true"
        :header-cell-style="tableHeader">
        <el-table-column align="center" label="序号">
          <template slot-scope="scope">
            {{ scope.row.id }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="副本名称">
          <template slot-scope="scope">
            {{ scope.row.name }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="覆盖城市数">
          <template slot-scope="scope">
            {{ scope.row.city_num }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="副本数">
          <template slot-scope="scope">
            <el-button v-if="scope.row.copy_num" type="text" class="number-color">{{ scope.row.copy_num }}
            </el-button>
            <div v-else>{{ scope.row.copy_num }}</div>
          </template>
        </el-table-column> -->
        <el-table-column align="center" label="创建人">
          <template slot-scope="scope">
            {{ scope.row.creater }}
            <div v-if="scope.row.is_self" style="color: #999999">(自己)</div>
          </template>
        </el-table-column>
        <el-table-column align="center" fixed="right" label="操作" min-width="280">
          <template slot-scope="scope">
            <el-button @click="handleCheck(scope.row)" type="text" class="theme-color" size="small">查看副本</el-button>
            <el-button @click="handleManage(scope.row)" type="text" class="theme-color" size="small">数据管理</el-button>
            <el-button :disabled="!scope.row.is_self" @click="handleEdit(scope.row)" type="text" class="theme-color"
              size="small" :class="{disabled: !scope.row.is_self}">编辑模块</el-button>
            <el-button :disabled="!scope.row.is_self" @click="handleDel(scope.row)" type="text" size="small"
              class="theme-color" :class="{disabled: !scope.row.is_self}">删除副本</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="under-table">
        <el-button type="primary" icon="el-icon-circle-plus-outline" size="small" class="theme-bg"
          @click="handleAdd(handleData)">
          新增副本</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'copyDialog',
  props: {
    copyVisible: {
      type: Boolean,
      default: false,
    },
    handleData: {
      type: Object,
      default: () => { },
    },
  },
  data() {
    return {
      tableHeader: {
        background: '#f6f6f6',
        color: '#333',
      },
      title: '',
      id: null,
      tableData: [
      ],
      cityname: '武汉',
      loading: false,
    }
  },
  async mounted() {
    this.getList()
    this.getCopyList()
  },
  methods: {
    /* 
     @getList
     @description:获取数据
     */
    getList() {
      this.title = this.handleData.name
      this.id = this.handleData.id
      // this.loading = true
      // let params = {
      //   id: this.handleData.id,
      // }
    },
    /* 
     @getList
     @description:获取数据 reqGetCopyList
     */
    async getCopyList() {
      // this.loading = true
      let params = { id: this.id, cityname: this.cityname }
      const res = await this.$api.reqGetCopyList(params)
      this.tableData = res
    },
    /* 
     @handleLook
     @description:查看专题
     */
    handleLook(row) {

    },
    /* 
     @handleManage
     @description:数据管理
     */
    handleManage(row) {
      this.$router.push({
        name: 'dataManage',
        query: { id: row.id, title: row.name },
        // params: { id: row.id, title: row.name },
      })
    },
    /* 
     @handleEdit
     @description:编辑模块
     */
    handleEdit(row) {
      this.$router.push({ name: 'editor', query: { id: row.id, pid: this.id } })
    },
    /* 
     @handleCheck
     @description:查看副本
     */
    handleCheck(row) {
      // this.$router.push({
      //     name: 'editor',
      //     query:{
      //       id: row.id,
      //       pid:row.id,
      //     }
      //   })
    },
    /* 
     @handleAdd
     @description:新增副本
     */
    handleAdd(row) {
      this.$router.push({
        name: 'editor',
        query: {
          id: row.id,
          pid: row.id,
        }
      })
    },
    /* 
     @handleDel
     @description:删除
     */
    handleDel(row) {
      console.log(row)
      this.$confirm('确定删除所选副本吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(async () => {
          try {
            let params = { id: row.id }
            const res = await this.$api.reqDeleteProject(params)
            if (res.msg === '删除成功') {
              this.getCopyList()
              this.$message({
                type: 'success',
                message: '删除成功!',
              })
            }
          } catch (error) {

          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },
    /* 
     @cancel
     @description:返回
     */
    cancel() {
      this.$emit('hideDialog')
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.copy-dialog {
  .under-table {
    text-align: right;
    margin-top: 20px;

    .theme-bg {
      // background-color: #6065ec;
      @include background_color;
    }
  }
}
</style>
<style lang="less">
.disabled {
  color: #C0C4CC !important;
}
</style>
