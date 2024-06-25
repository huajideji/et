<template>
  <div class="edittable" :class="{ 'hide': datas.is_hide}">
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
          <span :class="styleArr[0]">查看更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
      </div>
	  <div class="option-wrap" v-if="datas.is_option==1">
	  	<div class="option-item" :class="select_index(index)" v-for="(item,index) in datas.option_data.split('^')" :key="index" @click="clickoption(index,item)">
	  		{{item.name==undefined?item:item.name}}
	  	</div>
	  </div>
      <div :class="['search',styleArr[8]]" v-if="datas.is_search && datas.search_field.length && datas.search_field != '[]'">
        <input type="text" :placeholder="datas.guide_text">
        <span  :class="[styleArr[4]]">
          搜索
        </span>
      </div>
      <div class="table-box">
        <table>
          <thead>
            <tr>
              <th v-for="(item, index) of columnArr" :key="index">{{ item.name }}</th>
            </tr>
          </thead>
          <tbody>

            <template v-if="tableData.length">
              <tr v-for="(item, index) of tableData" :key="index" v-show="showIndex(index)">
                <td v-for="(curItem, curIndex) of item" :key="curIndex">
                  <!-- 根据选择数据类型处理样式 -->
                  <span v-if="columnArr[curIndex].type == 0">
                    {{ curItem.value }} {{ curItem.value1 }}
                  </span>
                  <span v-else-if="columnArr[curIndex].type == 1">
                    {{ curItem.value }} {{ curItem.value1 }}
                  </span>
                  <span v-else-if="columnArr[curIndex].type == 2">
                    {{ curItem.value }} {{ curItem.value1 }}
                  </span>
                  <span v-else-if="columnArr[curIndex].type == 3">
                    {{ curItem.value }} {{ curItem.value1 }}
                  </span>
                  <span v-else-if="columnArr[curIndex].type == 4">
                    {{ curItem.value }} {{ curItem.value1 }}
                  </span>
                  <button v-else-if="columnArr[curIndex].type == 5" class="specified-btn">
                    {{ curItem.btn_name }}
                  </button>
                  <button v-else-if="columnArr[curIndex].type == 6" class="custom-btn">
                    {{ curItem.btn_name }}
                  </button>
                  <span v-else-if="columnArr[curIndex].type == 8">
                    {{ curItem.value }} {{ curItem.value1 }}
                  </span>
                  <div v-else-if="columnArr[curIndex].type == 9" class="phone">
                    <a :href="`tel:${curItem.value}`"> {{ curItem.value }}</a>
                    <span>
                      {{ curItem.value1 }}
                    </span>
                  </div>
                  <a v-else-if="columnArr[curIndex].type == 10" style="color: #6065ec; fontSize:12px;"
                    :href="curItem.value">
                    {{ curItem.value }}
                  </a>
                  <!-- null -->
                </td>
              </tr>
            </template>
            <tr class="empty" v-else>
              <td :colspan="columnArr.length">
                {{ datas.no_tips }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <footer v-if="datas.jump_place == 1 || datas.jump_place == 2 || +datas.fold">
        <div class="more-box" v-if="datas.jump_place == 1 || datas.jump_place == 2"
          :style="{ textAlign: datas.jump_place == 1 ? 'right' : 'center' }">
          <span :class="styleArr[0]">查看更多
            <i class="el-icon-arrow-right"></i>
          </span>
        </div>
        <!-- 展开更多选项 -->
        <div :class="['showMore',styleArr[0]]" v-if="tableData.length > +datas.fold && +datas.fold" @click="showMore = !showMore">
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
  name: 'edittable',
  props: {
    datas: Object,
  },
  data() {
    return {
      styleArr:[],
      showMore: true,
    }
  },
  mounted() {
    this.styleArr = this.getStyleArr()
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
    columnArr() {
      // 筛选非默认字段
      let arr = []
      if (this.datas.value_list.length) arr = this.datas.value_list.filter(item => item.default == 0)
      if (this.datas.is_county) {
        arr.unshift({
          btn_name: "",
          default: 1,
          is_required: 1,
          is_select: 1,
          name: "区县",
          type: 0,
        })
      }
      if (this.datas.is_city) {
        arr.unshift({
          btn_name: "",
          default: 1,
          is_required: 1,
          is_select: 1,
          name: "城市",
          type: 0,
        })
      }
      return arr
    },
    tableData() {
      let data = new Array(6).fill(new Array())
      if (this.columnArr.length) {
        this.columnArr.forEach((column, index) => {
          if (column.type == 9) {
            data[index].push({
              name: column.name,
              value: '1354323',
              value1: '转8 李女士',
              type: column.type,
              btn_name: column.btn_name,
            })
          } else {
            data[index].push({
              name: column.name,
              value: 'null',
              value1: '',
              type: column.type,
              btn_name: column.btn_name,
            })
          }

        })
      }
      return data
    }

  },
  methods: {
	  clickoption(index){
	  	this.selectIndex = index 
	  },
	  select_index(index) {
	      let arr = []
	      if (this.selectIndex == index) {
	          arr.push('select_index')
	          arr.push(this.styleArr[4])
	      } else {
	          arr = []
	      }
	      return arr
	  },
    // 折叠数回调
    showIndex(index) {
      if (+this.datas.fold) {
        return index >= +this.datas.fold && !this.showMore || index < this.datas.fold
      } else {
        return true
      }
    },
  },
}
</script>
<style scoped lang="less">
	//选项样式
	.select_index{
		background-color: #3F74FC;
		color: #fff !important;
	}
	.option-wrap::-webkit-scrollbar { width: 0 !important }
	.option-wrap{
		display: flex;
		overflow: scroll;
		>div{
		width: auto;
		white-space: nowrap;
			background-color: #f0f0f0;
			color: #666;
			margin-right: 5px;
			padding: 1px 8px;
			border-radius: 5px;
		}
	}
// @tableWidth: 364px;
.edittable {
  position: relative;

  &.hide::before {
    position: absolute;
    content: '';
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 10;
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
      padding: 0 8px 12.5px 0;
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
      margin-top: 2px;

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

    .table-box {
      width: 100%;
      overflow-x: scroll;

      &::-webkit-scrollbar {
        height: 1px;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #155bd4;
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
          // white-space: nowrap;
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
          font-size: 14px;
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