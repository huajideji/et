<template>
  <div class="shareboxstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>
    <p class="suggest">分享模块，支持复制链接、生成长图、QQ空间、新浪微博分享。若不设置跳转按钮，默认显示跳转至H5主页</p>

    <div style="height: 20px" />
	<div style="margin-bottom: 20px;">
		<el-switch
                style="margin-top: 15px"
                v-model="datas.is_show"
                inactive-color="#ff4949"
                active-text="展示导粉按钮"
                inactive-text="不展示导粉按钮"
                :active-value="1"
                :inactive-value="0"
              >
              </el-switch>
	</div>
    <!-- 表单 -->
    <el-form label-position="top" label-width="80px" :model="datas" :rules="rules">
      <div class="block">
        <el-form-item label="跳转按钮1名称" :hide-required-asterisk="true" prop="value_list[0].name">
          <el-input v-model="datas.value_list[0].name" maxlength="8"/>
        </el-form-item>
        <el-form-item label="跳转按钮1跳转" :hide-required-asterisk="true" prop="value_list[0].link_url">
          <el-radio-group v-model="datas.value_list[0].link_type">
              <!-- <el-radio :label="0">无</el-radio> -->
              <el-radio :label="1">旧专题标识</el-radio>
              <el-radio :label="2">新专题标识</el-radio>
              <el-radio :label="3" style="margin:10px 0 0 0">链接 </el-radio>
          </el-radio-group>
          <el-input v-model="datas.value_list[0].link_url" placeholder="不填写链接返回首页"/>
        </el-form-item>
      </div>

      <div class="block">
        <el-form-item label="跳转按钮2名称" :hide-required-asterisk="true">
          <el-input v-model="name2" @input="changeName" maxlength="8"/>
        </el-form-item>
        <el-form-item label="跳转按钮2跳转" :hide-required-asterisk="true">
          <el-radio-group v-model="link_type2" @change="changeType">
              <!-- <el-radio :label="0">无</el-radio> -->
              <el-radio :label="1">旧专题标识</el-radio>
              <el-radio :label="2">新专题标识</el-radio>
              <el-radio :label="3" style="margin:10px 0 0 0">链接 </el-radio>
          </el-radio-group>
          <el-input v-model="link_url2" @input="changeUrl"/>
        </el-form-item>
      </div>

      <el-input type="text" v-model="btnLen" style="display:none;"/>
      <el-input type="text" v-model="isLink" style="display:none;"/>

      <div style="height:100px;"></div>
      <div class="saveBtn flex">
        <span class="saveForm" @click="saveForm">检查</span>
      </div>
    </el-form>
  </div>
</template>

