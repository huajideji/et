<template>
  <div class="tab-content">
    <ul class="infinite-list" v-loading="loading">
      <li
        v-for="item of tabData"
        :key="item.id"
        class="infinite-list-item"
        @click="showDetail(item)"
      >
        <div>
          <!-- `@/assets/images/1-${item.module_type_id}` -->
          <div class="img-box">
            <img :src="imgList[item.module_type_id - 1]" alt="" />
          </div>
          <div class="under-img">
            <div class="item-name">{{ item.name }}</div>
            <div class="item-id">
              <span>id</span> <span>{{ item.id }}</span>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import icon from '@/assets/images/1-1.png';
import banner_list from '@/assets/images/1-2.png';
import share_blue from '@/assets/images/1-3.png';
import keyword from '@/assets/images/1-4.png';
import disclaimer from '@/assets/images/1-5.png';
import banner from '@/assets/images/1-6.png';
import module_entry from '@/assets/images/1-7.png';
import network from '@/assets/images/1-8.png';
import latest_news from '@/assets/images/1-9.png';
import image_text from '@/assets/images/1-10.png';
import article_list from '@/assets/images/1-11.png';
import article_timeline from '@/assets/images/1-12.png';
import powder_guide from '@/assets/images/1-13.png';
import policy_points from '@/assets/images/1-14.png';
import table from '@/assets/images/1-15.png';
import editor_guide from '@/assets/images/1-17.png';
import qaimg from '@/assets/images/1-18.png';
import buttonimg from '@/assets/images/1-21.png';
import card_bag from '@/assets/images/1-22.png';
import medal_table from '@/assets/images/1-25.png';
import function_module from '@/assets/images/1-26.png';
export default {
  name: 'TabContent',
  props: {
    tabData: {
      type: Array,
      default: () => [],
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      imgList: [
        icon,
        banner_list,
        share_blue,
        keyword,
        disclaimer,
        banner,
        module_entry,
        network,
        latest_news,
        image_text,
        article_list,
        article_timeline,
        powder_guide,
        policy_points,
        table,
        editor_guide,
        editor_guide,
		qaimg,
		qaimg,
		qaimg,
		buttonimg,
		card_bag,
    // 此处两个由于新增的倒计时banner模块和关键词文章两个模块没有对应的模块图，需要选用两个占位
		card_bag,
		article_list,
    // 
    medal_table,
    function_module,
    article_list
      ]
    }
  },
  mounted() {
  },
  methods: {
    showDetail(item) {
      // table_id为0代表不是表格关联模块
      if (item.table_id == 0) {
        this.$router.push({
          name: 'dataDetail',
          query: { id: item.id, name: item.name },
        })
      } else {
        this.$message.success('该模块为表格关联模块，跳转到对应的表格信息界面')
        this.setSessionItem('clickIndex', 1)
        this.$router.push({
          name: 'moduleData',
          query: { id: item.table_id, name: item.table_name },
        })
      }
    },
  },
}
</script>
<style lang="less" scoped>
.tab-content {
  .infinite-list {
    display: flex;
    flex-wrap: wrap;

    .infinite-list-item {
      width: 24%;
      margin-right: 1%;
      margin-bottom: 1%;

      .img-box {
        height: 270px;
        display: flex;
        align-items: center;
        background-color: #f9f9f9;
        padding: 10px;

        img {
          width: 100%;
          max-height: 100%;
          object-fit: cover;
          border-radius: 4px 4px 0px 0px;
        }
      }

      .under-img {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 20px;
        background-color: #f9f9f9;

        .item-name {
          white-space: nowrap;
          text-overflow: ellipsis;
          -webkit-text-overflow: ellipsis;
          overflow: hidden;
        }

        .item-id {
          color: #999999;
        }
      }
    }
  }
}
</style>
