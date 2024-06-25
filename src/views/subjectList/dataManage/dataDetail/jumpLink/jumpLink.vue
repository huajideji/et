<template>
    <div class="jumpLink">
        <div class="header">
            <img src="@/assets/images/left.png" alt="" @click="goBack()">
            <span class="title">跳转链接</span>
        </div>
        <!-- 顶部搜索筛选 -->
        <div class="top-search">
            <!-- 根据模块不同，筛选条件不同 -->
            <div class="left">
                <span class="title">筛选条件：</span>
                <div class="condition">
                    <span>城市</span>
                    <el-input placeholder="请输入内容" v-model="cityname" clearable class="search-input"
                        @keyup.enter.native="searchData()" @clear="searchData()">
                    </el-input>
                </div>
                <button class="search" @click="searchData()">
                    搜索
                </button>
                <span class="tip">
                    筛选到数据 <span>{{ total }}</span> 条
                </span>
            </div>
            <div class="right">
                <button class="addData" @click="addData()">
                    <img src="@/assets/images/addData.png" alt="">
                    添加数据
                </button>
            </div>
        </div>
        <div class="container">
            <el-table ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%;" max-height="500"
                :header-cell-style="{ background: '#FAFAFA', color: '#333',}" stripe>
                <!-- @selection-change="handleSelectionChange" -->
                <!-- <el-table-column type="selection" width="55">
                </el-table-column> -->
                <el-table-column label="id" width="80" align="center">
                    <template slot-scope="scope">{{ scope.row.id }}</template>
                </el-table-column>
                <el-table-column prop="cityname" label="城市" width="120" align="center">
                </el-table-column>
                <el-table-column prop="url" label="链接" show-overflow-tooltip align="center">
                </el-table-column>
                <el-table-column prop="publish_time" label="发布时间" align="center">
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="200">
                    <template slot-scope="scope">
                        <el-button type="text" class="theme-color edit-button" size="small"
                            @click="handleEdit(scope.row)">
                            修改</el-button>
                        <el-button type="text" class="theme-color delete-button" size="small"
                            @click="handleDel(scope.row)">
                            删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <footer>
            <div class="left flex-center">
                <!-- <button class="delData" @click="delData()">
                    <img src="@/assets/images/del.png" alt="">
                    刪除
                </button> -->
                <button class="addData" @click="addData()">
                    <img src="@/assets/images/addData.png" alt="">
                    添加数据
                </button>
            </div>
            <div class="right">
                <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"
                    :current-page="page" :page-sizes="[5, 10, 20,]" :page-size="page_num"
                    layout="sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="total">
                </el-pagination>
            </div>
        </footer>

        <!-- 编辑与保存数据弹出框 -->
        <el-dialog :visible.sync="dialogFormVisible" :before-close="handleClose" width="400px">
            <template slot="title">
                <span class="edit-title">{{ form.id != 0 ? `id${form.id}` : '' }}</span>
            </template>
            <el-form :model="form" label-position="top" :rules="rules" :hide-required-asterisk="false" ref="form">
                <el-form-item label="城市" prop="cityname">
                    <el-input v-model="form.cityname"></el-input>
                </el-form-item>
                <el-form-item label="链接" prop="url">
                    <!-- <el-input v-model="form.url"></el-input> -->
                    <el-input placeholder="例如:http://www.baidu.com" v-model="form.url" @change="checkUrl(form)">
                    </el-input>
                </el-form-item>
                <el-form-item label="发布时间" prop="publish_time">
                    <el-date-picker v-model="form.publish_time" type="datetime" placeholder="请选择发布时间"
                        style="width:100%">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addJumpLink()">保 存</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import utils from '@/utils';
