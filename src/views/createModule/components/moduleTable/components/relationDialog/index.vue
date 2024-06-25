<template>
  <div class="relation">
    <el-dialog
      title="提示"
      :visible.sync="relationVisible"
      width="1296px"
      :close-on-click-modal="false"
    >
      <div slot="title">
        <span class="relation-title">{{ this.$route.query.name }}</span>

        <el-button size="small" @click="addModule"> 新建模块 </el-button>
        <span class="relation-delete" @click="relationVisible = false"
          ><img src="@/assets/images/close.png" alt=""
        /></span>
      </div>
      <div class="relation-content" v-loading="loading">
        <div v-if="relationList.length==0" class="no-module">
              暂无模块
        </div>
        <div class="relation-list" :key="item.id" v-for="item in relationList">
          <div class="list-title">{{ item.name }}</div>
          <div class="list-info">
            <div class="left">
              <div>模块ID</div>
              <div>调用专题</div>
              <div>覆盖城市</div>
              <div>创建人</div>
            </div>
            <div class="right">
              <div class="moduleId">
                <span class="copy">{{ item.id }}</span>
                <span @click="copyId(item.id)">复制</span>
              </div>
              <div v-if="item.zhuanti" class="zhuanti">
                <span v-for="(item2, index) in item.zhuanti" :key="index">{{
                  item2.name
                }}</span>
              </div>
              <div v-else>无</div>
              <div>{{ item.city_num ? item.city_num : '' }}</div>
              <div>{{ item.creater ? item.creater : '阿柴' }}</div>
            </div>
          </div>
          <div class="list-screen">
            <div class="list-screen-first">
              <div class="left">包含字段</div>
              <div class="right">
                <span :key="index" v-for="index in item.column_name">{{
                  index
                }}</span>
              </div>
            </div>
            <div class="list-screen-first">
              <div class="left">筛选条件</div>
              <div class="right">
                <div :key="index2" v-for="index2 in item.screen">
                  {{ index2 }}
                </div>
              </div>
            </div>
          </div>
          <div class="list-tool">
            <span @click="previewModule(item.id)">预览模块</span>
            <span @click="editModule(item.id)" v-if="!item.zhuanti"
              >编辑模块</span
            >
            <span @click="delModule(item.id)">删除模块</span>
          </div>
        </div>
      </div>
    </el-dialog>
    <RelationAdd ref="moduleAdd" />
  </div>
</template>

