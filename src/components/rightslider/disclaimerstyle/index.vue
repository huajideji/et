<template>
  <div class="disclaimerstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>
    <p class="suggest">免责声明，可在文字中添加超链接</p>

    <div style="height: 22px" />

    <!-- 表单 -->
    <el-form label-position="top" label-width="80px" :model="datas" :rules="rules">
      <div class="block">
        <el-form-item label="免责声明内容" :hide-required-asterisk="true" prop="value_list[0].content">
          <el-input v-model="datas.value_list[0].content" type="textarea" rows="4" />
        </el-form-item>
        <el-form-item label="超链接字眼" :hide-required-asterisk="true">
          <el-input v-model="datas.value_list[0].link_word" />
        </el-form-item>
        <el-form-item label="超链接字眼url" :hide-required-asterisk="true">
          <el-input v-model="datas.value_list[0].link_word_url" />
        </el-form-item>
      </div>

      <div style="height:100px;"></div>
      <div class="saveBtn flex">
        <span class="saveForm" @click="saveForm">检查</span>
      </div>
	  
    </el-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
	export default {
		name: 'disclaimerstyle',
		props: {
			datas: Object,
		},
		data() {
			return {
				rules: {
					//校验表单输入
					"value_list[0].content": [
						//免责声明内容
						{ required: true, message: '请输入免责声明内容', trigger: 'blur' },
					],
				},
			}
		},
		methods: {
			...mapMutations('disclaimer', ['setDesclaimer']),
			// 保存
			saveForm() {
				if (!this.datas.value_list[0].content.trim()) {
					this.$message.error('尚未完成编辑，无法保存')
					return
				}
				// [ { "text":"模块名称", 模块名称,前端使用 "sort":0, 排序 "value_list":{ 字段列表 "content":"342342", 免责声明内容 "link_word":"sdfs", 超链接字眼 "link_word_url":"http://www.baidu.com" 超链接字url } } ]
				this.setDesclaimer(this.datas)
				// this.$store.commit('setDesclaimer', desclaimerList)
				this.$message.success('当前模块填写完整')
			},
		},
	}
</script>

<style scoped lang="less">
	.disclaimerstyle {
		width: 100%;
		position: absolute;
		left: 0;
		top: 0;
		padding: 0 18px 20px;
		box-sizing: border-box;
		color: #333;
		/* 标题 */
		h2 {
			padding: 21px 16px 6px 0;
			font-size: 16px;
			font-weight: 700;
		}
		.suggest {
			font-size: 12px;
			font-weight: 400;
			color: #999;
		}
		.el-form {
			.block {
				margin-bottom: 12px;
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
					.el-textarea__inner {
						color: #999;
					}
				}
			}
		}
	}
</style>
