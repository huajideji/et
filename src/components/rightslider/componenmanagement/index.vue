<template>
  <div class="componenManagement">
    <!-- 标题 -->
    <h2>模块顺序</h2>
    <p class="Prompt">分享模块为固定页面底部，无需拖拽调整位置</p>
    <!-- 拖拽 -->
    <vuedraggable v-model="data" v-bind="dragOptions">
      <transition-group>
        <div
          v-for="(item, ind) in data"
          :key="item.text + ind"
          :class="item.text == '分享' ? 'item delDragitem' : 'item'"
        >
          <p>
            <i class="el-icon-s-grid" style="margin-right: 15px" />{{
              item.setStyle.name?item.setStyle.name:item.text
            }}
          </p>
          <!-- </el-popconfirm> -->
        </div>
      </transition-group>
    </vuedraggable>
  </div>
</template>

<script>
import vuedraggable from 'vuedraggable' //拖拽组件

export default {
  name: 'componenmanagement',
  props: ['datas'],
  components: { vuedraggable },
  data() {
    return {
      data: this.datas,
      dragOptions: {
        animation: 200,
        // class是 delDragitem 禁止拖拽
        filter: '.delDragitem',
      },
    }
  },
  mounted(){
    this.datas.forEach((item)=>{
      if(item.setStyle.name == "countdown_banner"){
        item.setStyle.name = '倒计时banner图'
      }
    })
    console.log(this.data,'拖拽');
  },
  methods: {
    /* 删除组件 */
    onConfirms(res) {
      this.data.splice(res, 1)
      this.$emit('componenmanagement', this.data)
    },
  },
  watch: {
    datas(newVal) {
      this.data = newVal
     
    },

    data(newVal) {
      this.$emit('componenmanagement', newVal)
    },
  },
  computed: {},
}
</script>

<style scoped lang="less">
/* 组件管理 */
.componenManagement {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: 0 10px;
  box-sizing: border-box;
  /* 标题 */
  h2 {
    padding: 24px 16px 24px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid #f2f4f6;
    font-size: 18px;
    font-weight: 600;
    color: #323233;
  }

  /* 选项 */
  .item {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-size: 14px;
    cursor: all-scroll;
    color: #323233;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(10, 42, 97, 0.2);
    margin-bottom: 10px;
    i {
      color: #999;
    }
  }
  .delDragitem {
    background-color: rgba(10, 42, 97, 0.2);
    cursor: no-drop;
  }
}
</style>
