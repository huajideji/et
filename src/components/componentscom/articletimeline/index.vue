<template>
    <div class="articletimeline" :class="{ 'hide': datas.is_hide}">
        <main>
            <div class="module-title" v-if="datas.is_show">
                <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                    <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
                </div>
                <span>{{ datas.name }}</span>
            </div>
            <div class="articletimeline-box">
                <div class="item" v-for="(item, index) of articleTimelineList" :key="index" v-show="showIndex(index)"
                    @click="showDetail(item)">
                    <div class="time">
                        <div class="bg">
                            <div :class="['left',styleArr[7]]">
                                <span :class="['radius',styleArr[4]]"></span>
                            </div>
                        </div>
                        <div class="right">
                            <span>{{ item.current_time }}</span>
                            <span class="release-time">{{ item.release_time }}</span>
                        </div>
                    </div>
                    <div :class="['content',styleArr[7]]">
                        <template v-if="datas.is_image">
                            <span class="title" :class="{ noCity: !datas.is_city }">
                                {{ item.title }}
                            </span>
                            <img :src="item.img_url" alt="">
                        </template>
                        <span class="title noPhoto" :class="{ noCity: !datas.is_city }" v-else>
                            {{ item.title }}
                        </span>
                        <div class="city" v-if="datas.is_city">{{ item.city }}</div>
                    </div>
                </div>

                <footer v-if="+datas.fold">
                    <div :class="['showMore',styleArr[0]]" v-show="articleTimelineList.length > +datas.fold && +datas.fold"
                        @click="showMore = !showMore">
                        <template v-if="showMore">
                            展开更多
                        </template>
                        <template v-else>
                            收起更多
                        </template>
                    </div>
                    <!-- <div class="showMore">
                    展开更多
                </div> -->
                </footer>
            </div>
        </main>
        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'articletimeline',
    props: {
        datas: Object,
    },
    data() {
        return {
            styleArr:[],
            showMore: true,
            articleTimelineList: [
                {
                    current_time: '2021-12-27',
                    release_time: '48分钟前',
                    img_url: 'https://imgbdb4.bendibao.com/bjbdb/20228/17/2022817174337_94325.png',
                    title: '全国新增本土病例162例，其中陕西152例',
                    article_detail: 'http://m.wh.bendibao.com/edu/141210.shtm',
                    city: '西安本地宝'
                },
                {
                    current_time: '2021-12-27',
                    release_time: '48分钟前',
                    img_url: 'https://imgbdb4.bendibao.com/bjbdb/20228/17/2022817174337_94325.png',
                    title: '全国新增本土病例162例，其中陕西152例',
                    article_detail: 'http://m.wh.bendibao.com/edu/141210.shtm',
                    city: '西安本地宝'
                },
                {
                    current_time: '2021-12-27',
                    release_time: '48分钟前',
                    img_url: 'https://imgbdb4.bendibao.com/bjbdb/20228/17/2022817174337_94325.png',
                    title: '全国新增本土病例162例，其中陕西152例',
                    article_detail: 'http://m.wh.bendibao.com/edu/141210.shtm',
                    city: '西安本地宝'
                },

            ]
        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
        this.styleArr = this.getStyleArr()
    },
    methods: {
        showIndex(index) {
            if (+this.datas.fold) {
                return index >= +this.datas.fold && !this.showMore || index < this.datas.fold
            } else {
                return true
            }
        },
        // 跳转到文章详情
        showDetail(article) {
            // window.location.href = article.article_detail
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
.articletimeline {
    position: relative;

    &.hide::before {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 1000;
    }

    main {
        box-sizing: border-box;
        width: 351px;
        border-radius: 10px;
        background-color: #FFFFFF;
        padding: 17.5px 12px 21px;
        margin: 12px auto;
    }

    .module-title {
        display: flex;
        align-items: center;
        margin-bottom: 13.5px;
        font-size: 16px;
        font-weight: 700;
        color: #333;


        >img {
            height: 16px;
            width: auto;
            margin-right: 6px;
        }

    }

    .articletimeline-box {
        width: 100%;

        .item {
            border-left: 1px solid #EFEFEF;
            padding-left: 14px;
            padding-top: 50px;
            position: relative;

            &:first-child {
                padding-top: 26.5px;

                .time {
                    top: -3.5px;
                }
            }

            .time {
                position: absolute;
                z-index: 100;
                left: -6.5px;
                top: 20px;
                display: flex;
                align-items: center;
                height: 20px;


                .bg {
                    background-color: #FFFFFF;

                    .left {
                        width: 13px;
                        height: 13px;
                        background: rgba(63, 116, 252, 0.1);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        border-radius: 50%;

                        .radius {
                            display: block;
                            width: 6px;
                            height: 6px;
                            border-radius: 50%;
                        }
                    }
                }

                .right {
                    margin-left: 8px;
                    font-size: 13px;
                    color: #999999;
                    font-weight: 500;

                    .release-time {
                        margin-left: 8px;
                    }
                }
            }

            .content {
                display: flex;
                position: relative;
                padding: 9px 12px;
                background-color: #F2F6FF;
                justify-content: space-between;
                border-radius: 5px;
                min-height: 65px;

                .title {
                    padding-right: 12px;
                    text-align: justify;
                    line-height: 1.3;
                    font-size: 15px;
                    font-weight: 700;


                    &.noCity {
                        display: flex;
                        align-items: center;
                    }

                    &.noPhoto {
                        padding-right: 0;
                    }
                }

                >img {
                    width: 80.5px;
                    height: 59px;
                    border-radius: 3px;
                }

                .city {
                    position: absolute;
                    left: 12px;
                    bottom: 6px;
                    font-size: 13px;
                    color: #999999;
                    font-weight: 500;
                }
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

        footer {
            position: relative;
            min-height: 20px;
            margin-top: 14px;

            .showMore {
                color: #3F74FC;
                text-align: center;
            }
        }



    }

}
</style>