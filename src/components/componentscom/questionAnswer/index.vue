<template>
    <div class="questionAnswerstyle" :class="{ 'hide': datas.is_hide}">
		<div class="header">
			<div >
				<span :class="['colorStyleIcon',styleArr[0]]">&#xe60a;</span>
			</div>
			<div>相关问答</div>
			<div class="more">
				咨询更多问答 >
			</div>
		</div>
		<div class="block">
			<div v-for="(item,index) in datasList" :key="index" class="single-block">
				<div class="block-left" >
					<img src="@/assets/images/huiwen.png" >
				</div>
				<div>
					<div  class="block-right">
						<div class="block-right-top"> 
						{{item.title}}
						</div>
						<div :class="['block-right-down',styleArr[4]]"> 
						{{item.answer}} <span><查看详情></span>
						</div>
					</div>
				</div>
			</div>
		</div>
        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'questionAnswer',
    props: {
        datas: Object,
        hide: Boolean,
    },
    data() {
		return {
			styleArr:[],
			datasList:[
				{
					title:'武汉本市户籍可以在限购区域买几套房？',
					answer:'答：武汉本地户籍可以在限购区买房，不过买房有数量限制，不同情形可在限购区买房的数量也有所不同，具体详见正文'
				},{
					title:'在武汉住房限购区域全款买房，是否还限购在武汉住房限购区域全款买房，是否还限购？？',
					answer:'答：武汉本地户籍可以在限购区买房，不过买房有数量限制，不同情形可在限购区买房的数量也有所不同，具体详见正文。'
				},
				
			]
        }
    },
	mounted() {
		this.styleArr = this.getStyleArr()
        // this.datas.elementList.includes('更新时间')
	},
	watch: {
        liveheaderfn(newValue) {
            this.styleArr = this.getStyleArr()
    },  
    },
    computed: {
        liveheaderfn() {
      return this.$store.state.colorStyle;
    },
        
    }
}
</script>
<style scoped lang="less">
	.questionAnswerstyle{
		width: 100%;
		height: 477px;
		background-color: #f6f6f6;
		padding: 14px;
		.block{
			padding: 14px;
			background-color: #fff;
			>div{
				display: flex;
			}
			.single-block:not(:first-of-type){
				margin-top: 15px;
			}
			.block-right-top{
				color: rgba(51,51,51,1);
				 font-size: 14px;
				 font-weight: 500;
				 font-family: "PingFang SC";
				 text-align: left;
				 line-height: 23.02px;
				 margin-bottom: 10px;
			}
			.block-right-down{
				padding: 8px 10px;
				background: rgba(246,246,246,1);
				 color: rgba(119,119,119,1);
				 font-size: 14px;
				 font-weight: 500;
				 font-family: "PingFang SC";
				 text-align: left;
				 line-height: 23.02px;
				 span{
					  opacity: 1;
					  color: rgba(95,145,252,1);
					  font-size: 14px;
					  font-weight: 500;
					  font-family: "PingFang SC";
				 }
			}
		}
		.block-left{
			width: 18.75px;
			height: 20px;
			margin-right: 5px;
		}
		.header{
			display: flex;
			align-items: center;
			flex: 1;
			.more{
				margin-left: auto;
				color: #297EFF;
				background-color: rgba(228,239,255,1);
				padding: 5px 10px;
			}
		}
	}
</style>