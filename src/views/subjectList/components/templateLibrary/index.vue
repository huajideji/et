<template>
  <div class="templateLibrary">

    <el-dialog :visible.sync="templateShow" :show-close="false">

       <div class="headTop">
            <header>
                <div class="left flex-center">
                    <img src="@/assets/images/muban.png" alt="">
                    模板库
                </div>
                <div class="center">
                    <el-input
                        placeholder="请输入模板名称关键词"
                        v-model="inputName"
                        @keyup.enter.native="search"
                        clearable
                        @clear="search"
                        >
                        <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
                    </el-input>
                </div>
                <div class="right">
                    <img src="@/assets/images/close.png" alt="" @click="closeDialog">
                </div>
            </header>
        </div>
  
        <center>
            <div class="end"><span class="btn" @click="createTemp()">新增模板</span></div>

            <div class="container wrap">
                <!-- <div :class="[guideShow[2] ? 'guideHigh' : '']"> -->
                    <div class="card flex-column flex-center center" :class="[guideShow[2] ? 'guideHigh' : '']" @click="addTopic(0)">
                        <img class="addImg" src="@/assets/images/add-big.png" alt="">
                        <span>新建专题</span>
                    </div>
                <!-- </div> -->
                <div class="card flex-column flex-center center" @click="addTopic(1)">
                    <img class="addImg" src="@/assets/images/add-big.png" alt="">
                    <span>新建点对点模板</span>
                </div>
                <div class="card flex-column flex-center center" @click="addTopic(2)">
                    <img class="addImg" src="@/assets/images/add-big.png" alt="">
                    <span>新建通用模板</span>
                </div>
                <div class="card"  v-for="(item,index) in templateData" :key="index" @mouseover="cardOver(index)" @mouseleave="cardLeave(index)">
                    <div class="end"><i class="el-icon-more" @mouseover="showDel(index)"></i></div>
                    <div class="delete" v-show="showDelete[index]" @click="delTemplate(index,item.name,item.id)"><i class="el-icon-delete"></i>删除</div>
                    <div class="name">{{item.name}}</div>
                    <div class="template-scale" >
                        <div class="previewImg" v-for="(itm,idx) in bannerData" :key="idx" v-if="itm.id == item.id">
                            <img :src="itm.image" alt="">
                        </div>
                        <div class="previewImg" v-for="(itm,idx) in bannerData" :key="idx" v-if="itm.id != item.id && idx==0">
                            <img src="@/assets/images/notemp.jpg" alt="">
                        </div>
                    </div>
                    <div class="usenum" v-show="!showbtn[index]">已使用{{item.template_count}}次</div>
                    <div class="flex-between" v-show="showbtn[index]">
                        <!-- <span class="btn white-btn">预览</span> -->
                        <span class="btn blue-btn use" @click="useTemplate(item.id,item.topic_type)">使用</span>
                    </div>
                </div>
            </div>

            <!-- 新手指引第二步 (新建专题) -->
            <div class="guideMask" v-if="guideShow[2]">
                <div class="guide-box">
                    <div class="flex">
                        <!-- <img class="guide-line" src="@/assets/images/guide-line-left.png" alt="" /> -->
                        <div class="guide-arrow flex-center">
                            <div class="cir1"><span class="cir2"></span></div>
                            <div class="line-x"></div>
                        </div>
                        <div class="guide-card">
                            <img class="starImg-left" src="@/assets/images/guide-star.png" alt="">
                            <img class="starImg-right" src="@/assets/images/guide-star2.png" alt="">
                            <p>点击"新建专题"</p>
                        </div>
                    </div>
                    <div class="guide-btns center">
                        <span class="guide-exit" @click="guidePrev(2)">上一步</span>
                        <span class="guide-next" @click="guideNext(2)">下一步</span>
                    </div>
            </div>
            </div>
        </center>

    </el-dialog>

    <!-- 专题列表表格 -->
    <templateTable v-if="showTable" :tableVisible="showTable" @hideTable="hideTable" @closeTable="closeTable" ref="tempTable"/>

    

    
  </div>
