<template>
    <div class="graphicmodule" :class="{ 'hide': datas.is_hide}">
        <div class="graphicmodule-box"> 
            <div class="module-title" v-if="datas.is_show != 0 || datas.jump_place == 0 ">
                <div v-if="datas.is_show" class="title">
                    <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                    <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
                </div>
                    <span>{{ datas.name }}</span>
                </div>
                <div class="more" v-if="datas.jump_place == 0">
                    <span class="">更多
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </div>
            </div>
            <div class="image">
                <img :src="graphicmoduleData.imgUrl" alt="" />
            </div>
            <span class="text">
                {{ graphicmoduleData.text }}
            </span>
            <footer v-if="datas.jump_place == 1 || datas.jump_place == 2">
                <div class="more-box" v-if="datas.jump_place == 1 || datas.jump_place == 2"
                    :style="{ justifyContent: datas.jump_place == 1 ? 'end' : 'center' }">
                    <span class="more">更多
                        <img src="@/assets/images/right.png" alt="">
                    </span>
                </div>
            </footer>
        </div>



        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'graphicmodule',
    props: {
        datas: Object,
    },
    data() {
        return {
            styleArr:[],
            graphicmoduleData: {
                text: '工作日和周末全天限行（10月15日至19日广交会期间，广州不限行）工作日和周末全天限行（10月15日至19日广交会期间，广州不限行）工作日和周末全天限行（10月15日至19日广交会期间，广州不限行）。',
                imgUrl: 'http://imgbdb4.bendibao.com/bjbdb/20227/20/2022720175222_77127.png'
            },



        }
    },
    mounted() {
        this.styleArr = this.getStyleArr()
    },
    methods: {

    }, watch: {
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
.graphicmodule {
    position: relative;

    .module-title {
        display: flex;
        align-items: center;
        // padding: 0 8px;
        border-radius: 10px;
        justify-content: space-between;
        position: relative;
        min-height: 24px;
        margin-bottom: 13.5px;

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

    .more {
        // position: absolute;
        right: 0;
        display: flex;
        align-items: center;
        color: #999999;
        font-size: 12px;

        span {
            display: flex;
            align-items: center;

            img {
                height: 14px;
                width: auto;
            }
        }
    }

    &.hide::before {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .graphicmodule-box {
        width: 351px;
        border-radius: 10px;
        background-color: #FFFFFF;
        padding: 17.5px 12px;
        margin: 12px auto;

        .graphicmodule-header {
            font-size: 16px;
            font-weight: 700;
            color: #333333;
            margin-bottom: 10px;
        }

        .image {
            width: 100%;

            >img {
                width: 100%;
                height: auto;
            }
        }

        .text {
            display: block;
            padding-top: 14px;
            color: #7E7E7E;
            font-size: 14px;
            font-weight: 500;
            text-align: justify;
        }


    }

    footer {
        position: relative;
        min-height: 30px;
        padding-top: 14px;
        display: flex;
        justify-content: center;

        .more-box {
            position: absolute;
            bottom: 0;
            width: 100%;
            display: flex;

            >span {
                color: #999999;
                font-size: 12px;
            }

            text-align: center;
        }

        .showMore {
            color: #3F74FC;
            text-align: center;
            display: flex;
            z-index: 2;
        }
    }

}
</style>