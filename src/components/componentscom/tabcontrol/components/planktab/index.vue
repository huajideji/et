<template>
    <div class="planktab" :class="{ 'hide': hide }">
        <div class="container">
            <!-- <div class="module-title" v-if="!datas.titleHide">
                <img src="@/assets/images/title.png" alt="">
                <span>{{ datas.moduleName }}</span>
            </div> -->
            <div class="plankList">
                <div class="item" v-for="(item, index) of plankList" :key="index">
                    <div class="header">
                        <p>{{ item.title }}</p>
                        <ul class="mark-list">
                            <li v-for="(mark, index) of item.marksList" :key="index">
                                <span class="rank">{{ index + 1 }}</span>
                                <span class="mark">{{ mark }}</span>
                            </li>
                        </ul>

                    </div>
                    <div class="footer">
                        <span class="desc">
                            {{ item.desc }}
                        </span>
                        <div class="btn-box">
                            <button class="btn" @click='checkDetail(item)'>查看详情</button>
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'planktab',
    props: {
        datas: Object,
        hide: Boolean,
    },
    data() {
        return {
            plankList: [
                {
                    title: 'A类地区进入武汉',
                    marksList: ['车辆报备', '通行证', '48小时核酸检测', '大数据行程卡'],
                    desc: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
                    detail: 'http://m.wh.bendibao.com/edu/141210.shtm',
                },
                {
                    title: 'A类地区进入武汉',
                    marksList: ['车辆报备', '通行证', '48小时核酸检测', '大数据行程卡'],
                    desc: '描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述',
                    detail: 'http://m.wh.bendibao.com/edu/141210.shtm',
                },
            ]

        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    methods: {
        checkDetail(plank) {
            window.location = plank.url
        }

    }
}
</script>
<style scoped lang="less">
.planktab {
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
        border-radius: 10px;
        padding: 17.5px 12px 21px;
        background-color: #fff;
        margin: 0 auto;

        .module-title {
            display: flex;
            align-items: center;
            // padding: 8px;
            padding-bottom: 17px;

            >img {
                height: 16px;
                margin-right: 6px;
            }

            >span {
                font-size: 17px;
                font-weight: 700;
                color: #333;
            }

        }

        .plankList {
            margin: 0 auto;
            width: 100%;

            .item {
                padding: 17.5px 14.5px;
                background: linear-gradient(180deg, rgba(224, 232, 255, 1) 0%, rgba(222, 233, 255, 0.2) 100%);
                border-radius: 6px;
                margin-bottom: 14px;

                .header {
                    border-bottom: 1px solid #B5B5B5;

                    >p {
                        font-weight: 400;
                        font-size: 14px;
                        font-size: 16px;
                        font-weight: 700;
                        font-family: "PingFang SC";
                        color: #2456F5;
                        margin-bottom: 14px;
                    }

                    .mark-list {
                        padding-bottom: 15px;
                        padding-left: 4px;
                        padding-right: 4px;

                        >li {
                            display: flex;
                            padding-bottom: 8px;
                            align-items: center;

                            &:last-child {
                                padding-bottom: 0;
                            }

                            .rank {
                                display: flex;
                                width: 16px;
                                height: 16px;
                                font-size: 12px;
                                background-color: #2456F5;
                                color: #fff;
                                border-radius: 50%;
                                justify-content: center;
                                align-items: center;
                                margin-right: 10px;
                            }

                            .mark {
                                color: #000000;
                                font-size: 14px;
                            }


                        }
                    }
                }

                .footer {
                    padding: 10px 4px 0;

                    .desc {
                        font-size: 14px;
                        font-weight: 500;
                        color: #666666;
                        letter-spacing: 0.025em;
                    }

                    .btn-box {
                        text-align: center;
                        margin-top: 18px;

                        .btn {
                            width: 100px;
                            height: 32px;
                            border-radius: 16px;
                            background-color: #3662FF;
                            color: #fff;
                            border: none;

                        }
                    }
                }
            }
        }

    }
}
</style>