<template>
  <div class="templateTable">

    <el-dialog :visible.sync="TableShow" :show-close="false">
       
        <header>
            <div class="left flex-center">
                <i class="el-icon-arrow-left" @click="returnTemp()"></i>
                将专题保存为模板
            </div>
            <div class="right">
                <img src="@/assets/images/close.png" alt="" @click="closeDialog">
            </div>
        </header>

        <div class="container">
            <div class="search">
                <el-input
                    placeholder="请输入专题名称/标识/搭建人"
                    v-model="inputName"
                    @keyup.enter.native="search"
                    clearable
                    @clear="search"
                    >
                    <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
                </el-input>
            </div>

            <el-table :data="tableData" :header-cell-style="tableHeader" :stripe="true">
                
                <el-table-column align="center" label="专题名称">
                    <template slot-scope="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="专题标识">
                    <template slot-scope="scope">
                        {{ scope.row.code }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="搭建人">
                    <template slot-scope="scope">
                        {{ scope.row.creater }}
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作">
                   <template slot-scope="scope">
                        <span v-if="scope.row.is_template != 1" class="produce-temp" @click="produceTemp(scope.row.id)">一键生成模板</span>
                        <span v-else style="color:#999;">已生成模板</span>
                    </template>    
                </el-table-column>
                
            </el-table>
            <div class="pagination end">
                <el-pagination @current-change="handleCurrentChange" @size-change="handleSizeChange"
                    :current-page="page" :page-sizes="[10, 20, 30]" :page-size="pageSize"
                    layout="sizes, prev, pager, next, jumper" prev-text="上一页" next-text="下一页" :total="total">
                </el-pagination>
            </div>
            
        </div>
       

    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
	export default {
        name:'templateTable',
        props: {
            tableVisible:{
                type: Boolean,
                default: false,
            },
           
        },
		data() {
			return {
                inputName:'',
				TableShow: this.tableVisible,
                tableHeader: {
					background: '#F0F1F1',
					color: '#333',
				},
                tableData:[],
                page: 1,
                pageSize: 10,
                total:null,
                moduleData:[],
                usedIdArr:[],//已经生成为模板的专题id
			}
		},
        mounted() {
            this.getList()
        },
        computed:{
            ...mapState(['module_type'])
        },
        methods:{
            // 获取专题列表数据
            async getList(
                params = {
                    keyword: this.inputName,
                    page: this.page,
                    page_num: this.pageSize,
                }
                ) {
                try {
                    const res = await this.$api.reqGetList(params)
                    this.tableData = res.data
                    this.total = res.data_count
                } catch (e) {
                    this.$message.error(e)
                }
            },
            // 获取专题配置信息
             async getProjectData(id) {
                if (id) {
                    let params = { id: id }
                    const res = await this.$api.reqGetProjectData(params)
                    console.log(res, '专题配置信息')
                    
                }
            },
            // 模块信息转化成创建专题格式数据
            pageComponentsToParams(arr) {
                let params = {}
                arr.forEach((component, index) => {
                    this.module_type.forEach((module) => {
                    if (component.module_type_id == module.module_type_id) {
                        if (params[module.name] == undefined) {
                        params[module.name] = []
                        }
                        component.value_list = component.key_list
                        component.sort = index
                        params[module.name].push(component)
                    }
                    })
                })
                return params
            },
            // 关闭模板库对话框
            closeDialog() {
                this.$emit("hideTable")
            },
            // 生成模板
            produceTemp(id) {
                // console.log(id);
                this.$confirm('确认后，对模板的修改不会影响该专题，你可以在模板库中查看', '确认一键生成模板？', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
                    this.usedIdArr.push(id)
                    const projectData = this.$api.reqGetProjectData({ id: id })//获取专题的配置信息
                    projectData.then((result)=>{
                        let ztData = result.zhuanti_info
                        let mkData = this.pageComponentsToParams(result.module_info)
                        this.moduleData = result.module_info
                        let pageSetup = {
                            name: ztData.name,
                            // code: 'muban'+id,
                            code: ztData.code,
                            title: ztData.title,
                            describe: ztData.describe,
                            is_draft: ztData.is_draft,
                            id: ztData.id,
                            pid: ztData.pid,
                            type: ztData.type,
                            html: '-',
                            city_a: ztData.city_a,
                            city_b: ztData.city_b,
                            topic_type: ztData.topic_type,
                            city_select: ztData.city_select,
                            template_count: 0,
                            is_template:1,
                            category_one: ztData.category_one,
                            category_two: ztData.category_two
                        }
                        const res = this.$api.reqAddProject({...pageSetup,...mkData})
                        res.then((e)=>{
                            if (e.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '生成成功!',
                                })
                            }
                        })
                       
                        this.getList()
                      
                    })
                   
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消',
                    })
                })
            },
            // 搜索
            search() {
                this.getList()
            },
            // 返回模板库
            returnTemp() {
                this.$emit("closeTable")
            },
            /* 
            @handleSizeChange
            @description:分页大小改变
            */
            handleSizeChange(val) {
                this.pageSize = val
                this.getList()
            },
            /* 
            @handleCurrentChange
            @description:当前页码改变
            */
            handleCurrentChange(val) {
                this.page = val
                this.getList()
            },
          
        }
	}
</script>

<style lang="less" scoped>
.templateTable {
    color: #333;

    /deep/.el-dialog {
        width: 1286px;
        height: 80%;
        // overflow-y: auto;
        .el-dialog__header {
            padding: 0;
        }
    }

    /deep/.el-table--striped .el-table__body tr.el-table__row--striped td.el-table__cell {
        background: #f0f1f1;
    }

    header {
        display: flex;
        justify-content: space-between;
        .left {
            font-size: 18px;
            color: #333;
            .el-icon-arrow-left {
                margin-right: 10px;
            }
        }
        .right {
            img {
                width: 33px;
                height: 33px;
                cursor: pointer;
            }
        }
    }

    .container {
        height: 87%;
        overflow-y: auto;
        margin: 14px -16px 0 -20px;
        padding: 20px 40px;
        background-color: #F8F8F8;
        /* 滚动条 */
        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #d9d9d9;
            border-radius: 5px;
        }
        .search {
            margin-bottom: 20px;
            .el-input {
                width: 400px;
                /deep/.el-input__inner {
                    border-radius: 20px;
                }
                .el-icon-search {
                    cursor: pointer;
                    background: url('../../../../../../assets/images/search-gray.png') center center no-repeat;
                    background-size: 20px 20px;
                    &:before {
                        content: '';
                    }
                    // &:hover {
                    //     color: red;
                    // }
                }
            }
        }
        .produce-temp {
            color:#6065EC;
            cursor: pointer;
        }
        .pagination {
            margin: 20px 0 0;
        }
        
        
    }
        
           
}
   
</style>

