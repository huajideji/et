<template>
    <div class="module_createstyle" >
        <!-- 功能组件 -->
		<div class="white"  v-if="datas.real_module_id==0">
			<img src="@/assets/images/white1-19.png">
			<p  class="whitetext">请选择生成模块或填写关联模块id</p>
		</div>
		<div v-if="datas.real_module_id!=0">
			<img src="@/assets/images/1-20success.png" class="success_a">
			<p>选择成功</p>
		</div>
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'module_create',
    props: {
        datas: Object,
    },
    data() {
        return {
			datasList:[
				
			]
        }
    },
    mounted() {
    },
    methods: {

    }
}
</script>
<style scoped lang="less">
	.module_createstyle{
		background-color:#fff;
		display:flex;
		justify-content:center;
		align-items:center;
		.success_a{
			display:block;
			margin:0 auto;
			text-align:center;
			margin-bottom:10px;
			width: 131px;
			height: 138px;
		}
		p{
			text-align: center;
			margin-top: 15px;
		}
		.showtext{
			margin:0 auto;
			text-align:center;
		}
		.white{
			margin:0 auto;
			text-align:center;
			
		}
		.whitetext{
			color:#666;
			font-size:14px;
		}
		height:320px;
		position: relative;
	}
</style>
