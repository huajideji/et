<template>
	<div class="copy-dialog">
		<el-dialog :title="`${title}`" :close-on-click-modal="false" :visible="copyVisible" @close="cancel" width="70%">
			<div slot="title" class="dialog-header-title">
				<img src="@/assets/images/citydialog.png" width="22px" height="22px">
				<span class="font-color">{{title}}</span><span>专题覆盖城市</span>
			</div>
			<div class="dialog-header-body">
				<div class="head">
					<div class="search">
						<el-input v-model="cityname" placeholder="搜索城市名称" clearable style="width: 500px" @clear="search"
							@keyup.enter.native="search">

							<el-button slot="suffix" type="text" style="color: #a9a9a9 " icon="el-icon-search"
								@click="search">
							</el-button>
						</el-input>
					</div>
					<div class="extra">
						当前城市
						<span class="font-color" >
							{{totals}}
						</span>
						个
					</div>
					<div class="yichang font-color"   style="cursor:pointer" @click="openyichang">
						异常城市
						<span class="jiaobiao" v-if="yichangData.data.length">{{yichangData.count}}</span>
					</div>
				</div>

				<el-table ref="table" v-loading="loading" :data="tableData" element-loading-text="Loading"
					:stripe="true" :header-cell-style="tableHeader">
					<el-table-column align="center" label="序号" width="50px">
						<template slot-scope="scope" >
							{{ scope.$index+1 }}
						</template>
					</el-table-column>
					<el-table-column align="center" label="城市名字">
						<template slot-scope="scope">
							{{ scope.row.cityname }}
						</template>
					</el-table-column>
					<el-table-column align="center" label="专题链接">
						<template slot-scope="scope">
							{{ scope.row.url }}
						</template>
					</el-table-column>
					<el-table-column align="center" label="最近操作人">
						<template slot-scope="scope">
							{{ scope.row.creater }}
							<div v-if="scope.row.is_self" style="color: #999999">(自己)</div>
						</template>
					</el-table-column>
				</el-table>
				<div class="pagination">
					<el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"
						:current-page="page" :page-sizes="[12, 24, 48]" :page-size="pageSize"
						layout="sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="total">
					</el-pagination>
				</div>
			</div>


		</el-dialog>
		<el-dialog :title="`${title}`" :close-on-click-modal="false" :visible="yichangdialog" @close="cancels" width="30%">
			<div slot="title" class="dialog-header-title">
				<img src="@/assets/images/citydialog.png" width="22px" height="22px">
				<span class="font-color">{{title}}</span><span>异常城市</span>
			</div>
			<div class="dialog-header-body">
				<div class="head">
					<div class="extra">
						当前异常城市
						<span class="font-color">
							{{yichangData.data.length}}
						</span>
						个
					</div>
				</div>
		
				<el-table ref="table" v-loading="loading" :data="yichangData.data" element-loading-text="Loading"
					:stripe="true" :header-cell-style="tableHeader">
					<el-table-column align="center" label="序号">
						<template slot-scope="scope">
							{{ scope.$index+1 }}
						</template>
					</el-table-column>
					<el-table-column align="center" label="异常城市名字">
						<template slot-scope="scope">
							{{ scope.row.cityname }}
						</template>
					</el-table-column>
					</el-table>
					</div>
		</el-dialog>
		
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
				default: () => {},
			},
			
		},
		data() {
			return {
				totals:0,
				yichangdialog:false,
				yichangData:{},
				page: 1,
				pageSize: 12,
				total: '',
				tableHeader: {
					background: '#f6f6f6',
					color: '#333',
				},
				title: '',
				id: null,
				tableData: [],
				cityname: '',
				loading: false,
			}
		},
		async mounted() {
			this.getList()
			this.getCopyList()
		},
		methods: {
			async search(){
				this.page = 1
				let params = {
					id: this.id,
					cityname: this.cityname,
					page_num:this.pageSize
				}
				const res = await this.$api.getCityListDetail(params)
				this.tableData = res.data
				this.total = res.data.length
			},
			openyichang(){
				this.yichangdialog = true
			},
			 async handleCurrentChange(val) {
				 this.page = val
				let params = {
					id: this.id,
					cityname:this.cityname,
					page:this.page,
					page_num:this.pageSize
				}
				const res = await this.$api.getCityListDetail(params)
				this.tableData = res.data
				this.total = res.count
			},
			async handleSizeChange(val) {
				this.page = 1
				this.pageSize = val
				let params = {
					id: this.id,
					cityname:this.cityname,
					page:this.page,
					page_num:this.pageSize
				}
				const res = await this.$api.getCityListDetail(params)
				this.tableData = res.data
				this.total = res.count
			},
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
				let params = {
					id: this.id,
					page_num:this.pageSize
				}
				const res = await this.$api.getCityListDetail(params)
				const yichangres = await this.$api.getCityListDetail({
					id: this.id,
					type:1
				})
				this.tableData = res.data
				this.total = res.count
				this.totals = res.count
				this.yichangData = yichangres
			},
			/* 
			 @handleLook
			 @description:查看专题
			 */
			handleLook(row) {

			},
			/* 
			 @handleEdit
			 @description:编辑模块
			 */
			handleEdit(row) {
				this.$router.push({
					name: 'editor',
					query: {
						id: row.id,
						pid: this.id
					}
				})
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
							let params = {
								id: row.id
							}
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
			cancels(){
				this.yichangdialog =false
			}
		},
	}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
	::v-deep.cell {
		white-space: pre-wrap !important;
	} 
	
	 .el-button {
		font-size: 18px;
		margin-right: 10px;
		margin-bottom: 2px;
	}
	::v-deep.el-dialog::-webkit-scrollbar{
		width: 0px;
	}
	::v-deep.el-dialog{
		max-height: 800px;
		-webkit-box-sizing:border-box !important;
		 overflow-y: scroll;
	}
	.dialog-header-body {
		background: rgba(250, 250, 250, 1);
		padding: 20px 20px 20px 20px !important;
		
		.head {
			display: flex;
			align-items: center;
			margin-bottom: 15px;
		}

		.search {
			margin-right: 15px;
		}

		.yichang {
			margin-right: auto;
			flex: 1;
			text-align: right;
			position: relative;

			.jiaobiao {
				position: absolute;
				color: white;
				font-size: 10px;
				background-color: red;
				width: 15px;
				height: 15x;
				line-height: 15px;
				left: 99%;
				top: -12px;
				text-align: center;
				-webkit-border-radius: 24px;
				border-radius: 24px;
			}
		}
	}

	.dialog-header-title {
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		img {
			margin-right: 5px;
		}

		span {
			font-weight: 700;
			font-size: 18px;
		}
	}

	.pagination {
		margin-top: 20px;
		display: flex;
		justify-content: flex-end;
	}

	.copy-dialog {
		::v-deep.el-dialog__body {
			padding: 0px 0px 0px 0px !important;
		}

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
