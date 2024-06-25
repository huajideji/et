<template>
    <div id="my">
        <img src="@/assets/images/mybanner.png" alt="" class="fumargin">
        
        <div class="fumargin-left header-wrap">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="我填写的专题" name="first">  <myzhuanti :tableData="tableData" :myphbData="myphbData"></myzhuanti> </el-tab-pane>
                <el-tab-pane label="我管理的专题" name="second"><managezt :manageData="manageData" :phbData="phbData"></managezt></el-tab-pane>
                <el-tab-pane label="我的专题草稿箱" name="third"><mydraftbox :draftData="draftData"></mydraftbox></el-tab-pane>
                <el-tab-pane label="我填写的表格" name="fourth"><myeditable :editableData="editableData"></myeditable></el-tab-pane>
                <el-tab-pane label="我上传的帮助文档" name="fifth"><myhelpfultext :helpData="helpData"></myhelpfultext></el-tab-pane>
                
            </el-tabs>
            <ul class="general">
                <li>填写专题数
                    <p>{{ total.writenum}}</p>
                </li>
                <div class="line"></div>
                <li>创建专题数
                    <p>{{ total.createnum}}</p>
                </li>
                <div class="line"></div>
                <li>获得访问量总数
                    <p>{{ total.getnum}}</p>
                </li>
                <div class="tips">
                <el-tooltip content="获得访问量总数=填写专题城市页流量+创建专题全国总流量" placement="top" effect="dark">
                    <i class="el-icon-question" style="font-size:20px;margin-left:20px "></i>
                </el-tooltip>
            </div>
            </ul>
        </div>

         <!-- 新手指引导航条 -->
        <div class="guide-nav-box" v-if="guideShow[9]">
            <guideNav></guideNav>
        </div>

        <!-- 新手指引第九步 (我的-个人中心) -->
        <div
            class="guideMask guideMask9"
            v-if="guideShow[9]"
        >
            <div class="guide-box" style="left:125px;top:230px;">
                <div class="guide-arrow flex-column flex-center">
                    <div class="cir1"><span class="cir2"></span></div>
                    <div class="line-y"></div>
                </div>
                <div class="guide-card">
                    <img class="starImg-left" src="@/assets/images/guide-star.png" alt="">
                    <img class="starImg-right" src="@/assets/images/guide-star2.png" alt="">
                    <p>这里就是个人中心的入口啦~</p>
                </div>
            </div>
            <div class="guide-box">
                <!-- <div class="flex-center"> -->
                    <div class="guide-arrow flex-column flex-center">
                        <div class="cir1"><span class="cir2"></span></div>
                        <div class="line-y"></div>
                    </div>
                    <div class="guide-card">
                        <img class="starImg-left" src="@/assets/images/guide-star.png" alt="">
                        <img class="starImg-right" src="@/assets/images/guide-star2.png" alt="">
                        <p>您的草稿箱、管理和填写的专题都在其中</p>
                        <p>接下来和我一起看看<span style="color:#FFEA7D;">数据中心</span>吧~</p>
                    </div>
                <!-- </div> -->
                <div class="guide-btns center">
                    <span class="guide-exit" @click="guideExit(9)">学会啦</span>
                    <span class="guide-next" @click="guideNext(9)">下一步</span>
                </div>
            </div>
        </div>
        
    </div>
  </template>
  
  <script>
  import myzhuanti from './components/myzhuanti.vue'
  import managezt from './components/managezt.vue'
  import mydraftbox from './components/mydraftbox.vue'
  import myeditable from './components/myeditable.vue'
  import myhelpfultext from './components/myhelpfultext.vue'
