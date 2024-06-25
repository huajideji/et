<template>
	<div class="swiperbox" :class="{ 'hide': datas.is_hide}">
		<!-- 无图片 -->
		<div class="upload" v-if="!value_list[0]">
			<i class="iconfont icon-lunbotu"></i>
		</div>

		<!-- 轮播组件 -->
		<div class="swiper-container swiper-no-swiping" v-if="
        (value_list[0] && swiperType === 1) ||
        swiperType === 2 ||
        swiperType === 3
      ">
			<div :class="
          swiperType === 3 && value_list[0]
            ? 'type3 type1 swiper-wrapper type3H'
            : 'swiper-wrapper type1'
        ">
				<div class="swiper-slide" v-for="(item, index) in value_list" :key="index">
					<div :href="item.link_url ? ['http://m.cs.bendibao.com/news/'+item.link_url] : 'javascript:;'"
						class="picture" :target="item.link_url ? ['_blank'] : ['_self']">
						<!-- 图片 -->
						<img :src="item.image" alt draggable="false"
							:style="{ 'border-radius': datas.borderRadius + 'px' }" />
					</div>
					<div style="position: relative; bottom: 0px; margin: 10px auto 0px auto; text-align: center;">
						{{ switchTitle(item.title) }}
					</div>
				</div>
			</div>

			<!-- 分页器 -->
			<div class="swiper-pagination" style="color: #007aff"></div>
		</div>

		<!-- 添加功能插槽 -->
		<slot name="functions" />
	</div>
</template>

<script>
	import Swiper from 'swiper'
	import 'swiper/css/swiper.min.css'

	export default {
		name: 'swiperbox',
		props: {
			datas: Object,
			hide: Boolean,
		},
		data() {
			return {
				mySwiper: null,
			}
		},
		created() {
			this.datas.swiperType = 1
			this.addSwiper()
		},
	computed: {
		switchTitle() {
			return function (item) {
				let titlestr = ''
			if (item.indexOf('{cityname}')>-1) {
				titlestr = item.replace(/\{cityname\}/g, '成都')
			} else {
				titlestr = item
			}
      return titlestr
			}
			
    },
			/* 类型切换 */
			swiperType() {
				// console.log(this.datas.swiperType, '----------------轮播类型')
				this.addSwiper()
				return this.datas.swiperType
			},
			/* 图片删除或者增加 */
			value_list() {
				this.addSwiper()
				// console.log(this.datas.value_list.length, '-------轮播数量')
				return this.datas.value_list
			},
			/* 分页器类型切换 */
			pagingType() {
				this.addSwiper()
				return this.datas.pagingType
			},
			/* 一行个数 */
			rowindividual() {
				this.addSwiper()
				if (this.datas.swiperType === 1) {
					return 1
				} else {
					return this.datas.rowindividual
				}
			},
			/* 图片间距 */
			imageMargin() {
				this.addSwiper()
				if (this.datas.swiperType === 1) {
					return 0
				} else {
					return this.datas.imageMargin
				}
			},
		},
		watch: {
			pagingType() {},
			rowindividual() {},
			imageMargin() {},
		},
		methods: {
			/* 创建轮播对象 */
			addSwiper() {
				this.$nextTick(() => {
					if (this.datas.swiperType !== 0 && this.datas.value_list[0]) {
						if (this.mySwiper instanceof Array) {
							this.mySwiper.forEach((element) => {
								element.destroy()
							})
						} else if (this.mySwiper instanceof Object) {
							// 每次重新创建swiper前都要销毁之前存在的轮播   不然轮播会重复
							this.mySwiper.destroy()
						}

						let params = {
							loop: true,
							pagination: {
								el: '.swiper-pagination',
								type: 'bullets',
							},
						}
						params.slidesPerView = 1
						params.spaceBetween = 0

						this.mySwiper = new Swiper('.swiper-container', params)
					} else {
						if (this.mySwiper instanceof Array) {
							this.mySwiper.forEach((element) => {
								element.destroy()
							})
						}
						// 每次重新创建swiper前都要销毁之前存在的轮播   不然轮播会重复
						if (this.mySwiper instanceof Object) {
							this.mySwiper.destroy()
						}
					}
				})
			},
		},
	}
</script>

<style scoped lang="less">
	.swiperbox {
		position: relative;
		padding: 12px;
		height: 100%;
		border-radius: 10px;

		&.hide::before {
			content: '';
			display: flex;
			align-items: center;
			justify-content: center;
			color: #FFFFFF;
			font-size: 20px;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			z-index: 99;
			background-color: rgba(0, 0, 0, .4);
		}

		/* 无图片 */
		.upload {
			background: #979797;
			width: 100%;
			border-radius: 10px;
			display: flex;
			justify-content: center;
			align-items: center;

			i {
				font-size: 120px;
			}
		}

		/* 类型1 */
		.type1 {
			width: 100%;
			position: relative;

			.swiper-slide {
				width: 100%;

				.picture {
					width: 100%;
					height: 100%;

					img {
						width: 100%;
						height: 100%;
						display: block;
						border-radius: 10px;
					}
				}
			}
		}

		.type3H {
			height: 100px;
		}

		.swiper-container-horizontal>.swiper-pagination-progressbar {
			height: 2px;
		}
	}

	.swiper-container {
		border-radius: 10px;
	}

	.swiper-pagination {
		padding-right: 12px;
		text-align: right;
	}

	.swiper-pagination-bullet {
		width: 6px;
		height: 6px;
	}

	.swiper-pagination-bullet-active {
		background: white;
	}
</style>
