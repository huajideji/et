<template>
  <div class="custommodule">
    {{ datas.demo }}
    <img :src="datas.img" alt="">
    <!-- 添加功能插槽 -->
    <slot name="functions" />
  </div>
</template>

<script>
export default {
  name: 'custommodule',
  props: {
    datas: Object,
  },
}
</script>

<style scoped lang="less">
.custommodule {
  position: relative;
  img{
    width: 100%;
  }
}
</style>
