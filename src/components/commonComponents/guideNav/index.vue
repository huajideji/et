<template>
    <!-- 新手指引导航条 -->
    <div class="guide-nav">
        <img class="top-img" src="@/assets/images/ET-guide.png" alt="">
        <el-button icon="el-icon-caret-right" style="color: #6065EC;">功能介绍</el-button>
        <ul>
            <li></li>
            <li v-for="(item,index) in nameList" :key="index" @click="tab(index)" :class="tabIndex == index ? 'clickActive' : ''">
                <p class="flex">
                    <span class="cir1"><span class="cir2"></span></span>
                    <span class="name">{{item}}</span>
                </p>
                <p class="blank_ht"></p>
            </li>
            <el-button class="closeGuide" size="small" icon="el-icon-error" @click="closeGuide()">残忍关闭</el-button>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'guideNav',
    data() {
        return {
            nameList: ['欢迎页','新建专题','填写专题数据','我的','数据','帮助','专题合集'],
            tabIndex: 0,
        }
    },
    mounted(){
        if (sessionStorage.getItem('guideIndex')) {
            this.tabIndex = sessionStorage.getItem('guideIndex')
        }
        window.addEventListener('setItem', () => {
            this.tabIndex = sessionStorage.getItem('guideIndex')
        })
    },
    methods: {
        tab(index) {
            this.setSessionItem('guideIndex', parseInt(index))
            this.setSessionItem('templateVisible', false)
            if (sessionStorage.getItem('guideIndex')) {
                this.tabIndex = sessionStorage.getItem('guideIndex')
            }else {
                this.tabIndex = index
            }
            let guideShow = [false]
            let curPath = this.$route.name
            console.log(curPath);
            if (index == 0) { //欢迎页
                guideShow[0] = true
                this.setSessionItem('guideShow', JSON.stringify(guideShow))
                if (curPath != 'subjectList') {
                    this.$router.push("/subjectList")
                }
            }else if (index == 1) { //新建专题
                guideShow[1] = true
                this.setSessionItem('guideShow', JSON.stringify(guideShow))
                if (curPath != 'subjectList') {
                    this.$router.push("/subjectList")
                }
            }else if (index == 2) { //填写专题数据
                guideShow[8] = true
                this.setSessionItem('guideShow', JSON.stringify(guideShow))
                if (curPath != 'subjectList') {
                    this.$router.push("/subjectList")
                }
            }else if (index == 3) { //我的
                guideShow[9] = true
                this.setSessionItem('guideShow', JSON.stringify(guideShow))
                if (curPath != 'my') {
                    this.$router.push("/my")
                }
            }else if (index == 4) { //数据中心
                guideShow[10] = true
                this.setSessionItem('guideShow', JSON.stringify(guideShow))
                if (curPath != 'dataCenter') {
                    this.$router.push("/dataCenter")
                }
            }else if (index == 5) { //帮助中心
                guideShow[11] = true
                this.setSessionItem('guideShow', JSON.stringify(guideShow))
                if (curPath != 'helpCenter') {
                    this.$router.push("/helpCenter")
                }
            }else if (index == 6) {//专题合集
                guideShow[12] = true
                this.setSessionItem('guideShow', JSON.stringify(guideShow))
                if (curPath != 'zhuantiHuizong') {
                    this.$router.push("/zhuantiHuizong")
                }
            }
        },
        /* 关闭指引 */
        closeGuide() {
            let guideShow = [false]
            this.setSessionItem('guideShow', JSON.stringify(guideShow))
            this.setSessionItem('templateVisible', false)
        }
    }
}
</script>

<style lang="less" scoped>
 .guide-nav {
    .top-img {
      display: block;
      width: 169px;
      height: 128px;
      margin: 0 0 -24px;
    }
    // /deep/.el-icon-caret-right {
    //   color: #6065EC;
    // }
    /deep/.el-icon-caret-right:before {
        content: "";
        display: inline-block;
        margin-right: -5px;
        margin-bottom: -1px;
        width: 0px;
        height: 0;
        border: 7px solid transparent;
        border-left-color: #6065EC;
    }
    >button {
        pointer-events: none;
    }
    ul {
      margin-left: 24px;
      li {
        // display: flex;
        // height: 37px;
        // border-left: 2px solid rgba(255,255,255,.3);
        color: #d9d9d9;
        font-weight: 700;
        cursor: pointer;
        .blank_ht {
            display: flex;
            height: 25px;
            border-left: 2px solid rgba(255,255,255,.3);
        }
        .cir1 {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          margin-left: -7px;
          text-align: center;
          line-height: 14px;
          background-color: rgba(255,255,255,.3);
          .cir2 {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background-color: rgba(255,255,255,.4);
          }
        }
        .name {
          margin-left: 7px;
          line-height: 16px;
        }
        &:first-of-type {
            height: 25px;
            border-left: 2px solid rgba(255,255,255,.3);
        }
      }
      
      .clickActive {
        .cir1 {
          background-color: #fff;
          .cir2 {
            background-color: #6065EC;
          }
        }
        .name {
            color: #fff;
        }
      }
    }
    .closeGuide {
      margin-left: -8px;
      /deep/.el-icon-error {
        color: #999;
      }
    }
    
  }
</style>