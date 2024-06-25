<template>
    <div class="edittabletabstyle">
        <!-- 标题 -->
        <!-- <h2>{{ datas.text }}</h2> -->

        <div class="desc">
            一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述
        </div>

        <div class="card header">
            <el-form :model="datas" :rules="rules" label-position="top">
                <el-form-item label="模块名称" prop="moduleName">
                    <el-input type="text" v-model="datas.moduleName" autocomplete="off" maxlength="10"></el-input>
                </el-form-item>
                <el-radio v-model="radio" label="1">自由填写</el-radio>
                <el-radio v-model="radio" label="2" disabled>不显示</el-radio>
            </el-form>
        </div>
        <!-- 表格编辑内容 -->
        <div class="card" v-for="(item, index) of datas.headerList" :key="index">
            <el-form :model="item" :rules="headerRules" label-position="top">
                <el-form-item :label="`第${index + 1}列列名`" prop="name">
                    <el-input type="text" v-model="item.name" autocomplete="off">
                    </el-input>
                </el-form-item>
                <el-form-item label="数据类型" prop="type">
                    <el-select v-model="item.type" placeholder="请选择数据类型" @change="chosenType(index)">
                        <el-option v-for="(item, index) of optionsList" :label="item" :value="index" :key="index">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="optionsList[item.type]" prop="btnName" v-if="item.type == 4 || item.type == 5">
                    <el-input type="text" v-model="item.btnName" autocomplete="off">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="typeText">
                <div class="text">
                    <el-radio v-model="item.optional" label="1">选填</el-radio>
                </div>
            </div>
            <span class="delete" @click="deleteHeader(index)">
                <i class="el-icon-close"></i>
            </span>
        </div>
        <button class="btn" @click="addColumn()">
            <i class="el-icon-plus"></i>
            <span>列</span>
        </button>
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
            <div class="card">
                <div class="title">
                    跳转其他页面
                </div>
                <div class="redirect-type">
                    <div class="redirect-top">
                        <el-radio-group v-model="datas.redirect.type" @change="chosenRedirect">
                            <el-radio :label="0">无</el-radio>
                            <el-radio :label="1">专题</el-radio>
                            <el-radio :label="2">链接 </el-radio>
                            <span class="tips">由各站点编辑自行填写</span>
                            <el-radio :label="3" style="margin-top:16px">子页面入口</el-radio>
                        </el-radio-group>
                    </div>
                    <div class="redirect-bottom" v-show="datas.redirect.type == 1">
                        <span class="title">
                            跳转专题标识
                        </span>
                        <el-input type="text" v-model="datas.redirect.url" autocomplete="off" style="height: 32px">
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
            </div>
            <div class="card add-search">
                <div class="switch-box" :class="{ padding: isOn }">
                    <span>
                        增加搜索功能
                    </span>
                    <div class="switch" :class="{ 'isOn': isOn }" @click="chosenSwitch">
                        <span class="radius"></span>
                    </div>
                </div>
                <template v-if="isOn">
                    <div class="search-field">
                        <span>
                            搜索字段
                        </span>
                        <span class="tips">
                            选填、按钮不可为搜索项
                        </span>
                    </div>
                    <div class="field-table">
                        <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%"
                            :header-cell-style="{ background: '#f8f8f8', color: '#333333', fontSize: '14px', fontWeight: '400', }"
                            :cell-style="{ background: '#f8f8f8' }" header-align="center"
                            @selection-change="handleSelectionChange">
                            <el-table-column type="selection">
                            </el-table-column>
                            <el-table-column prop="name" label="字段名称" align="center">
                            </el-table-column>
                            <el-table-column prop="type" label="字段类型" align="center">
                            </el-table-column>
                        </el-table>
                    </div>
                    <div class="guideWords">
                        <span>
                            引导文字
                        </span>
                        <el-input type="textarea" :rows="2" placeholder="例：搜索网点名称" v-model="datas.addSearch.guideWords">
                        </el-input>
                    </div>
                    <div class="emptyPrompt">
                        <el-form :model="datas.addSearch" :rules="emptyRules" label-position="top">
                            <el-form-item label="无结果提示" prop="emptyPrompt">
                                <span class="tips">当没有查询到结果时的回复文字</span>
                                <el-input type="textarea" v-model="datas.addSearch.emptyPrompt" placeholder="例：暂无数据">
                                </el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'edittabletabstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
            radio: '1',
            tableData: [
                {
                    name: '序号',
                    type: '序号'
                },
                {
                    name: '区县',
                    type: '区县'
                },
                {
                    name: '区县',
                    type: '数值'
                },
            ],
            isOn: false,
            // multipleSelection: [],
            optionsList: ['文本', '数值', '区县', '地址(区县+街道选填+具体地址选填)', '序号', '指定名称按钮', '自定义名称按钮', '日期+时刻', '电话+备注', '超链接文本'],
            rules: {
                moduleName: [
                    { required: true, message: '请输入第一列名称', trigger: 'blur' },
                ],
            },// 模块名称校验
            headerRules: {
                name: [
                    { required: true, message: '请输入第一列名称', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择模块类型', trigger: 'change' }
                ],
                btnName: [
                    { required: true, message: '请输入按钮名称', trigger: 'blur' },
                ],
            }, // 表头校验
            emptyRules: {
                emptyPrompt: [
                    { required: true, message: '请输入内容', trigger: 'blur' },
                ],
            }

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
        // 删除表头某列
        deleteHeader(index) {
         
            this.datas.headerList.splice(index, 1);
        },
        // 数据类型变换清空按钮值
        chosenType(index) {
            this.datas.headerList[index].btnName = '';
        },
        // 添加表头列
        addColumn() {
            this.datas.headerList.push({
                name: '',
                optional: '',
                type: null,
                btnName: '',
            })
        },
        // 表格选中回调
        handleSelectionChange(val) {
            this.datas.addSearch.field = val;
        },
        // 更改选择跳转类型，入口位置置空
        chosenRedirect() {
            this.datas.jump_type = null;
        },
        // 搜索功能回调
        chosenSwitch() {
            this.isOn = !this.isOn
            this.datas.addSearch = {
                field: [],
                guideWords: '',
                emptyPrompt: '',
            }
        }
    },
}
</script>

