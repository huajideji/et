<template>
    <div class="richtext" :class="{ 'hide': datas.is_hide}">
        
        <div class="daofen-box">
            <div class="module-title" v-if="datas.is_show">
                <div class="title">
                    <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                    <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
                </div>
                    <span>{{ datas.name }}</span>
                </div>
            </div>
            <div class="image">
                <img src="@/assets/images/richtext.png" alt="">
            </div>
        </div>
        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'richtext',
    props: {
        datas: Object,
        hide: Boolean,
    },
    data() {
        return {
            styleArr:[],

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
        }
    },
    mounted() {
        this.styleArr = this.getStyleArr()
        // this.datas.elementList.includes('更新时间')
    },
    methods: {

    }
}
</script>
<style scoped lang="less">
.richtext {
    position: relative;

    &.hide::before {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .module-title {
        display: flex;
        align-items: center;
        // padding: 0 8px;
        border-radius: 10px;
        justify-content: space-between;
        position: relative;
        min-height: 32px;

        .title {
            color: #333;
            font-size: 16px;
            font-weight: 700;
            display: flex;
            align-items: center;

            >img {
                height: 16px;
                width: auto;
                margin-right: 6px;
            }
        }
    }

    .daofen-box {
        width: 351px;
        border-radius: 10px;
        background-color: #FFFFFF;
        padding: 17.5px 12px 20px;
        margin: 12px auto;

        .image {
            margin-top: 5px;
            img {
                max-width: 100%;
                height: auto;
            }
        }
    }

}
</style>