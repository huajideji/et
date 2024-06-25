<template>
    <div class="helpCenter">
        <div class="top flex-between flex-center">
            <el-input placeholder="请输入文档标题/关键词/作者名称进行搜索" v-model="searchVal" @keyup.enter.native="search" clearable
                style="width: 500px" @clear="search">
                <i slot="suffix" class="el-input__icon el-icon-search" @click="search"></i>
            </el-input>
            <el-button class="upload-btn" type="primary" @click="showDialog()"><i class="el-icon-upload el-input__icon el-icon--left"></i>上传文档</el-button>
        </div>

        <hr />

        <div class="main-con">
            <ul class="tab-head flex">
                <li @click="toGuide()">新手指引</li>
                <div :class="guideShow[11] ? ['guideHigh','guidePad11']:''" class="tabs flex">
                    <li class="flex-column flex-center" :class="index == tabIndex ? 'tab-active' : ''"
                        v-for="(item, index) in tabArr" :key="index" @click="tab(index)">
                        <span>{{ item }}</span>
                        <span v-show="index == tabIndex" class="line"></span>
                    </li>
                </div>
            </ul>

            <div class="tab-con">
                <ul class="tab-item flex wrap" v-show="tabIndex === 0">
                    <li v-for="(item,index) in fileList[0]" :key="index" @mouseleave="hideOperate(0,index)" @click="openUrl(item.url,item.id)">
                        <div class="left-bg"></div>
                        <div class="more-icon" @mouseover="showOperate(0,index)"><i class="el-icon-more"></i></div>
                        <div class="operate" v-show="showArr[0][index]">
                            <div class="item" @click.stop="delFile(item.id)"><i class="el-icon-delete"></i>删除</div>
                            <div @click.stop="modFileTitle(item.id,item.name)"><i class="el-icon-edit"></i>修改</div>
                        </div>
                        <div class="card">
                            <div class="title">{{item.name}}</div>
                            <div class="info flex-between">
                                <div class="left flex-center">
                                    <div class="headPic"><span>{{item.aurthor.slice(0,2)}}</span></div>
                                    <div class="user">{{item.aurthor}}</div>
                                    <div class="time">{{item.add_time}}</div>
                                </div>
                                <div class="right flex-center">
                                    <img class="eye-img" src="@/assets/images/eye-gray.png" alt="">
                                    <span class="num">{{item.count}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <div class="nodata" v-show="fileList[0].length == 0">暂无数据</div>
                </ul>
                <ul class="tab-item flex wrap" v-show="tabIndex === 1">
                    <li v-for="(item,index) in fileList[1]" :key="index" @mouseleave="hideOperate(1,index)" @click="openUrl(item.url,item.id)">
                        <div class="left-bg bg02"></div>
                        <div class="more-icon" @mouseover="showOperate(1,index)"><i class="el-icon-more"></i></div>
                        <div class="operate" v-show="showArr[1][index]">
                            <div class="item" @click.stop="delFile(item.id)"><i class="el-icon-delete"></i>删除</div>
                            <div @click.stop="modFileTitle(item.id,item.name)"><i class="el-icon-edit"></i>修改</div>
                        </div>
                        
                        <div class="card">
                            <div class="title">{{item.name}}</div>
                            <div class="info flex-between">
                                <div class="left flex-center">
                                    <div class="headPic"><span>{{item.aurthor}}</span></div>
                                    <div class="user">{{item.aurthor}}</div>
                                    <div class="time">{{item.add_time}}</div>
                                </div>
                                <div class="right flex-center">
                                    <img class="eye-img" src="@/assets/images/eye-gray.png" alt="">
                                    <span class="num">{{item.count}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <div class="nodata" v-show="fileList[1].length == 0">暂无数据</div>
                </ul>
                <ul class="tab-item flex wrap" v-show="tabIndex === 2">
                    <li v-for="(item,index) in fileList[2]" :key="index" @mouseleave="hideOperate(2,index)" @click="openUrl(item.url,item.id)">
                        <div class="left-bg bg03"></div>
                        <div class="more-icon" @mouseover="showOperate(2,index)"><i class="el-icon-more"></i></div>
                        <div class="operate" v-show="showArr[2][index]">
                            <div class="item" @click.stop="delFile(item.id)"><i class="el-icon-delete"></i>删除</div>
                            <div @click.stop="modFileTitle(item.id,item.name)"><i class="el-icon-edit"></i>修改</div>
                        </div>
                        
                        <div class="card">
                            <div class="title">{{item.name}}</div>
                            <div class="info flex-between">
                                <div class="left flex-center">
                                    <div class="headPic"><span>{{item.aurthor}}</span></div>
                                    <div class="user">{{item.aurthor}}</div>
                                    <div class="time">{{item.add_time}}</div>
                                </div>
                                <div class="right flex-center">
                                    <img class="eye-img" src="@/assets/images/eye-gray.png" alt="">
                                    <span class="num">{{item.count}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <div class="nodata" v-show="fileList[2].length == 0">暂无数据</div>
                </ul>
                <ul class="tab-item flex wrap" v-show="tabIndex === 3">
                    <li v-for="(item,index) in fileList[3]" :key="index" @mouseleave="hideOperate(3,index)" @click="openUrl(item.url,item.id)">
                        <div class="left-bg bg04"></div>
                        <div class="more-icon" @mouseover="showOperate(3,index)"><i class="el-icon-more"></i></div>
                        <div class="operate" v-show="showArr[3][index]">
                            <div class="item" @click.stop="delFile(item.id)"><i class="el-icon-delete"></i>删除</div>
                            <div @click.stop="modFileTitle(item.id,item.name)"><i class="el-icon-edit"></i>修改</div>
                        </div>
                        
                        <div class="card">
                            <div class="title">{{item.name}}</div>
                            <div class="info flex-between">
                                <div class="left flex-center">
                                    <div class="headPic"><span>{{item.aurthor}}</span></div>
                                    <div class="user">{{item.aurthor}}</div>
                                    <div class="time">{{item.add_time}}</div>
                                </div>
                                <div class="right flex-center">
                                    <img class="eye-img" src="@/assets/images/eye-gray.png" alt="">
                                    <span class="num">{{item.count}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <div class="nodata" v-show="fileList[3].length == 0">暂无数据</div>
                </ul>
            </div>
        </div>


        <!-- 上传文档的弹窗 -->
        <el-dialog
            :visible.sync="dialogVisible"
            width="680px"
            class="uploadBox"
            >
            <div class="head">上传文档</div>


            <el-form :model="fileForm" :rules="rules" label-position="top" label-width="100px" ref="formList">
                <div class="block" v-for="(item, index) in fileForm.content" :key="item + index">
                    <i class="el-icon-close" @click="deleteList(index)" v-if="index != 0"/>
                    <el-form-item :label='`文档标题${index+1}`' :hide-required-asterisk="true" :prop="'content.' + index + '.name'"
                            :rules="rules.name">
                        <el-input v-model="item.name" placeholder="请输入文档标题，最多50字" maxlength="50" show-word-limit/>
                    </el-form-item>
                    <el-form-item label="添加在线文档" :hide-required-asterisk="true" :prop="'content.' + index + '.url'"
                            :rules="rules.url">
                        <p class="tip">请确保开放文档浏览权限</p>
                        <el-input v-model="item.url" placeholder="请输入文档链接" style="width:400px;" @change="checkUrl(item.url)"/>
                    </el-form-item>
                </div>

                <!-- 新增 -->
                <div @click="addList()" class="addBtn btn">
                    <i class="el-icon-plus el-icon--left" />新增
                </div>

                <el-form-item label="文档类别" :hide-required-asterisk="true" :prop="fileForm.fileType" :rules="rules.type">
                    <el-select v-model="value" placeholder="请选择文档类别">
                        <el-option
                            v-for="item in selectArr"
                            :key="item.value"
                            :label="item.label"
                            :value="item.type">
                            <div class="flex-between flex-center">
                                <span style="float: left">{{ item.label }}</span>
                                <img v-show="value == item.label" src="@/assets/images/dui.png" style="width:14px;height:14px;" alt="">
                            </div>
                        </el-option>
                    </el-select>
                </el-form-item>
            
            </el-form>

            
            

            <div @click="uploadFile()" class="uploadBtn center"><span class="btn">确定上传</span></div>
        </el-dialog>


        <!-- 修改文档标题的弹窗 -->
        <el-dialog
            :visible.sync="modTitleVisible"
            width="358px"
            :show-close="false"
            class="modifyMask"
            >
            <p style="margin-bottom: 8px;">请输入修改后的文档标题</p>
            <el-input v-model="modTitle" placeholder="请输入文档标题，最多50字" maxlength="50" show-word-limit/>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="cancelModTitle()">取 消</el-button>
                <button type="button" @click="sureModTitle()" class="el-button el-button--default el-button--small el-button--primary "><span>确 定</span></button>
            </span>
        </el-dialog>

        <!-- 新手指引导航条 -->
        <div class="guide-nav-box" v-if="guideShow[11]">
            <guideNav></guideNav>
        </div>

        <!-- 新手指引第十一步 (帮助中心) -->
        <div
        class="guideMask guideMask11"
        v-if="guideShow[11]"
        :style="{ 'padding-left': 0+'px' }"
        >
            <div class="guide-box" style="margin-top: 320px;">
                <!-- <img class="guide-line" src="@/assets/images/guide-line-top.png" alt="" /> -->
                <div class="guide-arrow flex-column flex-center">
                    <div class="cir1"><span class="cir2"></span></div>
                    <div class="line-y"></div>
                </div>
                <div class="guide-card">
                    <img class="starImg-right" src="@/assets/images/guide-star2.png" alt="">
                    <p>从这里就可以进入<br>我们的帮助中心了~</p>
                </div>
            </div>
            <div class="guide-box" style="margin-top: 245px;margin-left: 8%;">
                <div class="">
                    <!-- <img class="guide-line" src="@/assets/images/guide-line-top.png" alt="" /> -->
                    <div class="guide-arrow flex-column flex-center">
                        <div class="cir1"><span class="cir2"></span></div>
                        <div class="line-y"></div>
                    </div>
                    <div class="guide-card">
                        <img class="starImg-left" src="@/assets/images/guide-star.png" alt="">
                        <img class="starImg-right" src="@/assets/images/guide-star2.png" alt="">
                        <p>不论您是想知道具体模块怎么使用,还是模板怎么使用,<br>或者您在数据填写方面遇到了困难,都可以在我们的帮<br>助中心找到答案<br>我们也支持在线文档上传,期待您分享对新建专题的独<br>特见解~</p>
                        <p>您已经成为一名优秀的ET人啦~开始去<span style="color:#FFEA7D;">新建专题</span>吧~</p>
                    </div>
                </div>
                <div class="guide-btns center">
                    <span class="guide-exit" @click="guideExit(11)">学会啦</span>
                    <span class="guide-next" @click="guideNext(11)">下一步</span>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            searchVal: '',
            tabArr: ['模块详解', '模板详解', '专题详解', '填写指南'],
            tabIndex: 0,
            dialogVisible: false,
            modTitleVisible: false,
            modTitle:'',
            fileList:[[],[],[],[]],
            showArr:[[],[],[],[]],//控制删除修改健的显示
            fileForm: {
                content:[{
                    name: '',
                    url: ''
                }],
                fileType:''
            },
            rules: {
                //校验表单输入
                name: [
                    //标题
                    { required: true, message: '请输入标题', trigger: 'blur' },
                ],
                url: [
                    //链接
                    { required: true, message: '请输入文档链接', trigger: 'blur' },
                ],
                type: [
                    { required: true, message: '请选择文档类型', trigger: 'blur' },
                ]
            },
            selectArr: [{label:'模块详解',type:0},{label:'模板详解',type:1},{label:'专题详解',type:2},{label:'填写指南',type:3}],
            value: '',
            fileId: 0,
            fileName: '',
            isUrl: false,
            guideShow: [] //新手指引
            
        }
    },
    mounted() {
        this.getHelpFileList()
        this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		window.addEventListener("setItem", () => {
			this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		});
    },
    methods: {
        /**
         * 搜索
         */
        async search() { 
            let params = {
                page: 1,
                page_num: 100,
                // type: this.tabIndex,
                orderid: 0,
                keyword: this.searchVal
            }
            const res = await this.$api.getHelpFileList(params)
            console.log(res.data);
            if (res.data_count == 0) {
                console.log(111);
                this.fileList = [[],[],[],[]]
            }else {
                this.tabIndex = res.data[0].type
                this.getHelpFileList()
            }
        },

        /**
         * 选项卡切换
         * @param {tab} index 
         */
        tab(index) {
            this.tabIndex = index
            this.getHelpFileList()
        },

        /**
         * 显示删除修改操作
         * @param {showOperate}  
         */
        showOperate(findex,cindex) {
            this.$set(this.showArr[findex],cindex,true)
        },

        /**
         * 隐藏删除修改操作
         * @param {hideOperate}  
         */
        hideOperate(findex,cindex) {
            this.$set(this.showArr[findex],cindex,false)
        },

        /**
         * 删除指定文档
         */
        delFile(id) {
            this.$confirm('确认删除此文档？文档删除后不可恢复', '', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
            }).then(() => {
                let params = {
                    id: id,
                }
                const res = this.$api.delHelpFile(params)
                res.then(r=>{
                    if (r.code == 200) {
                        this.$message.success("删除成功")
                        this.getHelpFileList()
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },

        /**
         * 打开文档
         */
        openUrl(val,id) {
            window.open(val)
            // 记录阅读量
            let params = {
                id: id,
            }
            const res = this.$api.addHelpFileCount(params)
            
        },

        /**
         * 修改文档标题
         */
         modFileTitle(id,name) {
            this.modTitleVisible = true
            this.fileId = id
            this.fileName = name
         },

         sureModTitle() {
            this.modTitleVisible = false
            let params = {
                id: this.fileId,
                name: this.modTitle,
                type: this.tabIndex,
            }
            const res = this.$api.modHelpFile(params)
            res.then(r=>{
                console.log(r);
                if (r.code == 200) {
                    this.$message.success("保存成功")
                    this.getHelpFileList()
                }
            })
            this.modTitle = ''
         },

        /* 
         *取消修改标题 
        */  
        cancelModTitle() {
            this.modTitleVisible = false
            this.modTitle = ''
        },

        /**
         * 打开上传文档弹窗
         */
        showDialog() {
            this.dialogVisible = true
            if (this.$refs['formList']) {
                this.$refs['formList'].resetFields();
            }
            this.value = ''
            this.fileForm.content.splice(1)
        },

        /**
         * 新增文档输入框
         */
        addList() {
            this.fileForm.content.push({
                name: '',
                url: '',
            })
        },

        /**
         * 删除文档输入框
         */
        deleteList(index) {
            this.fileForm.content.splice(index, 1)
        },

        /**
         * 上传文档
         */
        uploadFile() {
            this.$refs['formList'].validate((valid) => {
                if (!valid) {
                    this.$message.error('尚未完成编辑，无法上传')
                }else if (this.value === '') {
                    this.$message.error('请选择文档类型')
                }else if (!this.isUrl) {
                    this.$message.error('请输入合法的文档链接')
                }else {
                    this.addHelpFile()
                }
            });            
        },

        /**
         * 添加文档
         */
        async addHelpFile() {
            let params = {
                content: this.fileForm.content,
                type: this.value,
                orderid: 0
            }
            const res = await this.$api.addHelpFile(params)
            if (res.code == 200) {
                this.$message.success('上传成功')
                this.getHelpFileList()
                this.dialogVisible = false
            }
        },

        /**
         * 获取帮助中心文档列表
         */
        async getHelpFileList() {
            let params = {
                page: 1,
                page_num: 100,
                type: this.tabIndex,
                orderid: 0,
                keyword: this.searchVal
            }
            const res = await this.$api.getHelpFileList(params)
            this.$set(this.fileList,this.tabIndex,res.data)
            // console.log(res.data);
        },

        /**
         * 检测url是否合规
         */
        checkUrl(url) {
            let URL = /^(https?):\/\/[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/;
            if (!URL.test(url)) {
                this.$message.error("请输入合法的文档链接")
                this.isUrl = false
            }else {
                this.isUrl = true
            }
        },

        /* 退出指引 */ 
		guideExit() {
			this.guideShow = [false]
            this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
            this.$router.push('/subjectList')
		},
		/* 新手指引下一步 */ 
		guideNext(index) {
            this.guideShow = [false]
            this.guideShow[index+1] = true
            this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
            this.setSessionItem('guideIndex', 6)
            this.$router.push({path:`/zhuantiHuizong`})
		},
        // 打开新手指引
        toGuide() {
            this.guideShow = [true]
            this.setSessionItem('guideShow', JSON.stringify(this.guideShow))
            this.setSessionItem('guideIndex', 0)
            this.$router.push('/subjectList')
        }
        

    },
}
</script>

<style lang="less" scoped>
@import url('../../assets/css/style.css');

 /* 滚动条 */
 &::-webkit-scrollbar {
        width: 5px !important;
    }
    &::-webkit-scrollbar-thumb {
        background-color: #d9d9d9;
        border-radius: 5px;
    }

.helpCenter {
    width: 100%;
    min-width: 1100px;
    // overflow-x: auto;
    padding: 20px;
    border-radius: 16px;
    background-color: #f9fafc;

    .nodata {
        width: 100%;
        margin-top: 150px;
        color: #666;
        font-size: 16px;
        text-align: center;
    }
    
    .modifyMask {
        
        /deep/.el-input__inner {
            height: 32px !important;
            line-height: 32px !important;
        } 
        /deep/.el-dialog__header {
            padding: 20px 20px 0px;
        }

        /deep/.el-dialog {
            position: fixed;
            top: 50%;
            left: 50%;
            margin-top: 0 !important;
            transform: translate(-50%,-50%);
        }
    }

    /deep/.el-dialog__body {
        padding: 0 20px 20px; 
    }

    .top {
        /deep/.el-input__inner {
            height: 40px !important;
            line-height: 40px !important;
        }

        /deep/.el-icon-search {
            cursor: pointer;
            background: url('../../assets/images/search-gray.png') center center no-repeat;
            background-size: 20px 20px;

            &:before {
                content: '';
            }
        }

        .upload-btn {
            height: 32px;
            line-height: 32px;
            padding: 0px 12px;
            font-size: 12px;
            background-color: #6065ec;
        }

        /deep/.el-icon-upload {
            width: 12px;
            background: url('../../assets/images/export-white.png') center center no-repeat;
            background-size: 12px 12px;

            &:before {
                content: '';
            }
        }
    }

    hr {
        margin: 20px 0 23px;
        border: 1px dashed #d9d9d9;
    }

    .main-con {
        height: 85%;

        .tab-head {
            color: #999999;

            li {
                margin-right: 40px;
                font-size: 18px;
                cursor: pointer;                
            }

            .tabs {
                li {
                    &:last-of-type {
                        margin-right: 0;
                    }
                }
            }

            .tab-active {
                color: #333;
                font-weight: 600;
            }

            .line {
                width: 36px;
                height: 4px;
                margin-top: 4px;
                border-radius: 6px;
                background: #607bf1;
            }
        }

        .tab-con {
            padding: 24px 36px;
            height: 100%;
            overflow-y: auto;
            .tab-item {
                li {
                    position: relative;
                    display: flex;
                    align-items: center;
                    width: 30%;
                    // margin-right: 97px;
                    margin-right: 5%;
                    margin-bottom: 20px;
                    color: #333;
                    cursor: pointer;
                    .left-bg {
                        width: 16px;
                        height: 64px;
                        margin-right: -8px;
                        border-radius: 12px;
                        background-color: #d2d4ff;
                    }
                    .bg02 {
                        background-color: #B4DBFF;
                    }
                    .bg03 {
                        background-color: #C4EEE7;
                    }
                    .bg04 {
                        background-color: #FFDA7A;
                    }
                    .more-icon {
                        position: absolute;
                        top: 8px;
                        right: 24px;
                        cursor: pointer;
                        .el-icon-more {
                            color: #aaa;
                        }
                    }
                    .operate {
                        position: absolute;
                        top: 26px;
                        right: 24px;
                        padding: 8px;
                        border-radius: 6px;
                        font-size: 12px;
                        cursor: pointer;
                        color: #999;
                        background: #ffffff;
                        box-shadow: 0 0 6px 0 #00000033;
                        .item {
                            margin-bottom: 6px;
                        }
                        .el-icon-delete,.el-icon-edit {
                            margin-right: 6px;
                            color: #999;
                        }
                    }
                    
                    .card {
                        // width: 460px;
                        width: 100%;
                        min-width: 285px;
                        height: 96px;
                        padding: 20px 24px;
                        border-radius: 12px;
                        background-color: #fff;
                        .title {
                            font-size: 16px;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            overflow: hidden;
                        }
                        .info {
                            margin-top: 12px;
                            .headPic {
                                width: 24px;
                                height: 24px;
                                line-height: 24px;
                                margin-bottom: 2px;
                                border-radius: 50%;
                                font-size: 12px;
                                color: #fff;
                                background-color: #6065ec;
                                span {
                                    display: inline-block;
                                    -webkit-transform: scale(0.7);
                                    // margin-top: 3px;
                                }
                            }
                            .user {
                                margin-left: 6px;
                                margin-right: 16px;
                                color: #666;
                                font-size: 12px;
                            }
                            .time, .num {
                                margin-left: 6px;
                                color: #999;
                                font-size: 12px;
                            }
                            .eye-img {
                                width: 12px;
                                height: 12px;
                            }
                        }
                        &:hover {
                            box-shadow: 0 0 8px 0 #00000026;
                        }
                    }
                    &:hover {
                        scale: 1.1;
                    }
                }
                :nth-child(3n) {
                    margin-right: 0;
                }                
            }
            :nth-child(1) {
                li {
                    &:hover {
                        color: #6065EC;
                    }
                }
            }
            :nth-child(2) {
                li {
                    &:hover {
                        color: #63abe8;
                    }
                }
            }
            :nth-child(3) {
                li {
                    &:hover {
                        color: #5ec4b0;
                    }
                }
            }
            :nth-child(4) {
                li {
                    &:hover {
                        color: #ebb357;
                    }
                }
            }
        }
    }

    .btn {
        width: 90px;
        height: 32px;
        line-height: 32px;
        padding: 0;
        border-radius: 4px;
        border: 0;
        text-align: center;
        font-size: 12px;
        color: #fff;
        background: rgba(96, 101, 236, 1);
    }

    .addBtn {
        margin-bottom: 30px;
    }

    .uploadBox {
        /deep/.el-select-dropdown__item.selected {
            color: #6065EC !important;
        }

        /deep/.el-message-box .el-message-box__btns .el-button--primary {
            background-color: #6065EC !important;
        }
       
        .el-dialog__headerbtn {
            font-size: 20px;
        }
        
        .head {
            margin-bottom: 24px;
            font-size: 16px;
            font-weight: 700;
        }
        .block {
            position: relative;
            margin-bottom: 30px;
            .tip {
                margin: 0 0 10px;
                font-size: 12px;
                line-height: 12px;
                color: #999;
            }
            .el-icon-close {
                position: absolute;
                right: 0;
                top: 0;
                cursor: pointer;
                font-size: 19px;
            }
        }
        .uploadBtn {
            margin-top: 40px;
            cursor: pointer;
        }
       
    }
}


</style>
