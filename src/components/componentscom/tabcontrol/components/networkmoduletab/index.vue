<template>
    <div class="networkmoduletab" :class="{ 'hide': hide }">
        <!-- v-if="datas.addSearch.field.length" -->
        <!-- datas.addSearch.guideWords -->
        <div class="search-box" v-if="datas.addSearch.field.length">
            <div class="search">
                <input type="text" :placeholder="datas.addSearch.guideWords">
                <span>
                    搜索
                </span>
            </div>
        </div>

        <div class="module-container">
            <!-- <div class="module-title" v-if="!datas.titleHide">
                <img src="@/assets/images/title.png" alt="">
                <span>{{ datas.moduleName }}</span>
            </div> -->
            <div class="module-header">
                <!-- <div v-for="(item, index) of datas.type" :key="index" class="select-group">
                    <select v-if="item === 1" v-model="county" @change="changeType">
                        <option value="莲湖区">莲湖区</option>
                        <option value="未央区">未央区</option>
                        <option value="雁塔区">雁塔区</option>
                    </select>
                    <select v-if="item === 2" v-model="street" @change="changeType">
                        <option value="雅逸花园1">雅逸花园1</option>
                        <option value="雅逸花园2">雅逸花园2</option>
                        <option value="雅逸花园3">雅逸花园3</option>
                    </select>
                    <select v-if="item === 3" @change="changeType" v-model="other">
                        <option :value="item" v-for="(item, index) of datas.others" :key="index">{{ item }}</option>
                    </select>
                </div> -->
                <div class="select-group" v-for="(item, index) of datas.type" :key="index">
                    <select v-if="item == 0" v-model="county" @change="changeType">
                        <option value="莲湖区">莲湖区</option>
                        <option value="未央区">未央区</option>
                        <option value="雁塔区">雁塔区</option>
                    </select>
                    <select v-if="item == 1" v-model="street" @change="changeType">
                        <option value="雅逸花园1">雅逸花园1</option>
                        <option value="雅逸花园2">雅逸花园2</option>
                        <option value="雅逸花园3">雅逸花园3</option>
                    </select>
                    <select v-if="item == 2" @change="changeType" v-model="other">
                        <option :value="item" v-for="(item, index) of datas.others" :key="index">{{ item }}</option>
                    </select>
                    <i class="el-icon-arrow-down"></i>
                </div>
            </div>
            <div class="network" v-for="(item, index) of networkList" :key="index" v-show="showIndex(index)">
                <div class="header">
                    <span class="title">{{ item.networkName }}</span>
                    <span class="type">
                        {{ item.itemType }}
                    </span>
                </div>
                <div class="pos" v-if="datas.isPosition">
                    <!-- {{ datas.network.position }} -->
                    <span>
                        {{ item.position }}
                    </span>
                    <!-- <i class="el-icon-location"></i> -->
                    <img src="@/assets/images/pos.png" alt="">
                </div>
                <ul class="container">
                    <li class="item" v-for="(content, index) of item.contentList" :key="index">
                        <template v-if="content.type == 2">
                            <span class="title">{{ content.name }}</span>
                            <span class="text">
                                <span style="color:#3F74FC">{{ content.text.phoneNum }} </span>
                                <span> {{ content.text.note }}</span>
                            </span>
                        </template>
                        <template v-else>
                            <span class="title">{{ content.name }}</span>
                            <span class="text">{{ content.text }}</span>
                        </template>

                    </li>
                </ul>
                <div class="btn-group"
                    :style="{ justifyContent: datas.network.btnList.length < 3 ? 'space-evenly' : 'space-between' }">
                    <button v-for="(btn, index) of item.btnList" :key="index" class="btn">
                        {{ btn.name }}
                    </button>
                </div>
            </div>

            <footer v-if="+datas.foldingNum">
                <!-- 展开更多选项 -->
                <div class="showMore" v-if="networkList.length > +datas.foldingNum && +datas.foldingNum"
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
        <!-- v-if="datas.jump_type == 1 || datas.jump_type == 2 || +datas.foldingNum" -->

        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: "networkmoduletab",
    props: {
        datas: Object,
        hide: Boolean,
    },
    data() {
        return {
            showMore: true,
            county: '',
            street: '',
            other: '',
            type: [],
            networkList: [
                {
                    networkName: '旅游景点',
                    position: ' 城市+区县+街道（选填）+详细地址（选填）',
                    itemType: '筛选类型',
                    contentList: [{
                        name: 'test',
                        text: '测试',
                        type: 1,
                        optional: '', // 选填控制
                    },
                    {
                        name: 'test',
                        text: {
                            phoneNum: '1390867',
                            note: '转8 李女士',
                        },
                        type: 2,
                        optional: '', // 选填控制
                    }
                    ],
                    btnList: [
                        {
                            name: '旅游景点',
                            // url: 'www.baidu.com',
                            type: '11',
                            optional: '', // 选填控制
                        },
                        {
                            name: '游玩攻略',
                            type: '11',
                            optional: '', // 选填控制
                        },
                        {
                            name: '旅游景点',
                            // url: 'www.baidu.com',
                            type: '11',
                            optional: '', // 选填控制
                        },
                    ]
                },
                {
                    networkName: '旅游景点',
                    position: ' 城市+区县+街道（选填）+详细地址（选填）',
                    itemType: '筛选类型',
                    contentList: [{
                        name: 'test',
                        text: '测试',
                        type: 1,
                        optional: '', // 选填控制
                    },
                    {
                        name: 'test',
                        text: '测试',
                        type: 1,
                        optional: '', // 选填控制
                    }
                    ],
                    btnList: [
                        {
                            name: '旅游景点',
                            // url: 'www.baidu.com',
                            type: '11',
                            optional: '', // 选填控制
                        },
                        {
                            name: '游玩攻略',
                            type: '11',
                            optional: '', // 选填控制
                        },
                        {
                            name: '旅游景点',
                            // url: 'www.baidu.com',
                            type: '11',
                            optional: '', // 选填控制
                        },
                    ]
                }
            ],
        }
    },
    methods: {
        // 折叠数回调
        showIndex(index) {
            if (+this.datas.foldingNum) {
                return index >= +this.datas.foldingNum && !this.showMore || index < this.datas.foldingNum
            } else {
                return true
            }
        },
        changeType() {
            this.type = [this.county, this.street, this.other]
        
        },

    },
    mounted() {
       
    }
}
</script>
<style scoped lang="less">
.networkmoduletab {
    position: relative;


    &.hide::before {
        content: '生成选项卡';
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

    .search-box {
        width: 351px;
        height: 68px;
        border-radius: 10px;
        margin: 0 auto;
        background-color: #fff;
        padding: 18px 12px;

        .search {
            height: 36px;
            border: 1px solid #3F74FC;
            height: 32px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin: 0 auto 21px;
            padding-left: 19px;
            border-right: none;

            >input {
                width: 90%;
                height: 26px;
            }

            >span {
                display: flex;
                align-items: center;
                justify-content: center;
                width: 56px;
                height: 32px;
                border-radius: 0 5px 5px 0;
                background-color: #3F74FC;
                color: #fff;
                font-size: 13px;
            }
        }

    }




    .module-container {



        background-color: #FFFFFF;
        border-radius: 9px;
        padding: 14px 14.5px 17px;
        width: 351px;
        margin: 0 auto;

        .module-title {
            display: flex;
            align-items: center;
            margin-bottom: 13.5px;
            font-size: 17px;
            font-weight: 700;
            color: #333;


            >img {
                height: 16px;
                margin-right: 6px;
            }

        }

        .module-header {
            display: flex;
            color: #000;
            font-size: 12px;

            .left,
            .right {
                span {
                    margin-right: 6px;
                }

                i {
                    color: #000;
                    font-size: 12px;
                }

            }

        }

        .network {
            padding: 16px 13px;
            background: rgba(63, 116, 252, 0.05);
            border-radius: 10px;
            margin-bottom: 12px;



            .header {
                display: flex;
                align-items: center;

                .title {
                    font-family: 'Roboto';
                    font-style: normal;
                    font-weight: 400;
                    font-size: 14px;
                    color: #000;
                }

                .type {
                    padding: 2px 6.5px;
                    font-size: 13px;
                    font-weight: 500;
                    color: #3F74FC;
                    font-size: 10px;
                    background: rgba(63, 116, 252, 0.1);
                    border-radius: 1px;
                    margin-left: 6px;
                    margin-left: 10px;
                }

            }

            .pos {
                // font-size: 12px;
                margin-top: 7px;
                display: flex;
                align-items: center;

                span {
                    font-size: 13px;
                    font-weight: 500;
                    color: #999999;
                }

                >img {
                    width: 11px;
                    height: 13px;
                    object-fit: cover;
                }
            }

            .container {
                padding-top: 15px;
                padding-bottom: 15px;

                .item {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding-bottom: 8px;
                    font-size: 14px;
                    font-weight: 500;

                    .title {
                        width: 60px;
                        text-align: left;
                        color: #999999;
                        margin-right: 62px;
                    }

                    .text {
                        color: #333;

                    }

                }

            }

            .btn-group {
                display: flex;
                font-size: 12px;
                justify-content: space-between;

                .btn {
                    width: 91px;
                    height: 35px;
                    border-radius: 5px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #3F74FC;
                    border: none;
                    color: #FFFFFF;
                }
            }


        }


        footer {
            position: relative;
            min-height: 30px;
            padding-top: 14px;

            .more-box {
                position: absolute;
                bottom: 0;
                width: 100%;

                >span {
                    color: #6065EC;
                    font-size: 14px;
                }

                text-align: center;
            }

            .showMore {
                color: #3F74FC;
                text-align: center;
            }
        }
    }
}

.select-group {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    padding: 0;
    overflow: hidden;
    background-color: #fff;
    color: #555;
    // border: 1px solid #aaa;
    text-shadow: none;
    border-radius: 4px;
    transition: box-shadow 0.25s ease;
    z-index: 2;
    margin-right: 32px;
    padding-bottom: 16px;

    i {
        content: "";
        position: absolute;
        width: 0;
        height: 0;
        top: 6px;
        right: 17px;
        cursor: pointer;
        z-index: -2;
    }

    select {
        cursor: pointer;
        padding: 5px 20px 5px 5px;
        width: 100%;
        border: none;
        background: transparent;
        background-image: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        &:focus {
            outline: none;
        }
    }
}
</style>
