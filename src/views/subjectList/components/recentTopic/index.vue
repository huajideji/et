<template>
  <!-- <div class="recent-topic">
    <el-card class="box-card">
      <div slot="header">
        <span>最近填写专题</span>
      </div>
      <div class="news-item" v-for="(item, index) in topicData" :key="index">
        <span @click="editProject(item)" :class="{ delete: !item.is_deleted }">
          {{ item.name }} <span v-if="item.is_copy"> -副本 </span>
        </span>
      </div>
    </el-card>
  </div> -->
  <div class="recent">
    <div class="recent-topic left">
      <div class="top-image">
        <img src="@/assets/images/sy_hotTop.png" alt="" />
      </div>
         <div class="bottom-image">
        <img src="@/assets/images/sy_hotBottom.png" alt="" />
      </div>
      <div class="header">
        <div class="header-icon">
          <img src="@/assets/images/sy_hot.png" alt="" />
        </div>

        <span>热门专题推荐Top7</span>
      </div>
      <div class="container">
        <div v-for="(item, index) of hotData" :key="item.id">
          <div class="rank">
            <img v-if="index == 0" src="@/assets/images/rank1.png" alt="" />
            <img
              v-else-if="index == 1"
              src="@/assets/images/rank2.png"
              alt=""
            />
            <img
              v-else-if="index == 2"
              src="@/assets/images/rank3.png"
              alt=""
            />
            <span v-else class="other">{{ index + 1 }}</span>
            <span @click="openHotZt(item)"> {{ item.name }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="recent-topic" style="margin-left:10px">
      <div class="top-image">
        <img src="@/assets/images/sy_ztTop.png" alt="" />
      </div>
         <div class="bottom-image">
        <img src="@/assets/images/sy_ztBottom.png" alt="" />
      </div>
      <div class="header">
        <div class="header-icon">
          <img src="@/assets/images/sy_zt2.png" alt="" />
        </div>

        <span>最近填写专题</span>
      </div>
      <div class="container">
        <ul>
          <li v-for="(item, index) in topicData" :key="index" class="news-item">
            <span class="icon" :class="{ delete: !item.is_deleted }"></span>
            <span
              @click="editProject(item)"
              :class="{ delete: !item.is_deleted }"
            >
              {{ item.name }} <span v-if="item.is_copy"> -副本 </span>
            </span>
          </li>
          <li
            class="news-item no-data"
            v-if="Object.keys(topicData).length == 0"
          >
            暂无数据
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecentTopic',
  props: {
    topicData: {
      type: Array,
      default: () => [],
    },
    hotData: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    editProject(item) {
      if (item.is_deleted != 0) {
        this.$router.push({
          name: 'dataManage',
          query: {
            id: item.id,
            title: item.name,
          },
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '该专题或副本已被删除',
        })
      }
    },
    openHotZt(item) {
      this.$router.push({
        name: 'dataManage',
        query: {
          id: item.id,
          title: item.name,
        },
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.recent {
  display: flex;
  .recent-topic {
    flex: 1;
    padding: 20px 0px 0px 18px;
    // font-size: 13px;
    position: relative;
    max-height: 50%;
    overflow: hidden;
    border-radius: 6px;
    border: 1px solid rgba(242,244,243,1);
    z-index: 999;
    .top-image {
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      img {
        width: 100%;
        height: 77px;
        // border: 1px solid red;
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

    .header {
      display: flex;
      color: #333333;
      align-items: center;
      margin-bottom: 8px;
      // font-weight: bold;
      font-family: 'Microsoft YaHei';
      .header-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        margin-right: 4px;
        > img {
          // height: 20px;
          width: 20px;
          height: 20px;
          // margin-right: 6px;
        }
      }
    }
    .container {
      height: 288px;
      .rank {
        display: flex;
        align-items: center;
        // border: 1px solid red;
        

        cursor: pointer;
        img {
          width: 16.5px;
          height: 16.5px;
        }
        font-size: 15px;
        margin: 18px 0px;
        .other {
          color: #666666;
          margin: 0px 7px 0px 3px;
        }
        span:nth-child(2) {
          font-size: 14px;
          color: #666666;
          margin-left: 5px;
        }
        span:nth-child(2):hover {
          @include font_color;
        }
      }
    }

    .news-item {
      height: 40px;
      cursor: pointer;
      color: #666666;
      display: flex;
      align-items: center;

      &.no-data {
        justify-content: center;
        color: #c0c4cc;
      }

      .icon {
        display: block;
        width: 4px;
        height: 4px;
        background-color: #666;
        margin-right: 6px;
        border-radius: 50%;

        &.delete {
          background-color: #c0c4cc !important;
        }
      }

      &:hover {
          color: #2CAEE6;
        // color: #6065ec;
        // @include font_color;
        .icon {
          // background-color: #6065ec;
          @include background_color;
        }
      }

      .delete {
        color: #c0c4cc;
      }
    }
  }
}
</style>
