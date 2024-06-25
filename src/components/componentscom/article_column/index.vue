<template>
    <div class="column_article" :class="{ 'hide': datas.is_hide}">
        <div class="container">
            <div class="module-title" v-if="datas.is_show != 0 || datas.jump_place == 0 ">
                <div v-if="datas.is_show" class="title">
                   <div class="fontIcon-string">
                       <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                       <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
                   </div>
                    <span>{{ datas.name }}</span>
                </div>
                <!-- <div class="more" v-if="datas.jump_place == 0">
                    <span class="">更多
                        <i class="el-icon-arrow-right"></i>
                    </span>
                </div> -->
				
            </div>
			<div class="option-wrap" v-if="datas.is_option==1">
				<div class="option-item" :class="select_index(index)" v-for="(item,index) in datas.option_data.split('^')" :key="index" @click="clickoption(index,item)">
					{{item.name==undefined?item:item.name}}
				</div>
			</div>
            <div class="content">
                <div v-for="(item, index) of articlelist" :key="index" v-show="showIndex(index)">
                    <article class="add-img" v-if="datas.is_image">
                        <div class="article-content">
                            <span class="title">{{ item.title }}</span>
                            <span class="desc" v-if="datas.article_detail == 1">{{ item.desc }}</span>
                            <span class="time" v-if="datas.is_update_time">{{ item.time }}</span>
                        </div>
                        <img :src="item.imgUrl" alt="">
                    </article>
                    <article class="article" v-else>
                        <span class="title">{{ item.title }}</span>
                        <span class="desc" v-if="datas.article_detail" :class="{ three: datas.article_detail === 3 }">{{
                        item.desc
                        }}</span>
                        <span class="time" v-if="datas.is_update_time">{{ item.time }}</span>
                    </article>
                </div>
                <!-- <div class="showMore" @click="showMore()">
                展开更多
            </div> -->
                <footer v-if="datas.jump_place == 1 || datas.jump_place == 2 || +datas.fold">
                    <!-- <div class="more-box" v-if="datas.jump_place == 1 || datas.jump_place == 2"
                        :style="{ justifyContent: datas.jump_place == 1 ? 'end' : 'center' }">
                        <span class="more">更多
                            <img src="@/assets/images/right.png" alt="">
                        </span>
                    </div> -->
                    <div :class="['showMore',styleArr[0]]" v-if="articlelist.length > +datas.fold && +datas.fold"
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
    name: 'column_article',
    props: {
        datas: Object,
    },
    data() {
        return {
			styleArr:[],
            showMore: true,
            currentActive: true,
            articlelist: [
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
		 this.styleArr = this.getStyleArr()
        // this.datas.elementList.includes('更新时间')
    },
    methods: {
		clickoption(index){
			this.selectIndex = index 
		},
		select_index(index){
			if(this.selectIndex==index){
				return 'select_index'
			}else{
				return ""
			}
		},
        showIndex(index) {
            if (+this.datas.fold) {
                return index >= +this.datas.fold && !this.showMore || index < this.datas.fold
            } else {
                return true
            }
        },
        enterProject() {
            // window.location = this.datas.jump_code
        },
    } ,watch: {
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
	.option-wrap::-webkit-scrollbar { width: 0 !important }
	.option-wrap{
		display: flex;
		overflow: scroll;
		>div{
		width: auto;
		white-space: nowrap;
			background-color: #f0f0f0;
			color: #666;
			margin-right: 5px;
			padding: 1px 8px;
			border-radius: 5px;
		}
	}
.column_article {
	//选项样式
	.select_index{
		background-color: #3F74FC !important;
		color: #fff !important;
	}
	
    position: relative;

    &.hide::before {
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 10;
    }

    .container {
        position: relative;
        width: 351px;
        padding: 17.5px 12px 21px;
        margin: 12px auto;
        border-radius: 10px;
        background-color: #fff;

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

        .content {

            article {
                padding: 11px 0;
                border-bottom: 1px solid #efefef;
                display: flex;
                flex-direction: column;
                width: 100%;


                .title {
                    color: #313131;
                    font-size: 16px;
                    padding-bottom: 6px;
                    font-weight: 700;

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
    }

    // .content-table {
    //     padding: 20px;
    // }
}
</style>