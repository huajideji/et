<template>
	<div class="subject-table">
		<el-table ref="table" v-loading="loading" :data="tableData" element-loading-text="Loading" stripe
			:header-cell-style="isEditor?tableHeader2:tableHeader">
			<el-table-column align="center" label="序号" width="60">
				<template slot-scope="scope">
					{{ scope.row.id }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="专题名称" show-overflow-tooltip >
				<template slot-scope="scope">
					{{ scope.row.name }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="专题目录" show-overflow-tooltip >
				<template slot-scope="scope">
					{{ scope.row.directory }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="专题标识" show-overflow-tooltip >
				<template slot-scope="scope">
					{{ scope.row.code }}
				</template>
			</el-table-column>
			<el-table-column align="center" label="覆盖城市数" min-width="40" v-if="!ismy">
				<template slot-scope="scope">
					<span v-if="!isEditor" @click="opencity(scope.row)"
						class="theme-color">{{ scope.row.city_num }}</span>
					<span v-else class="theme-color" style="cursor:default">{{ scope.row.city_num }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="近七日武汉数据" min-width="60" v-if="ismy">
				<template slot-scope="scope">
					<span  >{{ scope.row.data }}</span>
				</template>
			</el-table-column>
			<el-table-column align="center" label="分类" width="100">
				<template slot-scope="scope">
					{{scope.row.category_one?scope.row.category_one+'-':''}}{{ scope.row.category_two?scope.row.category_two:''}}
				</template>
			</el-table-column>
			<el-table-column align="center" label="创建人" min-width="60">
				<template slot-scope="scope">
					<div class="creater-wrap">
						{{ scope.row.creater }}
						<div v-if="scope.row.is_self" style="color: #999999">(自己)</div>
						<img src="@/assets/images/zhankai.png" @click="handleShowAuthority(scope.row)">
					</div>
				</template>
			</el-table-column>
			<el-table-column align="center" fixed="right" label="操作" min-width="180">
				<template slot-scope="scope">
					<div v-if="!isEditor">
						<el-tooltip class="item" effect="dark" content="查看pc专题" placement="bottom">
							<el-button type="text" class="theme-color">
								<!-- 查看专题   -->
								<a v-if="cityCode&&scope.row.code =='xgyx'"
									:href="`http://${cityCode}.bendibao.com/${scope.row.directory}/${scope.row.code}/`"
									target="_blank"><img src="@/assets/images/zt_seepc.png" alt=""
										class="operator-img"></a>
								<a v-else-if="cityCode&&scope.row.code !=='xgyx'"
									:href="`http://${cityCode}.bendibao.com/${scope.row.directory}/zt${scope.row.code}/`"
									target="_blank"><img src="@/assets/images/zt_seepc.png" alt=""
										class="operator-img"></a>
								<a v-else-if="scope.row.code =='xgyx'"
									:href="`http://wh.bendibao.com/${scope.row.directory}/${scope.row.code}/`" target="_blank"><img
										src="@/assets/images/zt_seepc.png" alt="" class="operator-img"></a>
								<a v-else :href="`http://wh.bendibao.com/${scope.row.directory}/zt${scope.row.code}/`"
									target="_blank"><img src="@/assets/images/zt_seepc.png" alt=""
										class="operator-img"></a>
							</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="查看小程序专题" placement="bottom">
							<el-button type="text" class="theme-color" @click="goxcx(scope)">
								<!-- 查看专题   -->
								<a><img src="@/assets/images/xcx_blue.png" alt="" class="operator-img"></a>
							</el-button>
						</el-tooltip>
						<el-tooltip class="item" effect="dark" content="查看专题" placement="bottom">
							<el-button type="text" class="theme-color">
								<!-- 查看专题   -->
								<a v-if="cityCode&&scope.row.code =='xgyx'"
									:href="`http://m.${cityCode}.bendibao.com/${scope.row.directory}/${scope.row.code}/`"
									target="_blank"><img src="@/assets/images/zt_see.png" alt=""
										class="operator-img"></a>
								<a v-else-if="cityCode&&scope.row.code !=='xgyx'"
									:href="`http://m.${cityCode}.bendibao.com/${scope.row.directory}/zt${scope.row.code}/`"
									target="_blank"><img src="@/assets/images/zt_see.png" alt=""
										class="operator-img"></a>
								<a v-else-if="scope.row.code =='xgyx'"
									:href="`http://m.wh.bendibao.com/${scope.row.directory}/${scope.row.code}/`" target="_blank"><img
										src="@/assets/images/zt_see.png" alt="" class="operator-img"></a>
								<a v-else :href="`http://m.wh.bendibao.com/${scope.row.directory}/zt${scope.row.code}/`"
									target="_blank"><img src="@/assets/images/zt_see.png" alt=""
										class="operator-img"></a>
							</el-button>
						</el-tooltip>
						<!-- <a :href="`http://m.wh.bendibao.com/zhuanti_new/#/?name=${row.code}`"></a> -->
						<!-- <div :class="guideShow[8] ? ['guideHigh']:''"> -->
							<el-tooltip class="item" effect="dark" content="数据管理" placement="bottom">
								<div :class="guideShow[8] && scope.$index == 0 ? ['guideHigh','guidePad8']:''" style="display:inline-block;margin: 0 10px;visibility: visible;">
									<el-button v-if="scope.row.code=='yibaogongji'" type="text" class="theme-color" size="small"
										disabled>
										<img src="@/assets/images/zt_data1.png" alt="" class="operator-img">
									</el-button>
									<el-button v-else type="text" class="theme-color" size="small"
										@click="handleManage(scope.row)">
										<img src="@/assets/images/zt_data.png" alt="" class="operator-img">
									</el-button>
								</div>
							</el-tooltip>
						<!-- </div> -->

						<el-tooltip class="item" effect="dark" content="编辑模块" placement="bottom">
							<el-button v-if="scope.row.is_self==1||scope.row.is_self==2||confirmsuperMangage()||scope.row.code=='chuanyutongban'||confirmde(scope.row)" type="text" class="theme-color" size="small"
								@click="handleEdit(scope.row)">
								<img src="@/assets/images/zt_edit.png" alt="" class="operator-img">
							</el-button>
							<el-button v-else @click="handleEdit(scope.row)" type="text" class="theme-color" size="small" disabled>
								<img src="@/assets/images/zt_edit1.png" alt="" class="operator-img">
							</el-button>
						</el-tooltip>
						<!-- 第一版先去掉和副本相关内容 -->
						<!-- <el-button @click="lookCopy(scope.row)" type="text" class="theme-color" size="small">{{ scope.row.copy_num ?
						'查看' : '新建'
						}}副本</el-button> -->
						<el-tooltip class="item" effect="dark" content="删除专题" placement="bottom">
							
							<el-button v-if="scope.row.is_self==1||confirmsuperMangage()||confirmde(scope.row)" type="text" class="theme-color" size="small"
								@click="handleDel(scope.row)">
								<img src="@/assets/images/zt_del.png" alt="" class="operator-img">
							</el-button>
							<el-button v-else
								@click="handleDel(scope.row)" type="text" class="theme-color" size="small" disabled>
								<img src="@/assets/images/zt_del1.png" alt="" class="operator-img">
							</el-button>
						</el-tooltip>

					</div>
					<div v-else>
						<el-button type="text" class="theme-color" size="small" @click="choseTopic(scope.row)">
							选择该专题模块
						</el-button>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<el-dialog :visible.sync="showxcx" width="600px" top="8vh" class="xcxdialog">
			<div class="xcxDialogwrap">
				<div class="xcxDialogwrap-left">
					<div>
						<p class="xcxcode">小程序路径</p>
						<p class="xcxcontent">
							{{'pages/newTopic/newTopic?name='+currentrow.row.code+'&citycode='+cityCode}}
						</p>
					</div>
					<div>
						<p class="xcxcode">路径代码</p>
						<p class="xcxcontent">{{getstring()}}</p>
					</div>
				</div>
				<div class="xcxDialogwrap-right">
					<p class="xcxcode">小程序码</p>
					<img :src="imgUrl" class="xcximg" />
				</div>
			</div>
		</el-dialog>
		<CopyDialog v-if="copyVisible" :handle-data="handleData" :copy-visible="copyVisible" @hideDialog="hideDialog" />
		<cityDialog v-if="showcityDialog" :handle-data="handleData" :copy-visible="showcityDialog"
			@hideDialog="hideDialogs" />
		<authorityDialog v-if="showAuthority" :handle-data="handleData" :copy-visible="showAuthority"
			@hideDialog="hideAuthority" />
	</div>
</template>

<script>
	import axios from 'axios';
	import console from 'console'
	import CopyDialog from './components/copyDialog/index.vue'
	import cityDialog from './components/cityDialog/index.vue'
	import authorityDialog from './components/authorityDialog/index.vue'
	import api from '@/api/api.js'
	export default {
		name: 'SubjectTable',
		props: {
			isEditor: {
				type: Boolean,
				default: false,
			},
			tableData: {
				type: Array,
				default: () => [],
			},
			loading: {
				type: Boolean,
				default: false,
			},
			ismy:{
				type:Boolean,
				default:false
			}
		},
		components: {
			CopyDialog,
			cityDialog,
			authorityDialog
		},
		data() {
			return {
				showAuthority:false,
				showxcx: false,
				imgUrl: '',
				showcityDialog: false,
				citycodes: 'wh',
				usermsg: {},
				currentrow: {
					row: {
						code: ''
					}
				},
				tableHeader: {
					background: '#f6f6f6',
					color: '#333',
				},
				tableHeader2: {
					background: '#f1f1f1',
					color: '#333',
				},
				handleData: {},
				copyVisible: false,
				cityCode: '',
				guideShow: [] //新手指引
			}
		},
		mounted() {
			if (JSON.parse(sessionStorage.getItem('guideShow'))) {
				this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
			}
			window.addEventListener('setItem', () => {
				this.guideShow = JSON.parse(sessionStorage.getItem('guideShow'))
			})

			this.setCityCode()	

		},
		beforeDestroy() {
			// 移除对 sessionStorage 的监听
			window.removeEventListener('setItem', () => {})
		},
		computed: {

		},
		methods: {
			handleShowAuthority(row){
				let params = {
					zt_id:row.id
				}
				api.getAuthorityList(params).then((res)=>{
					this.handleData = res
					this.handleData.zhuantiInfo = row
					this.showAuthority = true
				})
			},
			confirmde(row) {
				if (row.id == 778) {
					if (this.usermsg.realname == '半夏') {
						return true
					} else {
						return false
					}
				} else {
					return false
				}
			},
			confirmsuperMangage(row) {
				let superList = ['阿柴', '爱华', '7哥','车车','稀饭']
				if (superList.includes(this.usermsg.realname)) {
					return true
				} else {
					return false
				}

			},
			getstring() {
				let str =
					`<a data-miniprogram-appid="wx2efc0705600eb6db" data-miniprogram-path="pages/newTopic/newTopic?name=${this.currentrow.row.code}&citycode=${this.cityCode}">${this.currentrow.row.name}</a>`
				return str
			},
			goxcx(scope) {
				console.log(scope)
				this.currentrow = scope
				axios.get('/dgapi/smartprogram/qrcode.php', {
					params: {
						scene: `${scope.row.code}/${this.cityCode}`,
						page: 'pages/newTopic/newTopic'
					},
					responseType: 'blob',
				}).then((res) => {
					this.imgUrl = window.URL.createObjectURL(res.data);
					this.showxcx = true;
				})
			},
			opencity(row) {
				if (row.city_num > 0) {
					this.handleData = row
					this.showcityDialog = true
				} else {
					this.$message('该专题暂无城市数据');
				}
			},
			choseTopic(row) {
				this.$emit('choseTopic', row)
			},
			// 获取城市citycode
			async setCityCode() {
				const res = await this.$api.reqGetUserLoginInfo()
				this.usermsg = res.user_info
				if (res.city_info) {
					let {
						citycode
					} = res.city_info
					if (citycode !== 'sz') {
						this.cityCode = citycode
					}
				}
			},
			/* 
			 @lookCopy
			 @description:查看副本数弹窗
			 */
			lookCopy(row) {
				if (row.copy_num) {
					this.handleData = row
					this.copyVisible = true
				} else {
					this.$router.push({
						name: 'editor',
						query: {
							id: row.id,
							pid: row.id,
						}
					})
				}

			},
			/* 
			 @handleManage
			 @description:数据管理
			 */
			handleManage(row) {
				this.$router.push({
					name: 'dataManage',
					query: {
						id: row.id,
						title: row.name,
						type: row.type
					},
					// params: { id: row.id, title: row.name },
				})
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
						type: row.topic_type
					}
				})
			},
			/* 
			 @handleAdd
			 @description:查看/新增副本
			 */
			handleAdd(row) {
				this.$emit('getList')
			},
			/* 
			 @handleDel
			 @description:删除
			 */
			handleDel(row) {
				this.$confirm('建议删除前导出数据，以作备份，确定直接删除所选专题吗?', '提示', {
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
								await this.$emit('getList')
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
			 @hideDialog
			 @description:关闭弹窗
			 */
			hideDialog() {
				this.copyVisible = false
			},
			hideDialogs() {
				this.showcityDialog = false
			},
			hideAuthority() {
				this.showAuthority = false
			}
		},
	}
</script>
<style lang="less" scoped>
	.creater-wrap{
		display:flex;
		justify-content:center;
		align-items:center;
		img{
			width:18px;
			height:18px;
		}
	}
	.xcxDialogwrap {
		display: flex;

		.xcximg {
			width: 170px;
			height: 170px
		}

		.xcxDialogwrap-left {
			display: flex;
			flex-direction: column;
			justify-content: space-around
		}

		.xcxcontent {
			background-color: #F4F5FF;
			border-radius: 5px;
			padding: 10px
		}
	}

	.xcxcode {
		font-weight: 700;
		font-size: 16px;
		color: #333;
	}

	.subject-table {
		height: 100%;

		.disabled {
			color: #C0C4CC !important;
		}

		a {
			color: inherit;
		}
	}
</style>
<style lang="less">
	.subject-table {
		.el-dialog__body {
			padding: 0px 20px 20px 20px !important;
		}

		/* 滚动条 */
		&::-webkit-scrollbar {
			width: 5px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #d9d9d9;
			border-radius: 2.5px;
		}

		.cell {
			white-space: nowrap;
		}

	}

	.theme-color {
		font-size: 14px;
		cursor: pointer;

		.operator-img {
			width: 30px;
			height: 30px;

			img {
				width: 27px;
				height: 27px;
			}
		}

		.operator-img:hover {
			background-color: rgba(41, 50, 252, 0.1);
			// background-color: #FFDCDC;
		}
	}
</style>
