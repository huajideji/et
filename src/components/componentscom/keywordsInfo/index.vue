<template>
  <div class="keywordsInfo" v-if="datas.value_list" :class="{ 'hide': datas.is_hide}">
    <div class="info-tab">
      <div class="tab-bar">
        <ul class="bar-title" :style="tabStyle">
          <li class="title-name" :class="curIndex == 0 ? 'click' : ''" @click="tab(0)">
            {{datas.value_list[0].title}}
            <img v-if="curIndex == 0" :src="clickImg" />
          </li>
          <li
            v-if="datas.value_list[1]"
            class="title-name"
            :class="curIndex == 1 ? 'click' : ''"
            @click="tab(1)"
			:style="datas.value_list.length == 2 ? {'margin-left':'50px'} : ''"
          >
            {{datas.value_list[1].title}}
            <img v-if="curIndex == 1" :src="clickImg" />
          </li>
          <li
            v-if="datas.value_list[2]"
            class="title-name"
            :class="curIndex == 2 ? 'click' : ''"
            @click="tab(2)"
          >
            {{datas.value_list[2].title}}
            <img v-if="curIndex == 2" :src="clickImg" />
          </li>
          <li
            v-if="datas.value_list[3]"
            class="title-name"
            :class="curIndex == 3 ? 'click' : ''"
            @click="tab(3)"
          >
            {{datas.value_list[3].title}}
            <img v-if="curIndex == 3" :src="clickImg" />
          </li>
        </ul>
        <div class="tab-content" v-show="curIndex == 0">
          <ul>
            <li v-for="(item,index) in showInfoList(tabInfoList,0)" :key="index">
              <a :href="item.impUrl">
                <div class="imp">
                  <div class="imp-title">
                    <i :class="['colorStyleIcon',styleArr[0]]">&#xe605;</i>
					<i :class="['colorStyleIcon',styleArr[1]]">&#xe606;</i>
                    <span class="imp-name">{{item.impName}}</span>
                  </div>
                  <div class="imp-content">{{item.impTime}}</div>
                </div>
              </a>
            </li>
          </ul>
          <div :class="['all',styleArr[0]]" v-if="tabInfoList.length > 5 && brandFold[0]" @click="changeFoldState(0)">查看全部</div>
          <div :class="['all',styleArr[0]]" v-if="!brandFold[0]" @click="changeFoldState(0)">点击收起</div>
        </div>
        <div class="tab-content" v-show="curIndex == 1">
          <ul>
            <li v-for="(item,index) in showInfoList(tabInfoList2,1)" :key="index">
              <a :href="item.impUrl">
                <div class="imp">
                  <div class="imp-title">
					<i :class="['colorStyleIcon',styleArr[0]]">&#xe605;</i>
					<i :class="['colorStyleIcon',styleArr[1]]">&#xe606;</i>
                    <span class="imp-name">{{item.impName}}</span>
                  </div>
                  <div class="imp-content">{{item.impTime}}</div>
                </div>
              </a>
            </li>
          </ul>
          <div :class="['all',styleArr[0]]" v-if="tabInfoList2.length > 5 && brandFold[1]" @click="changeFoldState(1)">查看全部</div>
          <div :class="['all',styleArr[0]]" v-if="!brandFold[1]" @click="changeFoldState(1)">点击收起</div>
        </div>
        <div class="tab-content" v-show="curIndex == 2">
          <ul>
            <li v-for="(item,index) in showInfoList(tabInfoList3,2)" :key="index">
              <a :href="item.impUrl">
                <div class="imp">
                  <div class="imp-title">
                    <i :class="['colorStyleIcon',styleArr[0]]">&#xe605;</i>
					<i :class="['colorStyleIcon',styleArr[1]]">&#xe606;</i>
                    <span class="imp-name">{{item.impName}}</span>
                  </div>
                  <div class="imp-content">{{item.impTime}}</div>
                </div>
              </a>
            </li>
          </ul>
          <div :class="['all',styleArr[0]]" v-if="tabInfoList3.length > 5 && brandFold[2]" @click="changeFoldState(2)">查看全部</div>
          <div :class="['all',styleArr[0]]" v-if="!brandFold[2]" @click="changeFoldState(2)">点击收起</div>
        </div>
        <div class="tab-content" v-show="curIndex == 3">
          <ul>
            <li v-for="(item,index) in showInfoList(tabInfoList4,3)" :key="index">
              <a :href="item.impUrl">
                <div class="imp">
                  <div class="imp-title">
                    <i :class="['colorStyleIcon',styleArr[0]]">&#xe605;</i>
					<i :class="['colorStyleIcon',styleArr[1]]">&#xe606;</i>
                    <span class="imp-name">{{item.impName}}</span>
                  </div>
                  <div class="imp-content">{{item.impTime}}</div>
                </div>
              </a>
            </li>
          </ul>
          <div :class="['all',styleArr[0]]" v-if="tabInfoList4.length > 5 && brandFold[3]" @click="changeFoldState(3)">查看全部</div>
          <div :class="['all',styleArr[0]]" v-if="!brandFold[3]" @click="changeFoldState(3)">点击收起</div>
        </div>
      </div>
    </div>

    <slot name="functions" />
  </div>
