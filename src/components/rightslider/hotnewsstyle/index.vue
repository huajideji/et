<template>
    <div class="hotnewsstyle">
        <!-- 标题 -->
        <h2>{{ datas.text }}</h2>
        <div class="suggest">
            无需设置属性，最新消息，滚动播放。仅展示最新的一条数据。
        </div>

        <!-- <button id="save" @click="saveData()">
            保存
        </button> -->
        <div style="height:100px;"></div>
        <div class="saveBtn flex">
            <span class="saveForm" @click="saveData">检查</span>
        </div>

        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
    name: 'hotnewsstyle',
    props: {
        datas: Object,
    },
    data() {
        return {
        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    methods: {
        ...mapMutations('latest_news', ['SETLATESTNEWS']),
        /* 存储需要创建的专题模块数据 */
        saveData() {
            this.SETLATESTNEWS(this.datas)
            this.$message({
                message: '保存当前页面编辑样式成功',
                type: 'success'
            });
        },
    }
}
</script>
<style scoped lang="less">
.hotnewsstyle {

    /* 标题 */
    h2 {
        padding: 21px 16px 6px 0;
        font-size: 16px;
        font-weight: 700;
        color: #333333;
    }

    .suggest {
        font-size: 12px;
        font-weight: 400;
        color: #999;
    }
}
</style>