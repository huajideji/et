<template>
	<div class="copy-dialog">
		<el-dialog :title="`${datas.zhuantiInfo.name}专题创建人管理`" :close-on-click-modal="false" :visible="showAuthority" @close="cancel" width="40%">
			<div slot="title" class="dialog-header-titles">
				<span>{{datas.zhuantiInfo.name+'专题创建人管理'}}</span>
			</div>
			<div class="daoyu">
				 创建人对专题拥有编辑权限
			</div>
			<div class="dialog-header-body">
				<div>
					<div>
						拥有人
					</div>
					<ul :class="getclass">
						<li>{{datas.creater}}
						<span class="el-icon-close" style="color:#333;" v-if="iscreator==1" @click="showtransfer()">
							
						</span>
						</li>
						<div class="transfer-wrap" v-if="transferActive == 1">
							<div>
								<span style="color:#333;">
									移交拥有人角色至管理员
								</span>
								<span v-for="(item,index) in datas.zhuanti_user" :key="index" :class="getclassBlock(item)" @click="activeBlock(item,index)">{{item.username}}</span>
							</div>
							<div>
								<span class="daoyus">
									移交后将失去专题编辑权限
								</span>
								<div class="confir-wrap">
									<span @click="transferActive=0">取消</span>
									<span @click="confirmTransfer">确认</span>
								</div>
							</div>
						</div>
					</ul>
					
				</div>
				<div>
					<div>
						管理员
					</div>
					<ul class="single-card">
						<li v-for="(item,index) in datas.zhuanti_user" :key="index">{{item.username}}
						<span class="el-icon-close" style="color:#333;" v-if="isManager==1" @click="deleteManager(item)">
							
						</span>
						</li>
						<li class="addclass" v-if="isManager==1">
							<span class="el-icon-circle-plus-outline" v-if="showInput"></span>
							<span v-if="showInput" @click="handleShowInput">添加创建人</span>
							<input type="text" v-model='inputUsername'  placeholder="Enter键添加" v-if="!showInput" @keyup.enter="enterInput">
						</li>
					</ul>
				</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import api from '@/api/api.js'
	export default {
		name: 'authorityDialog',
		props: {
			showAuthority: {
				type: Boolean,
				default: true,
			},
			handleData: {
				type: Object,
				default: () => {},
			},
		},
		data() {
			return {
				activeItem:'',
				transferActive:0,
				isManager:0,//是否为管理员
				iscreator:0,//是否为创建人
				inputUsername:'',
				showInput:true,
				datas:{
					zhuantiInfo:{
						name:''
					}
				}
			}
		},
		async mounted() {
			//获取列表
			this.getList()
			//确认当前权限
			this.setAuthority()
		},
		computed:{
			getclass(){
				let arr = ['single-card']
				if(this.transferActive==1){
					arr.push('transfer-active')
				}
				return arr
			},
			getclassBlock(){
				return function(item){
					let arr = ['transfer-block']
					if(item.username==this.activeItem){
						arr.push('active-block')
					}
					return arr
				}
				
			}
		},
		methods: {
			async showtransfer(){
				this.transferActive=1
				 var callBack = (e) => {
				         let hidediv = document.getElementsByClassName("single-card");
						 let transferwrap = document.getElementsByClassName("transfer-wrap");
				         if (transferwrap.length>0) {
				           if (hidediv[0].contains(e.target)||hidediv[0]==e.target) {
							   
				           }else{
							  this.transferActive=0
							  document.removeEventListener("click", callBack); 
						   }
				         }
				};
				await document.addEventListener('click', callBack);
				
			},
			/*
			确认转移权限
			*/
			confirmTransfer(){
				if(this.activeItem){
					api.editAuthority({
						zt_id:this.datas.zhuantiInfo.id,
						username:this.activeItem
					}).then((res)=>{
							this.$message({
								type: 'success',
								message: '转移成功!',
							})
							this.transferActive = false
							this.resetList()
							
					})
				}else{
					this.$message({
						type: 'error',
						message: '请先选择要转移的管理员',
					})
				}
				
			},
			activeBlock(item,index){
				this.activeItem = item.username
			},
			deleteManager(item){
				api.deleteAuthority({
					zt_id:this.datas.zhuantiInfo.id,
					id:item.id
				}).then((res)=>{
						this.$message({
							type: 'success',
							message: '删除成功!',
						})
						this.resetList()
				})
			},
			/* 
			初始权限绑定 
			*/
			setAuthority(){
				let username = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
				let flag = false
				this.datas.zhuanti_user.forEach((item)=>{
					if(item.username == username){
						flag = true
					}
				})
				let superList = ['阿柴', '爱华', '7哥']
				if(username==this.datas.creater){
					this.iscreator = 1
					this.isManager = 1
				}else if(flag){
					this.isManager = 1
				}else{
					this.iscreator = 0
					this.isManager = 0
				}
				if (superList.includes(username)) {
					this.iscreator = 1
					this.isManager = 1
				}
			},
			/*
			确认添加输入 
			*/
			enterInput(){
				this.showInput = !this.showInput
				api.addAuthority({
					zt_id:this.datas.zhuantiInfo.id,
					username:this.inputUsername
				}).then((res)=>{
						this.inputUsername = ''
						this.resetList()
				})
			},
			handleShowInput(){
				this.showInput = !this.showInput
			},
			 async handleCurrentChange(val) {
				 this.page = val
				let params = {
					id: this.id,
					cityname:this.cityname,
					page:this.page,
					page_num:this.pageSize
				}
				const res = await this.$api.getCityListDetail(params)
				this.tableData = res.data
				this.total = res.count
			},
			async handleSizeChange(val) {
				this.page = 1
				this.pageSize = val
				let params = {
					id: this.id,
					cityname:this.cityname,
					page:this.page,
					page_num:this.pageSize
				}
				const res = await this.$api.getCityListDetail(params)
				this.tableData = res.data
				this.total = res.count
			},
			/*
			 @resetList
			 @description:重新获取权限列表
			 */
			resetList(){
				api.getAuthorityList({
					zt_id:this.datas.zhuantiInfo.id
				}).then((res)=>{
					let newzhuantiInfo = this.datas.zhuantiInfo
					this.datas = res
					this.datas.zhuantiInfo = newzhuantiInfo
					this.setAuthority()
				})
			},
			/* 
			 @getList
			 @description:获取数据
			 */
			getList() {
				this.datas = this.handleData
			},
			/* 
			 @cancel
			 @description:返回
			 */
			cancel() {
				this.$emit('hideDialog')
			},
		},
	}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
	.confir-wrap{
		color: #333;
		text-align: right;
	}
	.confir-wrap{
		span:first-of-type{
			margin-right: 20px;
		}
		span:hover{
			color: #6065EC;
		}
		span{
			cursor: pointer;
			transition: 0.3s;
		}
	}
	.transfer-active{
		padding:15px;
		border-radius:5px;
		background-color:#f3f3f3
	}
	.transfer-block:hover{
		background-color: #6065EC;
		color: #fff;
	}
	.active-block{
		background-color: #6065EC !important;
		color: #fff !important;
	}
	.transfer-block{
		display:inline-block;
		padding:5px 10px;
		border-radius:5px;
		color:#333;
		background-color: #fff;
		margin:0px 15px 0px 0px;
		line-height:18px;
		transition:0.3s;
		cursor: pointer;
	}
	.el-icon-close{
		cursor:pointer;
		transition:0.3s
	}
	.daoyus{
		font-size: 14px;
		color: #999;
	}
	.daoyu{
		font-size: 14px;
		color: #999;
		margin: 10px 0px 20px 0px;
	}
	.dialog-header-titles{
		color: #333333;
		font-size: 16px;
		font-weight: 700;
	}
	::v-deep.cell {
		white-space: pre-wrap !important;
	} 
	.single-card{
		
		li{
			position: relative;
			display:inline-block;
			height:30px;
			padding:5px 10px;
			border:1px solid #D9D9D9;
			border-radius:5px;
			color:#333;
			margin:10px 15px 10px 0;
			line-height:18px;
			transition:0.3s;
		}
		li:hover{
			border-color:#6065EC;
			color:#6065EC;
		}
		li:hover >span:first-child{
			color:#6065EC !important;
		}
		.addclass{
			border-color:#6065EC;
			color:#6065EC;
			cursor:pointer;
		}
	}
	 .el-button {
		font-size: 18px;
		margin-right: 10px;
		margin-bottom: 2px;
	}
	::v-deep.el-dialog::-webkit-scrollbar{
		width: 0px;
	}
	::v-deep.el-dialog{
		max-height: 800px;
		-webkit-box-sizing:border-box !important;
		 overflow-y: scroll;
	}
	.dialog-header-body {
	}

	.dialog-header-title {
		display: flex;
		align-items: center;
		margin-bottom: 10px;

		img {
			margin-right: 5px;
		}

		span {
			font-weight: 700;
			font-size: 18px;
		}
	}

	.copy-dialog {
		::v-deep.el-dialog__body {
			// padding: 0px 0px 0px 0px !important;
		}

		.under-table {
			text-align: right;
			margin-top: 20px;

			.theme-bg {
				// background-color: #6065ec;
				@include background_color;
			}
		}
	}
</style>
<style lang="less">
	.disabled {
		color: #C0C4CC !important;
	}
</style>