</template>

<script>
	export default {
		name: 'keywordsInfo',
		props: {
			datas: Object,
			hide: Boolean,
		},
		data() {
			return {
				styleArr:[],
				brandFold: [true, true, true, true],
				curIndex: 0,
				clickImg: 'http://m.bendibao.com/news/jingdianyuyue/images/xz_17.png',
				impIcon: require('@/assets/images/article.png'),
				tabInfoList: [
					{
						impName: '北京疫情最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '北京疫情最新消息每日新增',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '北京疫情最新消息',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '疫情最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '疫情最新消息每日新增(更新中)',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '疫情最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '疫情最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
				],
				tabInfoList2: [
					{
						impName: '武汉疫情最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '北京疫情最新消息每日新增',
						impTime: '2022-08-04 10:53',
					},
				],
				tabInfoList3: [
					{
						impName: '上海疫情最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
					{
						impName: '上海疫情最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
				],
				tabInfoList4: [
					{
						impName: '广州疫情最新消息每日新增(不断更新中)',
						impTime: '2022-08-04 10:53',
					},
				],
			}
		},
		computed: {
			tabStyle(){
				if (this.datas.value_list) {
					if (this.datas.value_list.length == 2) {
						return {'justify-content': 'flex-start'}
					}else{
						return {'justify-content': 'space-between'}
					}
				}
			},
			liveheaderfn() {
      			return this.$store.state.colorStyle;
			},
			
	},
			watch: {
				liveheaderfn(newValue) {
					this.styleArr = this.getStyleArr()
				}
			},  
		mounted() {
			this.styleArr = this.getStyleArr()
		},
		methods: {
			showInfoList(listName, index) {
				if (this.brandFold[index]) {
					if (listName.length < 6) {
						return listName
					}
					let newArr = []
					for (var i = 0; i < 5; i++) {
						let item = listName[i]
						newArr.push(item)
					}
					return newArr
				}
				return listName
			},
			tab(index) {
				this.curIndex = index
			},
			changeFoldState(index) {
				this.brandFold[index] = !this.brandFold[index]
			},
		},
	}
</script>

<style lang="less" scoped>
	.keywordsInfo {
		position: relative;
		color: #333;
		&.hide::before {
			content: '';
			display: flex;
			align-items: center;
			justify-content: center;
			color: #ffffff;
			font-size: 20px;
			position: absolute;
			left: 0;
			right: 0;
			top: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.4);
		}
		.info-tab {
			margin: 12px;
			padding: 18px 10px;
			border-radius: 10px;
			background-color: #fff;
			.tab-bar {
				.bar-title {
					display: flex;
					align-items: center;
					justify-content: space-between;
					color: #999;
					.title-name {
						font-size: 17px;
						line-height: 30px;
					}
				}
				.tab-content {
					ul {
						.imp {
							padding: 12px 0;
							border-bottom: 1px solid #efefef;
							.imp-title {
								display: flex;
								i:first-child{
									z-index: 10;
								}
								i:last-of-type{
									transform: translateX(-10px);
									z-index: 1;

								}
								.imp-name {
									font-size: 16px;
									font-weight: 600;
									color: #333;
								}
							}
							.imp-content {
								font-size: 13px;
								color: #999;
								margin-left: 27px;
								margin-top: 7px;
							}
						}
					}
				}
			}
		}

		.click {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #333;
			font-weight: 700;
			img {
				width: 30px;
				height: 4px;
			}
		}

		.all {
			margin: 19px auto 0;
			text-align: center;
			font-size: 13px;
			color: #3f74fc;
		}
	}
</style>
