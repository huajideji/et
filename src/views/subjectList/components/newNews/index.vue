<template>
  <div class="new-news">
    <div class="my-more">
      <div class="top-image">
        <img src="@/assets/images/sy_dtTop.png" alt="" />
      </div>
      <div class="bottom-image">
        <img src="@/assets/images/sy_dtBottom.png" alt="" />
      </div>
      <div class="header">
        <img src="@/assets/images/sy_dt.png" alt="" />
        <span>最新动态</span>
      </div>
      <div @click="toMorePage" class="font-color">更多 ></div>
    </div>
    <div class="container">
      <ul>
        <li v-for="(item, index) in newsData" :key="index">
          <div class="add-time">
            <span>
              {{ format_time(item.add_time) }}
            </span>
          </div>
          <div class="timeline">
            <div class="content">
              <span>
                {{ item.username }}
              </span>
              <span>{{ item.type_name }}了</span>
              <span class="font-color">
                {{ item.name }}
              </span>
              <span v-if="item.type == 1 || item.type == 5"> 专题数据 </span>
              <span v-if="item.type == 4"> 城市限制 </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NewNews',
  props: {
    newsData: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    console.log(this.newsData)
    this.format_time()
  },
  methods: {
    // 格式化后端返回时间
    format_time(time = '2022-08-23 15:00:45') {
      return time.slice(0, -3)
    },
    //去更多页面
    toMorePage() {
      this.$router.push({
        name: 'more_page',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.new-news {
  margin-top: 12px;
  // height: 520px;
  // height: 50%;
  // background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(255,249,250,1) 51%, rgba(255,255,255,1) 100%);
  // background-image: url('../../../../assets/images/sy_dt1.png');
  // background-repeat: no-repeat;
  // background-size: 100% 100%;
  padding: 20px 0px 0px 18px;
  position: relative;
  .top-image {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    border-radius: 6px;
    img {
      width: 100%;
      height: 77px;
      object-fit: cover;
    }
  }
  .bottom-image {

      width: 100%;
      position: absolute;
      border-radius: 6px;
      bottom: -6px;
      left: 0;
      z-index: -1;
      img {
        width: 100%;
        height: 92px;
        object-fit: cover;
      }
    }
  .my-more {
    display: flex;
    justify-content: space-between;
    .header {
      display: flex;
      color: #333333;
      align-items: center;
      margin-bottom: 24px;
      // font-weight: bold;
      font-family: 'Microsoft YaHei';

      > img {
        height: 20px;
        margin-right: 6px;
      }
    }
  }

  .container {
    ul {
      li {
        margin-top: 5px;
        display: flex;
        &:last-child {
          .timeline {
            border-left: none !important;
          }
        }

        div {
          font-size: 13px;
          &.add-time {
            position: relative;
            min-width: 110px;

            > span {
              position: absolute;
              top: -10px;
            }
          }

          &.timeline {
            flex-grow: 1;
            padding-bottom: 10px;
            margin-left: 8px;
            padding-left: 13px;
            border-left: 1px dashed #d9d9d9;
            position: relative;
            min-height: 30px;

            &::before {
              content: '';
              position: absolute;
              display: block;
              width: 7px;
              height: 7px;
              background-color: #d9d9d9;
              border-radius: 50%;
              left: -4px;
              top: -3.5px;
            }

            .content {
              // position: absolute;
              // top:-10px
              margin-top: -10px;
            }
          }
        }
      }
    }
  }
}
</style>
