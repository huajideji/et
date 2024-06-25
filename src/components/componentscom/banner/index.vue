<template>
  <div class="banner" :class="{ 'hide': datas.is_hide}">
    <div v-if="datas.value_list[0]" class="banner_img"> 
		<img :src="datas.value_list[0].image" alt="">
		<h1 class="bannerTitle">{{ switchTitle }}</h1>
	</div>
    <slot name="functions" />
  </div>
</template>

<script>
	export default {
		name: 'banner',
		props: {
			datas: Object,
			hide: Boolean,
			pageset:Object,
	},
	data() {
		return {
			pagedata:{}
		}
	},
	computed: {
		switchTitle() {
			let titlestr = ''
			if (this.datas.value_list) {
				if (this.datas.value_list[0].title.indexOf('{cityname}')>-1) {
				titlestr = this.datas.value_list[0].title.replace(/\{cityname\}/g, '成都')
			} else {
				titlestr =  this.datas.value_list[0].title
			}
			}
			
      return titlestr
    }	
	},
	watch: {
		pageset: {
      handler(newVal) {
        this.pagedata = newVal
      },
      deep: true,
    },
	},
	mounted() {
		this.pagedata = this.pageset
	}
}
	
</script>

<style lang="less" scoped>
.bannerTitle{
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	font-family: "PingFang SC";
	font-size: 28px;
	color: #fff;
	width: 80%;
	text-align: center;
}
.select_wrap{
	display: flex;
	margin-bottom: 40px;
	justify-content: space-around;
	margin-top: -40px;
	position: relative;
	left: 2.5%;
	width: 95%;
	padding: 17.5px 12px 21px;
    border-radius: 10px;
    background-color: #fff;
	z-index: 999;
	div{
		margin-right: 15px;
	}
}
	.banner {
		position: relative;
		&.hide::before {
			content: '';
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-size: 20px;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.banner_img {
			height: 100%;
			// background-image: url(http://imgbdb3.bendibao.com/szbdb/20215/27/20210527140952_26339.png);
			background-size: 100% 100%;
			background-repeat: no-repeat;
			img{
				height: 100px;
				width: 100%;
			}
		}
	}
</style>
