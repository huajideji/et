
<template>
  <div class="moduleentry" :class="{ hide: datas.is_hide }">
    <div class="container">
      <div class="module-title" v-if="datas.is_show">
        <div class="fontIcon-string">
                    <span :class="['colorStyleIcon',styleArr[0]]">&#xe603;</span>
                    <span :class="['colorStyleIcon',styleArr[1]]">&#xe604;</span>
                </div>
        <span>{{ datas.name }}</span>
      </div>
      <main>
        <div class="left">
          <div class="default">
            <div v-if="datas.value_list[0].image || datas.value_list[0].title">
              <span>{{ datas.value_list[0].title }}</span>
              <img
                v-if="datas.value_list[0].image"
                :src="datas.value_list[0].image"
                alt=""
                class="image"
                @click="enterContent(datas.value_list[0])"
              />
            </div>

            <template v-else>
              <span>接种点查询</span>
              <img src="@/assets/images/vaccination.png" alt="" />
            </template>
          </div>
        </div>
        <div class="right">
          <div class="default-top">
            <div v-if="datas.value_list[1].image || datas.value_list[1].title">
              <span>{{ datas.value_list[1].title }}</span>
              <img
                v-if="datas.value_list[1].image"
                :src="datas.value_list[1].image"
                alt=""
                class="image"
                @click="enterContent(datas.value_list[0])"
              />
            </div>
            <template v-else>
              <span>预约渠道</span>
              <img src="@/assets/images/brightSpot.png" alt="" />
            </template>
          </div>
          <div class="default-bottom">
            <div v-if="datas.value_list[2].image || datas.value_list[2].title">
              <span>{{ datas.value_list[2].title }}</span>
              <img
                v-if="datas.value_list[2].image"
                :src="datas.value_list[2].image"
                alt=""
                class="image"
                @click="enterContent(datas.value_list[0])"
              />
            </div>
            <template v-else>
              <span>金色健康码</span>
              <img src="@/assets/images/code.png" alt="" />
            </template>
          </div>
        </div>
      </main>
    </div>
    <!-- 添加功能插槽 -->
    <slot name="functions" />
  </div>
</template>
<script>
export default {
  name: 'moduleentry',
  props: {
    datas: Object,
  },
  data() {
    return {
      styleArr:[],
    }
  },
  mounted() {
    this.styleArr = this.getStyleArr()
  },

  methods: {
    enterContent(item) {
      // window.location = item.http
    },
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
// @tableWidth: 364px;
.moduleentry {
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

  .container {
    width: 351px;
    display: flex;
    border-radius: 10px;
    background-color: #fffdfd;
    box-sizing: border-box;
    padding: 21px 12px;
    margin: 12px auto;
    flex-direction: column;

    .module-title {
      display: flex;
      align-items: center;
      margin-bottom: 13.5px;
      font-size: 16px;
      font-weight: 700;
      color: #333;

      > img {
        height: 16px;
        width: auto;
        margin-right: 6px;
      }
    }

    main {
      width: 100%;
      display: flex;
      // flex-direction: column;
      justify-content: space-between;
    }

    .image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .left {
      display: flex;

      .default {
        width: 157.5px;
        height: 131px;
        border-radius: 10px;
        background: linear-gradient(
          90deg,
          rgba(183, 232, 229, 1) 0%,
          rgba(220, 246, 244, 1) 100%
        );
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
         
        position: relative;
        div {
          span {
            font-size: 16px;
            color: #333;
            letter-spacing: 1px;
            position: absolute;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            width: 120px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }

        > span {
          padding-left: 17px;
          color: #333;
          font-size: 16px;
        }
      }
    }

    .right {
      height: 131px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .default-top {
        width: 157.5px;
        height: 59.5px;
        border-radius: 10px;
        background: linear-gradient(
          90deg,
          rgba(173, 188, 249, 1) 0%,
          rgba(209, 217, 254, 1) 100%
        );
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;
        position: relative;
        div {
          span {
             font-size: 16px;
            color: #333;
            letter-spacing: 1px;
            position: absolute;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            width: 120px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        > span {
          padding-left: 17px;
          color: #333;
          font-size: 16px;
        }
      }

      .default-bottom {
        width: 157.5px;
        height: 59.5px;
        border-radius: 10px;
        background: linear-gradient(
          90deg,
          rgba(240, 217, 159, 1) 0%,
          rgba(251, 237, 202, 1) 100%
        );
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 12px;
        overflow: hidden;
        position: relative;
        div {
          span {
            font-size: 16px;
            color: #333;
            letter-spacing: 1px;
            position: absolute;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            width: 120px;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
        > span {
          padding-left: 17px;
          color: #333;
          font-size: 16px;
        }
      }
    }
  }
}
</style>