<script>
import RelationAdd from '../relationAdd/index.vue'
import axios from 'axios'
export default {
  name: 'relationDialog',
  components: { RelationAdd },
  data() {
    return {
      relationVisible: false,
      relationList: [],
      tableHeaderData: [],
      loading: false,
    }
  },
  mounted() {},
  methods: {
    // 复制
    copyId(id) {
      let input = document.createElement('input') // 创建input对象
      input.value = id // 设置复制内容
      document.body.appendChild(input) // 添加临时实例
      input.select() // 选择实例内容
      document.execCommand('Copy') // 执行复制
      document.body.removeChild(input) // 删除临时实例
      this.$message.success('复制成功！')
    },
    // 新增模块按钮
    addModule() {
      // this.relationVisible = false;
      this.$refs.moduleAdd.addVisible = true
      this.$refs.moduleAdd.tableHeaderData = this.tableHeaderData
      this.$refs.moduleAdd.dialogTitle = '新增模块'
    },
    // 获取模块列表
    async getModuleList() {
      let params = {
        id: this.$route.query.id,
        page: this.page,
        page_num: this.page_num,
      }
      const res = await this.$api.getTableModuleList(params)
      if(res.length>0){
         this.relationList = res
      }
     
     
    },
    // 预览模块
    async previewModule(id) {
      let params = {
        id: id,
      }
      const res = await this.$api.getTableModule(params)
      console.log(res, 'getTableModule')
      if (res.module_type_id != 0) {
        sessionStorage.setItem('moduleList', JSON.stringify(res))
      }

      this.$router.push({
        name: 'moduleSubmit',
        query: {
          table_id: this.$route.query.id,
          module_id: id,
          moduletype: 1,
        },
      })
    },
    // 编辑模块
    async editModule(id) {
      let params = {
        id: id,
      }
      const res = await this.$api.getTableModule(params)
      console.log(res, 'getTableModule')

      this.$refs.moduleAdd.addVisible = true
      this.$refs.moduleAdd.tableHeaderData = this.tableHeaderData
      let shaixuan = JSON.parse(JSON.stringify(res.column_name))
      for (let i = shaixuan.length - 1; i >= 0; i--) {
        if (shaixuan[i] == '城市') {
          shaixuan.splice(i, 1)
        }
      }
      this.$refs.moduleAdd.shaixuan = shaixuan
      let screenOption = []
      shaixuan.forEach((item) => {
        let obj = {
          value: item,
          label: item,
        }
        screenOption.push(obj)
      })
      this.$refs.moduleAdd.optionsHeader = screenOption
      this.$refs.moduleAdd.tableHeaderScreenData = res.column_name
      this.$refs.moduleAdd.dialogTitle = '修改模块'

      let screenList = []
      if (res.screen.length) {
        res.screen.forEach((item, index) => {
          let obj = {}
          console.log(item, 'item')
          if (index == 0) {
            obj = {
              id: 1,
              condition: '当',
              valueList: [
                {
                  value: item[0],
                  value1: item[1],
                  value2: item[2],
                },
              ],
            }
          } else {
            obj = {
              id: index + 1,
              condition: '且',
              valueList: [
                {
                  value: item[0],
                  value1: item[1],
                  value2: item[2],
                },
              ],
            }
          }
          screenList.push(obj)
        })
      }

      this.$refs.moduleAdd.module_id = id

      this.$refs.moduleAdd.screenList = screenList

      //   sessionStorage.setItem('screenList', JSON.stringify(res.column_name))
      // if (res.module_type_id != 0) {
      //   sessionStorage.setItem('moduleList', JSON.stringify(res))
      // }
      // this.$router.push({
      //   name: 'moduleSubmit',
      //   query: {
      //     table_id: this.$route.query.id,
      //     module_id: id,
      //     moduletype: 0,
      //   },
      // })
    },
    // 删除模块
    async delModule(id) {
      this.$confirm('确定删除该模块吗?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showClose: false,
      })
        .then(async () => {
          try {
            let params = {
              id: id,
            }
            const res = await this.$api.deleteTableModule(params)
            if (res.ret == 200) {
              this.$message.success('删除成功')
              this.getModuleList()
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
    // handleClose(done) {
    //     this.$confirm('确认关闭？')
    //       .then((_) => {
    //         done()
    //       })
    //       .catch((_) => {})
    // },
  },
  watch: {
    relationVisible(val, oldVal) {
      if (val == true) {
        this.getModuleList()
      }
    },
  },
}
</script>

<style lang="scss">
@import "@/assets/css/mixin.scss";
.relation {
  .el-dialog__header {
    height: 60px;
    position: relative;
    display: flex;
    align-items: center;
    padding: 0px;
    .relation-title {
      color: #222222;
      font-size: 18px;
      font-weight: 700;
      margin-left: 40px;
      display: inline-block;
      height: 32px;
      line-height: 32px;
    }
    .el-button:nth-child(2) {
      // background-color: #6065ec;
      @include background_color;
      border: none;
      border-radius: 4px;
      width: 94px;
      height: 32px;
      position: absolute;
      right: 93px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 14px;
      font-weight: 400;
    }
    .relation-delete {
      cursor: pointer;
      display: inline-block;
      height: 32px;
      line-height: 32px;

      position: absolute;
      right: 30px;
      img {
        width: 33px;
        height: 33px;
      }
    }

    .el-icon-close:before {
      content: '';
    }
  }

  .relation-content {
    height: 580px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    .no-module{
      font-size: 18px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    // .relation-list:nth-child(3n) {
    //   margin-right: 0px;
    // }
    .relation-list:nth-child(1) {
      margin-top: 0px;
    }
    .relation-list:nth-child(2) {
      margin-top: 0px;
    }
    .relation-list:nth-child(3) {
      margin-top: 0px;
    }

    .relation-list {
      margin-right: 33px;
      margin-top: 16px;
      margin-bottom: 17px;
      padding: 17px 20px;
      width: 380px;
      height: 376px;
      font-weight: 400;
      font-size: 14px;
      background: #f8f8f8;
      position: relative;
      .list-title {
        color: #333333;
        font-weight: 700;
        font-size: 14px;
      }
      .list-info {
        display: flex;
        padding-bottom: 12px;
        border-bottom: 1px solid #e9e9e9;
        div {
          margin-top: 12px;
        }
      }
      .list-screen {
        display: flex;
        flex-direction: column;
        .list-screen-first {
          .right {
         
            overflow: hidden;

            text-overflow: ellipsis;

            display: -webkit-box;

            -webkit-line-clamp: 3;

            -webkit-box-orient: vertical;
          }
          display: flex;
          margin-top: 16px;
        }
      }
      .list-tool {
        position: absolute;
        right: 20px;
        bottom: 23px;
        span {
          cursor: pointer;
          margin-left: 14px;
          color: #6065ec;
        }
        span:nth-last-child(1) {
          cursor: pointer;
          color: #f33f3f;
        }
      }

      .left {
        color: #999999;
        width: 60px;
        text-align: right;
        div:nth-child(1) {
          margin-top: 0;
        }
      }
      .right {
        width: 280px;
        padding-left: 32px;
        color: #333333;
                
        div:nth-child(1) {
          margin-top: 0;
        }
        span {
          margin-right: 14px;
        }
        .moduleId {
          // border: 1px solid red;
          padding-top: -10px;
          span:nth-last-child(1) {
            padding: 2px 5px;
            background-color: rgba(41, 50, 252, 0.05);
            border-radius: 4px;
            color: #6065ec;
            cursor: pointer;
          }
        }
        .zhuanti{
            overflow: hidden;

            text-overflow: ellipsis;

            display: -webkit-box;

            -webkit-line-clamp: 1;

            -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>