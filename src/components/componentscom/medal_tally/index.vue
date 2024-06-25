<template>
  <div class="medal_table" :class="{ hide: datas.is_hide }">
    <div class="container">
      <div class="module-title" v-if="datas.is_show != 0">
        <div v-if="datas.is_show" class="title">
          <img src="@/assets/images/title.png" alt="" />
          <span>{{ datas.name }}</span>
        </div>
      </div>

      <div class="medal-table">
        <table align="center">
          <div class="table-header">
            <tr>
              <td style="width: 110px">排名</td>
              <td style="width: 100px">国家/地区</td>
              <td>金牌</td>
              <td>银牌</td>
              <td>铜牌</td>
              <td>总计</td>
            </tr>
          </div>
          <div
            class="table-content"
            v-for="(item, index) in medalList"
            :key="index"
            v-show="showIndex(index)"
            :class="
              item.rank == 1
                ? 'first'
                : item.rank == 2
                ? 'second'
                : item.rank == 3
                ? 'third'
                : 'other'
            "
          >
            <tr>
              <td v-if="item.rank == 1" class="rank-img">
                <img src="@/assets/images/medal_first.png" alt="" />
              </td>
              <td v-else-if="item.rank == 2" class="rank-img">
                <img src="@/assets/images/medal_second.png" alt="" />
              </td>
              <td v-else-if="item.rank == 3" class="rank-img">
                <img src="@/assets/images/medal_third.png" alt="" />
              </td>
              <td v-else style="width: 110px" class="noImage">
                {{ item.rank }}
              </td>
              <td class="region">{{ item.country }}</td>

              <td>{{ item.gold }}</td>
              <td>{{ item.silver }}</td>
              <td>{{ item.copper }}</td>
              <td>{{ item.total }}</td>
            </tr>
          </div>
        </table>
      </div>

      <div
        class="showMore"
        v-if="medalList.length > +datas.fold && +datas.fold"
        @click="showMore = !showMore"
      >
        <template v-if="showMore"> 展开更多 </template>
        <template v-else> 收起更多 </template>
      </div>
    </div>

    <slot name="functions" />
  </div>
</template>

<script>
export default {
  name: 'medal_table',
  props: {
    datas: Object,
    hide: Boolean,
  },
  data() {
    return {
      showMore: true,
      medalList: [
        { rank: 1, country: '中国', gold: 1, silver: 1, copper: 1, total: 3 },
        { rank: 2, country: '中国', gold: 1, silver: 1, copper: 1, total: 3 },
        { rank: 3, country: '中国', gold: 1, silver: 1, copper: 1, total: 3 },
        { rank: 4, country: '中国', gold: 1, silver: 1, copper: 1, total: 3 },
        { rank: 5, country: '中国', gold: 1, silver: 1, copper: 1, total: 3 },
      ],
    }
  },
  mounted() {},
  methods: {
    showIndex(index) {
      if (+this.datas.fold) {
        return (
          (index >= +this.datas.fold && !this.showMore) ||
          index < this.datas.fold
        )
      } else {
        return true
      }
    },
  },
}
</script>

<style lang="less" scoped>
.medal_table {
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
      padding: 0 8px;
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

        > img {
          height: 16px;
          width: auto;
          margin-right: 6px;
        }
      }
    }
    .medal-table {
      border-radius: 6px;
      .table-header {
        color: #828282;
        height: 50px;
        line-height: 50px;
        background-color: #fff;
      }
      .table-content {
        color: #222;
        height: 60px;
        line-height: 60px;
        img {
          width: 47px;
          height: 25px;
          position: absolute;
          left: 17px;
          top: 16px;
        }
      }
      .first {
        background: linear-gradient(90deg, #ffe9e8 0%, #ff504a00 89%);
      }
      .second {
        background: linear-gradient(90deg, #fff0e9 0%, #ff7e3800 89%);
      }
      .third {
        background: linear-gradient(90deg, #fff6e9 0%, #ffaf4100 89%);
      }
      .other {
        border-bottom: 1px solid #ededed;
      }
      .rank-img {
        width: 110px;
        position: relative;
      }
      .region {
        width: 100px;
        text-align: left;
        padding-left: 5px;
      }
      table {
        width: 100%;
      }
      tr {
        text-align: center;
      }
      td {
        width: 50px;
        font-size: 16px !important;
      }
    }
    .showMore {
      min-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #3f74fc;
      z-index: 2;
    }
  }
}
</style>
