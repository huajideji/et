<template>
    <div class="moduleentrytabstyle">
        <!-- 标题 -->
        <!-- <h2>{{ datas.text }}</h2> -->
        <!-- 名称 -->
        <div class="card header">
            <el-form :model="datas" :rules="rules" label-position="top">
                <el-form-item label="模块名称" prop="moduleName">
                    <el-input type="text" v-model="datas.moduleName" autocomplete="off" maxlength="10"></el-input>
                </el-form-item>
                <el-radio v-model="radio" label="1">自由填写</el-radio>
                <el-radio v-model="radio" label="2" disabled>不显示</el-radio>
            </el-form>
            <el-checkbox v-model="datas.isPosition">地址字段</el-checkbox>
        </div>
        <!-- 筛选条件 -->
        <div class="card  screening">
            <el-form :model="datas" :rules="rules" label-position="top">
                <el-form-item label="筛选条件" prop="type">
                    <el-checkbox-group v-model="datas.type" @change="changeMoudleType(datas.type)">
                        <el-checkbox :label="0" name="type">区县</el-checkbox>
                        <el-checkbox :label="1" name="type" :disabled="!datas.type.includes(0)">街道</el-checkbox>
                        <el-checkbox :label="2" name="type">其他，请填写</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
            <span class="tips">
                类型之间用^隔开
            </span>
            <el-input type="textarea" v-model="others" size="mini" placeholder="例：24小时可做核算^6小时出结果^24小时可做核算且6小时出结果">
            </el-input>
        </div>

        <!-- 模块卡片 -->
        <div v-if="datas.network">
            <section class="networkList">
                <div class="content-box">
                    <!-- 字段内容 -->
                    <div class="field">
                        <p>字段设置</p>
                        <div class="card" v-for="(item, index) of datas.network.contentList" :key="index">
                            <el-form :model="item" :rules="contentRules" label-position="top">
                                <el-form-item :label="`字段${index + 1}名称`" prop="name">
                                    <el-input type="text" v-model="item.name" autocomplete="off">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="数据类型" prop="type">
                                    <el-select v-model="item.type" placeholder="请选择数据类型">
                                        <el-option label="电话号码+备注" :value="2"></el-option>
                                        <el-option label="日期+时刻" :value="1"></el-option>
                                        <el-option label="文本" :value="0"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <div class="typeText">
                                <div class="text">
                                    <el-radio v-model="item.optional" label="1">选填</el-radio>
                                </div>
                            </div>
                            <span class="delete" @click="deleteContent(index)">
                                <i class="el-icon-close"></i>
                            </span>
                        </div>
                        <button class="btn" @click="addContent()">
                            <i class="el-icon-plus"></i>
                            <span>新增字段</span>
                        </button>
                    </div>
                    <!-- 按钮内容 -->
                    <div class="btn-group">
                        <p>按钮设置</p>
                        <div class="card" v-for="(item, index) of datas.network.btnList" :key="index">
                            <el-form :model="item" :rules="btnRules" label-position="top">
                                <el-form-item :label="`按钮${index + 1}名称`" prop="name">
                                    <el-input type="text" v-model="item.name" autocomplete="off">
                                    </el-input>
                                </el-form-item>
                                <el-form-item label="数据类型" prop="type">
                                    <el-select v-model="item.type" placeholder="请选择按钮类型" @change="changeBtnName(item)">
                                        <el-option label="自定义名称按钮" value="22"></el-option>
                                        <el-option label="指定名称按钮" value="11"></el-option>
                                    </el-select>
                                </el-form-item>
                            </el-form>
                            <div class="typeText">
                                <div class="text">
                                    <el-radio v-model="item.optional" label="1">选填</el-radio>
                                </div>
                            </div>
                            <span class="delete" @click="deleteBtn(index)">
                                <i class="el-icon-close"></i>
                            </span>
                        </div>
                        <div class="btn-box">
                            <button class="btn" @click="addBtn()">
                                <i class="el-icon-plus"></i>
                                <span>新增按钮</span>
                            </button>
                            <span>
                                最多可添加三个按钮
                            </span>
                        </div>
                    </div>
                    <div class="others-moudle">
                        <p>其他模块属性</p>
                        <div class="card folding">
                            <span style="margin-right:8px">
                                折叠/展开 >
                            </span>
                            <el-input placeholder="请选择折叠数" v-model="datas.fold" type="number" size="mini" min="0"
                                max="9">
                            </el-input>
                            <span style="margin-left:8px">
                                行折叠
                            </span>
                            <span style="color:#999999; font-size:12px; margin-left:5px">
                                默认为0，不折叠
                            </span>
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
                                    <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark"
                                        style="width: 100%"
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
                                    <el-input type="textarea" :rows="2" placeholder="例：搜索网点名称"
                                        v-model="datas.addSearch.guideWords">
                                    </el-input>
                                </div>
                                <div class="emptyPrompt">
                                    <el-form :model="datas.addSearch" :rules="emptyRules" label-position="top">
                                        <el-form-item label="无结果提示" prop="emptyPrompt">
                                            <span class="tips">当没有查询到结果时的回复文字</span>
                                            <el-input type="textarea" v-model="datas.addSearch.emptyPrompt"
                                                placeholder="例：暂无数据">
                                            </el-input>
                                        </el-form-item>
                                    </el-form>
                                </div>
                            </template>
                        </div>

                    </div>
                </div>
            </section>
        </div>


    </div>
</template>