<script>
	export default {
		name: 'shareboxstyle',
		props: {
			datas: Object,
		},
		data() {
			return {
				btnArr: [
					{
						name: '',
						link_type: "",
						link_url: '',
					},
				],
				name2: '',
				link_type2: "",
				link_url2: '',
				// linkCheck:true,
				rules: {
					//校验表单输入
					'value_list[0].name': [
						//按钮名称
						{ required: true, message: '请输入按钮名称', trigger: 'blur' },
					],
					'value_list[0].link_url': [
						//专题标识
						{ required: false, message: '请输入专题标识或链接', trigger: 'blur' },
					],
				},
			}
		},
	created() {
			if (this.datas.value_list[1]) {
				this.name2 = this.datas.value_list[1].name
				this.btnArr[0].name = this.datas.value_list[1].name
				this.link_type2 = this.datas.value_list[1].link_type
				this.btnArr[0].link_type = this.datas.value_list[1].link_type
				this.link_url2 = this.datas.value_list[1].link_url
				this.btnArr[0].link_url = this.datas.value_list[1].link_url
			}

		},
		computed: {
			btnLen() {
				if (this.btnArr[0].name && this.btnArr[0].link_type && this.btnArr[0].link_url) {
					return 1
				}
			},
			isLink() {
				if (this.datas.value_list[0].link_type == 3 && this.link_type2 == 3) {
					return 1
				}else if (this.datas.value_list[0].link_type == 3) {
					return 2
				}else if (this.link_type2 == 3) {
					return 3
				}else {
					return 0
				}	
			}
		},
		watch: {
			btnLen(newVal) {
				if (newVal === 1) {
					if (!this.datas.value_list[1]) {
						this.datas.value_list.push({
							id: 0,
							name: this.btnArr[0].name,
							link_type: this.btnArr[0].link_type,
							link_url: this.btnArr[0].link_url,
						})
					}
				}else{
					this.datas.value_list.pop()
				}
            }
		},
		methods: {
			// 第二个按钮名称改变
			changeName(val) {
				this.btnArr[0].name = val
				this.setVal2()
			},
			// 第二个按钮类型改变
			changeType(val) {
				if (this.datas.key_list && this.datas.key_list[1]) {
					this.$set(this.btnArr, 0, {
						id:this.datas.key_list[1].id,
						name: this.name2,
						link_type: this.link_type2,
						link_url: this.link_url2,
					})
				}else{
					this.$set(this.btnArr, 0, {
						id:0,
						name: this.name2,
						link_type: this.link_type2,
						link_url: this.link_url2,
					})
				}
				
				this.setVal2()
			},
			// 第二个按钮链接改变
			changeUrl(val) {
				this.btnArr[0].link_url = val
				this.setVal2()
			},
			// 给第二个按钮赋值
			setVal2() {
				if (this.datas.value_list[1]) {
					if (this.datas.key_list  && this.datas.key_list[1]) {
						this.$set(this.datas.value_list,1,{
							id:this.datas.key_list[1].id,
							name: this.name2,
							link_type: this.link_type2,
							link_url: this.link_url2,
						})
					}else{
						this.$set(this.datas.value_list,1,{
							id:0,
							name: this.name2,
							link_type: this.link_type2,
							link_url: this.link_url2,
						})
					}
					
				}
			},
			// 检验跳转url是否合规
			checkUrl(datas) {
				// let URL = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
				// if (this.isLink && datas) {
				// 	if (!URL.test(datas)) {
				// 		this.linkCheck = false
				// 		// this.$message.error("请输入合法的跳转链接")
				// 	}else{
				// 		this.linkCheck = true
				// 	}
				// }
			},
			// 保存
			saveForm() {
				if (!this.datas.value_list[0].name) {
					this.$message.error('尚未完成编辑，无法保存')
					return
				}
				let URL = /(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?/;
				if (this.isLink == 2) {
					if (this.datas.value_list[0].link_url && !URL.test(this.datas.value_list[0].link_url)) {
						this.$message.error("请输入合法的跳转链接")
						return
					}
				}else if (this.isLink == 3) {
					if (this.link_url2 && !URL.test(this.link_url2)) {
						this.$message.error("请输入合法的跳转链接")
						return
					}
				}else if (this.isLink == 1) {
					if ((this.datas.value_list[0].link_url && !URL.test(this.datas.value_list[0].link_url)) || (this.link_url2 && !URL.test(this.link_url2))) {
						this.$message.error("请输入合法的跳转链接")
						return
					}
				}
				// const valueList = [
				// 	{
				// 		name: this.datas.value_list[0].name,
				// 		link_type: this.datas.value_list[0].link_type,
				// 		link_url: this.datas.value_list[0].link_url,
				// 	},
				// ]
				// if (
				// 	this.datas.value_list[1].link_type &&
				// 	this.datas.value_list[1].link_url
				// ) {
				// 	valueList.push({
				// 		name: this.datas.value_list[1].name,
				// 		link_type: this.datas.value_list[1].link_type,
				// 		link_url: this.datas.value_list[1].link_url,
				// 	})
				// }
				// const shareboxList = [
				// 	{
				// 		text: this.datas.text,
				// 		sort: 0,
				// 		is_absolute: 1, //0是relative  1是fixed
				// 		value_list: valueList,
				// 	},
				// ]
				// this.$store.commit('setSharebox', shareboxList)
				this.$message.success('当前模块填写完整')
			},
		},
	}
</script>

<style scoped lang="less">
	.shareboxstyle {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		padding: 0 18px 20px;
		box-sizing: border-box;
		/* 标题 */
		h2 {
			padding: 21px 16px 6px 0;
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
				margin-bottom: 20px;
				padding: 17px 20px 24px;
				border-radius: 4px;
				background-color: #f8f8f8;
				::v-deep .el-form-item__label {
					line-height: normal;
				}
				::v-deep .el-form-item__content {
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
				// .el-form-item {
				//   margin-bottom: 22px;
				// }
			}
		}
	}
</style>
