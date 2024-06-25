<template>
    <div class="tabcontrolstyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
        <div class="suggest">
            拖拽可以调整选项卡内容位置
        </div>
        <div class="tabList">
            <vuedraggable v-model="datas.tabList" v-bind="dragOptions">
                <transition-group>
                    <div class="item" v-for="(item, index) of datas.tabList" :key="index">
                        <el-checkbox :label="item.text" v-model="item.isChecked" @change="resetTab()"></el-checkbox>
                        <!-- <span class="delete" @click="deleteTabList(index)">
                            <i class="el-icon-close"></i>
                        </span> -->
                    </div>
                </transition-group>
            </vuedraggable>
        </div>
        <div class="tabs">
            <div class="header">
                <div v-for="(item, index) of resetTabList" :key="index" @click="chosenCurComponent(index, item)">
                    <span v-if="item.isChecked" class="tab" :class="{ active: curIndex == index }">
                        {{ item.text }}
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
</template>
<script>
import vuedraggable from 'vuedraggable' //拖拽组件
export default {
    name: 'tabcontrolstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
            dragOptions: {
                //拖拽配置
                animation: 200,
            },
            curIndex: 0,
            curComponent: '',
            currentproperties: {},
            resetTabList: [],
        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    watch: {

    },
    methods: {
        deleteTabList(index) {
            this.$confirm('确认删除该选项吗', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.datas.tabList.splice(index, 1)
            }).catch(() => { })
        },
        // 选择当前更改的tab
        chosenCurComponent(index, component) {
            this.curIndex = index;
            this.curComponent = this.chineseIntoEnglish(component.text)
            this.currentproperties = this.datas.tabList[index];
        },
        resetTab() {
            this.resetTabList = this.datas.tabList.filter(item => item.isChecked)
            if (this.resetTabList.length) {
                this.curIndex = 0;
                this.curComponent = this.chineseIntoEnglish(this.resetTabList[0].text)
                this.currentproperties = this.resetTabList[0];
            } else {
                this.curComponent = ''
                this.currentproperties = {}
            }

        },
        // 把中文(text)转为组件英文名
        chineseIntoEnglish(text) {
            if (text == '政策要点') {
                return 'planktabstyle'
            } else if (text == '网点模块') {
                return 'networkmoduletabstyle'
            } else if (text == '文章列表') {
                return 'articlelisttabstyle'
            } else if (text == '表格') {
                return 'edittabletabstyle'
            }
        }
    },
    components: { vuedraggable },
}
</script>
<style scoped lang="less">
.tabcontrolstyle {

    >h2 {
        padding: 21px 16px 6px 0;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
    }

    .suggest {
        font-size: 12px;
        font-weight: 400;
        color: #999;
        margin-bottom: 16px;
    }

    .card {
        background: #f8f8f8;
        border-radius: 5px;
        padding: 18px 10px;
        margin: 12px 0;

        .tips {
            font-size: 12px;
            color: #666666;
        }
    }

    /* 选项 */
    .item {
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 14px;
        cursor: all-scroll;
        color: #323233;
        border-radius: 2px;
        background-color: #fff;
        box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
        margin-bottom: 10px;

        >span {
            font-size: 18px;
            font-weight: bolder;
            cursor: pointer;

            i {
                color: #999;
            }
        }


    }

    .tabs {
        margin-top: 20px;

        .header {
            display: flex;
            margin-bottom: 16px;

            .tab {
                display: block;
                color: #999999;
                font-size: 16px;
                padding-right: 20px;
                cursor: pointer;

                &.active {
                    color: #6065EC;
                    font-weight: 700;
                }
            }
        }

    }

}
</style>