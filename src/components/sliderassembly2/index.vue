<template>
  <div class="sliderassembly2" ref="leftModule" :style="clickStyle">
    <div class="header">
      <span class="title">选择样式</span>
      <span class="suggest">拖入模块到画布中</span>
    </div>
    <div class="search">
      <el-input placeholder="搜索想要的样式名称/tag" v-model="input" suffix-icon="el-icon-search"></el-input>
      <span class="tip" v-show="searchResult">
        为您找到
        <span class="num">{{ count }}</span> 个样式
      </span>
    </div>

    <!-- 使用下拉框效果 -->
    <!-- <el-collapse v-model="activeNames">
      <el-collapse-item :title="items.title" :name="index + 1" v-for="(items, index) in datas" :key="index">
        <div class="componList" draggable="true" @dragstart="drag($event)" @dragend="dragends($event)"
          :data-name="item.name" v-for="(item, ind) in items.comList" :key="ind">
          <i class="iconfont" :class="item.icon" v-if="item.icon" />
          <van-icon :name="item.vanIcon" v-else />
          <p>{{ item.text }}</p>
        </div>
      </el-collapse-item>
    </el-collapse>-->

    <div class="content">
      <div class="block" v-for="(item, ind) in search(input)" :key="ind" :class="(ind == 10 && guideShow3) ? ['guideHigh','guidePad2']:''">
        <div class="componList" draggable="true" @dragstart="drag($event)" @dragend="dragends($event)"
          :data-name="item.name">
          <!-- <i class="iconfont" :class="item.icon" v-if="item.icon" />
          <van-icon :name="item.vanIcon" v-else /> -->
          <img :src="item.img" alt=""  :data-name="item.name"/>
        </div>
        <div class="name">{{ item.text }}</div>
      </div>
    </div>

  
  </div>
</template>

<script>
	import icon from '@/assets/images/1-1.png'
	import banner_list from '@/assets/images/1-2.png'
	import share_blue from '@/assets/images/1-3.png'
	import keyword from '@/assets/images/1-4.png'
	import disclaimer from '@/assets/images/1-5.png'
	import banner from '@/assets/images/1-6.png'
	import module_entry from '@/assets/images/1-7.png'
	import network from '@/assets/images/1-8.png'
	import latest_news from '@/assets/images/1-9.png'
	import image_text from '@/assets/images/1-10.png'
	import article_list from '@/assets/images/1-11.png'
	import article_timeline from '@/assets/images/1-12.png'
	import powder_guide from '@/assets/images/1-13.png'
	import policy_points from '@/assets/images/1-14.png'
	import table from '@/assets/images/1-15.png'
	import editor_guide from '@/assets/images/1-17.png'
	import qaimg from '@/assets/images/1-18.png'
	export default {
		name: 'sliderassembly2',
		components: {
		},
		props: {
			pointer: Object,
		},
		data() {
			return {
				imgList: [
					icon,
					banner_list,
					share_blue,
					keyword,
					disclaimer,
					banner,
					module_entry,
					network,
					latest_news,
					image_text,
					article_list,
					article_timeline,
					powder_guide,
					policy_points,
					table,
					editor_guide
				],
				activeNames: [1, 2, 3] /* 侧边栏组件显示 */,
				input: '',
				searchResult: true,
				moduletype:0,
				clickStyle:'pointer-events:auto',
				datas: [
					{
						title: '基础组件',
						comList: [
							// {
							// 	text: 'icon工具箱',
							// 	type: '1-1',
							// 	icon: 'el-icon-picture',
							// 	name: 'icontoolkit',
							// 	img: icon
							// },
							// {
							// 	text: '轮播图',
							// 	type: '1-2',
							// 	name: 'swiperbox',
							// 	icon: 'el-icon-picture-outline',
							// 	img: banner_list
							// },
							// {
							// 	text: '分享',
							// 	type: '1-3',
							// 	name: 'sharebox',
							// 	icon: 'el-icon-share',
							// 	img: share_blue
							// },
							// {
							// 	text: '关键词信息流',
							// 	type: '1-4',
							// 	name: 'keywordsInfo',
							// 	icon: 'el-icon-chat-dot-square',
							// 	img: keyword
							// },
							// {
							// 	text: '免责声明',
							// 	type: '1-5',
							// 	name: 'disclaimer',
							// 	icon: 'el-icon-tickets',
							// 	img: disclaimer
							// },
							// {
							// 	text: 'banner图',
							// 	type: '1-6',
							// 	name: 'banner',
							// 	icon: 'el-icon-picture-outline',
							// 	img: banner
							// },
							// {
							// 	text: '模块入口',
							// 	type: '1-7',
							// 	name: 'moduleentry',
							// 	icon: 'el-icon-menu',
							// 	img: module_entry
							// },
							{
								text: '网点模块',
								type: '1-8',
								name: 'networkmodule',
								icon: 'el-icon-place',
								img: network
							},
							// {
							// 	text: '最新消息',
							// 	type: '1-9',
							// 	name: 'hotnews',
							// 	icon: 'el-icon-news',
							// 	img: latest_news
							// },
							// {
							// 	text: '图文模块',
							// 	type: '1-10',
							// 	name: 'graphicmodule',
							// 	icon: 'el-icon-reading',
							// 	img: image_text
							// },
							// {
							// 	text: '文章列表',
							// 	type: '1-11',
							// 	name: 'articlelist',
							// 	icon: 'el-icon-reading',
							// 	img: article_list
							// },
							// {
							// 	text: '文章时间轴',
							// 	type: '1-12',
							// 	name: 'articletimeline',
							// 	icon: 'el-icon-s-operation',
							// 	img: article_timeline
							// },
							// {
							// 	text: '导粉',
							// 	type: '1-13',
							// 	name: 'importfans',
							// 	icon: 'el-icon-d-arrow-right',
							// 	img: powder_guide
							// },
							// {
							// 	text: '政策要点',
							// 	type: '1-14',
							// 	name: 'plank',
							// 	icon: 'el-icon-document',
							// 	img: policy_points
							// },
							{
								text: '表格',
								type: '1-15',
								icon: 'el-icon-date',
								name: 'edittable',
								img: table
							},
							// {
							// 	text: '富文本模块',
							// 	type: '1-17',
							// 	name: 'richtext',
							// 	img: editor_guide
							// },
							// {
							// 	text: '小宝问问QA',
							// 	type: '1-18',
							// 	name: 'question',
							// 	img: qaimg
							// },
							// {
							//   text: '选项卡',
							//   type: '1-16',
							//   name: 'tabcontrol',
							//   icon: 'el-icon-copy-document'
							// },
						],
					},
				],
				guideShow3: false,
			}
		},
		computed: {
			//模块总数
			count() {
				return this.search(this.input).length
			},
		},
		mounted() {
			this.moduletype = this.$route.query.moduletype;
			if(this.moduletype == 1){
				this.clickStyle = 'pointer-events:none'
			}else{
				this.clickStyle = 'pointer-events:auto'
			}

			if (JSON.parse(sessionStorage.getItem("guideShow3"))) {
				this.guideShow3 = true
			}
			window.addEventListener("setItem", () => {
				this.guideShow3 = JSON.parse(sessionStorage.getItem("guideShow3"));
			});
			sessionStorage.setItem("guideRight3",parseInt(this.$refs.leftModule.getBoundingClientRect().width))
		},
		beforeDestroy() {
			// 移除对 sessionStorage 的监听
			window.removeEventListener("setItem", () => {});
		},
		methods: {
			// //父组件获取数据的方法
			// getdata(){
			// 	this.$emit('getdata',)
			// },
			/**
			 * 当用户开始拖动元素或选择文本时触发此事件
			 *
			 * @param {Object} event event对象
			 */
			drag(event) {
				/* 开启穿透 */
				this.pointer.show = true
				/* 传递参数 */
				event.dataTransfer.setData('componentName', event.target.dataset.name)
				// if (event.target.dataset.name) {
				//   /* 开启穿透 */
				//   this.pointer.show = true
				//   /* 传递参数 */
				//   event.dataTransfer.setData('componentName', event.target.dataset.name)
				// }
			},

			/**
			 * 当拖动操作结束时（释放鼠标按钮或按下退出键），会触发此事件
			 *
			 * @param {Object} event event对象
			 */
			dragends() {
				/* 关闭穿透 */
				this.pointer.show = false
			},
			// 搜索
			search(keywords) {
				var newList = []
				console.log(this.datas)
				this.datas[0].comList.forEach((item) => {
					if (item.text.indexOf(keywords) != -1) {
						newList.push(item)
					}
				})
				console.log(newList)
				return newList
				
			},
		},
	}
