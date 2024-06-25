<template>
  <div id="app">
    <!-- <transition name="fade"> -->
    <router-view v-if="isRouterAlive" />
    <!-- </transition> -->
  </div>
</template>

<script>
import utils from './utils'
export default {
  provide() {
    return {
      reload: this.reload,
    }
  },

  data() {
    return {
      isRouterAlive: true,
    }
  },
  created() {
    // 测试暂时在App.vue中使用创建cookie获取后端数据，后面进行修改(过期设置时间为1天)
	 utils.setCookie('d6a4_bdbyharr', 'd2gmeWF5YSbpm4Xpm4V8ODAxQDliYzQ1ODllMTdkNTgyNGE1YjQ5MDRlNDM5NzcyM2Y3LA%3D%3D')
	 utils.setCookie('d6a4_citysite', 'd2g%3D')
  },
  mounted() { },  
  beforeMount(){
  document.getElementsByTagName("body")[0].className ="theme-normal";
  },
  methods: {
    // 刷新页面
    reload() {
      this.isRouterAlive = false
      this.$nextTick(() => {
        this.isRouterAlive = true
      })
    },
  },
} 
</script>

<style lang="less">
:root{
  --linear-color:rgba(222,233,255,0.2);
  --linear-colorbef:#ebf2ff;
  --basecolor:#3F74FC;
  --fivePercent-color:rgba(63,116,252,0.05);
  --tenPercent-color:rgba(63,116,252,0.1);
}
#app {
  position: absolute;
  left: 0;
  top: 0;
}
  
// 页面切换动画
.fade-enter-active {
  transition: all 1.5s ease;
}

.fade-leave-active {
  transition: all 1.5s ease;
}

.fade-enter {
  transform: translateX(5px);
  opacity: 0;
}

.fade-leave-to {
  transform: translateX(5px);
  opacity: 0;
}

.el-message-box.JSONView {
  width: 1100px;
}

// 提示样式
.Prompt {
  font-size: 12px;
  color: #969799;
  margin-bottom: 10px
}
</style>
