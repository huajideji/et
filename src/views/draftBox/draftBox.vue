<template>
  <div class="draft-box">
    <!-- 上方搜索 -->
    <div class="header">
      <div class="extra">我有 <span>
          {{ total }}
        </span> 个草稿箱</div>
    </div>
    <div class="bot-table">
      <el-table ref="table" :data="tableData" :stripe="true" :header-cell-style="tableHeader">
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

    <!-- 新手指引导航条 -->
    <!-- <div class="guide-nav-box" v-if="guideShow[9]">
      <guideNav></guideNav>
    </div> -->

    <!-- 新手指引第九步 (草稿箱) -->
    <!-- <div
      class="guideMask guideMask9"
      v-if="guideShow[9]"
      :style="{ 'padding-left': guideRight5+'px' }"
    >
      <div class="guide-box">
        <div class="flex-center">
          <div class="guide-arrow flex-center">
            <div class="cir1"><span class="cir2"></span></div>
            <div class="line-x"></div>
          </div>
          <div class="guide-card">
            <img class="starImg-left" src="@/assets/images/guide-star.png" alt="">
            <img class="starImg-right" src="@/assets/images/guide-star2.png" alt="">
            <p>这里是草稿箱哦<br>您在搭建台选择"保存到草稿箱"的专题都会被保存在这<br>里,<br>您可选择"编辑模块"进入专题搭建台进行二次创作,也<br>可以选择删除这个草稿</p>
            <p>接下来和我一起看看<span style="color:#FFEA7D;">数据中心</span>吧！</p>
          </div>
        </div>
        <div class="guide-btns center">
          <span class="guide-exit" @click="guideExit(9)">学会啦</span>
          <span class="guide-next" @click="guideNext(9)">下一步</span>
        </div>
      </div>
    </div> -->

   

  </div>
</template>
<script>
export default {
  name: 'DraftBox',
  data() {
    return {
      tableHeader: {
        background: '#f6f6f6',
        color: '#333',
      },
      total: 0,// 数据总条数

      //表格数据
      tableData: [
        // {
        //   id: 5,
        //   name: '核酸检测地点',
        //   mark: 'hesuanjiance', // code
        //   is_copy: 0, // pid
        // },
      ],
      guideShow: [],
			guideRight5:'',
    }
  },
  mounted() {
    this.getList()
    // this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		// window.addEventListener("setItem", () => {
		// 	this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		// });
  },
  methods: {
    /* 
     @getList
     @description:获取数据
     */
    async getList() {
      try {
        const res = await this.$api.reqGetDraftList()
        this.total = res.data_count
        this.tableData = res.data
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
    /* 退出指引 */ 
		// guideExit() {
		// 	this.guideShow = [false]
    //   this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
    //   this.$router.push('/subjectList')
		// },
		/* 新手指引下一步 */ 
		// guideNext(index) {
    //   this.guideShow = [false]
    //   this.guideShow[index+1] = true
    //   this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
    //   this.setSessionItem('guideIndex', 4)
    //   this.$router.push({path:`/dataCenter`})
		// },
  },
}
</script>

<style lang="less" scoped>
.draft-box {
  width: 100%;
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
