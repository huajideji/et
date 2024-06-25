<template>
    <div class="networkmodule" :class="{ 'hide': datas.is_hide}" >
        <div class="module-container">
			
            <div class="module-title" v-if="datas.is_show">
                <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                    <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
                </div>
                <span>{{ datas.name }}</span>
            </div>

            <!-- 备注 -->
            <div class="remark" v-show="datas.remark"><i class="el-icon-bell"></i> {{ datas.remark }}</div>

			<div class="option-wrap" v-if="datas.is_option==1">
				<div class="option-item" :class="select_index(index)" v-for="(item,index) in ('全部^'+datas.option_data).split('^')" :key="index" @click="clickoption(index,item)">
					{{item.name==undefined?item:item.name}}
				</div>
			</div>
            <div class="search-box" v-if="datas.is_search && datas.search_field.length && datas.search_field != '[]'">
                <div :class="['search',styleArr[8]]">
                    <input type="text" :placeholder="datas.guide_text">
                    <span :class="[styleArr[4]]">
                        搜索
                    </span>
                </div>
            </div>
            <div class="module-header" v-if="datas.county_condition">
                <div class="select-group" >
                    <select v-model="county" @change="handleChange">
                        <option value="全部">全部</option>
                        <option value="区县1">区县1</option>
                        <option value="区县2">区县2</option>
                        <option value="区县3">区县3</option>
                    </select>
                    <img src="@/assets/images/down.png" alt="">
                </div>
                <div class="select-group" v-if="datas.street_condition">
                    <select v-model="street">
                        <option value="全部">全部</option>
                        <option value="街道1">街道1</option>
                        <option value="街道2">街道2</option>
                        <option value="街道3">街道3</option>
                    </select>
                    <img src="@/assets/images/down.png" alt="">
                </div>
                <div class="select-group"  v-for="(aitem, index) of getsxData" :key="index"  >
                    <select  v-model="other" v-if="aitem.select_value">
                        <option :value="item" v-for="(item, index) of aitem.select_value.split('^')" :key="index" >{{ item }}</option>
                    </select>
                    <img src="@/assets/images/down.png" alt="">
                </div>
            </div>
            <div :class="['network',styleArr[6]]" v-for="(item, index) of networkList" :key="index" v-show="showIndex(index)" :style="{'height':getfoldheight}">
				<div class="el-icon-arrow-down foldIcon" @click="showfold" v-if="datas.is_fold == 1&&!showfolds">
					
				</div>
				<div class="el-icon-arrow-up foldIcon" @click="showfold" v-if="datas.is_fold == 1&&showfolds">
					
				</div>
                <div class="header">
                    <span class="title">{{ item.networkName }}</span>
                    <span :class="['type',styleArr[3],styleArr[0],styleArr[7]]">
                        {{ item.itemType }}
                    </span>
                </div>
                <div class="pos" v-if="datas.is_address">
                    <span>
                        {{ item.position }}
                    </span>
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe608;</span>
                </div>
				<div class="net-image">
					<img src="@/assets/images/rectangle2.png" alt="">
				</div>
                <ul class="container">
                    <li class="item" v-for="(content, index) of demoData" :key="index">
                        <template v-if="content.type == 9">
                            <span class="title">{{ content.name }}</span>
                            <span class="text">
                                <span style="color:#3F74FC">{{ content.value }} </span>
                                <span> {{ content.value1 }}<span class="el-icon-question" style="margin-left: 5px;" v-if="content.is_remark==1"></span></span>
                            </span>
                        </template>
                        <template v-else>
                            <span class="title">{{ content.name }}</span>
                            <span class="text">{{content.value}}<span class="el-icon-question" style="margin-left: 5px;" v-if="content.is_remark==1"></span></span>
							
                        </template>

                    </li>
                </ul>
                <div class="btn-group"
                    style="justifyContent: space-between; ">
                    <button v-for="(btn, index) of btnArr" 
                    :key="index" 
                    :class="['btn',styleArr[4]]"
                    :style="showWidth"
                    >
                        {{ btn.name }}
                    </button>
                </div>
            </div>

            <footer v-if="+datas.fold">
                <div :class="['showMore',styleArr[0]]" v-if="networkList.length > +datas.fold && +datas.fold"
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
        <!-- v-if="datas.jump_type == 1 || datas.jump_type == 2 || +datas.fold" -->

        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
import { timeStamp } from 'console'

