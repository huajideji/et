<template>
  <div class="placementarea">
    <div class="container">
      <span class="add">
        <img src="@/assets/images/add-module.png" alt="">
      </span>
      <span class="content">新增模块从左边拖入画布</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'placementarea',
}
</script>

<style scoped lang="less">
.placementarea {
  .container {
    margin: 0 auto;
    box-sizing: border-box;
    width: 351px;
    border-radius: 10px;
    border: 1px dashed #7E9BFF;
    height: 80px;
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    .add {
      display: flex;
      width: 25px;
      height: 25px;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      border: 2px solid #CFCECE;
      margin-right: 5px;
    }

    .content {
      color: #999999;
      display: inline-block;
      width: 140px;
      height: 25px;
      font-size: 12px;
      text-align: center;
      line-height: 25px;
      background: #fff;
    }
  }
}
</style>
