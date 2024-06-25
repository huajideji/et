<template>
  <div class="keywordsInfostyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>
    <p class="suggest">根据文章关键词自动调取相关文章。</p>

    <div style="height: 22px" />

    <!-- 表单 -->
    <el-form :model="datas" :rules="rules" label-position="top" label-width="100px" ref="formList">
      <div class="block" v-for="(item, index) in datas.value_list" :key="item + index">
	  	<i class="el-icon-close" @click="deleteList(index)" v-if="index != 0"/>
		<el-form-item :label='`标题${index+1}`' :hide-required-asterisk="true" :prop="'value_list.' + index + '.title'"
                :rules="rules.title">
			<el-input v-model="item.title"  />
		</el-form-item>
		<el-form-item :label="`资讯关键词${index+1}`" :hide-required-asterisk="true" :prop="'value_list.' + index + '.keyword'"
                :rules="rules.keyword">
			<el-input v-model="item.keyword"  />
		</el-form-item>
      </div>
  
    </el-form>

	<!-- 新增 -->
	<div @click="addList()" class="addBtn" v-if="datas.value_list.length < 4">
		<i class="el-icon-plus" />新增
	</div>

	<div style="height:100px;"></div>
	<div class="saveBtn flex">
	<span class="saveForm" @click="saveForm">检查</span>
	</div>
  </div>
</template>

<script>
	export default {
		name: 'keywordsInfostyle',
		props: {
			datas: Object,
		},
		data() {
			return {
				
				isNull:false,
				rules: {
					//校验表单输入
					title: [
						//标题
						{ required: true, message: '请输入标题', trigger: 'blur' },
					],
					keyword: [
						//资讯关键词
						{ required: true, message: '请输入资讯关键词', trigger: 'blur' },
					],
				},
			}
		},
		created(){
		},
		computed:{
		},
		methods: {
			addList() {
				this.datas.value_list.push({
					id: 0,
					title: '',
					keyword: '',
				})
			},
			deleteList(index) {
				this.datas.value_list.splice(index, 1)
				if (this.datas.key_list[index]) {
					this.datas.key_list.splice(index, 1)
				}
			},
			// 保存
			saveForm() {
				this.$refs['formList'].validate((valid) => {
					if (!valid) {
						this.$message.error('尚未完成编辑，无法保存')
					}else{
						this.$message.success('当前模块填写完整')
					}
				});
				// [ { "text":"模块名称", 模块名称,前端使用 "sort":0, 排序 "value_list":{ 字段列表 "keyword":"dsfsd" 关键词信息 } } ]
				// const keywordsList = [
				// 	{
				// 		text: this.datas.text,
				// 		sort: 0,
				// 		value_list: [
				// 			{
				// 				keyword:this.datas.value_list[0].keyword,
				// 			},
				// 			{
				// 				keyword:this.datas.value_list[1].keyword,
				// 			},
				// 			{
				// 				keyword:this.datas.value_list[2].keyword,
				// 			},
				// 			{
				// 				keyword:this.datas.value_list[3].keyword,
				// 			}
				// 		],
				// 	},
				// ]
				// this.$store.commit('setKeywordsinfo', keywordsList)
				// this.$message.success('保存成功')
			},
		},
	}
</script>

<style scoped lang="less">
	.keywordsInfostyle {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		padding: 0 18px 20px;
		box-sizing: border-box;
		/* 标题 */
		h2 {
			padding: 21px 0 7px 0;
			font-size: 16px;
			font-weight: 700;
			color: #333333;
		}
		.suggest {
			font-size: 12px;
			font-weight: 400;
			color: #999;
		}
		.el-form {
			.block {
				position: relative;
				margin-bottom: 12px;
				padding: 21px 22px 24px 18px;
				border-radius: 4px;
				background-color: #f8f8f8;
				::v-deep .el-form-item__label {
					line-height: normal;
				}
				::v-deep .el-form-item__content {
					margin-left: 0 !important;
					line-height: normal;
					.el-radio-group {
						position: unset;
						margin-bottom: 10px;
					}
					.el-input__inner {
						height: 32px;
						line-height: 32px;
					}
				}
				.el-form-item {
					// display: flex;
					// align-items: center;
					margin-bottom: 17px;
				}
				.el-form-item:last-of-type {
					margin-bottom: 0;
				}
			}
		}
		// 新增按钮
		.addBtn {
			width: 90px;
			height: 32px;
			line-height: 32px;
			border-radius: 4px;
			border: 0;
			text-align: center;
			font-size: 12px;
			color: #fff;
			background: rgba(96, 101, 236, 1);
		}
		/* 删除图标 */
		.el-icon-close {
			position: absolute;
			right: 10px;
			top: 10px;
			cursor: pointer;
			font-size: 19px;
		}
	}
</style>
