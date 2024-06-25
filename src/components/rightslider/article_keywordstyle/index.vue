<template>
	<div class="keyword_articlestyle">
		<!-- 标题 -->
		<h2>{{ datas.text }}</h2>
		<div class="desc">
			通过关键词自动为用户推送文章
		</div>
<!-- 
		<div class="card header" v-if="$route.query.type==1">
			<el-form :model="datas" :rules="rules" label-position="top" ref="header">

				<el-radio v-model="datas.is_point" :label="1">AB有关的点对点逻辑</el-radio>
				<el-radio v-model="datas.is_point" :label="2" style="margin-top:12px">只与A城市有关</el-radio>
				<el-radio v-model="datas.is_point" :label="0" style="margin-top:12px">只与B城市有关</el-radio>
			</el-form>
		</div> -->
		<div class="card header">
			<el-form :model="datas" :rules="rules" label-position="top" ref="header">
				<el-form-item label="模块名称" prop="name">
					<el-input type="text" v-model="datas.name" autocomplete="off" maxlength="14"></el-input>
				</el-form-item>
				<el-radio v-model="datas.is_show" :label="2">创建人命名</el-radio>
				<!-- <el-radio v-model="datas.is_show" :label="1">编辑自由命名</el-radio> -->
				<el-radio v-model="datas.is_show" :label="0" style="margin-top:12px">不显示名称</el-radio>
			</el-form>
		</div>
                 <div class="card">
                <el-form :model="datas" :rules="rules" label-position="top" ref="keyword">
				<el-form-item prop="keyword">
                    <p slot="label" style="margin-bottom:0px"><span style="color: red">*</span> 文章关键词</p>

					<el-input type="text" v-model="datas.value_list[0].keyword" autocomplete="off"></el-input>
				</el-form-item>
	
			</el-form>
            </div>
		<div class="elements">
			<p>包含元素</p>
			<div class="card">
				<el-checkbox label="更新时间" name="type" @change="changeUpdateTime($event)" :checked="!!this.datas.is_update_time">
				</el-checkbox>
				<!-- <el-checkbox label="图片" name="type" @change="changeImage($event)" :checked="!!this.datas.is_image">
				</el-checkbox> -->
			</div>
   
			<div class="card">
				<span class="detail">
					文章详情
				</span>
				<el-radio-group v-model="datas.article_detail">
					<el-radio :label="0">无</el-radio>
					<el-radio :label="1">1行详情</el-radio>
					<el-radio :label="3" :disabled="datas.is_image == 0">3行详情</el-radio>
				</el-radio-group>
			</div>
		</div>
		<div class="others-moudle">
			<p>其他模块属性</p>
			<div class="card folding">
				<span style="margin-right:8px">
					折叠/展开 >
				</span>
				<el-input placeholder="请选择折叠数" v-model="datas.fold" type="number" size="mini" min="0" max="9">
				</el-input>
				<span style="margin-left:8px">
					行折叠
				</span>
				<span style="color:#999999; font-size:12px; margin-left:5px">
					默认为0，不折叠
				</span>
			</div>
		</div>
		<!-- <div class="redirect">
			<div class="card">
				<div class="title">
					跳转其他页面
				</div>
				<div class="redirect-type">
					<div class="redirect-top">
						<el-radio-group v-model="datas.jump_type" @change="chosenRedirect">
							<el-radio :label="0">无</el-radio>
							<el-radio :label="1">旧专题标识</el-radio>
							<el-radio :label="2">新专题标识</el-radio>
							<br></br>
							<el-radio :label="3" style="margin-top:16px">链接 </el-radio>
							<span class="tips" style="margin-top:16px">由各站点编辑自行填写</span>
							<el-radio :label="4" style="margin-top:16px" v-if="!$parent.pageSetup.is_child">子页面入口
							</el-radio>
						</el-radio-group>
					</div>
					<el-form :model="datas" :rules="rules" label-position="top" ref="jump">
						<div class="redirect-bottom" v-show="datas.jump_type == 1 || datas.jump_type == 2">
							<el-form-item label="跳转专题标识" prop="jump_code">
								<el-input v-model="datas.jump_code" placeholder="请输入跳转专题标识">
								</el-input>
							</el-form-item>
						</div>
						<div class="redirect-bottom" v-show="datas.jump_type == 4">
							<el-form-item label="子页面标识" prop="jump_code">
								<el-select v-model="datas.jump_code" placeholder="请选择子页面">
									<el-option v-for="item in $parent.childrenPageList" :key="item.id" :label="item.code" :value="item.code">
									</el-option>
								</el-select>
							</el-form-item>
						</div>

						<div class="jump-type" v-show="datas.jump_type != 0">
							<el-form-item label=" 入口位置" prop="jump_place"></el-form-item>
							<div class="type">
								<div class="type-box">
									<div>
										<span class="top-right">查看更多
											<i class="el-icon-arrow-right"></i>
										</span>
									</div>
									<el-radio v-model="datas.jump_place" :label="0">右上角</el-radio>
								</div>

								<div class="type-box">
									<div>
										<span class="bottom-right">查看更多
											<i class="el-icon-arrow-right"></i>
										</span>
									</div>
									<el-radio v-model="datas.jump_place" :label="1">右下角</el-radio>
								</div>
								<div class="type-box">
									<div>
										<span class="under">查看更多
											<i class="el-icon-arrow-right"></i>
										</span>
									</div>
									<el-radio v-model="datas.jump_place" :label="2" :disabled="!!(+datas.fold)">正下方
									</el-radio>
								</div>
								<div class="type-box">
									<div class="">
									</div>
									<el-radio v-model="datas.jump_place" :label="3" disabled>整个模块</el-radio>
								</div>
							</div>
						</div>
						</el-form-item>
					</el-form>
				</div>
				<!== <el-input v-model="datas.redirect.url" placeholder="请输入内容" size="mini" v-if="datas.redirect.type">
                </el-input> ==>
			</div>
		</div> -->
		<!-- <div class="card add-search">
			<div class="switch-box" :class="{ padding: datas.is_search }">
				<span> 选项卡 </span>
				<div class="switch" :class="{ isOn: datas.is_option }" @click="chosenSwitchTwo">
					<span class="radius"></span>
				</div>
			</div>
		</div> -->
