<template>
    <div class="module_multiplexingstyle" >
        <!-- 功能组件 -->
		<div class="white"  v-if="datas.module_id==0">
			<img src="@/assets/images/white1-19.png">
			<p  class="whitetext">请选择复用模块或填写模块id</p>
		</div>
		<div v-if="datas.module_id!=0">
			<img src="@/assets/images/1-19success.png" class="success_a">
			<p class="showtext">{{'名称为'+datas.module_name+'模块'}}</p>
			<p>注：后台不展示样式，但前端正常显示</p>
		</div>
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'module_multiplexing',
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
	.module_multiplexingstyle{
		background-color:#fff;
		display:flex;
		justify-content:center;
		align-items:center;
		.success_a{
			display:block;
			margin:0 auto;
			text-align:center;
			margin-bottom:10px;
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
