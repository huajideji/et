<template>
  <div class="module_multiplexingstyle">
	      <!-- 标题 -->
	      <h2>{{ datas.text }}</h2>
	      <div class="desc">
	         可复用专题模块或关联表生成的模块;
			 <br>	
			 当模块更新时,此模块同步更新;
			 <br>
			 专题模块样式属性更新时，此模块同步更新；
			 <br>
			 但表格生成的模块不可修改样式属性，因此，新建表格模块后重新填写模块id。
	      </div>
		  <div class="card header" >
			<span class="idname">复用模块id</span> 
			<el-input v-model="moduleid"></el-input>
			<div class="choseBtn">
				<el-button type="primary" @click="openList">选择复用模块</el-button>
			</div>
		  </div>
		  
		  <el-dialog
		    title="提示"
		    :visible.sync="zhuantiList"
		    width="60%"
			custom-class="module_multiplexingstyle-eldialog">
			<div class="header">
				<div class="module_multiplexingstyle-icon">
					<span :class='["el-icon-arrow-left",step==1?"huifont":""]' @click="step=1">
						
					</span>
					<span :class='["el-icon-arrow-right",step==2?"huifont":""]' @click="step=2">
					</span>
					<span class="module_multiplexingstyle-icon-name"> {{(step==2?zhuantiname+'>>':'')}} <span style="color:#333333">{{(step==1?'请选择被调用模块所属的专题':'请选择被调用数据所属的模块')}}</span> </span>
				</div>
				<el-form ref="form" :model="form" :inline="true" @keyup.enter.native="search" v-if="step==1">
				<el-form-item>
				  <el-input v-model="form.name" placeholder="搜索专题名称" clearable style="width: 500px" @clear="search">
				    <el-button slot="suffix" type="text" style="color: #a9a9a9" icon="el-icon-search" @click="search">
				    </el-button>
				  </el-input>
				</el-form-item>
				</el-form>
			</div>
		    <div class="bot-table" v-if="step==1">
		      <SubjectTable :loading="loading" :table-data="tableData" :isEditor="true" @getList="getList" @choseTopic="getTopic"/>
		      </div> 
			<div v-if="step==2">
				<el-tabs v-model="activeName" @tab-click="handleTab">
					<el-tab-pane v-for="(item, index) in tabPage" :key="index" :label="item.name">
						<TabContent v-if="activeName == index" :loading="loading" :key="item.id" :tab-data="tabData" />
					</el-tab-pane>
				</el-tabs>
				<el-tabs v-model="activeName" @tab-click="handleClick">
						<el-table ref="table" v-loading="loading" :data="moduleData" element-loading-text="Loading" stripe
									:header-cell-style="tableHeader2" highlight-current-row @current-change="handleCurrentChange2">
									<el-table-column align="center" width="30px">
										<template slot-scope="scope">
											<el-radio v-model="choseId" :label="scope.row.id"></el-radio>
										</template>
									</el-table-column>
									<el-table-column align="center" label="id">
										<template slot-scope="scope">
											{{ scope.row.id }}
										</template>
									</el-table-column>
									<el-table-column align="center" label="模块名称">
										<template slot-scope="scope">
											{{ scope.row.name }}
										</template>
									</el-table-column>
						</el-table>
				  </el-tabs>
				
				
			</div>
		    <footer>
			<el-button type="primary" class="multiplexingstyle-saveBtn" v-if="step==2" @click="saveModlueId">检查</el-button>
		      <div class="pagination" v-if="step==1">
		        <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange" :current-page="page"
		          :page-sizes="[10, 20, 50]" :page-size="pageSize" layout="sizes, prev, pager, next, jumper" prev-text="上一页"
		          next-text="下一页" :total="total">
		        </el-pagination>
		      </div>
		    </footer>
		  </el-dialog>
  </div>
</template>

