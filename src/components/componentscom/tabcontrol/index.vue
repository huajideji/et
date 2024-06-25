<template>
    <div class="tabcontrol" :class="{ 'hide': hide }">
        <!-- <div class="container">
            <div class="header" v-if="!datas.titleHide">
                <div class="left">
                    <span class="bar-title" :class="{ 'active': !currentActive }"
                        @click="currentActive = false">XXX表</span>
                    <span class="bar-title" :class="{ 'active': currentActive }" @click="currentActive = true">{{
                            datas.moduleName
                    }}</span>
                </div>
                <div class="right" @click="enterProject" v-if="datas.jump_type == 0">
                    <span class="">更多
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </div>
            </div>
            <div class="content" v-if="currentActive">
                <div v-for="(item, index) of articlelist" :key="index" v-show="showIndex(index)">
                    <article class="article add-img" v-if="datas.elementList.includes('图片')">
                        <div class="article-content">
                            <span class="title">{{ item.title }}</span>
                            <span class="desc" v-if="datas.detail">{{ item.desc }}</span>
                            <span class="time" v-if="datas.elementList.includes('更新时间')">{{ item.time }}</span>
                        </div>
                        <img :src="item.imgUrl" alt="">
                    </article>
                    <article class="article" v-else>
                        <span class="title">{{ item.title }}</span>
                        <span class="desc" v-if="datas.detail" :class="{ three: datas.detail === 3 }">{{ item.desc
                        }}</span>
                        <span class="time" v-if="datas.elementList.includes('更新时间')">{{ item.time }}</span>
                    </article>
                </div>
    
                <footer v-if="datas.jump_type == 1 || datas.jump_type == 2 || +datas.foldingNum">
                    <div class="more-box" v-if="datas.jump_type == 1 || datas.jump_type == 2"
                        :style="{ textAlign: datas.jump_type == 1 ? 'right' : 'center' }">
                        <span class="">更多
                            <i class="el-icon-arrow-right"></i>
                        </span>
                    </div>
                    <div class="showMore"
                        v-show="articlelist.length > +datas.foldingNum && showMore && +datas.foldingNum"
                        @click="showMore = false">
                        展开更多
                    </div>
                </footer>


            </div>
            <div class="content-table" v-else>
                XXX表暂无数据
            </div>
        </div> -->
        <!-- 功能组件 -->
        <div class="container">
            <div class="tabs">
                <div class="header">
                    <div v-for="(item, index) of resetTabList" :key="index" @click="chosenCurComponent(index, item)"
                        class="tab" :class="{ active: curIndex == index }"
                        :style="{ width: `${100 / resetTabList.length}%` }">
                        <span v-if="item.isChecked">
                            {{ item.moduleName }}
                        </span>
                    </div>
                </div>
                <div class="footer">
                    <!-- 动态组件 -->
                    <keep-alive>
                        <component :is="curComponent" :datas="currentproperties" />
                    </keep-alive>
                </div>
            </div>
        </div>
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'tabcontrol',
    props: {
        datas: Object,
        hide: Boolean,
    },
    data() {
        return {
            curIndex: 0,
            curComponent: '',
            currentproperties: {},
        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
         if (this.resetTabList.length > 0) {
                this.curIndex = 0;
                this.curComponent = this.chineseIntoEnglish(this.resetTabList[0].text);
                this.currentproperties = this.resetTabList[0]
            }
    },
    computed: {
        resetTabList() {
            return this.datas.tabList.filter(item => item.isChecked)
        },
    },
    watch: {
        resetTabList(newVal) {
            // console.log(newVal)
            if (newVal.length > 0) {
                this.curIndex = 0;
                this.curComponent = this.chineseIntoEnglish(this.resetTabList[0].text);
                this.currentproperties = this.resetTabList[0]
            }
        }
    },
    methods: {
        chosenCurComponent(index, component) {
            this.curIndex = index;
            this.curComponent = this.chineseIntoEnglish(component.text);
            this.currentproperties = component
        },
        // 把中文(text)转为组件英文名
        chineseIntoEnglish(text) {
            if (text == '政策要点') {
                return 'planktab'
            } else if (text == '网点模块') {
                return 'networkmoduletab'
            } else if (text == '文章列表') {
                return 'articlelisttab'
            } else if (text == '表格') {
                return 'edittabletab'
            }
        },
    }
}
</script>
<style scoped lang="less">
.tabcontrol {
    position: relative;

    .container {
        position: relative;
        width: 351px;
        // padding: 17.5px 12px 21px;
        margin: 0 auto;
        border-radius: 10px;
        background-color: #fff;

        .tabs {
            margin-top: 20px;

            .header {
                display: flex;

                .tab {
                    height: 42px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: #999999;
                    background-color: #EDEDED;
                    font-size: 14px;
                    font-weight: 700;
                    cursor: pointer;

                    &:first-child {
                        border-radius: 8px 0 0 0;
                    }

                    &:last-child {
                        border-radius: 0 8px 0 0;
                    }

                    &.active {
                        color: #6065EC;
                        background-color: #fff;
                    }
                }
            }

        }
    }

}
</style>