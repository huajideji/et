<template>
  <div class="pointToPoint">
	<div class="pointToPointCon">
		<div style="text-align:right;">
			<p class="tagName">{{this.datas.city_a}}</p>
			<p class="city-name">北京</p>
		</div>
		<div>
			<img src="@/assets/images/Vector.png" width="23px" height="23px">
		</div>
		<div>
			<p class="tagName">{{this.datas.city_b}}</p>
			<p class="city-name">上海</p>
		</div>
	</div>
	<!-- 备注 -->
	<div class="remark" v-show="this.datas.remark">{{ this.datas.remark }}</div>
  </div>
</template>

<script>
export default {
  name: 'pointToPoint',
  props: {
    datas: Object,
  },
  mounted() {
	  this.datas.city_a = '出发地';
	  this.datas.city_b = '目的地';
	  
  	this.$EventBus.$on("aMsg", (data) => {
  	      //将A组件传递过来的参数data赋值给msgB
		//   console.log(data)
  	      if(data.city_a){
			  this.datas.city_a = data.city_a
		  }else if(data.city_b){
			  this.datas.city_b = data.city_b
		  }
  	    });

		this.$EventBus.$on("remark",(data) => {
			this.datas.remark = data.remark
		})
		this.$EventBus.$on("type",(data) => {
			this.datas.type = data.type
		})
  }
}
</script>

<style scoped lang="less">
	.city-name{
		font-size: 20px;
		color: #333;
	}
	.pointToPoint{
		position: relative;
		background-color: #fff;
		margin: 10px;
		border-radius: 10px;
		padding: 30px 20px;
		.pointToPointCon {
			display: flex;
			justify-content: space-between;
			align-items: center;
			p{
				margin-top: 5px;
				margin-bottom: 5px;
			}
		}
		.remark {
			margin: 15px 0 -10px;
			padding: 3px 0;
			border-radius: 6px;
			background: linear-gradient(270deg, #f2f6ff00 0%, #f2f6ffff 40%, #f2f6ffff 62%, #f2f6ff00 100%);
			color: #3372FD;
			text-align: center;
			font-size: 13px;
		}
	}
	.tagName{
		width: 80px;
		color: #999;
		font-size: 13px;
	}
</style>

