<template>
    <div class="draft-box">
      <!-- 上方搜索 -->
      <div class="header">
        <div class="extra">我有 <span>
            {{ draftData.data_count }}
          </span> 个草稿箱</div>
      </div>
      <div class="bot-table">
        <el-table ref="table" :data="draftData.data" :stripe="true" :header-cell-style="tableHeader">
          <el-table-column align="center" label="序号">
            <template slot-scope="scope">
              {{ scope.row.id }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="专题名称">
            <template slot-scope="scope">
              {{ scope.row.name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="专题标识">
            <template slot-scope="scope">
              {{ scope.row.code }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="是否为副本">
            <template slot-scope="scope">
              <!-- <el-tag v-if="scope.row.is_copy" type="warning">是</el-tag>
              <el-tag v-else type="success">否</el-tag> -->
              <div v-if="scope.row.pid" class="number-color">是</div>
              <div v-else style="color:#333333;">否</div>
            </template>
          </el-table-column>
          <el-table-column align="center" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleEdit(scope.row)" type="text" class="theme-color size" size="small">编辑模块</el-button>
              <el-button @click="handleDel(scope.row)" type="text" class="danger-color size" size="small">删除草稿</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  

     
  
    </div>
  </template>
  <script>
  export default {
    name: 'DraftBox',
      props: {
            draftData: {
                type: Object,
                default:{},
        }  
    },
    data() {
      return {
		  draftParams: {
		      name: '',
		      type:1
		  },//管理列表参数
        tableHeader: {
          background: '#f6f6f6',
          color: '#333',
        },
        total: 0,// 数据总条数
  
        //表格数据

      }
    },
    mounted() {

    },
    methods: {
		async getList() {
		  try {
			  this.draftParams.name = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
		    const res = await this.$api.reqGetDraftList(this.draftParams)
		    this.total = res.data_count
		    this.draftData = res
		  } catch (e) { }
		},
      /* 
       @handleEdit
       @description:编辑模块
       */
      handleEdit(row) {
          console.log(row)
        let query = { 
          id: row.id ,
          type:row.topic_type
        }
        if(row.pid) {
          query.pid = row.pid
        }
        this.$router.push({ name: 'editor',  query})
      },
      /* 
       @handleDel
       @description:删除
       */
      handleDel(row) {
        this.$confirm('确定删除所选草稿吗?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
        })
          .then(async () => {
            try {
              let params = { id: row.id }
              const res = await this.$api.reqDeleteProject(params)
              if (res.msg === '删除成功') {
				   this.getList()
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

    },
  }
  </script>
  
  <style lang="less" scoped>
  .draft-box {
    width: 100%;
    padding: 0 20px;
    .size {
      font-size: 14px;
    }
  
    .header {
      .extra {
        font-size: 14px;
        color: #999;
      }
    }
  
    .bot-table {
      margin-top: 20px;
  
      .pagination {
        text-align: right;
      }
    }
  }
  </style>
  