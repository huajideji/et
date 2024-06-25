<template>
    <div class="unlimited_button" :class="{ 'hide': datas.is_hide}">
        <main>
            <div class="module-title" v-if="datas.is_show">
                <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                    <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
                </div>
                <span>{{ datas.name }}</span>
            </div>
            <div class="unlimited_button-box">
                <div class="item" v-for="(item, index) of unlimited_buttonList" :key="index" v-show="showIndex(index)"
                    @click="showDetail(item)">
						<div :class="['blueline',styleArr[4]]">
							
						</div>
						<div class="blue-icons">
							<img src="@/assets/images/dajianicon.png">
						</div>
						<div :class="['blue-title',styleArr[0]]">
							{{item.title}}
						</div>
                </div>
               
            </div>
			<footer v-if="+datas.fold">
			    <div :class="['showMore',styleArr[0]]" v-show="unlimited_buttonList.length > +(datas.fold*2) && +datas.fold"
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
        </main>
        <!-- 功能组件 -->
        <slot name="functions" />
    </div>
</template>
<script>
export default {
    name: 'unlimited_button',
    props: {
        datas: Object,
    },
    data() {
        return {
            styleArr:[],
            showMore: true,
            unlimited_buttonList: [{title:'按钮1'},{title:'按钮2'},{title:'按钮3'},{title:'按钮4'},{title:'按钮5'},{title:'按钮6'}]
        }
    },
    mounted() {
        // this.datas.elementList.includes('更新时间')
        this.styleArr = this.getStyleArr()
    },
    methods: {
        showIndex(index) {
            if (+this.datas.fold) {
                return index >= +this.datas.fold && !this.showMore || index < this.datas.fold*2 	
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
.unlimited_button {
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

    .unlimited_button-box {
		width:100%;
		display:flex;
		justify-content:start;
		flex-wrap:wrap;
		.item{
			width:50%;
			// height:20px;
			margin-bottom:10px;
			display:flex;
			justify-content:start;
			align-items:flex-start;
			color:rgba(96,101,236,1);
			img{
				display:block;	
				margin:0px 10px;
			}
            .blue-title{
                margin-top: -3px;
            }
		}
		.blueline{
			width:2px;
			
			height:13px;
			background: rgba(96,101,236,1);
		}
    }
	.showMore {
	    color: #3F74FC;
	    text-align: center;
	}

}
</style>