</script>

<style scoped lang="less">
	/* 组件 */
	.sliderassembly2 {
		width: 480px;
		height: 100%;
		overflow-y: auto;
		border-right: 1px solid #ebedf0;
		box-sizing: border-box;
		padding: 0 20px;
		background: #fff;
		
		// flex-shrink: 0;

		/* 滚动条 */
		&::-webkit-scrollbar {
			width: 5px;
		}

		&::-webkit-scrollbar-thumb {
			background-color: #d9d9d9;
			border-radius: 2.5px;
		}

		/* 头部标题与搜索 */
		.header {
			display: flex;
			flex-direction: column;
			margin-top: 12px;

			.title {
				margin: 0 0 7px 0;
				font-size: 16px;
				font-weight: 700;
				color: #333;
			}

			.suggest {
				color: #999999;
				font-size: 14px;
			}
		}

		.search {
			margin: 15px 0;

			.tip {
				padding-top: 8px;
				display: flex;
				color: #999;

				.num {
					color: #6065ec;
				}
			}
		}

		.content {
			width: 438px;
			display: flex;
			flex-direction: column;
			flex-wrap: wrap;
			// height: 1950px;
			align-items: self-start;

			.block {
				width: 207px;
        margin: 0 19px 19px 0;
        .name {
          color: #666;
        }
			}

			/* 组件列表 */
			.componList {
				display: inline-flex;
				flex-direction: column;
				justify-content: center;
				width: 100%;
				height: auto;
				margin-bottom: 6px;
				padding: 14px;
				align-items: center;
				cursor: all-scroll;
				transition: all 0.3s;
				border-radius: 5px;
				overflow: hidden;
				background-color: #f9f9f9;

				&:hover {
					box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
					transform: translate3d(0, -4px, 0);
				}

				img {
					width: 100%;
				}
			}
		}
	}
</style>
<style lang="less">
	.sliderassembly2 {
		.el-collapse-item__header,
		.el-collapse-item__wrap {
			border-bottom: 0 !important;
		}

		.el-input__inner {
			height: 42px;
			line-height: 42px;
			font-size: 14px;
		}

		.el-input__icon {
			line-height: 32px;
		}
	}
</style>
