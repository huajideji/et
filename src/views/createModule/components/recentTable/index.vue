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
  <div class="recent-topic">
    <div class="header">
      <img src="@/assets/images/edit.png" alt="" />
      <span>最近填写表格</span>
    </div>
    <div class="container">
      <ul>
        <li v-for="(item, index) in topicData" :key="index" class="news-item">
          <span class="icon" :class="{ delete: !item.is_deleted }"></span>
          <span
            @click="editProject(item)"
            :class="{ delete: item.is_deleted }"
          >
            {{ item.describe }} <span v-if="item.is_copy"> -副本 </span>
          </span>
        </li>
        <li class="news-item no-data" v-if="Object.keys(topicData).length == 0">
          暂无数据
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecentTable',
  props: {
    topicData: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
  
  },
  methods: {
   
    editProject(item) {
      if (item.is_deleted == 0) {
        this.$router.push({
          name: 'moduleData',
          query: {
            id: item.table_id,
            title: item.describe,
          },
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '该专题或副本已被删除',
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.recent-topic {
  padding: 0 18px 20px;
  // font-size: 13px;
  max-height: 50%;
  overflow: hidden;

  .header {
    display: flex;
    color: #333333;
    align-items: center;
    margin-bottom: 8px;
    // font-weight: bold;
    font-family: 'Microsoft YaHei';

    > img {
      height: 20px;
      margin-right: 6px;
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
      // color: #6065ec;
      @include font_color;
      .icon {
        // background-color: #6065ec;
        @include background_color
      }
    }

    .delete {
      color: #c0c4cc;
    }
  }
}
</style>
