<template>
  <div class="new-news">
    <div class="header">
      <img src="@/assets/images/dynamic.png" alt="">
      <span>最新动态</span>
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
                {{ item.describe }}
              </span>
              <span v-if="item.type == 1">
                表格数据
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LatestNews',
  props: {
    newsData: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.format_time()
  },
  methods:{
    // 格式化后端返回时间
    format_time(time = '2022-08-23 15:00:45') {
      return time.slice(0,-3)
    }
  },
}
</script>

<style lang="less" scoped>
.new-news {
  // margin-top: 50px;
  height:50%;
  background: rgba(41, 50, 252, 0.02);
  padding: 20px 18px 0;
  

  .header {
    display: flex;
    color: #333333;
    align-items: center;
    margin-bottom: 24px;
    // font-weight: bold;
    font-family: "Microsoft YaHei";

    >img {
      height: 20px;
      margin-right: 6px;
    }
  }

  .container {
    ul {
      li {
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

            >span {
              position: absolute;
              top:-10px
            }
          }

          &.timeline {
            flex-grow: 1;
            padding-bottom: 10px;
            margin-left: 8px;
            padding-left: 13px;
            border-left: 1px dashed #D9D9D9;
            position: relative;
            min-height: 30px;
            

            &::before {
              content: '';
              position: absolute;
              display: block;
              width: 7px;
              height: 7px;
              background-color: #D9D9D9;
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
