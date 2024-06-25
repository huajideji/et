<template>
    <div class="articlelisttab">
        <div class="container">
            <!-- <div class="module-title">
                <div v-if="!datas.titleHide" class="title">
                    <img src="@/assets/images/article.png" alt="">
                    <span>{{ datas.moduleName }}</span>
                </div>
                <div class="more" v-if="datas.jump_type == 0">
                    <span class="">更多
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </div>
            </div> -->
            <div class="content">
                <div v-for="(item, index) of articlelist" :key="index" v-show="showIndex(index)">
                    <article class="add-img" v-if="datas.elementList.includes('图片')">
                        <div class="article-content">
                            <span class="title">  <img src="@/assets/images/article.png" alt=""> {{ item.title }}</span>
                            <span class="desc" v-if="datas.detail">{{ item.desc }}</span>
                            <span class="time" v-if="datas.elementList.includes('更新时间')">{{ item.time }}</span>
                        </div>
                        <img :src="item.imgUrl" alt="">
                    </article>
                    <article class="article" v-else>
                        <span class="title">  <img src="@/assets/images/article.png" alt="">{{ item.title }}</span>
                        <span class="desc" v-if="datas.detail" :class="{ three: datas.detail === 3 }">{{ item.desc
                        }}</span>
                        <span class="time" v-if="datas.elementList.includes('更新时间')">{{ item.time }}</span>
                    </article>
                </div>
                <!-- <div class="showMore" @click="showMore()">
                展开更多
            </div> -->
                <footer v-if="datas.jump_type == 1 || datas.jump_type == 2 || +datas.foldingNum">
                    <div class="more-box" v-if="datas.jump_type == 1 || datas.jump_type == 2"
                        :style="{ textAlign: datas.jump_type == 1 ? 'right' : 'center' }">
                        <span class="">更多
                            <i class="el-icon-arrow-right"></i>
                        </span>
                    </div>
                    <div class="showMore" v-if="articlelist.length > +datas.foldingNum && +datas.foldingNum"
                        @click="showMore = !showMore">
                        <template v-if="showMore">
                            展开更多
                        </template>
                        <template v-else>
                            收起更多
                        </template>
                    </div>
                </footer>
            </div>
        </div>
        <!-- <div class="content-table">
            XXX表暂无数据
        </div> -->
        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'articlelisttab',
    props: {
        datas: Object,
    },
    data() {
        return {
            showMore: true,
            currentActive: true,
            articlelist: [
                {
                    title: '文章标题文章标题文章标题',
                    desc: '一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述',
                    time: '5555',
                    imgUrl: 'http://imgbdb3.bendibao.com/sl/200_140_imgbdb3.bendibao.com/bjbdb/news/20208/31/2020831191335_40509.jpg'
                },
                {
                    title: '文章标题文章标题文章标题',
                    desc: '一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述',
                    time: '3月29日',
                    imgUrl: 'http://imgbdb3.bendibao.com/sl/200_140_imgbdb3.bendibao.com/bjbdb/news/20208/31/2020831191335_40509.jpg'
                },
                {
                    title: '文章标题文章标题文章标题',
                    desc: '一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述一些模块使用描述，一些模块使用描述一些模块使用描述一些模块使用描述',
                    time: '3月29日',
                    imgUrl: 'http://imgbdb3.bendibao.com/sl/200_140_imgbdb3.bendibao.com/bjbdb/news/20208/31/2020831191335_40509.jpg'
                },

            ],
        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
    },
    methods: {
        showIndex(index) {
            if (+this.datas.foldingNum) {
                return index >= +this.datas.foldingNum && !this.showMore || index < this.datas.foldingNum
            } else {
                return true
            }
        },
        enterProject() {
            window.location = this.datas.redirect.url
        }
    }
}
</script>
<style scoped lang="less">
.articlelisttab {
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
        position: relative;
        width: 351px;
        padding: 17.5px 12px 21px;
        margin: 0 auto;
        border-radius: 10px;
        background-color: #fff;

        .module-title {
            display: flex;
            align-items: center;
            padding: 0 8px;
            justify-content: space-between;
            position: relative;
            min-height: 32px;

            .title {
                color: #333;
                font-size: 16px;
                font-weight: 700;

                >img {
                    width: 18px;
                    height: 13.5px;
                    margin-right: 6px;

                }
            }

            .more {
                position: absolute;
                right: 0;
                display: flex;
                align-items: center;
                color: #999999;
                font-size: 12px;
            }

        }

        .content {

            article {
                padding: 11px 0;
                border-bottom: 1px solid #CFCFCF;
                display: flex;
                flex-direction: column;
                width: 100%;


                .title {
                    color: #313131;
                    font-size: 14px;
                    padding-bottom: 6px;
                    display: flex;
                    align-items: center;
                    font-weight: 700;

                    >img {
                        width: 14px;
                        margin-right: 5px;
                       
                    }

                }

                .desc {
                    display: block;
                    color: #666666;
                    font-size: 12px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;

                    &.three {
                        white-space: normal;
                        text-overflow: -o-ellipsis-lastline;
                        display: -webkit-box; //特别显示模式
                        -webkit-line-clamp: 3; //行数
                        line-clamp: 3;
                        -webkit-box-orient: vertical; //盒子中内容竖直排列
                    }
                }

                .time {
                    padding-top: 6px;
                    color: #666666;
                    font-size: 12px;
                }

                &.add-img {
                    flex-direction: row;
                    align-items: center;

                    .article-content {
                        // flex-grow: 1;
                        width: 229px;
                        padding-right: 10px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        height: 70px;
                    }

                    >img {
                        width: 98px;
                        height: 71.5px;
                        object-fit: cover;
                        border-radius: 5px;
                    }
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
    }

    // .content-table {
    //     padding: 20px;
    // }
}
</style>