<template>
  <div
    class="headerTop"
  >
    <span>{{datas.text}}</span>
  </div>
</template>

<script>
export default {
  name: 'test',
  props: {
    datas: Object,
  },
}
</script>

<style lang="less" scoped>
.headerTop {
  height: 35px;
  width: 100%;
  background: #fff;
  display: flex;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  border-bottom: 1px solid #f7f8fa;
  position: relative;
  /* 左边 */
  .lef {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    /* 图标 */
    span {
      color: #000;
      font-weight: 400;
      font-size: 12px;
    }
  }
  .header-title {
    width: 100%;
    text-align: center;
    font-size: 14px;
    line-height: 35px;
    color: #333333;
  }
  /* 右边 */
  .rig {
    // display: flex;
    // align-items: center;
    // height: 100%;
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    /* 搜索图标 */
    i {
      font-size: 18px;
      margin: 0 7px 5px;
    }

    /* 文字 */
    span {
      margin: 0 7px;
      font-size: 12px;
    }
  }
}
</style>