<!-- 
		<template v-if="datas.is_option==1">
			<div class="card" v-show="xuanList.length > 0" v-for="(item, index) of xuanList" :key="index">
				<el-form :model="item" :rules="xuanRules" label-position="top" ref="xuanlist">
					<el-form-item :label="`选项卡${index + 1}名称`" prop="name">
						<el-input type="text" v-model="item.name" autocomplete="off" @input="handleCheck(item)" maxlength="10"
						 placeholder="">
						</el-input>
					</el-form-item>
				</el-form>
				<span class="delete" @click="deletexuan(index)">
					<i class="el-icon-close"></i>
				</span>
			</div>
			<button class="btn" @click="addxuan()">
				<i class="el-icon-plus"></i>
				<span>选项卡+</span>
			</button>
		</template> -->
		<!-- <button id="save" @click="saveData">
            保存
        </button> -->
		<div style="height:100px;"></div>
		<div class="saveBtn flex">
			<span class="saveForm" @click="saveData">检查</span>
		</div>

	</div>
</template>
<script>
	import {
		mapMutations
	} from 'vuex'
	export default {
		name: 'keyword_articlestyle',
		props: {
			datas: Object
		},
		data() {
            var keywordCheck = (rule, value, callback) => {
                if (this.datas.value_list[0].keyword === '') {
                    return callback(new Error('请输入文章关键词'))
                } else {
                    callback()
                }
            }
			return {
				xuanList: [],
				xuanRules:{
						  name: [{ required: true, message: '请输入选项名称', trigger: 'blur' }],
				},
				rules: {
					name: [{
						required: true,
						message: '请输入模块名称',
						trigger: 'blur'
					}, ],
                    keyword: [{ validator: keywordCheck, trigger: 'blur' } ],
					jump_code: [{
						required: true,
						message: '标识不能为空',
						trigger: 'change'
					}, ],
					// jump_place: [{
					// 	required: true,
					// 	message: '请选择入口位置',
					// 	trigger: 'change'
					// }, ],
				}, // 模块验证列表

			}
		},
		watch: {
			xuanList: {
				handler(newVal) {
					if (this.xuanList.length > 0) {
						let newStr = []
						this.xuanList.forEach((aitem) => {
								newStr.push(aitem.name)
						})
						this.datas.option_data = newStr.join("^")
						console.log(this.datas.option_data)
					}
				},
				// 开启深度监听
				deep: true,
			},
		},
		computed: {
			showFold() {
				// if (this.datas.jump_place == 2) {
				// 	this.datas.fold = 0
				// 	this.isFolding = '0'
				// 	return true
				// }
				return false
			},
		},
		mounted() {
			// if (this.datas.is_option == 1 && this.xuanList.length == 0) {
			// 	this.datas.option_data.split('^').forEach((item) => {
			// 		this.xuanList.push({
			// 			name: item
			// 		})
			// 	})
			// }
		},
		methods: {
			chosenSwitchTwo() {
				this.datas.is_option == 0 ?
					(this.datas.is_option = 1) :
					(this.datas.is_option = 0)
			},
			handleCheck(item) {
				if (this.routePath != '/moduleSubmit') {
					if (this.defaultArr.includes(item.name)) {
						this.$message.error('名字与默认表头冲突')
						item.name = ''
					}
				}
			},
			deletexuan(contentIndex) {
				// 删除模块下字段
				this.xuanList.splice(contentIndex, 1)
			},
			addxuan() {
				this.xuanList.push({
					name: '', //选项名称
				})
			},
			...mapMutations('article_list', ['SETARTICLELIST']),
			changeUpdateTime(e) {
				if (e) {
					this.datas.is_update_time = 1
				} else {
					this.datas.is_update_time = 0
				}
				this.datas.article_detail = 0
			},
			changeImage(e) {
				if (e) {
					this.datas.is_image = 1
				} else {
					this.datas.is_image = 0
				}
				this.datas.article_detail = 0
			},

			/* 存储需要创建的专题模块数据 */
			saveData() {
				let value = true
				if (!this.datas.name.length) {
					value = false;
					this.$refs.header.validate((valid) => {
						if (!valid) {
							return false;
						}
					});
				}
                if(this.datas.value_list[0].keyword == ''){
                    value = false
                }
				if(this.datas.is_option==1){
						  this.xuanList.map((item, index) => {
						    if (utils.fieldObjectValueHaveEmpty(item)) {
						      this.$refs.xuanlist[index].validate((valid) => {
						        if (!valid) {
						          value = false
						          return false
						        }
						      })
						    }
						  })
				}
				if (this.datas.jump_type && this.datas.jump_type != 3) {
					// if (this.datas.jump_code.length == 0 || this.datas.jump_place == 4) {
					// 	value = false;
					// 	this.$refs.jump.validate((valid) => {
					// 		if (!valid) {
					// 			return false;
					// 		}
					// 	});
					// }
				}
				if (!value) {
					// this.$notify({
					//     message: '请完成必填项',
					//     type: 'warning',
					//     showClose: false,
					//     duration: 1000,
					// });
					this.$message.error("请完成必填项")
					return
				}
				// this.$notify({
				//     message: '保存成功',
				//     type: 'success',
				//     showClose: false,
				//     duration: 1000,
				// });
				this.$message.success("当前模块填写完整")
			},
			/* 元素更改 */
			changeElement() {
				this.datas.detail = 0
			},
			// 更改选择跳转类型，入口位置置空
			chosenRedirect() {
				// this.$refs.jump.resetFields()
				// this.datas.jump_code = '';
				// this.datas.jump_type == 0 ? this.datas.jump_place = 4 : this.datas.jump_place = 0;
			}
		},
	}