export default {
    name: 'jumpLink',
    data() {
        return {
            page: 1,
            page_num: 5,
            total: 0,
            cityname: '',
            dialogFormVisible: false,
            form: {
                id: 0,
                cityname: '',
                url: '',
                publish_time: '',
            },
            module_id: null,
            tableData: [
            ],
            // multipleSelection: []
            rules: {
                cityname: [
                    { required: true, message: '请输入城市名称', trigger: 'change' },
                ],
                url: [
                    { required: true, message: '请输入跳转链接', trigger: 'change' },
                ],
                publish_time: [
                    { required: true, message: '请选择发布时间', trigger: 'change' },
                ],
            }
        }
    },
    async mounted() {

        this.module_id = +this.$route.query.id;
        this.setTableData()
    },
    methods: {
        async setTableData() {
            try {
                let params = {
                    cityname: this.cityname,
                    page: this.page,
                    page_num: this.page_num,
                    id: this.module_id
                }
                const res = await this.$api.reqGetJumpLinkList(params)
                this.tableData = res.list
                this.total = res.count
            } catch (error) {
                this.$message.error(error)
            }
            // this.tableData = res.data
        },
        checkUrl(form) {
            let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            if (!URL.test(form.url)) {
                this.$message({
                    message: '请输入合法的跳转链接或图片地址',
                    type: 'warning'
                });
            }
        },
        searchData() {
            this.setTableData()
        },
        addData() {
            this.dialogFormVisible = true;
            this.$nextTick(() => {
                this.$refs.form.clearValidate()
            })
        },
        // 编辑或添加链接
        addJumpLink() {
            this.$refs.form.validate(async (valid) => {
                if (valid) {
                    try {
                        //非法不添加数据
                        let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
                        if (!URL.test(this.form.url)) {
                            this.$message({
                                message: '请输入合法的跳转链接或图片地址',
                                type: 'warning'
                            });
                            return
                        }
                        this.form.publish_time = utils.formatDate(this.form.publish_time)
                        this.form.module_id = this.module_id
                        const res = await this.$api.reqAddJumpLink(this.form)
                        if (res != 0) {
                            this.$message({
                                message: '保存成功',
                                type: 'success'
                            });
                            this.dialogFormVisible = false;
                            this.form = {
                                id: 0,
                                cityname: '',
                                url: '',
                                publish_time: '',
                            }
                            this.setTableData()
                        }
                    } catch (error) {
                        this.$message.error(error)
                    }


                } else {
                    this.$message({
                        type: 'warning',
                        message: '必填项未填',
                    })
                    return false;
                }
            });

        },
        //编辑
        handleEdit(row) {
            this.dialogFormVisible = true;
            this.form = { ...row };
        },
        //删除
        handleDel(row) {
            this.$confirm('确定删除所选数据吗?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                showClose: false,
            })
                .then(async () => {
                    try {
                        const res = await this.$api.reqDelJumpLink({ id: row.id })
                        this.page = 1
                        this.page_num = 5
                        await this.setTableData()
                        this.$message({
                            type: 'success',
                            message: '删除成功!',
                        })

                    } catch (error) {
                        this.$message.error(error)
                    }
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
        },
        //防止误触关闭
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(_ => {
                    done();
                    this.form = {
                        id: 0,
                        cityname: '',
                        url: '',
                        publish_time: '',
                    }
                })
                .catch(_ => { });
        },
        // 获取分页器当前分页
        handleCurrentChange(val) {
         
            this.page = val
            // this.getModuleData()
        },

        //获取分页器每页条数
        handleSizeChange(val) {
            this.page = 1
            this.page_num = val
            // this.getModuleData()
        },
        /*表格选中状态更改 */
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        /*
@goBack
@description:返回上一页
*/
        goBack() {
            this.$router.go(-1)
        },
    }
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.jumpLink {
    width: 100%;

    .header {
        display: flex;
        align-items: center;

        >img {
            width: 10px;
            height: 17px;
        }

        .title {
            margin-left: 14px;
            color: #333;
            font-size: 16px;
        }

    }

    .top-search {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 24px 0;

        .left {
            display: flex;
            white-space: nowrap;
            align-items: center;

            .title {
                color: #666666;
                font-size: 14px;
                display: flex;
                align-items: center;
            }

            .condition {
                font-size: 12px;
                color: #333;
                margin-right: 17px;
                display: flex;
                align-items: center;

                >span {
                    margin-right: 9px;
                }
            }

            .search {
                height: 32px;
                width: 48px;
                border: none;
                color: #fff;
                border-radius: 2px;
                // background-color: #6065EC;
                @include background_color;
                margin-right: 17px;
                font-size: 12px;
            }

            .tip {
                display: flex;
                align-items: center;

                >span {
                    // color: #6065EC;
                    @include font_color;
                    font-size: 16px;
                }
            }
        }

        .right {
            display: flex;
            justify-content: end;

            .addData {
                width: 90px;
                height: 32px;
                box-sizing: border-box;
                border-radius: 4px;
                // background-color: #6065EC;
                @include background_color;
                color: #fff;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 18px;

                >img {
                    height: 14px;
                    margin-right: 6px;
                }
            }
        }

    }

    .container {
        .edit-button {
            // color: #6065ec;
            @include font_color;
        }

        .delete-button {
            color: #f33f3f;
        }
    }

    footer {
        margin-top: 20px;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;

            .delData {
                background-color: #fff;
                margin-right: 6px;
                width: 67px;
                height: 32px;
                box-sizing: border-box;
                border-radius: 4px;
                border: 1px solid #D9D9D9;
                color: #999;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 18px;

                >img {
                    height: 14px;
                    margin-right: 6px;
                }

                &:hover {
                    // background-color: #6065ec;
                    // color: #6065ec;
                }

            }

            .addData {
                width: 90px;
                height: 32px;
                box-sizing: border-box;
                border-radius: 4px;
                // background-color: #6065EC;
                @include background_color;
                color: #fff;
                border: none;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 18px;

                >img {
                    height: 14px;
                    margin-right: 6px;
                }
            }




        }
    }
}
</style>
<style lang="scss">
@import "@/assets/css/mixin.scss";
.jumpLink {
    .el-dialog__body {
        padding: 0 20px;
    }

    .el-pagination {

        .btn-prev,
        .btn-next {
            border: 1px solid #D8D8D8;
            color: #999;
            border-radius: 2px;

            >span {
                font-weight: 400;
            }

            &:hover {
                border-color: #2932FC;
                color: #2932FC;
            }
        }

        .el-pagination__sizes .el-input .el-input__inner:hover {
            border-color: #2932FC;
        }

        .el-pager li {
            border: 1px solid #D8D8D8;
            color: #D8D8D8;
            border-radius: 2px;
            margin: 0 5px;

            &:hover {
                border-color: #2932FC;
                color: #2932FC;
            }

            &:first-child {
                margin-left: 10px;
            }

            &:last-child {
                margin-right: 10px;
            }

            &.active {
                background-color: #2932FC;
                color: #fff;
            }
        }
    }

    .dialog-footer {
        .el-button {
            // background-color: #6065ec;
            @include background_color;
        }
    }
}
</style>