</template>

<script>
    import { mapState } from 'vuex';
    import templateTable from './components/templateTable/index.vue';
	export default {
        name:'templateLibrary',
        components: {templateTable},
        props: {
            templateVisible:{
                type: Boolean,
                default: false,
            },
            tableData: {
				type: Array,
				default: () => [],
			},
        },
		data() {
			return {
                inputName:'',
				templateShow: this.templateVisible,
                showbtn: [],
                showDelete: [],
                templateData:[],
                bannerData:[],
                showTable: false,
                guideShow:[]
			}
		},
        mounted() {
            this.getTemplateList()
            this.getBannerList()
            this.guideShow = JSON.parse(sessionStorage.getItem('guideShow'))
            window.addEventListener('setItem', () => {
                this.guideShow = JSON.parse(sessionStorage.getItem('guideShow'))
            })
        },
        computed:{
            ...mapState(['module_type'])
        },
        methods:{
            // 新建专题
            addTopic(i) {
                this.$router.push({
                    name: 'editor',
                        query: {
                        type: i,
                    },
                })
            },
            // 关闭模板库对话框
            closeDialog() {
                this.$emit("hideDialog")
            },
            // 鼠标移入模板
            cardOver(index) {
                this.$set(this.showbtn,index,true)
            },
            // 鼠标移出模板
            cardLeave(index) {
                this.$set(this.showbtn,index,false)
                this.$set(this.showDelete,index,false)
            },
            // 显示删除按钮
            showDel(index) {
                this.$set(this.showDelete,index,true)
            },
            // 新建模板
            createTemp() {
                this.showTable = true
                this.templateShow = false
            },
             // 使用模板
			useTemplate(id,type) {
				this.$router.push({
					name: 'editor',
					query: {
						id: id,
						type: type,
                        isTemp:1
					}
				})
			},
            // 删除模板(修改is_template为2)
            delTemplate(index,val,id) {
                let that = this
                this.$confirm(`删除后，该模板将从模板库移除`, `是否删除模板：“${val}”？`, {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(() => {
                    const projectData = this.$api.reqGetProjectData({ id: id })//获取专题的配置信息
                    projectData.then((result)=>{
                        let ztData = result.zhuanti_info
                        let mkData = that.pageComponentsToParams(result.module_info)
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
                            category_one: ztData.category_one,
                            category_two: ztData.category_two,
                            is_template: 2
                        }
                        const removeData = this.$api.reqAddProject({...pageSetup,...mkData})
                        removeData.then((res)=>{
                            if (res.code == 200) {
                                 this.$message({
                                    type: 'success',
                                    message: '删除成功!',
                                })
                                this.getTemplateList()
                            }
                        })                        
                        
                    })
                        
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    })
                })
            },
            // 关闭对话框
            hideTable() {
                this.showTable = false
                this.$emit("hideDialog")
            },
            // 关闭表格显示模板库
            closeTable() {
                this.showTable = false
                this.templateShow = true
                this.getTemplateList()
                this.getBannerList()
            },
            // 获取模板列表数据
            async getTemplateList() {
                let  params = {
                    keyword: this.inputName,
                    // page: 1,
                    // page_num: 10,
                }
                const res = await this.$api.getTemplateListData(params)
                this.templateData = res.data
                console.log(res, '模板列表')
            },
            // 获取banner列表数据
            async getBannerList() {
                const res = await this.$api.getBannerListData()
                this.bannerData = res
                console.log(res, 'banner列表')
            },
            // 搜索
            search() {
                this.getTemplateList()
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


            /* 新手指引下一步 */
            guideNext(index) {
                this.guideShow = [false,false,false,false,false,false]
                this.guideShow[index+1] = true
                this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
                this.setSessionItem('guideIndex', 1)
                this.$router.push({
                    name: 'editor',
                })
            },
            /* 新手指引上一步 */
            guidePrev(index) {
                this.guideShow = [false,false,false,false,false,false]
                this.guideShow[index-1] = true
                this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
                this.$emit("hideDialog")
            },
           
        }
	}