</script>
<style scoped lang="less">
	.keyword_articlestyle {
		.delete {
			display: flex;
			align-items: end;
			margin-left: 45px;
		}

		.card {
			background: #f8f8f8;
			border-radius: 5px;
			padding: 18px 10px;
			margin: 12px 0;
			position: relative;

			.delete {
				position: absolute;
				top: 14px;
				right: 20px;
				font-size: 18px;
				font-weight: bolder;
				cursor: pointer;
			}
		}

		.btn {
			width: 90px;
			height: 32px;
			border-radius: 4px;
			background-color: #6065ec;
			color: #fff;
			border: none;
			margin-bottom: 20px;
			margin-top: 8px;
			font-size: 12px;
		}

		.add-search {
			font-size: 14px;
			color: #333;
			font-weight: 400;
			padding-bottom: 8px;

			.switch-box {
				display: flex;
				align-items: center;

				&.padding {
					padding-bottom: 18px;
				}

				>span {
					margin-right: 12px;
				}

				>img {
					width: 48px;
					height: 24px;
				}

				.switch {
					width: 48px;
					height: 24px;
					background-color: #d9d9d9;
					position: relative;
					border-radius: 12px;
					transition: all 0.2s linear;

					.radius {
						display: block;
						width: 20px;
						height: 20px;
						border-radius: 10px;
						margin-top: 2px;
						background-color: #fff;
						position: absolute;
						left: 3px;
					}

					&.isOn {
						background-color: #6065ec;

						.radius {
							left: 25px;
						}
					}
				}
			}
		}

		/* 标题 */
		h2 {
			padding: 21px 16px 6px 0;
			font-size: 16px;
			font-weight: 700;
			color: #333333;
		}

		p {
			font-size: 14px;
			font-weight: 700;
			color: #333333;
			margin-bottom: 20px;
		}

		.desc {
			color: #999999;
			margin-top: 3px;
			margin-bottom: 20px;
			font-size: 14px;
		}

		.card {
			background: #f8f8f8;
			border-radius: 5px;
			padding: 18px 10px;
			margin: 12px 0;

			&.header {
				margin: 25px 0;
			}

			.detail {
				margin-right: 15px;
			}

			.tips {
				font-size: 12px;
				color: #666666;
				margin-left: -18px;
				margin-right: 20px;
			}
		}

		.redirect {

			// 添加搜索样式


			.title {
				margin-bottom: 12px;
			}
		}

		.redirect-type {
			.redirect-bottom {
				margin-top: 15px;

				.title {
					display: block;
					margin-bottom: 10px;
				}
			}

			.jump-type {
				margin-top: 17px;

				.title {
					display: block;
					margin-bottom: 10px;
				}

				.type {
					display: flex;
					justify-content: space-between;
					flex-wrap: wrap;

					.type-box {
						display: flex;
						flex-direction: column;
						justify-content: center;
						margin-bottom: 10px;

						>div {
							width: 158px;
							height: 87px;
							border-radius: 2px;
							border: 1px solid rgba(217, 217, 217, 1);
							background-color: #fff;
							margin-bottom: 8px;
							position: relative;

							>span {
								color: #6065EC;
								font-size: 14px;
								position: absolute;

								&.top-right {
									right: 10px;
									top: 10px;
								}

								&.bottom-right {
									right: 10px;
									bottom: 10px;
								}

								&.under {
									// left: 50%;
									bottom: 10px;
									transform: translateX(56%);
								}

							}
						}
					}
				}
			}
		}
	}
</style>
<style lang="less">
	.keyword_articlestyle {
		.el-form-item {
			margin-bottom: 16px;
		}

		.el-select {
			width: 100%;
		}

		.folding {
			.el-input {
				width: 60px;
			}

			.foldingNum {
				margin-right: 10px;
				margin-left: 20px;
			}
		}

		.type-box {
			.el-radio {
				display: flex;
				justify-content: center;
			}
		}

		.redirect-bottom {
			.el-input {
				height: 32px;

				.el-input__inner {
					height: 32px;
					line-height: 32px;
				}
			}
		}
	}
</style>
