<template>
  <div class="success">
    <img src="@/assets/images/success.png" alt="" />
    <div class="tips">上传成功！</div>
    <div class="operator">
      <button class="goBack" @click="goBack">
        <span>返回首页</span>
      </button>
      <button class="copy" @click="copyID()">
        <span>复制模块ID,马上去使用</span>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'success',
  data() {
    return {
      timer: null,
    }
  },
  computed: {},
  mounted() {},
  methods: {
    goBack() {
      this.$router.push({
        name: 'createModule',
      })
    },
    copyID() {
      let input = document.createElement('input') // 创建input对象
      input.value = this.$route.query.moduleId // 设置复制内容
      document.body.appendChild(input) // 添加临时实例
      input.select() // 选择实例内容
      document.execCommand('Copy') // 执行复制
      document.body.removeChild(input) // 删除临时实例
      this.$message.success('复制成功！')
    },
  },
}
</script>
<style scoped lang="scss">
@import "@/assets/css/mixin.scss";
.success {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  > img {
    width: 260px;
  }

  .tips {
    font-size: 16px;
    color: #333;
    margin-top: 20px;

    > span {
      // color: #6065ec;
      @include font_color;
    }
  }

  .goBack {
    margin-top: 20px;
    border: 1px solid #6065ec;
    background-color: #fff;
    border-radius: 4px;
    width: 183px;
    height: 38px;
    // color: #6065ec;
    @include font_color;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      margin-left: 4px;
    }
  }
  .copy {
    margin-left: 30px;
    margin-top: 20px;
    border: none;
    // background-color: #6065ec;
    @include background_color;
    border-radius: 4px;
    width: 183px;
    height: 38px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;

    > span {
      margin-left: 4px;
    }
  }
  .operator {
    display: flex;
  }
}
</style>
<style lang="less" >
</style>