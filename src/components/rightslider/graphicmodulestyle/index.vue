<template>
    <div class="graphicmodulestyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
		<div class="card header" v-if="$route.query.type==1">
		  <el-form :model="datas" :rules="rules" label-position="top" ref="header">
			  
		    <el-radio v-model="datas.is_point" :label="1">AB有关的点对点逻辑</el-radio>
			<el-radio v-model="datas.is_point" :label="2" style="margin-top:12px">只与A城市有关</el-radio>
		    <el-radio v-model="datas.is_point" :label="0" style="margin-top:12px">只与B城市有关</el-radio>
		  </el-form>
		</div>
        <div class="desc">
            填写数据时，图片为选填
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
        <div class="redirect">
            <div class="card">
                <div class="title">
                    跳转其他页面
                </div>
                <div class="redirect-type">
                    <div class="redirect-top">
                        <el-radio-group v-model="datas.jump_type" @change="chosenRedirect">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">旧专题标识</el-radio>
                            <el-radio :label="2">新专题标识</el-radio>
                            <br></br>
                            <el-radio :label="3" style="margin-top:16px">链接 </el-radio>
                            <span class="tips" style="margin-top:16px">由各站点编辑自行填写</span>
                            <el-radio :label="4" style="margin-top:16px" v-if="!$parent.pageSetup.is_child">子页面入口
                            </el-radio>
                        </el-radio-group>
                    </div>
                    <el-form :model="datas" :rules="rules" label-position="top" ref="jump">
                        <div class="redirect-bottom" v-show="datas.jump_type == 1 || datas.jump_type == 2">
                            <el-form-item label="跳转专题标识" prop="jump_code">
                                <el-input v-model="datas.jump_code" placeholder="请输入跳转专题标识">
                                </el-input>
                            </el-form-item>
                        </div>
                        <div class="redirect-bottom" v-show="datas.jump_type == 4">
                            <el-form-item label="子页面标识" prop="jump_code">
                                <el-select v-model="datas.jump_code" placeholder="请选择子页面">
                                    <el-option v-for="item in $parent.childrenPageList" :key="item.id"
                                        :label="item.code" :value="item.code">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                        <div class="jump-type" v-show="datas.jump_type != 0">
                            <el-form-item label=" 入口位置" prop="jump_place"></el-form-item>
                            <div class="type">
                                <div class="type-box">
                                    <div>
                                        <span class="top-right">查看更多
                                            <i class="el-icon-arrow-right"></i>
                                        </span>
                                    </div>
                                    <el-radio v-model="datas.jump_place" :label="0">右上角</el-radio>
                                </div>

                                <div class="type-box">
                                    <div>
                                        <span class="bottom-right">查看更多
                                            <i class="el-icon-arrow-right"></i>
                                        </span>
                                    </div>
                                    <el-radio v-model="datas.jump_place" :label="1">右下角</el-radio>
                                </div>
                                <div class="type-box">
                                    <div>
                                        <span class="under">查看更多
                                            <i class="el-icon-arrow-right"></i>
                                        </span>
                                    </div>
                                    <el-radio v-model="datas.jump_place" :label="2" :disabled="!!(+datas.fold)">正下方
                                    </el-radio>
                                </div>
                                <div class="type-box">
                                    <div class="">
                                    </div>
                                    <el-radio v-model="datas.jump_place" :label="3" disabled>整个模块</el-radio>
                                </div>
                            </div>
                        </div>
                        </el-form-item>
                    </el-form>
                </div>
                <!-- <el-input v-model="datas.redirect.url" placeholder="请输入内容" size="mini" v-if="datas.redirect.type">
                </el-input> -->
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
    name: 'graphicmodulestyle',
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
    },
    watch: {
    },
    methods: {
        ...mapMutations('image_text', ['SETIMAGETEXT']),
         // 更改选择跳转类型，入口位置置空
         chosenRedirect() {
            this.$refs.jump.resetFields()
            this.datas.jump_code = '';
            this.datas.jump_type == 0 ?  this.datas.jump_place = 4 :  this.datas.jump_place = 0;
        },
        /* 存储需要创建的专题模块数据 */
        saveData() {
            let value = true
            if (!this.datas.name.length) {
                value = false;
                this.$refs.header.validate((valid) => {
                    if (!valid) {
                        return false;
                    }
                });
            }
            if (!value) {
                // this.$notify({
                //     message: '请完成必填项',
                //     type: 'warning',
                //     showClose: false,
                //     duration:1000,
                // });
                this.$message.error("请完成必填项")
                return
            }
            // this.$notify({
            //     message: 'success',
            //     type: 'success',
            //     showClose: false,
            //     duration:1000,
            // });
            this.$message.success("当前模块填写完整")
        },
    },
}
</script>
<style scoped lang="less">
.graphicmodulestyle {

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

    .redirect {

        // 添加搜索样式


        .title {
            margin-bottom: 12px;
        }
    }

    .redirect-type {
        .redirect-bottom {
            margin-top: 15px;

            .title {
                display: block;
                margin-bottom: 10px;
            }
        }

        .jump-type {
            margin-top: 17px;

            .title {
                display: block;
                margin-bottom: 10px;
            }

            .type {
                display: flex;
                justify-content: space-between;
                flex-wrap: wrap;

                .type-box {
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    margin-bottom: 10px;

                    >div {
                        width: 158px;
                        height: 87px;
                        border-radius: 2px;
                        border: 1px solid rgba(217, 217, 217, 1);
                        background-color: #fff;
                        margin-bottom: 8px;
                        position: relative;

                        >span {
                            color: #6065EC;
                            font-size: 14px;
                            position: absolute;

                            &.top-right {
                                right: 10px;
                                top: 10px;
                            }

                            &.bottom-right {
                                right: 10px;
                                bottom: 10px;
                            }

                            &.under {
                                // left: 50%;
                                bottom: 10px;
                                transform: translateX(56%);
                            }

                        }
                    }
                }
            }
        }
    }

}
</style>
<style lang="less">
.graphicmodulestyle {
    .type-box {
        .el-radio {
            display: flex;
            justify-content: center;
        }
    }
    .el-select {
        width: 100%;
    }
}
</style>