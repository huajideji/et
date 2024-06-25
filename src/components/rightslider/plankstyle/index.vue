<template>
    <div class="plankstyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
        <div class="desc">
            分享模块，支持复制链接、生成长图、QQ空间、新浪微博分享。若不设置跳转按钮，默认显示跳转至H5主页
        </div>
        <div class="card header">
            <el-form :model="datas" :rules="rules" label-position="top" ref="header">
                <el-form-item label="模块名称" prop="name">
                    <el-input type="text" v-model="datas.name" autocomplete="off" maxlength="14"></el-input>
                </el-form-item>
                <el-radio v-model="datas.is_show" :label="2">创建人命名</el-radio>
                <el-radio v-model="datas.is_show" :label="1">编辑自由命名</el-radio>
                <el-radio v-model="datas.is_show" :label="0" style="margin-top:12px">不显示名称</el-radio>
            </el-form>
        </div>
        <div class="others-moudle">
            <p>其他模块属性</p>
            <div class="card folding">
                <span style="margin-right:8px">
                    折叠/展开 >
                </span>
                <el-input placeholder="请选择折叠数" v-model="datas.fold" type="number" size="mini" min="0" max="9">
                </el-input>
                <span style="margin-left:8px">
                    行折叠
                </span>
                <span style="color:#999999; font-size:12px; margin-left:5px">
                    默认为0，不折叠
                </span>
                <div class="card add-search">
                    <div class="switch-box">
                        <span> 内容折叠 </span>
                        <div class="switch" :class="{ isOn: datas.is_fold }" @click="chosenSwitchThree">
                            <span class="radius"></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- <button id="save" @click="saveData">
            保存
        </button> -->
        <div style="height:100px;"></div>
        <div class="saveBtn flex">
            <span class="saveForm" @click="saveData">检查</span>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'plankstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
            
            rules: {
                name: [
                    { required: true, message: '请输入模块名称', trigger: 'blur' },
                ],
            }, // 模块验证列表

        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    watch: {
    },
     computed: {
        showFold() {
            if (this.datas.jump_place == 2) {
                this.datas.fold = 0
                this.isFolding = '0'
                return true
            }
            return false
        }
    },
    methods: {
        ...mapMutations('policy_points', ['SETPOLICYPOINTS']),
        /* 存储需要创建的专题模块数据 */
        chosenSwitchThree() {
            console.log(this.datas.is_fold)
            this.datas.is_fold
                == 0 ?
                (this.datas.is_fold = 1) :
                (this.datas.is_fold = 0)
        },
        saveData() {
            this.SETPOLICYPOINTS(this.datas)
            this.$message({
                message: '保存当前页面编辑样式成功',
                type: 'success'
            });
        },
    },
}
</script>
<style scoped lang="less">
.plankstyle {

    >h2 {
        padding: 21px 16px 6px 0;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
    }

    .desc {
        color: #999999;
        margin-top: 3px;
        margin-bottom: 20px;
        font-size: 14px;
    }

    .card {
        background: #f8f8f8;
        border-radius: 5px;
        padding: 18px 10px;
        margin: 12px 0;

        &.header {
            margin: 25px 0;
        }

    }

}
// 添加搜索样式
		.add-search {
			font-size: 14px;
			color: #333;
			font-weight: 400;
			padding-bottom: 8px;

			.switch-box {
				display: flex;
				align-items: center;

				&.padding {
					padding-bottom: 18px;
				}

				>span {
					margin-right: 12px;
				}

				>img {
					width: 48px;
					height: 24px;
				}

				.switch {
					width: 48px;
					height: 24px;
					background-color: #d9d9d9;
					position: relative;
					border-radius: 12px;
					transition: all 0.2s linear;

					.radius {
						display: block;
						width: 20px;
						height: 20px;
						border-radius: 10px;
						margin-top: 2px;
						background-color: #fff;
						position: absolute;
						left: 3px;
					}

					&.isOn {
						background-color: #6065ec;

						.radius {
							left: 25px;
						}
					}
				}
			}

			.search-field {
				.tips {
					margin-left: 8px;
					color: #999999;
					font-size: 12px;
				}
			}

			.guideWords {
				>span {
					display: block;
					margin-bottom: 12px;
				}
			}

			.emptyPrompt {
				margin-top: 12px;

				.tips {
					color: #666666;
					font-size: 10px;
				}
			}
		}
.others-moudle {
        .folding {
            .el-input {
                width: 60px;
            }

            .foldingNum {
                margin-right: 10px;
                margin-left: 20px;
            }
        }
    }
</style>