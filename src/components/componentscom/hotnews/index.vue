<template>
    <div class="hotnews" :class="{ 'hide': datas.is_hide}">
        <div class="container">
            <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe609;</span>
                </div>
            <marquee @click="showAlert()">
                {{ hotnew.title }}
            </marquee>
        </div>
        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'hotnews',
    props: {
        datas: Object,
        hide: Boolean,
    },
    data() {
        return {
            styleArr:[],
            hotnew: {
                title: '文章标题文章标题文章标题',
                url: 'http://m.wh.bendibao.com/edu/141210.shtm'
            },
            showToast: false,
        }

    },
    mounted() {
        this.styleArr = this.getStyleArr()
        // this.datas.elementList.includes('更新时间')
    },
    methods: {
        showAlert() {
            // 弹出遮罩层
            // this.showToast = true;
            // this.$bus.$emit('showDetail', this.hotnew, this.showToast)
        }
    },
    watch: {
        liveheaderfn(newValue) {
            this.styleArr = this.getStyleArr()
    },  
    },
    computed: {
        liveheaderfn() {
      return this.$store.state.colorStyle;
    },
        
    }
}
</script>
<style scoped lang="less">
.hotnews {
    position: relative;

    &.hide::before {
        content: '';
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFFFFF;
        font-size: 20px;
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .4);
    }

    .container {
        width: 351px;
        height: 49.5px;
        border-radius: 8px;
        margin: 12px auto;
        padding: 0 14px;
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        color: #333;

        >img {
            width: 18px;
            height: 18px;
            margin-right: 14px;
        }
    }
}
</style>