export default {
    name: "networkmodule",
    props: {
        datas: Object,
    },
    data() {
        return {
            styleArr:[],
			foldheight:'auto',
			showfolds:true,
			selectIndex:0,
            showMore: true,
            county: '全部',
            street: '筛选类型',
            other: '全部',
            type: [],
            networkList: [
                {
                    networkName: '测试展示',
                    position: ' 城市+区县+街道（选填）+详细地址（选填）',
                    itemType: '筛选类型',
                },

            ],
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
		getfoldheight(){
			return this.foldheight
		},
		sxList(){
			return this.datas.value_list
			
		},
        // 拆分datas中文本内容
        contentArr() {
            return this.datas.value_list.filter(item => !item.default && (item.type == 0 || item.type == 8 || item.type == 9))
        },
        // 拆分datas中btn按钮
        btnArr() {
            return this.datas.value_list.filter(item => !item.default && (item.type == 5 || item.type == 6))
        },
        others() {
			
            let others = this.datas.other_condition.split('^')
            others.unshift('全部')
            return others
        },
        // 根据按钮个数确定按钮宽度
        showWidth() {
            let num =  this.btnArr.length
            if (num == 1) {
                return {
                    'width': `100%`,
                }
            } else if (num == 2) {
                return {
                    'width': `45%`,
                }
            } else if (num == 3) {
                return {
                    'width': `30%`,
                }
            }

        },
        // 演示数据生成
        demoData() {
            let data = new Array()
            if (this.contentArr.length) {
                this.contentArr.forEach((item, index) => {
                    if (item.type == 9) {
                        data.push({
                            name: item.name,
                            value: '12345678',
                            value1: '转8 李女士',
                            type: item.type,
							is_remark:item.is_remark
                        })
                    } else {
                        data.push({
                            name: item.name,
                            value: '测试测试',
                            value1: '',
                            type: item.type,
							is_remark:item.is_remark
                        })
                    }

                })
            }
			console.log(data)
            return data
        },
		getsxData(){
			let data = new Array()
			console.log(this.sxList)
			if (this.sxList.length) {
			    this.sxList.forEach((item, index) => {
			        if (item.type == 11) {
			            data.push({
			                name: item.name,
			                is_select:1,
							select_value:item.select_value,
			                type:11,
			            })
			        }
			
			    })
			}
			return data
		}
    },
    methods: {
		showfold(){
			if(this.showfolds==false){
				this.foldheight = 'auto'
			}else{
				this.foldheight = '45px'
			}
			this.showfolds = !this.showfolds
		},
        select_index(index) {
            let arr = []
            if (this.selectIndex == index) {
                arr.push('select_index')
                arr.push(this.styleArr[4])
            } else {
                arr = []
            }
            return arr
		},
		clickoption(index){
			this.selectIndex = index 
		},
        // 折叠数回调
        showIndex(index) {
            if (+this.datas.fold) {
                return index >= +this.datas.fold && !this.showMore || index < this.datas.fold
            } else {
                return true
            }
        },
        changeType() {
            this.type = [this.county, this.street, this.other]

        },
        handleChange() {

        }

    },
    mounted() {
        this.styleArr = this.getStyleArr()
    }
}
</script>
<style scoped lang="less">
	.foldIcon{
		position: absolute;
		font-size: 20px;
		right: 30px;
		top: 15px;
	}
	.net-image{
		>img{
			width: 303px;
			margin-top: 10px;
		border-radius: 8px;
			height:226px;
		}
	}
	//选项样式
	.select_index{
		background-color: #3F74FC;
		color: #fff !important;
	}
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
.networkmodule {
    position: relative;
	// overflow: hidden;
	transition: 0.3s;
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

    .search-box {
        // width: 100%;
        // height: 68px;
        // border-radius: 10px;
        // margin: 12px auto;
        // background-color: #fff;
        // padding: 18px 12px;
        // margin-bottom: 12px;

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
        padding: 14px 12px 17px;
        width: 351px;
        margin: 12px auto;

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

        .remark {
            display: flex;
            margin: -3px 0 10px;
            padding: 4px 10px;
            border-radius: 6px;
            background: #f2f6ff;
			color: #3372FD;
			font-size: 13px;
            .el-icon-bell {
                margin-right: 5px;
                margin-top: 2.5px;
            }
        }
		.module-header::-webkit-scrollbar { width: 0 !important }
        .module-header {
            color: #000;
            font-size: 12px;
			// width: 100%;
			height: 40px;
			overflow: scroll;
			 -ms-overflow-style: none;
			 white-space: nowrap; /* 内容超出不换行 */
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
			position: relative;
            padding: 16px 13px;
            background: rgba(63, 116, 252, 0.05);
            border-radius: 10px;
            margin-bottom: 12px;
			overflow: hidden;
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
    width: 80px;

    img {

        position: absolute;
        top: 5px;
        right: 2px;
        height: 16px;
        width: auto;
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
