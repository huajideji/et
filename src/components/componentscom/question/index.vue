<template>
    <div class="questionstyle" :class="{ 'hide': datas.is_hide}">
		<div class="header">
			<div v-if="datas.is_show" class="xiaoxiicon">
				<span :class="['colorStyleIcon',styleArr[0]]">&#xe60a;</span>
			</div>
			<div class="title" v-if="datas.is_show">{{datas.name}}
			</div>
			<div :class="['more',styleArr[0]]">
				咨询更多问答 >
			</div>
		</div>
		<div class="block">
			<div v-for="(item,index) in datasList" :key="index" :class="['single-block',styleArr[5]]">
				<div class="block-left" >
					<div class="img-wrap">
						<div :class="['huiwen',styleArr[4]]">问</div>
					<span :class="['block-right-top',styleArr[0]]">
					{{item.title}}
					</span>
					</div>
				</div>
				<div class="under-line">
				
				</div>
				<div>
					<div  class="block-right">
						<div class="block-right-down"> 
						{{item.answer}} <span><查看详情></span>
						</div>
					</div>
				</div>
			</div>
			<div :class="['footer',styleArr[0]]">
				展开全部问答 <span class="el-icon-arrow-down"></span>
			</div>
		</div>
		
        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'question',
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
.huiwen{
	display: inline-block;
	width: 20px;
	height: 20px;
	text-align: center;
	color:#fff;
	border-radius: 5px;
	font-size: 14px;
}
.xiaoxiicon{
	margin-right: 10px;
}
	.title {
	    color: #333;
	    font-size: 16px;
	    font-weight: 700;
	}
	.img-wrap{
	  word-break:break-all;
	  img{
	    float:left;
	    width:150px;
	  }
	}
	.blocks{
		width:100%;
		padding: 14px;
		background-color: #fff;
		text-align:center;
		color:#999;
		border-radius:5px
	}
	.questionstyle{
		width: 100%;
		background-color: #f6f6f6;
		padding: 14px;
		position: relative;
	  .under-line{
	    width:100%;
	    margin-bottom:10px;
	    margin-top:10px;
	    height:1.5px;
	    background-color:#DEE4EE;
	  }
		.block{
			width:100%;
			padding: 14px;
			background-color: #fff;
			// text-align:center;
			border-radius:5px
			>div{
				display: flex;
			}
	
			.single-block{
				border-radius: 8.86px;
	      margin-bottom: 10px;
	      padding:15px;
	      background: linear-gradient(180deg, rgba(232,238,255,1) 0%, rgba(242,247,255,0.2) 100%);
			}
			.block-right{
				width:100%;
	      overflow: hidden;
			}
			.block-right-top{
				color: rgba(63,102,249,1);
				 font-size: 15px;
				 font-weight: 600;
	       word-break:break-all;
				 font-family: "PingFang SC";
				 text-align: left;
				 line-height: 23.02px;
	       margin-left:10px;
			}
			::v-deep.block-right-down{
				padding: 8px 10px;
				 color: rgba(119,119,119,1);
				 font-size: 14px;
				 font-weight: 500;
				 font-family: "PingFang SC";
				 text-align: left;
				 line-height: 23.02px;
	        a{
	           word-wrap: break-word;
	        }
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
	    img{
	      display: inline-block;
	      width: 15px !important;
	      height: 15px !important;
	      margin-top: 4px;
	    }
			margin-right: 5px;
		}
		.header{
			display: flex;
			align-items: center;
			flex: 1;
	
			margin-bottom: 10px;
	    img{
	      display: block;
	      margin-right:5px;
	      width: 20px !important;
	      height: 20px !important;
	    }
			.more{
				margin-left: auto;
				color:#888888;
				padding: 5px 10px;
			}
		}
		.footer{
			width:100%;
			text-align:center;
			margin-top:10px;
			color: #297EFF;
			span{
				line-height:18px
			}
		}
	}
</style>