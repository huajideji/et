<template>
    <div class="articlelisttabstyle">
        <!-- 标题 -->
        <!-- <h2>{{ datas.text }}</h2> -->
        <div class="desc">
            一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述
        </div>
        <div class="card header">
            <el-form :model="datas" :rules="rules" label-position="top" ref="header">
                <el-form-item label="模块名称" prop="name">
                    <el-input type="text" v-model="datas.name" autocomplete="off" maxlength="10"></el-input>
                </el-form-item>
                <el-radio v-model="datas.is_show" :label="2">创建人命名</el-radio>
                <el-radio v-model="datas.is_show" :label="1">编辑自由命名</el-radio>
                <el-radio v-model="datas.is_show" :label="0" style="margin-top:12px">不显示名称</el-radio>
            </el-form>
        </div>
        <div class="elements">
            <p>包含元素</p>
            <div class="card">
                <el-checkbox-group v-model="datas.elementList" @change="changeElement">
                    <el-checkbox label="更新时间" name="type"></el-checkbox>
                    <el-checkbox label="图片" name="type"></el-checkbox>
                </el-checkbox-group>
            </div>
            <div class="card">
                <span class="detail">
                    文章详情
                </span>
                <el-radio-group v-model="datas.detail">
                    <el-radio :label="0">无</el-radio>
                    <el-radio :label="1">1行详情</el-radio>
                    <el-radio :label="3" :disabled="datas.elementList.includes('图片')">3行详情</el-radio>
                </el-radio-group>
            </div>
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
            </div>
        </div>
        <div class="redirect">
            <div class="card">
                <div class="title">
                    跳转其他页面
                </div>
                <div class="redirect-type">
                    <div class="redirect-top">
                        <el-radio-group v-model="datas.redirect.type" @change="chosenRedirect">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">专题</el-radio>
                            <el-radio :label="2">链接</el-radio>
                            <span class="tips">由各站点编辑自行填写</span>
                            <el-radio :label="3" style="margin-top:16px">子页面入口</el-radio>
                        </el-radio-group>

                    </div>
                    <div class="redirect-bottom" v-show="datas.redirect.type == 1">
                        <span class="title">
                            跳转专题标识
                        </span>
                        <el-input type="text" v-model="datas.redirect.url" autocomplete="off">
                        </el-input>
                    </div>
                    <div class="jump-type" v-show="datas.redirect.type != 0">
                        <span class="title">
                            入口位置
                        </span>
                        <div class="type">
                            <div class="type-box">
                                <div>
                                    <span class="top-right">查看更多
                                        <i class="el-icon-arrow-right"></i>
                                    </span>
                                </div>
                                <el-radio v-model="datas.jump_type" :label="0" disabled>右上角</el-radio>
                            </div>

                            <div class="type-box">
                                <div>
                                    <span class="bottom-right">查看更多
                                        <i class="el-icon-arrow-right"></i>
                                    </span>
                                </div>
                                <el-radio v-model="datas.jump_type" :label="1">右下角</el-radio>
                            </div>
                            <div class="type-box">
                                <div>
                                    <span class="under">查看更多
                                        <i class="el-icon-arrow-right"></i>
                                    </span>
                                </div>
                                <el-radio v-model="datas.jump_type" :label="2" :disabled="!!(+datas.foldingNum)">正下方
                                </el-radio>
                            </div>
                            <div class="type-box">
                                <div class="">
                                </div>
                                <el-radio v-model="datas.jump_type" :label="3" disabled>整个模块</el-radio>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- <el-input v-model="datas.redirect.url" placeholder="请输入内容" size="mini" v-if="datas.redirect.type">
                </el-input> -->
            </div>
        </div>

    </div>
</template>
<script>
export default {
    name: 'articlelisttabstyle',
    props: {
        datas: Object
    },
    data() {
        return {
            radio: '1',
            rules: {
                moduleName: [
                    { required: true, message: '请输入模块名称', trigger: 'blur' },
                    { min: 2, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                county: [
                    { required: true, message: '请选择区域', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个模块类型', trigger: 'change' }
                ],
            }, // 模块验证列表

        }
    },
    watch: {
        // 控制标题显示与隐藏
        radio(newVal) {
            if (newVal == 1) {
                this.datas.titleHide = false;
            } else {
                this.datas.titleHide = true;
            }
        },
       
    },
    methods: {
        /* 元素更改 */
        changeElement() {
            this.datas.detail = 0
        },
        changeRedirectType() {
            this.datas.redirect.url = ''
        },
        // 更改选择跳转类型，入口位置置空
        chosenRedirect() {
            this.datas.jump_type = null;
        }
    },
}
</script>
<style scoped lang="less">
.articlelisttabstyle {

    p {
        font-size: 14px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 20px;
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

        .detail {
            margin-right: 15px;
        }

        .tips {
            font-size: 12px;
            color: #666666;
            margin-left: -18px;
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
.articlelisttabstyle {
    .el-form-item {
        margin-bottom: 16px;
    }

    .folding {
        .el-input {
            width: 60px;
        }

        .foldingNum {
            margin-right: 10px;
            margin-left: 20px;
        }
    }

    .type-box {
        .el-radio {
            display: flex;
            justify-content: center;
        }
    }

    .redirect-bottom {
        .el-input {
            height: 32px;

            .el-input__inner {
                height: 32px;
                line-height: 32px;
            }
        }
    }
}
</style>