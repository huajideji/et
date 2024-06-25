<template>
  <div class="countdown_banner" :class="{ hide: datas.is_hide }">
    <div
      v-if="datas.value_list[0]"
      class="banner_img"
     
    >
    <img :src="datas.value_list[0].image" alt="">
      <div class="daojishi_describe">
        <p>{{ datas.value_list[0].content }}</p>

        <span
          class="describe_number"
          v-for="(item, index) in datas.value_list[0].dateArr"
          :key="index"
          >{{ item }}</span
        >
        <span class="describe_tian" v-if="datas.value_list[0].dateArr">天</span>
      </div>
    </div>
    <div v-if="pagedata.city_select_type==1" class="select_wrap">
		<div >切换城市:</div>
		<div >广东 <i class="el-icon-caret-bottom"></i></div>
		<div >深圳 <i class="el-icon-caret-bottom"></i></div>
	</div>
    <slot name="functions" />
  </div>
</template>

<script>
export default {
  name: 'countdown_banner',
  props: {
    datas: Object,
    hide: Boolean,
    pageset:Object,
  },
  data() {
		return {
			pagedata:{}
		}
  },
  watch: {
    pageset: {
      handler(newVal) {
        this.pagedata = newVal
      },
      deep: true,
    }
  },
    mounted() {
      this.pagedata = this.pageset
    let target_date = this.datas.value_list[0].target_date
    if (target_date) {
      let val = new Date(target_date)
      let year = val.getFullYear()
      let month = val.getMonth() + 1
      let day = val.getDate()
      let d1 = new Date(year + '/' + month + '/' + day)
      let dd = new Date()
      let y = dd.getFullYear()
      let m = dd.getMonth() + 1
      let d = dd.getDate()
      let d2 = new Date(y + '/' + m + '/' + d)
      let iday = (parseInt(d1 - d2) / 1000 / 60 / 60 / 24).toString()
      let arr = []
      for (let i = 0; i < iday.length; i++) {
        arr.push(iday.charAt(i))
      }
      this.datas.value_list[0].dateArr = arr
    }
  },
}
</script>

<style lang="less" scoped>
.select_wrap{
	display: flex;
	justify-content: space-around;
	margin-top: -20px;
	width: 95%;
	padding: 17.5px 12px 21px;
    border-radius: 10px;
    background-color: #fff;
	z-index: 999;
	margin: auto;
	div{
		margin-right: 15px;
	}
}
.countdown_banner {
  position: relative;

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
  .banner_img {
    height: 100%;
    // background-image: url(https://imgbdb4.bendibao.com/xcxbdb/20233/24/2023324165631_23536.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    img{
				height: 200px;
				width: 100%;
			}
    .daojishi_describe {
      display: flex;
      align-items: flex-end;
      position: absolute;
      color: #f5f5f9;

      top: 135px;
      right: 10px;
      p {
        max-width: 150px;
        white-space: pre-wrap;
        font-size: 12px;
        font-weight: 400;
        margin-right: 5px;
      }
      .describe_number {
        display: inline-block;
        margin: 0px 2px;
        padding: 10px;
        width: 18px;
        height: 18px;
        font-size: 18px;
        line-height: 18px;
        font-weight: 700;
        color: #8733e0;
        text-align: center;
        border-radius: 6px;
        opacity: 1;
        background: #ffffff99;
        backdrop-filter: blur(6px);
        box-shadow: 0 2px 9px 0 #8733e04d;
      }
      .describe_tian {
        font-size: 12px;
        display: inline-block;
        margin-left: 5px;
      }
    }
  }
}
</style>
