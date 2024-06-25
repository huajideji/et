<template>
  <div>
    <!-- 分享工具箱 -->
    <div v-if="showTools" class="share-tools">
      <ul>
        <li @click="copy()">
          <img src="@/assets/images/copyLink.png" alt />
          <span>复制链接</span>
        </li>
        <li @click="savePic()">
          <img src="@/assets/images/savePic.png" alt />
          <span>生成长图</span>
        </li>
        <li @click="share_qqzone()">
          <img src="@/assets/images/qqzone.png" alt />
          <span>QQ空间</span>
        </li>
        <li @click="share_weibo()">
          <img src="@/assets/images/weibo.png" alt />
          <span>新浪微博</span>
        </li>
      </ul>
      <div style="text-align: center" @click="closeMask()">取消</div>
    </div>
    <div id="mask" v-if="showTools" @click="closeMask()"></div>

    <!-- 生成图片的弹窗 -->
    <div class="save_popup" :class="showToast ? 'show-toast' : ''" @click="closeToast">
      <div class="saveCon" v-if="showToast">
        <div class="saveImg">
          <img class="share-img" :src="imgUrl" />
        </div>
        <p>长按保存图片</p>
      </div>
    </div>
  </div>
</template>

<script>
	import html2canvas from 'html2canvas' // 生成图片
	export default {
		name: 'shareTools',
		props: {
			datas: Object,
		},
		data() {
			return {
				showTools: false,
				showToast: false,
				url: 'http://m.bendibao.com/news/gelizhengce/all.php', //专题链接
				titleCon: '', //标题内容
				imgUrl: '', //生成的图片
			}
		},
		mounted() {
			this.$bus.$on('showTool', (data) => {
				this.showTools = data
			})
		},
		methods: {
			// 关闭遮罩层
			closeMask() {
				this.showTools = false
			},
			closeToast() {
				this.showToast = false
			},
			// 生成图片
			savePic() {
				const savePicDom = document.querySelector('#savePicDom')
				let scale = window.devicePixelRatio // 获取设备像素
				let imgData
				setTimeout(() => {
					html2canvas(savePicDom, {
						backgroundColor: 'eee',
						width: savePicDom.clientWidth,
						height: savePicDom.clientHeight,
						// scale: scale,
						useCORS: true,
					}).then(function (canvas) {
						imgData = canvas.toDataURL('image/png')
					})
				}, 200)
				setTimeout(() => {
					this.imgUrl = imgData
				}, 1000)
				this.closeMask()
				this.showToast = true
			},
			// 复制链接
			copy() {
				//创建input标签
				var input = document.createElement('input')
				//将input的值设置为需要复制的内容
				input.value = this.url
				//添加input标签
				document.body.appendChild(input)
				//选中input标签
				input.select()
				//执行复制
				document.execCommand('copy')
				//成功提示信息
				this.$message.success('复制成功!')
				//移除input标签
				document.body.removeChild(input)
			},
			// 分享到QQ空间
			share_qqzone() {
				let url = encodeURIComponent(this.url)
				let title = encodeURIComponent(this.titleCon)
				window.open(
					`https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&desc=${title}&summary=${title}&site=${url}`
				)
			},
			// 分享到新浪微博
			share_weibo() {
				let url = encodeURIComponent(this.url)
				let title = encodeURIComponent(this.titleCon)
				window.open(
					`https://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=&appkey=&sudaref=`
				)
			},
		},
	}
</script>

<style lang="less" scoped>
	.share-tools {
		position: absolute;
		// top: 0;
		bottom: 0;
		left: 0;
		width: 100%;
		padding-bottom: 22px;
		border-radius: 10px 10px 0 0;
		z-index: 1001;
		background-color: #fff;
		ul {
			display: flex;
			justify-content: space-between;
			padding: 26px 28px 38px;
			li {
				display: flex;
				flex-direction: column;
				align-items: center;
				img {
					width: 48px;
					height: 48px;
				}
				span {
					margin-top: 8px;
					font-size: 13px;
					color: #666;
				}
			}
		}
	}

	#mask {
		position: absolute;
		top: 0%;
		left: 0%;
		width: 100%;
		height: 100%;
		z-index: 1000;
		background-color: rgba(0, 0, 0, 0.3);
	}

	.show-toast {
		position: fixed;
		top: 0;
		width: 100%;
		max-width: 375px;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.3);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.save_popup {
		.saveCon {
			width: 90%;
			height: 70%;
			.saveImg {
				position: relative;
				height: 100%;
				padding: 20px;
				border-radius: 10px;
				overflow: hidden;
				overflow-y: scroll;
				background-color: #fff;
				img {
					width: 100%;
				}
			}
			p {
				margin-top: 10px;
				color:#fff;
				text-align: center;
			}
		}
	}

</style>