<style scoped lang="less">
.edittabletabstyle {

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
        border-radius: 4px;
        padding: 17px 20px 24px;
        margin: 12px 0;
        position: relative;

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

        .delete {
            position: absolute;
            top: 14px;
            right: 20px;
            font-size: 18px;
            font-weight: bolder;
            cursor: pointer;
        }
    }

    // 添加搜索样式
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
                transition: all .2s linear;

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
                    background-color: #6065EC;

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
            }
        }
    }


    .typeText {
        display: flex;

        .text {
            width: 250px;
        }
    }

    .btn {
        width: 90px;
        height: 32px;
        border-radius: 4px;
        background-color: #6065EC;
        color: #fff;
        border: none;
        margin-bottom: 20px;
        margin-top: 8px;
        font-size: 12px;
    }

    .title {
        font-size: 14px;
        color: #333333;
        margin-bottom: 18px;
    }
}
</style>
<style lang="less">
.edittabletabstyle {
    .el-form-item {
        margin-bottom: 16px;
    }

    .card {
        .el-select {
            width: 100%;
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

        .type-box {
            .el-radio {
                display: flex;
                justify-content: center;
            }
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


    .el-table td.el-table__cell,
    .el-table th.el-table__cell.is-leaf {
        border-bottom: none;
    }

    .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
        background-color: #f8f8f8;
    }

    .el-table tr {
        background-color: #f8f8f8;
    }

    .el-textarea__inner {
        min-height: 72px !important;
    }

    .el-form-item__content {
        line-height: 24px;
    }
}
</style>