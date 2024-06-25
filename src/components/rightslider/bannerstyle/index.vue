<template>
  <div class="bannerstyle">
    <!-- 标题 -->
    <h2>{{ datas.text }}</h2>
    <p class="suggest">建议置顶</p>

    <div style="height: 20px" />

    <!-- 表单 -->
    <el-form label-position="top" label-width="80px" :model="datas">
      <!-- 描述 -->
      <el-form-item :hide-required-asterisk="true">
        <div class="upload-title">
          <span>*</span>上传移动端图片
        </div>
        <div class="upload-notice">请上传宽度750px，高度200px的图片，支持jpg/png格式，大小不超过100kb。图片请上传无标题文字图片。</div>
        <div class="backgroundImg">
          <el-upload
            class="avatar-uploader"
            :action="baseupload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
			:on-change="handleChange"
			name="image"
          >
            <div class="addImg" v-if="!datas.value_list[0]">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加图片</span>
            </div>
            <template v-else>
              <img draggable="false" :src="datas.value_list[0].image" alt />
              <div class="changeImg">
                <i class="el-icon-circle-plus-outline"></i>
                <span>修改图片</span>
              </div>
            </template>
          </el-upload>
        </div>
		
      </el-form-item>


	  <el-form-item :hide-required-asterisk="true">
        <div class="upload-title">
          <span>*</span>上传pc端图片
        </div>
        <div class="upload-notice">请上传宽度1920px的图片，支持jpg/png格式，大小不超过100kb。图片请上传无标题文字图片。</div>
        <div class="backgroundImg newbackgroundImg">
          <el-upload
            class="avatar-uploader"
            :action="baseupload"
            :show-file-list="false"
            :on-success="handleAvatarSuccessPc"
            :before-upload="beforeAvatarUploadPc"
			:on-change="handleChange"
			name="image"
          >
            <div class="addImg" v-if="!datas.value_list[0]">
              <i class="el-icon-circle-plus-outline"></i>
              <span>添加图片</span>
            </div>
            <template v-else>
              <img draggable="false" :src="datas.value_list[0].pc_image" alt />
              <div class="changeImg">
                <i class="el-icon-circle-plus-outline"></i>
                <span>修改图片</span>
              </div>
            </template>
          </el-upload>
        </div>
      </el-form-item> 
    </el-form>
	<div style="margin-top: 20px;">
		Banner标题
	</div>
	<div>
			<el-input v-model="datas.value_list[0].title" placeholder='请输入标题'></el-input>
			<div>
				支持填写{cityname}用于替换城市名称,如不加{cityname}，城市默认展示在标题最前方
			</div>
	</div>
   	<div style="height:100px;"></div>
      <div class="saveBtn flex">
      <span class="saveForm" @click="saveForm">保存</span>
    </div>
    <!-- 上传图片 -->
    <!-- <uploadimg ref="upload" @uploadInformation="uploadInformation" /> -->
  </div>
</template>

