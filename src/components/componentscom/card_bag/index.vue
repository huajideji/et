<template>
	<div class="card_bagstyle" :class="{ 'hide': datas.is_hide}">
		<div class="module-title" v-if="datas.is_show">
			<div class="fontIcon-string">
			          <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
			          <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
			  </div>
			<span>{{ datas.name }}</span>
		</div>
			<!-- 轮播组件 -->
			<div class="swiper-container swiper-no-swiping" v-if="
        (value_list[0] && swiperType === 1) ||
        swiperType === 2 ||
        swiperType === 3" :class="`class${datas.id}s`">
				<div :class="
			      swiperType === 3 && value_list[0]
			        ? 'type3 type1 swiper-wrapper type3H'
			        : 'swiper-wrapper type1'
			    ">
					<div class="swiper-slide" v-for="(item, index) in value_list" :key="index">
						<div class="single-swipe">
							<div class="picture" :target="item.link_url ? ['_blank'] : ['_self']" style="margin-right: 10px;">
								<!-- 图片 -->
								<img :src="item[0].image" alt draggable="false"
									:style="{ 'border-radius': datas.borderRadius + 'px' }" v-show="item[0].image" />
								<img src="@/assets/images/nocard.png" alt draggable="false"
									:style="{ 'border-radius': datas.borderRadius + 'px' }" v-show="!item[0].image"  />
									<span class="picture-name">
										{{item[0].name}}
									</span>
									<span class="picture-keyword">
										{{item[0].keyword}}
									</span>
							</div>
							<div class="picture" :target="item.link_url ? ['_blank'] : ['_self']" v-if="item[1]">
								<!-- 图片 -->
								<img :src="item[1].image" alt draggable="false"
									:style="{ 'border-radius': datas.borderRadius + 'px' }" v-if="item[1].image" />
								<img src="@/assets/images/nocard.png" alt draggable="false"
									:style="{ 'border-radius': datas.borderRadius + 'px' }" v-else />
								<span class="picture-name">
									{{item[1].name}}
								</span>
								<span class="picture-keyword">
									{{item[1].keyword}}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="swiper-pagination" style="color: #007aff"></div>
			</div>
				<div class="swiper-pagination" :class="`class${datas.id}`" style="color: #007aff"></div>
		
		<!-- 功能组件 -->
		<slot name="functions" />
	</div>
</template>
<script>
	import Swiper from 'swiper';
	import 'swiper/css/swiper.min.css';
	export default {
		name: 'card_bag',
		props: {
			datas: Object,
			hide: Boolean,
		},
		data() {
			return {
				mySwiper: null,
				datasList: [

				]
			}
		},
		created() {
			this.styleArr = this.getStyleArr()
			this.datas.swiperType = 1
			this.addSwiper()
		},
		watch:{
			liveheaderfn(newValue) {
			        this.styleArr = this.getStyleArr()
			},  
			watch: {
				pagingType() {},
				rowindividual() {},
				imageMargin() {},
			},
		},
		methods: {
			/* 创建轮播对象 */
			addSwiper() {
				console.log('***********')
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

						let params2 = {
							// loop: true,
							pagination: {
								el: '.class'+this.datas.id,
								type: 'bullets',
								clickable: true,
							},
						}
						params2.slidesPerView = 1
						params2.spaceBetween = 5
						this.mySwiper = new Swiper('.swiper-container', params2)
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
		computed: {
			liveheaderfn() {
			  return this.$store.state.colorStyle;
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
				this.datasList= []
				console.log(this.datas.value_list.length / 2)
				for (let i = 0; i < (this.datas.value_list.length / 2); i++) {
					let arr = []
					arr.push(this.datas.value_list[2 * i])
					arr.push(this.datas.value_list[(2 * i) + 1])
					this.datasList[i] = arr
				}
				console.log(this.datasList)
				return this.datasList
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
	}
</script>
<style scoped lang="less">
	.swiper-container {
		border-radius: 10px;
		padding-bottom: 15px;
	}
	
	::v-deep.swiper-pagination {
		// padding-right: 12px;
		left:50%;
		transform:translateX(-50%);
		bottom: -5px;
	}
	::v-deep.swiper-pagination-bullet {
		height: 5px !important;
		width:12px !important;
		border-radius:10px !important;
		margin-left:5px;
	}
	
	.swiper-pagination-bullet-active {
		background: blue !important;

	}
	.card_bagstyle {
		position: relative;
		box-sizing: border-box;
		width: 375px;
		
		border-radius: 10px;
		background-color: #FFFFFF;
		padding: 17.5px 12px 12px;
		margin: 12px auto;
		.single-swipe{
			display:flex;
			.picture{
				width:50%;
				position:relative;
				img{
					width:100%;
					height:100%;
					border-radius: 10px;
				}
			}
			.picture-name{
				position:absolute;
				left:10%;
				top:15px;
				font-size: 16px;
				color:#fff;
			}
			.picture-keyword{
				position:absolute;
				left:10%;
				top:40px;
				font-size: 12px;
				color:#fff;
			}
		}
		.module-title {
			display: flex;
			align-items: center;
			margin-bottom: 13.5px;
			font-size: 16px;
			font-weight: 700;
			color: #333;


			>img {
				height: 16px;
				width: auto;
				margin-right: 6px;
			}

		}
		.swiper-container-horizontal>.swiper-pagination-progressbar {
			height: 2px;
		}
	}
</style>

<style>
	::v-deep.card_bagstyle{
		
	}
</style>
