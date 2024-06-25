<template>
    <div class="plank" :class="{ 'hide': datas.is_hide}">
        <div class="container">
            <div class="module-title" v-if="datas.is_show">
                <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                    <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
                </div>
                <span>{{ datas.name }}</span>
            </div>
            <div class="plankList">
                <div :class="['item',styleArr[5],getflodclass]" v-for="(item, index) of plankList" :key="index" v-show="showIndex(index) " ref="plank">
                <div class="el-icon-arrow-up foldIcon" @click="showfold(item,index)" v-if="datas.is_fold == 1" ref="foldIcon">

                </div>
			
                    <div class="header">
                        <p :class="styleArr[0]">{{ item.title }}</p>
                        <ul class="mark-list">
                            <li v-for="(mark, index) of item.marksList" :key="index">
                                <span class="rank" :class="styleArr[4]">{{ index + 1 }}</span>
                                <span class="mark">{{ mark }}</span>
                            </li>
                        </ul>

                    </div>
                    <div class="footer">
                        <span class="desc">
                            {{ item.desc }}
                        </span>
                        <div class="btn-box">
                            <button :class="['btn',styleArr[4]]" @click='checkDetail(item)'>查看详情</button>
                        </div>

                    </div>
                </div>

                 <footer v-if="datas.jump_place == 1 || datas.jump_place == 2 || +datas.fold">
                    <div :class="['showMore',styleArr[0]]" v-if="plankList.length > +datas.fold && +datas.fold"
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

        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'plank',
    props: {
        datas: Object,
    },
    data() {
        return {
            styleArr:[],
            showMore: true,
		    flodclass: 'flodclass',

            showfolds:true,    
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
            this.styleArr = this.getStyleArr()
        // this.datas.elementList.includes('更新时间')
    },
    computed:{
           getflodclass() {
        if(this.datas.is_fold == 1){
          return this.flodclass
        }else{
          return ''
        }

      },
    },
    methods: {
       showfold(item, index) {
        if (item.showfold == false) {
          this.$refs.plank[index].classList.add('flodclass')
        } else {
          this.$refs.plank[index].classList.remove('flodclass')
        }
        if (item.showfold == false) {
          this.$refs.foldIcon[index].classList.add('el-icon-arrow-up')
          this.$refs.foldIcon[index].classList.remove('el-icon-arrow-down')
        } else {
          this.$refs.foldIcon[index].classList.add('el-icon-arrow-down')
          this.$refs.foldIcon[index].classList.remove('el-icon-arrow-up')
        }
        item.showfold = !item.showfold
      },
        showIndex(index) {
            if (+this.datas.fold) {
                return index >= +this.datas.fold && !this.showMore || index < this.datas.fold
            } else {
                return true
            }
        },
        checkDetail(plank) {
            // window.location = plank.url
        },
        getplankList() {

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
.foldIcon{
		position: absolute;
		font-size: 20px;
		right: 30px;
		top: 20px;
	}
      .flodclass {
    height: 50px;
    border-radius: 10px !important;
    opacity: 1;
    background: rgba(63, 116, 252, 0.05) !important;
    color: #333;
  }
.plank {
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

    .container {
        width: 351px;
        border-radius: 10px;
        padding: 17.5px 12px 21px;
        background-color: #fff;
        margin: 12px auto;

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
            // margin: 12px auto;
            width: 100%;
      

            .item {
                padding: 17.5px 14.5px;
                background: linear-gradient(180deg, rgba(224, 232, 255, 1) 0%, rgba(222, 233, 255, 0.2) 100%);
                border-radius: 6px;
                margin-bottom: 14px;
                position: relative;
                overflow: hidden;

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

.showMore {
    color: #3F74FC;
    text-align: center;
    z-index: 2;
}
</style>