<script>
	// import uploadimg from '../../uploadImg' //图片上传

	export default {
		name: 'bannerstyle',
		props: {
			datas: Object,
		},
		data() {
			return {
				imgText: '', //哪一个图片
			}
		},
		
		methods: {
			// 提交
			// uploadInformation(res) {
			// 	this.datas[this.imgText] = res
			// },
			// 上传成功
			handleAvatarSuccess(res, file) {
				// this.datas.value_list[0].image = res.data.src
				if (this.datas.value_list[0]) {
					this.datas.value_list[0].image = res.data
				}else{
					this.datas.value_list.push({"image":res.data,'pc_image':'https://imgbdb4.bendibao.com/szbdb/20228/16/2022816095503_33928.jpg'})
				}
				this.imgText = res.data
			},

			handleAvatarSuccessPc(res, file) {
				// this.datas.value_list[0].image = res.data.src
				if (this.datas.value_list[0]) {
					// this.datas.value_list[0].image = res.data
					this.datas.value_list[0].pc_image = res.data
				}else{
					this.datas.value_list.push({'pc_image':res.data})
				}
			},
			 // 上传失败成功都会回调
			handleChange(file) {
				// 测试服测试使用
				if (file.status == 'fail') {
					this.datas.value_list[0].image = 'https://img2.baidu.com/it/u=1928736049,3128591086&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
					this.imgText = 'https://img2.baidu.com/it/u=1928736049,3128591086&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333'
				}
			},
			// 上传前图片格式校验
			beforeAvatarUpload(file) {
				const imgType = file.type
				if (['image/png', 'image/jpeg', 'image/jpg'].indexOf(imgType) === -1) {
					this.$message.error('上传图片只能是 jpg、png、jpeg格式!')
				}
				const isLt2M = file.size < 102400
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 100kb!')
				}
				const isSize = new Promise(function (resolve, reject) {
					const width = 750 
					const height = 200
					const URL = window.URL || window.webkitURL
					const img = new Image()
					img.onload = function () {
						const valid = img.width === width && img.height === height
						valid ? resolve() : reject()
					}
					img.src = URL.createObjectURL(file)
				}).then(
					() => {
						return file
					},
					() => {
						this.$message.error('图片尺寸不规范')
						return Promise.reject()
					}
				)
				return imgType && isLt2M && isSize
			},

			// 上传前图片格式校验
			beforeAvatarUploadPc(file) {
				const imgType = file.type
				if (['image/png', 'image/jpeg', 'image/jpg'].indexOf(imgType) === -1) {
					this.$message.error('上传图片只能是 jpg、png、jpeg格式!')
				}
				const isLt2M = file.size < 102400
				if (!isLt2M) {
					this.$message.error('上传图片大小不能超过 100kb!')
				}
				const isSize = new Promise(function (resolve, reject) {
					const width = 1920
					// const height = 400
					const URL = window.URL || window.webkitURL
					const img = new Image()
					img.onload = function () {
						const valid = img.width === width
						valid ? resolve() : reject()
					}
					img.src = URL.createObjectURL(file)
				}).then(
					() => {
						return file
					},
					() => {
						this.$message.error('图片尺寸不规范')
						return Promise.reject()
					}
				)
				return imgType && isLt2M && isSize
			},
			// 保存
			saveForm() {
				if (this.datas.value_list[0].image == '' || this.datas.value_list[0].pc_image =='') {
					this.$message.error('图片尚未上传，无法保存')
					return
				}
				// { "text":"模块名称", 模块名称,前端使用 "sort":0, 排序 "value_list":{ 字段列表 "image":"www.jag" 图片 } }
				const bannerList = [
					{
						text: this.datas.text,
						sort: 0,
						value_list: [{ image: this.datas.value_list[0].image,pc_image:this.datas.value_list[0].pc_image}],
					},
				]
				this.$store.commit('setBanner', bannerList)
				this.$message.success('当前模块填写完整')
			},
		},
		// components: { uploadimg },
		computed: {
			baseupload() {
				// return `${window.global_config.BASE_URL}upload/miniShop`
				// return `/image/upload/miniShop`
				return `/api/phalapi/public/?s=App.Robot_Problem.UploadFile`
			},
		},
	}
</script>

<style scoped lang="less">
	.bannerstyle {
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
			// height: 299px;
			padding: 17px 20px 24px;
			border-radius: 4px;
			background-color: #f8f8f8;
			.upload-title {
				font-size: 14px;
				color: #333;
				font-weight: 400;
				line-height: normal;
				span {
					color: #f33f3f;
				}
			}
			.upload-notice {
				margin-top: 9px;
				font-size: 12px;
				color: #999;
				text-align: justify;
				line-height: 16.7px;
			}
			.el-form-item__content {
				line-height: normal;
			}
		}

		.newbackgroundImg{
			height: 50px !important
		}
		/* 背景图 */
		.backgroundImg {
			display: inline-flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			width: 100%;
			height: 88px;
			position: relative;
			margin-top: 8px;
			border: 1px solid rgba(217, 217, 217, 1);
			background: #fff;

			img {
				width: 100%;
				height: 100%;
				
			}

			// 添加图片
			.addImg,
			.changeImg {
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				padding: 0 12px;
				border-radius: 4px;
				font-size: 12px;
				color: #6065ec;
				line-height: 32px;
				background: rgba(96, 101, 236, 0.1);
				span {
					margin-left: 6px;
				}
			}

			// 更换图片
			.changeImg {
				background: #fff;
			}

			p {
				position: absolute;
				left: 0;
				bottom: 0;
				width: 100%;
				height: 20px;
				font-size: 12px;
				color: #fff;
				background: rgba(0, 0, 0, 0.5);
				text-align: center;
				line-height: 20px;
			}
		}
		.color-select {
			::v-deep.el-form-item__content {
				float: right;
			}
		}
		.saveForm {
			margin-top: 20px;
		}
		.avatar-uploader {
			width: 100%;
			height: 100%;
			::v-deep.el-upload {
				width: 100%;
				height: 100%;
				border: 0;
				position: static;
			}
		}
	}
</style>
