<template>
  <div class="wrap">
    <div class="nav">
      <div class="title">
        <img src="@/assets/images/logo.png" alt="" />
        <div></div>
        <!-- <span class="all-title">EasyTopic</span> -->
        <img class="logoname-img" src="@/assets/images/logo-name.png" alt="">
      </div>
      <div class="login-out">
        <div>{{ username }}</div>
        <img src="@/assets/images/login-out.png" alt="" @click="loginOut" />
        <span @click="loginOut">退出</span>
      </div>
    </div>
    <div class="layout">
      <section class="subject">
        <el-aside width="150px" class="left-aside">
          <!-- <div class="logo">配置后台</div> -->
          <LeftMenu />
        </el-aside>
        <el-container class="main-container">
          <!-- 子路由 -->
          <transition name="layoutFade">
            <router-view />
          </transition>
        </el-container>
      </section>
    </div>
  </div>
</template>

<script>
import LeftMenu from '@/components/commonComponents/leftMenu/index.vue'
import utils from '@/utils/index.js'
export default {
  name: 'layout',
  components: {
    LeftMenu,
  },
  data() {
    return {
      // username: utils.getCookie('ET_User_Info2.0'),
      username:'',
    }
  },
  async mounted() {
    let localInfo = JSON.parse(localStorage.getItem('ET_User_Info2.0'))
    if(localInfo){
        this.username = localInfo.data
    }
  },
  methods: {
    loginOut() {
      localStorage.removeItem('ET_User_Info2.0');
      this.$router.push({ path: '/login' })
    },
  },
}
</script>

<style lang="scss" scoped>
@import "@/assets/css/mixin.scss";
.all-title{
	@include font-color;
}
.wrap {
  width: 100%;
  height: 100%;
  .nav {
    height: 60px;
    box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.1);
    position: relative;
    display: flex;
    align-items: center;
    .title {
      display: flex;
      position: absolute;
      left: 50px;
      align-items: center;
      img {
        width: 75px;
        height: 39px;
        object-fit: cover;
      }
      div {
        width: 1px;
        height: 34px;
        background-color: #D9D9D9;
        margin: 0px 13px 0px 15px;
      }
      span {
        color: #333333;
        font-size: 24px;
        font-weight: 700;
      }
      .logoname-img {
        width: 159px;
        height: 40px;
      }
    }
    .login-out {
      display: flex;
      position: absolute;
      right: 66px;
      align-items: center;
      div {
        width: 39px;
        height: 39px;
        // background-color: #7b33f1;
        @include background_color;
        border-radius: 50%;
        color: #ffffff;
        font-size: 12px;
        line-height: 39px;
        text-align: center;
        margin-right: 34px;
      }
      img {
        width: 18px;
        height: 18px;
        object-fit: cover;
        cursor: pointer;
      }
      span {
        color: #333333;
        font-size: 16px;
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
  .layout {
    width: 100%;
    height: calc(100% - 60px);

    /* 主体 */
    .subject {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;

      /* 侧边栏 */
      .logo {
        width: 149px;
        height: 84px;
        line-height: 84px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: 700;
      }

      .left-aside {
        border-right: 1px solid #e6e6e6;
        padding-top: 30px;
      }

      .main-container {
        padding: 20px;
        overflow-y: auto;
        /* 滚动条 */
        &::-webkit-scrollbar {
          width: 5px;
        }

        &::-webkit-scrollbar-thumb {
          background-color: #d9d9d9;
          border-radius: 2.5px;
        }
      }
    }
  }
}

/* // 页面切换动画 */
// .layoutFade-enter-active {
//   transition: all 0.5s ease;
// }
// .layoutFade-leave-active {
//   transition: all 0.5s ease;
// }
.layoutFade-enter {
  transform: translateY(5px);
  opacity: 0;
}

.layoutFade-leave-to {
  transform: translateY(5px);
  opacity: 0;
}
</style>