<script>
import vuedraggable from 'vuedraggable' //拖拽组件

export default {
    name: 'moduleentrytabstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
            dragOptions: {
                //拖拽配置
                animation: 200,
            },
            radio: '1',
            checked: true,
            isOn: false,
            others: '',
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
                    name: '病例数据',
                    type: '数值'
                },
                {
                    name: '调用数据',
                    type: '电话+备注'
                },
            ],
            rules: {
                moduleName: [
                    { required: true, message: '请输入模块名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                county: [
                    { required: true, message: '请选择区域', trigger: 'change' }
                ],
                type: [
                    { type: 'array', required: true, message: '请至少选择一个模块类型', trigger: 'change' }
                ],
            }, // 模块验证列表
            networkRules: {
                networkName: [
                    { required: true, message: '请输入网点名称', trigger: 'blur' },
                    { min: 1, message: '长度在1个字符以上', trigger: 'blur' }
                ],
                networkType: [
                    { required: true, message: '请选择类型', trigger: 'change' }
                ],
            },// 列表名称验证
            contentRules: {
                name: [
                    { required: true, message: '请输入字段名称', trigger: 'blur' },
                    { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                type: [
                    { required: true, message: '请选择模块类型', trigger: 'change' }
                ],
            },// 内容验证
            btnRules: {
                name: [
                    { required: true, message: '请输入按钮名称', trigger: 'change' },
                    { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'change' }
                ],
                type: [
                    { required: true, message: '请选择模块类型', trigger: 'change' }
                ],
            }, // 按钮验证
            emptyRules: {
                emptyPrompt: [
                    { required: true, message: '请输入内容', trigger: 'blur' },
                ],
            },
        }
    },
    created() {
        // console.log(this.datas.network.contentList)
    },
    watch: {
        // 控制标题显示与隐藏
        radio(newVal) {
            if (newVal == 1) {
                this.datas.titleHide = false;
            } else {
                this.datas.titleHide = true
            }
        },
        // 其它选项数组拆分
        others(newVal) {
            this.datas.others = newVal.split('^')
        },

    },
    methods: {
        /* 更改字段类型 */
        // changeType(content) {
        //     content.text = ''
        // },
        /* 更改按钮类型,btn名字清空 */
        changeBtnName(item) {
            item.name = ''
        },
        /* 更改模块类型 */
        changeMoudleType(type) {
            // 取消区县选择同时需要取消街道选择
            if (!type.includes(1) && type.indexOf(2) !== -1) {
                type.splice(type.indexOf(2), 1)
            }

        },
        /* 删除字段内容 */
        deleteContent(contentIndex) {
            // 删除模块下字段
            this.datas.network.contentList.splice(contentIndex, 1)
        },
        /* 增加字段内容 */
        addContent() {
            // 增加模块下字段
            this.datas.network.contentList.push({
                name: '',
                text: '',
                type: '',
            })
        },

        /* 删除按钮 */
        deleteBtn(btnIndex) {
            this.datas.network.btnList.splice(btnIndex, 1)
        },
        addBtn() {
            if (this.datas.network.btnList.length < 3) {
                this.datas.network.btnList.push({
                    name: '',
                    url: '',
                    type: '',
                })
            } else {
                this.$message.error('最多可添加三个按钮');
            }
        },
        // 表格选中回调
        handleSelectionChange(val) {
            this.datas.addSearch.field = val;
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
    computed: {

    },
    components: { vuedraggable, },
}
</script>

<style scoped lang="less">
.moduleentrytabstyle {
    padding: 0 10px 20px;
    box-sizing: border-box;

    p {
        font-size: 14px;
        font-weight: 700;
        color: #333333;
        margin-bottom: 20px;
    }


    /* 商品列表 */
    .networkList {

        /* 删除图标 */
        .el-icon-circle-close {
            position: absolute;
            right: -10px;
            top: -10px;
            cursor: pointer;
            font-size: 19px;
        }

        .content-box {
            flex-grow: 1;

            .content-row {
                display: flex;
                flex-wrap: wrap;
                width: 100%;

                >div {
                    width: 50%;
                    box-sizing: border-box;

                    &.pos {
                        width: 100%;
                    }

                }
            }

            .typeText {
                display: flex;

                .text {
                    width: 250px;
                }

                .delete {
                    display: flex;
                    align-items: end;
                    margin-left: 45px;
                }
            }
        }


    }


    .card {
        background: #f8f8f8;
        border-radius: 5px;
        padding: 18px 10px;
        margin: 12px 0;
        position: relative;

        .delete {
            position: absolute;
            top: 14px;
            right: 20px;
            font-size: 18px;
            font-weight: bolder;
            cursor: pointer;
        }
    }

    .screening {
        position: relative;

        .tips {
            position: absolute;
            left: 130px;
            top: 92px;
            font-size: 12px;
            color: #999999;
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
                font-size: 10px;
            }
        }
    }



    .btn-box {
        >span {
            color: #666666;
            font-size: 12px;
            margin-left: 20px;
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

    .addNetorkList {
        width: 345px;
        height: 40px;
    }
}
</style>
<style  lang="less">
.moduleentrytabstyle {
    .el-form-item {
        margin-bottom: 16px;
    }

    .card {
        .el-select {
            width: 100%;
        }
    }

    .header {
        .el-checkbox {
            margin-top: 16px;
        }
    }

    .screening {
        .el-checkbox {
            line-height: 20px;
        }

        .el-form-item {
            margin-bottom: 0;
            width: 90%;
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

