<template>
  <div class="edittabletab" >
    <div class="container">
      <!-- <div class="module-title">
        <div v-if="!datas.titleHide" class="title">
          <span>{{ datas.moduleName }}</span>
        </div>
        <div class="more" v-if="datas.jump_type == 0">
          <span class="">查看更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div> -->
      <div class="search" v-if="datas.addSearch.field.length">
        <input type="text" :placeholder="datas.addSearch.guideWords">
        <span>
          搜索
        </span>
      </div>
      <table>
        <thead>
          <tr>
            <th v-for="(item, index) of datas.headerList" :key="index">{{ item.name }}</th>
          </tr>
        </thead>
        <tbody>

          <template v-if="tableData.length">
            <tr v-for="(item, index) of tableData" :key="index" v-show="showIndex(index)">
              <td v-for="(curItem, curIndex) of Object.values(item)" :key="curIndex">
                <!-- 根据选择数据类型处理样式 -->
                <span v-if="datas.headerList[curIndex].type == 0">
                  {{ curItem }}
                </span>
                <span v-else-if="datas.headerList[curIndex].type == 1">
                  {{ curItem }}
                </span>
                <span v-else-if="datas.headerList[curIndex].type == 2">
                  {{ curItem }}
                </span>
                <span v-else-if="datas.headerList[curIndex].type == 3">
                  {{ curItem }}
                </span>
                <span v-else-if="datas.headerList[curIndex].type == 4">
                  {{ curItem }}
                </span>
                <button v-else-if="datas.headerList[curIndex].type == 5" class="specified-btn">
                  {{ curItem }}
                </button>
                <button v-else-if="datas.headerList[curIndex].type == 6" class="custom-btn">
                  {{ curItem }}
                </button>

                <span v-else-if="datas.headerList[curIndex].type == 7">
                  {{ curItem }}
                </span>
                <div v-else-if="datas.headerList[curIndex].type == 8" class="phone">
                  <a :href="`tel:${curItem.phoneNum}`"> {{ curItem.phoneNum }}</a>
                  <span>
                    {{ curItem.note }}
                  </span>
                </div>
                <a v-else-if="datas.headerList[curIndex].type == 9" style="color: #6065ec; fontSize:12px;"
                  :href="curItem.url">
                  {{ curItem.name }}
                </a>
              </td>
            </tr>
          </template>
          <tr class="empty" v-else>
            <td :colspan="datas.headerList.length">
              {{ datas.addSearch.emptyPrompt }}
            </td>
          </tr>
        </tbody>
      </table>
      <footer v-if="datas.jump_type == 1 || datas.jump_type == 2 || +datas.foldingNum">
        <div class="more-box" v-if="datas.jump_type == 1 || datas.jump_type == 2"
          :style="{ textAlign: datas.jump_type == 1 ? 'right' : 'center' }">
          <span class="">查看更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <!-- 展开更多选项 -->
        <div class="showMore" v-if="tableData.length > +datas.foldingNum && +datas.foldingNum"
          @click="showMore = !showMore">
          <template v-if="showMore">
            展开更多
          </template>
          <template v-else>
            收起更多
          </template>
        </div>
      </footer>
      <!-- 添加功能插槽 -->
      <slot name="functions" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'edittabletab',
  props: {
    datas: Object,
  },
  data() {
    return {
      showMore: true,
      tableData: [
        {
          date: '11',
          phone: {
            phoneNum: '1390867',
            note: '转8 李女士',
          },
          btnName: '上海市',
          hyperlink: {
            name: '去百度',
            url: 'http://www.baidu.com',
          }
        }, {
          date: ' 22',
          phone: {
            phoneNum: '1390867',
            note: '转8 李女士',
          },
          btnName: '上海市',
          hyperlink: {
            name: '去百度',
            url: 'http://www.baidu.com',
          }
        }, {
          date: '32',
          phone: {
            phoneNum: '1390867',
            note: '转8 李女士',
          },
          btnName: '上海市',
          hyperlink: {
            name: '去百度',
            url: 'http://www.baidu.com',
          }
        }, {
          date: '44',
          phone: {
            phoneNum: '1390867',
            note: '转8 李女士',
          },
          btnName: '上海市',
          hyperlink: {
            name: '去百度',
            url: 'http://www.baidu.com',
          }
        }
      ]
    }
  },
  mounted() {
    // 对象转数组测试
    // let testArr = Object.values({
    //   date: 4,
    //   phone: {
    //     phoneNum: '1390867',
    //     note: '转8 李女士',
    //   },
    //   address: '上海市',
    //   age: 18,
    // })
    // console.log(testArr)
  },

  methods: {
    // 折叠数回调
    showIndex(index) {
      if (+this.datas.foldingNum) {
        return index >= +this.datas.foldingNum && !this.showMore || index < this.datas.foldingNum
      } else {
        return true
      }
    },
    showDele() {
    }
  },
}
</script>
<style scoped lang="less">
// @tableWidth: 364px;
.edittabletab {
  position: relative;

  &.hide::before {
    content: '生成选项卡';
    display: flex;
    align-items: center;
    justify-content: center;
    color: #FFFFFF;
    font-size: 20px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .4);
    z-index: 1000;
  }

  .container {
    position: relative;
    width: 351px;
    padding: 17.5px 12px 21px;
    margin: 0 auto;
    border-radius: 10px;
    background-color: #fff;



    .module-title {
      display: flex;
      align-items: center;
      padding: 0 8px 12.5px;
      justify-content: space-between;
      position: relative;
      min-height: 32px;

      .title {
        color: #333;
        font-size: 16px;
        font-weight: 700;

        >img {
          width: 16px;
          height: 20px;
          margin-right: 6px;

        }
      }

      .more {
        position: absolute;
        right: 0;

        >span {
          color: #6065EC;
          font-size: 14px;
        }
      }

    }

    .search {
      height: 36px;
      border: 1px solid #3F74FC;
      height: 32px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: 0 auto 21px;
      padding-left: 19px;
      border-right: none;

      >input {
        width: 90%;
        height: 26px;
      }

      >span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 56px;
        height: 32px;
        border-radius: 0 5px 5px 0;
        background-color: #3F74FC;
        color: #fff;
        font-size: 13px;
      }
    }

    table {
      margin: 0 auto;
      width: 100%;
      border-collapse: collapse;

      thead {
        tr {
          background-color: #F5F8FF;
          border: 1px solid #F0F0F0;
        }
      }

      tbody {
        tr {
          border-bottom: 1px solid #F0F0F0;
          border-left: 1px solid #F0F0F0;
          border-right: 1px solid #F0F0F0;

          &:nth-child(2n) {
            background-color: #F5F8FF;
          }
        }
      }

      tr th {
        white-space: nowrap;
      }

      tr th,
      tr td {
        padding: 5px;
        text-align: center;
      }

      tr td {

        // display: flex;
        // justify-content: center;
        font-size: 12px;

        .rank {
          font-size: 12px;
          width: 20px;
          height: 20px;
          margin: auto;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: aquamarine;
        }

        .specified-btn,
        .custom-btn {
          padding: 4px 6px;
          border-radius: 4px;
          background-color: #ECF1FE;
          color: #4574E9;
          border: none;
          font-size: 12px;
        }

        .phone {
          font-size: 12px;

          a {
            font-size: 12px;
            margin-right: 6px;
            color: #6065EC;
          }
        }
      }


      .empty {
        td {
          text-align: center;
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

        >span {
          color: #6065EC;
          font-size: 12px;
        }

        text-align: center;
      }

      .showMore {
        color: #3F74FC;
        text-align: center;
        display: flex;
        z-index: 2;
      }
    }
  }
}
</style>