<script>
	import SubjectTable from '../../../views/subjectList/components/subjectTable/index.vue'
	export default {
		name: 'module_multiplexingstyle',
		components: {
		  SubjectTable,
		},
		props: {
			datas: Object,
		},
		data() {
			return {
				choseName:'',
				tableHeader2: {
					background: '#f1f1f1',
					color: '#333',
				},
				id:'',
				choseId:'',
				commitId:'',
				zhuantiname:'',
				moduleData:[],
				form: {
				  name: '',
				},
				step:1,
				tabPage: [{
					id: 0,
					name: '主页面'
				}],
				tableData:[],
				zhuantiList:false,
				moduleid:'',
				keyword:'',
				page: 1,
				pageSize: 10,
				total:0,
				loading: false,
			}
		},
		created(){
			this.moduleid = this.datas.module_id
			this.choseName = this.datas.module_name
		},
		computed:{
		},
		watch:{
			moduleid(val){
				this.datas.module_id = val
				this.datas.module_name = this.choseName
			}
		},
		methods: {
			handleClose(){
				
			},
			/*
			 @handleSizeChange
			 @description:分页大小改变
			 */
			handleSizeChange(val) {
			  this.page = 1
			  this.pageSize = val
			  this.getList()
			},
			/* 
			 @handleCurrentChange
			 @description:当前页码改变
			 */
			handleCurrentChange(val) {
			  this.page = val
			  this.getList()
			},
			saveModlueId(){
				this.datas.module_name = this.choseName
				this.moduleid = this.choseId
				this.zhuantiList = false
			},
			/*
			 @handleTab
			 @description:切换tab
			 */
			 async handleTab() {
				this.moduleData = [] // 重置成空数组
				let params = {
					id: this.id,
					page_id: this.tabPage[+this.activeName].id
				}
				const res = await this.$api.reqGetModuleLists(params)
				if (res instanceof Array) {
					this.moduleData = res
				}
			},
			/*
			 @setTabPage
			 @description:获取子页面列表
			 */
			async setTabPage() {
				this.tabPage = [{
					id: 0,
					name: '主页面'
				}]
				let params ={
					id:this.id
				}
				try {
					const res = await this.$api.reqGetPageLists(params)
					this.tabPage = [...this.tabPage, ...res]
				} catch (e) {}
			},
			handleCurrentChange2(val){
				this.choseId = val.id
				this.choseName = val.name
			},
			async getTopic(row){
				this.step=2
				let params ={
					id:row.id,
					page_id:row.pid
				}
				this.zhuantiname = row.name
				this.id = row.id
				this.setTabPage()
				const res = await this.$api.reqGetModuleLists(params)
				this.moduleData = res
			},
			search() {
			  this.page = 1
			  this.pageSize = 10
			  this.getList()
			},
			/*
			 @getList
			 @description:获取数据
			 */
			async getList(params = {
			  keyword: this.form.name,
			  page: this.page,
			  page_num: this.pageSize,
			}) {
			  // this.loading = true
			  try {
					  const res = await this.$api.reqGetList(params)
					  this.tableData = res.data
					  this.total = res.data_count
			  } catch (e) {
			    this.$message.error(e)
			  }
			},
			async openList(){
				await this.getList()
				this.zhuantiList = true
			}
		},
	}
</script>

<style  lang="less">
	.module_multiplexingstyle{
		.el-tabs__nav-wrap::after{
			background-color:#fff;
		}
		.module_multiplexingstyle-icon-name{
			margin-left:15px;
			font-size: 16px;
			color: #999999;
		}
		.multiplexingstyle-saveBtn{
			margin-top: 10px;
			width: 12%;
		}
		.huifont{
			color: #D9D9D9;
		}
		.el-form-item{
			margin-bottom: 10px;
		}
		.el-dialog__body{
			padding: 0px 20px 10px 20px;
			.header{
				display: flex;
				align-items: center;
				justify-content:space-between;
				.el-icon-arrow-right{
					margin-left: 20px;
				}
				.module_multiplexingstyle-icon{
					color: #000;
					font-size: 20px;
					display: flex;
					align-items: center;
				}
			}
		}
		.module_multiplexingstyle-eldialog{
			z-index: 1000 !important;
		}
		.bot-table {
		  height: 550px !important;
		}
		
		.subject-table {
		  // max-height: 600px;
		  overflow-x: auto;
		}
		
		footer {
		  margin-top: 20px;
		  display: flex;
		  justify-content: end;
		}
		
		.guideMask {
		  justify-content: flex-end;
		}
		.choseBtn{
			margin-top: 10px;
		}
		.idname{
			display: block;
			color: #000;
			font-size: 14px;
			font-weight: 700;
			margin-bottom: 10px;
		}
		>h2 {
		    padding: 21px 16px 6px 0;
		    font-size: 16px;
		    font-weight: 700;
		    color: #333333;
		}
		.card {
		    background: #f8f8f8;
		    border-radius: 5px;
		    padding: 18px 10px;
		    margin: 12px 0;
		
		    &.header {
		        margin: 25px 0;
		    }
		
		}
	}
</style>