import { Console } from 'console'
  export default {
    provide() {
      return {
        reload: this.reload,
      }
    },
    components: {
        myzhuanti,
        managezt,
        mydraftbox,
        myeditable,
        myhelpfultext
  },
    data() {
          return {
            total: {
                writenum: 1,
                createnum: 1,
                getnum: 1,
            },
            draftData:{},//草稿箱列表
            manageData:{},//管理列表
            tableData: {},//填写列表
            helpData: {},//帮助列表
            editableData: {},//表格列表
            myphbData: {},//填写排行榜数据
            phbData:{},//排行榜数据
            editParams: {
                page: 1,
                page_num: 10,
                name: '',
            },
            draftParams: {
                name: '',
                type:1
            },//管理列表参数
            manageParams: {
                page: 1,
                page_num: 10,
                name: '',
                keyword: "",
                type:0
                },//管理列表参数
             helpParams: {
                page: 1,
                page_num: 10,
                name: '',
                keyword: "",
                type:0
            },//管理列表参数
            myzhuantiparams: {
                page: 1,
                page_num: 10,
                name: '',
                keyword: "",
            },//填写列表参数
            isRouterAlive: true,
            activeName: 'first',
            guideShow: [],
      }
    },
    created() {
    },
    mounted() {
        this.getmyzhuantiList()
        this.getMyData()
        this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
		window.addEventListener("setItem", () => {
			this.guideShow = JSON.parse(sessionStorage.getItem("guideShow"));
          });
        console.log(this.$route.query)
          if (this.$route.query.location == 'draft') {
            console.log(this.activeName)
            this.activeName = 'third'
            this.getdraftList()
        }
        if (this.guideShow[9]) {
            setTimeout(()=>{
                document.querySelector('.el-tabs__nav').classList.add('guideHigh','guideHigh9')
            },200)
        }
     },  
    beforeMount(){
    },
    methods: {
        async getMyData() {
            const name = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
               const res = await this.$api.getMyData(name)
              this.total.writenum = res.add
              this.total.createnum = res.create
              this.total.getnum = res.flow
              
        },
        handleClick(val) {
            switch (val.index) {
                    case '0': this.getmyzhuantiList();break
                    case '1': this.getmanageList(); break
                    case '2': this.getdraftList(); break
                    case '3': this.getEditableList(); break
                    case '4': this.gethelpList();break
            }
        },
        async getEditableList() {
            this.editParams.name = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
               const res = await this.$api.getMyEditableList(this.editParams)
                this.editableData = res
        },
        async gethelpList() {
            this.helpParams.name = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
               const res = await this.$api.getmyhelpList(this.helpParams)
                this.helpData = res
        },
        async getdraftList() {
            this.draftParams.name = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
               const res = await this.$api.getMydraftList(this.draftParams)
                this.draftData = res
        },
          async getmanageList() {
                
                this.myzhuantiparams.name = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
                const res = await this.$api.getmanageList(this.manageParams)
                const phbres = await this.$api.getPhb()
                this.manageData = res
                this.phbData = phbres
        },
         async getmyzhuantiList() {
               this.myzhuantiparams.name = JSON.parse(localStorage.getItem('ET_User_Info2.0')).data
            //    const phbres = await this.$api.getMyPhb()
               const res = await this.$api.getmyzhuanti(this.myzhuantiparams)
               this.tableData = res
                // this.myphbData = phbres
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
            this.setSessionItem('guideIndex', 4)
            this.$router.push({path:`/dataCenter`})
		},
    },
  } 
  </script>
  
  <style lang="less" scoped>
  #my{
    margin: 0 -20px 0 0;
    .line{
        width: 1px;
        height:35px;
        background-color: #d9d9d9ff;
        margin: 0px 20px;
    }
    .header-wrap{
        position: relative;
    }
    .general{
        position: absolute;
        top:10px;
        right:40px;
        display: flex;
        align-items: center;
        li{
            p{
                text-align: center;
                color: #6065EC;
            }
        }
    }
    /deep/.el-tabs__active-bar{
        border-radius: 5px;
        height: 5px;
        margin-bottom: 2px;
        background-color: #6065EC;
    }
    /deep/.el-tabs__item{
        padding:0px 40px;
        height: 60px;
        line-height: 60px;
        color: #333333ff;
        font-size: 16px;
        font-weight: 400;
        font-family: "PingFang SC";
    }
    /deep/.is-active{
        color: #6065ecff;
        font-weight: 600;
    }
    /deep/.el-tabs__header{
    background: linear-gradient(0deg, rgba(216,215,255,0.5) 0%, #ffffff 100%);
    box-shadow: 0 0 4px 0 #00000029;
  }
  }
  
  .fumargin{
    margin:-20px 0 0 -20px;
  }
  .fumargin-left{
    margin-left:-20px;
    margin-top: -10px;
  }
  
  </style>
  