</script>

<style lang="less" scoped>
.templateLibrary {

    .guideMask {
        z-index: 2050;
        padding-left: 24%;
        .guide-box {
            margin-top: 23%;
            .guide-btns {
                padding-left: 120px;
            }
        }

    }

    .guideHigh {
        padding: 7px;
        z-index: 3000;
    }

    /deep/.el-dialog__body {
        height: 100%;
        padding-bottom: 0;
    }
    
    /deep/.el-dialog {
        width: 1286px;
        height: 80%;
        // overflow-y: auto;
        .el-dialog__header {
            padding: 0;
        }
        
    }

    /deep/.el-message-box {
        padding: 10px;
    }

// .centerBox {
//     height: 80%;
//     overflow-y: auto;
// }
    

    header {
        display: flex;
        justify-content: space-between;
        .left {
            font-size: 18px;
            font-weight: 700;
            img {
                width: 22px;
                height: 22px;
                margin: 0 8px 3px 0;
            }
        }
        .center {
            .el-input {
                width: 400px;
                /deep/.el-input__inner {
                    border-radius: 20px;
                }
                .el-icon-search {
                    cursor: pointer;
                    background: url('../../../../assets/images/search-gray.png') center center no-repeat;
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
        .right {
            img {
                width: 33px;
                height: 33px;
                cursor: pointer;
            }
        }
    }

    center {
        height: 80%;
        overflow-y: auto;
        margin: 14px -16px 0 -20px;
        padding: 20px 44px;
        background-color: #F8F8F8;
        /* 滚动条 */
        &::-webkit-scrollbar {
            width: 10px;
        }
        &::-webkit-scrollbar-thumb {
            background-color: #d9d9d9;
            border-radius: 5px;
        }
        .btn {
            width: 94px;
            height: 32px;
            border-radius: 4px;
            line-height: 32px;
            text-align: center;
            color: #fff;
            cursor: pointer;
            background-color: #6065EC;
        }
        .container {
            display: flex;
            margin: 16px 0 0;
            .card {
                position: relative;
                width: 250px;
                // height: 294px;
                height: 234px;
                margin-right: 60px;
                margin-bottom: 40px;
                padding: 20px 20px 10px;
                border-radius: 10px;
                color: #333;
                font-size: 16px;
                text-align: left;
                background-color: #fff;
                box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
                .addImg {
                    width: 50px;
                    height: 50px;
                    margin-bottom: 20px;
                    cursor: pointer;
                }
                .el-icon-more {
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    color: #999;
                    cursor: pointer;
                }
                .delete {
                    position: absolute;
                    top: 20px;
                    right: 10px;
                    padding: 4px 10px;
                    border-radius: 4px;
                    font-size: 12px;
                    cursor: pointer;
                    background: rgba(245,245,245,1);
                    box-shadow: 0 0 4px 0 rgba(0,0,0,0.3);
                    .el-icon-delete {
                        margin-right: 6px;
                        color: #999;
                    }
                }
                .name {
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    overflow: hidden;
                }
                .template-scale {
                    // height: 190px;
                    height: 130px;
                    overflow: hidden;
                    margin: 10px 0;
                    border-radius: 6px;
                    border: 1px solid rgba(217,217,217,1);
                    .previewImg {
                        position: relative;
                        width: 100%;
                        height: 100%;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                        span {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            color: #666;
                        }
                    }
                   
                }
                .usenum {
                    margin: 17px 0;
                    font-size: 12px;
                    color: #999;
                }
                .white-btn {
                    border: 1px solid rgba(96,101,236,1);
                    color: #6065EC;
                    background-color: #fff;
                }
                .blue-btn {
                    width: 100%;
                }
            }
            :nth-child(4n) {
                margin-right: 0;
            }
            
        }
    }
        
           
}
   
</style>

<style>
    .el-message-box__title {
        padding-right: 5px !important;
        line-height: normal !important;
    }
</style>