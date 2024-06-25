<template>
  <div class="icontoolkit" :class="{ 'hide': datas.is_hide}">
    <div class="container">
      <div class="module-title" v-if="datas.is_show != 0 || datas.jump_place == 0 ">
        <div v-if="datas.is_show" class="title">
          <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                    <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
            </div>
          <span>{{ datas.name }}</span>
        </div>
        <div class="more" v-if="datas.jump_place == 0">
          <span class="">更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
      <!-- 默认导航 -->
      <section class="defaultNavigation" v-if="!datas.value_list[0]" :style="{
        background: datas.backgroundColor,
        display: 'flex',
      }">
        <!-- 导航 -->
        <div class="navigationList" v-for="index in 4" :key="index">
          <!-- 图片 -->
          <img src="../../../assets/images/imgs.png" alt="默认图片" draggable="false"
            :style="{ 'border-radius': datas.borderRadius + '%' }" />
          <!-- 文字 -->
          <p :style="{ color: datas.textColor }">导航</p>
        </div>
      </section>

      <!-- 导航列表 -->
      <section class="defaultNavigation" v-else :style="{
        background: datas.backgroundColor,
        display: datas.imgStyle === 0 ? 'flex' : '-webkit-box',
        'flex-wrap': idsWrap ? 'wrap' : 'nowrap',
        'overflow-x': idsWrap ? '' : 'scroll',
      }">
        <!-- 导航 -->
        <div class="navigationList" v-for="(item, index) in datas.value_list" :key="index" :style="{
          width: isThree ? '33.333%' : '25%',
        }">
          <!-- 图片 -->
          <!-- v-show="datas.navigationType === 0" -->
          <img
            :src="item.image ? item.image : 'https://img2.baidu.com/it/u=3751095442,3459205618&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=375'"
            alt="默认图片" draggable="false" :style="{ 'border-radius': datas.borderRadius + '%' }" />
          <!-- 文字 -->
          <p :style="{
            color: datas.textColor,
            'font-size': datas.textSize + 'px',
            height: datas.textHeight + 'px',
            'line-height': datas.textHeight + 'px',
          }" :class="{ spacing: idsWrap }">
            {{ item.name }}
          </p>
        </div>
      </section>

      <footer v-if="datas.jump_place == 1 || datas.jump_place == 2">
        <div class="more-box" v-if="datas.jump_place == 1 || datas.jump_place == 2"
          :style="{ textAlign: datas.jump_place == 1 ? 'right' : 'center' }">
          <span class="">更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </footer>

    </div>

    <!-- 功能组件 -->
    <slot name="functions" />
  </div>
</template>

<script>
export default {
  name: 'icontoolkit',
  data() {
        return {
            styleArr:[],
        }
    },
  props: {
    datas: Object,
    hide: Boolean,
  },
  created() {
       this.styleArr = this.getStyleArr()
  },
   watch: {
     liveheaderfn(newValue) {
       this.styleArr = this.getStyleArr()
     }
    },  
  computed: {
    liveheaderfn() {
      return this.$store.state.colorStyle;
    },
    // 区分样式选择
    idsWrap() {
      return this.datas.value_list.length === 5 || this.datas.value_list.length === 6 || this.datas.value_list.length === 7 ||this.datas.value_list.length === 8
    },
    // 每行是3个icon需要变换icon样式
    isThree() {
      return this.datas.value_list.length === 6 || this.datas.value_list.length === 3
    }
  }
}
</script>

<style scoped lang="less">
.icontoolkit {
  position: relative;

  &.hide::before {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
  }

  .container {
    width: 351px;
    border-radius: 10px;
    // padding: 20px 0;
    padding-top: 15px;
    padding-bottom: 20px;
    margin: 12px auto;
    background-color: #FFFFFF;

    .module-title {
      display: flex;
      align-items: center;
      padding: 0 8px 12.5px 12px;
      justify-content: space-between;
      position: relative;
      min-height: 32px;

      .title {
        display: flex;
        align-items: center;
        color: #333;
        font-size: 16px;
        font-weight: 700;

        >img {
          height: 16px;
          width: auto;
          margin-right: 6px;

        }
      }

      .more {
        position: absolute;
        right: 5px;

        >span {
          color: #999999;
          font-size: 14px;
        }
      }
    }

    /* 默认导航 */
    .defaultNavigation {

      // overflow-x: scroll;
      // justify-content: space-between;
      &::-webkit-scrollbar {
        height: 1px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #155bd4;
      }

      /* 导航 */
      .navigationList {
        flex-shrink: 0;
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;

        img {
          margin-top: 5px;
          width: 50px;
          height: 50px;
        }

        p {
          font-size: 13px;
          font-weight: 500;
          color: #666;
          margin-top: 5px;
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          text-align: center;
          box-sizing: border-box;

          &.spacing {
            margin-bottom: 10px;
          }
        }
      }
    }

    footer {
      position: relative;
      min-height: 30px;
      padding-top: 14px;
      display: flex;
      justify-content: center;

      .more-box {
        position: absolute;
        bottom: 0;
        width: 100%;
        padding: 0 12px;

        >span {
          color: #999999;
          font-size: 12px;
        }

        text-align: center;
      }
    }
  }
}
</style>
