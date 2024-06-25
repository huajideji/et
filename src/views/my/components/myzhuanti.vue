<template>
  <div class="wrap">
    <div class="topsearch">
        <div class="searchwrap">
            <el-input v-model="searchvalue" placeholder="请输入专题名称/专题标识/创建人" suffix-icon="el-icon-search"  @keyup.enter.native="search"></el-input>
        </div>
        <div>
            <el-button type="primary" @click="search" class="search-button">搜索</el-button>
        </div>
        <div>
            <span class="tipstext">按填写时间排序</span>
        </div>
    </div>
    <div class="bodywrap">
        <div class="body-right">
            <div class="bot-table">
          <SubjectTable
            :loading="loading"
            :table-data="tableData.data"
			:ismy="true"
          />
          <div class="pagination">
            <el-pagination
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
              :current-page.sync="page"
              :page-sizes="[10, 20, 50]"
              :page-size.sync="pageSize"
              layout="sizes, prev, pager, next, jumper"
              prev-text="上一页"
              next-text="下一页"
              :total="tableData.data_count"
            >
            </el-pagination>
          </div>
        </div>
        </div>
        <!-- <div class="body-left">
            <div class="left-top-wrap">
                <img src="@/assets/images/phbbanner.png" alt="" class="phbbanner">
            <div class="left-top-wrap">
                <div class="left-top-wrap-title">
                <img src="@/assets/images/phbtitle.png" alt="">
                <span class="phbtitle">填写专题流量排行榜</span>
            </div>
            </div>
            <div class="left-editable-wrap" v-if="myphbDataList.data">
                <el-table
                :data="myphbDataList.data"
                style="width: 100%">
                <el-table-column
                label="排名"
                width="100">
                <template slot-scope="scope" >
                    <img src="@/assets/images/firstPhb.png" alt="" v-if="scope.row.sort==1">
                    <img src="@/assets/images/secondPhb.png" alt="" v-else-if="scope.row.sort==2">
                    <img src="@/assets/images/thirdPhb.png" alt="" v-else-if="scope.row.sort==3">
                    <span v-else style="margin-left: 8px;">{{ scope.row.sort }}</span>
                 </template>
                </el-table-column>
                
                <el-table-column
                prop="creater"
                label="编辑"
                width="240">
                </el-table-column>
                <el-table-column
                prop="count"
                label="流量排行">
            </el-table-column>
        </el-table>
            </div>
            </div>
            <div class="currentuser">
                <span class="firstspan">{{myphbData.mine.sort}}</span>
                <span class="thirdspan">{{myphbData.mine.creater}}</span>
                <span >{{myphbData.mine.count}}</span>
            </div>
        </div> -->
    </div>
  </div>
</template>

<script>
import SubjectTable from '@/views/subjectList/components/subjectTable/index.vue'
export default {
    components: {
        SubjectTable
    },
    props: {
        tableData: {
            type: Object,
            default:{}
        },myphbData: {
            type: Object,
            default:{}
        }
    },
    data() {
        return {
            pageSize:10,
            page:1,
            params: {
                page: 1,
                page_num: 10,
                keyword:'',
                name:'',
            },
            searchvalue:'',
            loading: false,
            myphbDataList:{},
        }
    },
    watch: {
        myphbData: {
            handler(newval,oldval) {
            this.myphbDataList = newval
            },
            deep: true,
            immediate:true
            
        }
    },
    mounted() {
        console.log(this.myphbData)
    },
    methods: {
        handleSizeChange() {
            this.params.page = 1
          this.getTableList()  
        },
        handleCurrentChange() {
            this.getTableList()
        },
        search() {
            this.params.keyword = this.searchvalue
            this.getTableList()
        },
        async getTableList() {
            const res = await this.$api.getmyzhuanti(this.params)
            this.tableData = res
        }
    },
    
}
</script>

<style lang="less" scoped>
.search-button{
    background-color:#6065ec;
    border-color: #6065ec !important;
}
.phbbanner{
    position: absolute;
    right: 60px;
    top: 0px;
  }
  .left-top-wrap-title{
    display:flex;
    align-items: center;
  }
  .phbtitle{
    color: #333333ff;
 font-size: 16px;
 font-weight: 500;
 font-family: "PingFang SC";
 margin-left: 10px;
  }
  .pagination{
     float: right;
     margin-top: 15px;
  }
  .currentuser{
    width: calc(100% + 40px) ;
    position: relative  ;
      bottom: -20px;
      left: -20px;right: 0;
      margin: 0;
    padding: 20px 30px;
    border-radius: 0 0 8px 8px;
opacity: 1;
background: #7679c2ff;
color: #fff;
display: flex;
    .firstspan{
        width:20%;
        margin-left: 8px;
    }
    span{
        display: inline-block;
    }
    .thirdspan{
        width: 50%;
        margin-right: 15px;
    }
}
.body-right{
    width:100%;
    margin-right: 20px;
    
}
.left-top-wrap::-webkit-scrollbar {
    display: none;
  }
.body-left{
    .left-top-wrap{
        overflow: auto;
    overflow: scroll;
    }
    position: relative;
    display: inline-flex;
      flex-direction: column;
    height: 586px;
    border-radius: 8px;
    opacity: 1;
    border: 1px solid #eff0fdff;
    background: linear-gradient(157.6deg, #e4e6ffff 0%, #ffffffff 30%);
    box-shadow: 0 0 10px 0 #00000014;
    padding:20px;
    /deep/ .el-table, .el-table__expanded-cell{
    background-color: transparent !important;
}
/* 表格内背景颜色 */
/deep/.el-table tr{
    background-color: transparent !important;
}
/deep/.el-table th, .el-table tr, .el-table td {
    background-color: transparent !important;
}
}
    .bodywrap{
        display:flex;
    }
    .tipstext{
        opacity: 1;
    color: #999999ff;
    font-size: 14px;
    font-weight: 400;
    font-family: "PingFang SC";
    text-align: left;
    }
    .topsearch{
        display: flex;
        align-items: center;
        margin-bottom: 20px;
        div{
            margin-right: 25px;
        }
    }
    .wrap {
        padding: 10px 20px;
    }
    .searchwrap{
        width: 300px;
    }
</style>