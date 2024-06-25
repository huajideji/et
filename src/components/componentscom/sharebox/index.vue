<template>
    <div class="sharebox" :class="[is_absolute == 1 ? 'shareFixed' : '',{ 'hide': datas.is_hide}]" :style="{'max-width':phoneWidth+'px'}">
      <div class="fixed">
		
        <div :class="['share',styleArr[7],{ width: showWidth }]"  @click="shareClick">
        <div>
          <!-- <img class="share-icon" src="@/static/images/share_blue.png" alt /> -->
          <i class="el-icon-share" :class="[styleArr[0]]"></i>
          <span :class="[styleArr[0]]">分享</span>
        </div>
      </div>
        <!-- 跳转按钮1：无 -->
        <div
          v-if="datas.value_list[0].link_type == 0"
          :href="
            datas.value_list[0].link_url
              ? 'http://m.bendibao.com/'
              : 'javascript:;'
          "
          :class="['other-city',styleArr[4],datas.value_list[1] && datas.value_list[1].name ? 'other1' : 'other2']"
          :target="datas.value_list[0].link_url ? ['_blank'] : ['_self']"
          :style="datas.value_list[1] && datas.value_list[1].name ? '':'width:232px;'"
        >{{ datas.value_list[0].name }}</div>
		<!-- 跳转按钮1：旧专题标识 -->
        <div
          v-if="datas.value_list[0].link_type == 1"
          :href="
            datas.value_list[0].link_url
              ? ['http://m.cs.bendibao.com/news/' + datas.value_list[0].link_url]
              : 'javascript:;'
          "
          :class="['other-city',styleArr[4],datas.value_list[1] && datas.value_list[1].name ? 'other1' : 'other2']"
          :target="datas.value_list[0].link_url ? ['_blank'] : ['_self']"
          :style="datas.value_list[1] && datas.value_list[1].name ? '':'width:232px;'"
        >{{ datas.value_list[0].name }}</div>
		<!-- 跳转按钮1：新专题标识 -->
        <div
          v-if="datas.value_list[0].link_type == 2"
          :href="
            datas.value_list[0].link_url
              ? ['http://m.cs.bendibao.com/news/zhuanti_new/' + datas.value_list[0].link_url]
              : 'javascript:;'
          "
          :class="['other-city',styleArr[4],datas.value_list[1] && datas.value_list[1].name ? 'other1' : 'other2']"
          :target="datas.value_list[0].link_url ? ['_blank'] : ['_self']"
          :style="datas.value_list[1] && datas.value_list[1].name ? '':'width:232px;'"
        >{{ datas.value_list[0].name }}</div>
        <!-- 跳转按钮1：链接 -->
        <div
          v-if="datas.value_list[0].link_type == 3"
          :href="datas.value_list[0].link_url ? datas.value_list[0].link_url : 'javascript:;'"
          :class="['other-city',styleArr[4],datas.value_list[1] && datas.value_list[1].name ? 'other1' : 'other2']"
          :target="datas.value_list[0].link_url ? ['_blank'] : ['_self']"
		  :style="datas.value_list[1] && datas.value_list[1].name ? '':'width:232px;'"
        >{{ datas.value_list[0].name }}</div>

		<template v-if="datas.value_list[1]">
			<!-- 跳转按钮2：无 -->
			<div
			v-if="datas.value_list[1].link_type == 0 && datas.value_list[1].name"
			:href="
				datas.value_list[1].link_url
				? 'http://m.cs.bendibao.com/news/'
				: 'javascript:;'
			"
			:class="['other-city','other2',styleArr[4]]"
			:target="datas.value_list[1].link_url ? ['_blank'] : ['_self']"
			>{{ datas.value_list[1].name }}</div>
			<!-- 跳转按钮2：旧专题 -->
			<div
			v-if="datas.value_list[1].link_type == 1 && datas.value_list[1].name"
			:href="
				datas.value_list[1].link_url
				? ['http://m.cs.bendibao.com/news/' + datas.value_list[1].link_url]
				: 'javascript:;'
			"
			:class="['other-city','other2',styleArr[4]]"
			:target="datas.value_list[1].link_url ? ['_blank'] : ['_self']"
			>{{ datas.value_list[1].name }}</div>
			<!-- 跳转按钮2：新专题 -->
			<div
			v-if="datas.value_list[1].link_type == 2 && datas.value_list[1].name"
			:href="
				datas.value_list[1].link_url
				? ['http://m.cs.bendibao.com/news/zhuanti_new/' + datas.value_list[1].link_url]
				: 'javascript:;'
			"
			:class="['other-city','other2',styleArr[4]]"
			:target="datas.value_list[1].link_url ? ['_blank'] : ['_self']"
			>{{ datas.value_list[1].name }}</div>
			<!-- 跳转按钮2：链接 -->
			<div
			v-if="datas.value_list[1].link_type == 3 && datas.value_list[1].name"
			:href="datas.value_list[1].link_url ? datas.value_list[1].link_url : 'javascript:;'"
			:class="['other-city','other2',styleArr[4]]"
			:target="datas.value_list[1].link_url ? ['_blank'] : ['_self']"
			>{{ datas.value_list[1].name }}</div>
		</template>
      </div>

      <slot name="functions" />
    </div>
</template>

<script>
	export default {
		name: 'sharebox',
		props: {
			datas: Object,
			hide: Boolean,
		},
		data() {
			return {
				styleArr:[],
				showTools: false,
				phoneWidth:'',
				is_absolute: 0
			}
		},
	mounted() {
		this.styleArr = this.getStyleArr()
			
			this.phoneWidth = document.querySelector('.phone-container').clientWidth
		},
		methods: {
			// 点击分享
			shareClick() {
				this.showTools = true
				this.$bus.$emit('showTool', this.showTools)
			}		
	},
	computed: {
		liveheaderfn() {
			return this.$store.state.colorStyle;
		},
	},
	watch: {
     liveheaderfn(newValue) {
       this.styleArr = this.getStyleArr()
     }
    },  
	}
</script>

<style lang="less" scoped>
	.sharebox {
		position: absolute;
		bottom: 0;
		z-index: 999;
		width: 100%;
		padding: 15px;
		background-color: #fff;
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
			background-color: rgba(0, 0, 0, .4);
		}
		.fixed {
			display: flex;
			justify-content: space-between;
			.share {
				width: 85px;
				height: 33px;
				line-height: 33px;
				border-radius: 3px;
				color: #2456f5;
				background-color: rgba(36, 86, 245, 0.1);
				div {
					display: flex;
					justify-content: center;
					align-items: center;
					.share-icon {
						width: 13px;
						height: 13px;
						margin-right: 5px;
					}
				}
			}
			.other-city {
				width: 119px;
				height: 33px;
				line-height: 33px;
				text-align: center;
				border-radius: 3px;		
				color:#fff
			}
			.other1 {
				color:#fff;
				border: 1px solid rgba(36, 86, 245, 1);
                background-color: #fff;
			}
            .other2 {
                color: #fff;
                background-color: #2456F5;
            }
		}
	}
	.shareFixed {
		position: fixed;
	}
</style>
