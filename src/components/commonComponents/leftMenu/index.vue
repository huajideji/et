<template>
  <div class="left-menu">
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu-vertical"
      text-color="#999"
      active-text-color="#6065EC"
      :router="true"
    > -->
    <!-- <el-menu-item index="/subjectList" >
        <i class="el-icon-menu"></i>
        <span slot="title">专题列表</span>
      </el-menu-item>
      <el-menu-item index="/draftBox">
        <i class="el-icon-receiving"></i>
        <span slot="title">草稿箱</span>
      </el-menu-item> -->
    <router-link
      to="/subjectList"
      class="menu-item flex-center"
      @click.native="tab(0)"
      :class="clickIndex == 0 ? 'menu-active' : ''"
    >
      <img v-show="clickIndex != 0" src="@/assets/images/list.png" alt="" />
      <img
        v-show="clickIndex == 0"
        src="@/assets/images/list-active.png"
        alt=""
      />
      <span>专题</span>
    </router-link>
    <router-link
      to="/createModule"
      class="menu-item flex-center"
      @click.native="tab(1)"
      :class="clickIndex == 1 ? 'menu-active' : ''"
    >
      <img
        v-show="clickIndex != 1"
        src="@/assets/images/tableModule.png"
        alt=""
      />
      <img
        v-show="clickIndex == 1"
        src="@/assets/images/tableModule_active.png"
        alt=""
      />
      <span>表格</span>
    </router-link>

    <div :class="guideShow[9] ? ['guideHigh', 'guidePad6'] : ''">
      <router-link
        to="/my"
        class="menu-item flex-center"
        @click.native="tab(2)"
        :class="clickIndex == 2 ? 'menu-active' : ''"
      >
        <img v-show="clickIndex != 2" src="@/assets/images/my.png" alt="" />
        <img
          v-show="clickIndex == 2"
          src="@/assets/images/my-active.png"
          alt=""
        />
        <span>我的</span>
      </router-link>
    </div>

     <!-- <router-link
        to="/draftBox"
        class="menu-item flex-center"
        @click.native="tab(2)"
        :class="[
          clickIndex == 2 ? 'menu-active' : '',
          guideShow[9] ? 'guideHigh' : '',
        ]"
      >
        <img v-show="clickIndex != 2" src="@/assets/images/draft.png" alt="" />
        <img
          v-show="clickIndex == 2"
          src="@/assets/images/saveDraft.png"
          alt=""
        />
        <span>草稿箱</span>
      </router-link> -->

    <div :class="guideShow[10] ? ['guideHigh', 'guidePad6'] : ''">
      <router-link
        to="/dataCenter"
        class="menu-item flex-center"
        @click.native="tab(3)"
        :class="clickIndex == 3 ? 'menu-active' : ''"
      >
        <img
          v-show="clickIndex != 3"
          src="@/assets/images/dataCenter.png"
          alt=""
        />
        <img
          v-show="clickIndex == 3"
          src="@/assets/images/dataCenter_active.png"
          alt=""
        />
        <span>数据</span>
      </router-link>
    </div>
    <div :class="guideShow[11] ? ['guideHigh', 'guidePad6'] : ''">
      <router-link
        to="/helpCenter"
        class="menu-item flex-center"
        @click.native="tab(4)"
        :class="clickIndex == 4 ? 'menu-active' : ''"
      >
        <img v-show="clickIndex != 4" src="@/assets/images/help.png" alt="" />
        <img
          v-show="clickIndex == 4"
          src="@/assets/images/help-active.png"
          alt=""
        />
        <span>帮助</span>
      </router-link>
    </div>

    <!-- <div
      class="menu-item flex-center"
      style="border: 1px solid red"
      @click.native="tab(5)"
      :class="clickIndex == 5 ? 'menu-active' : ''"
    >
      <img v-show="clickIndex != 5" src="@/assets/images/huizong.png" alt="" />
      <img
        v-show="clickIndex == 5"
        src="@/assets/images/huizong-active.png"
        alt=""
      />
      <span>专题合集管理</span>
    </div> -->
  <div :class="guideShow[12] ? ['guideHigh', 'guidePad6'] : ''">
    <div
      class="menu-item flex-center other"
      @click="tab(5)"
      :class="[
        clickIndex == 5 || clickIndex == 6 || clickIndex == 7
          ? 'menu-active'
          : '',
      ]"
    >
      <img
        v-if="clickIndex == 5 || clickIndex == 6 || clickIndex == 7"
        src="@/assets/images/huizong-active.png"
        alt=""
      />
      <img v-else src="@/assets/images/huizong.png" alt="" />

      <span class="title">专题合集</span>
    </div>
    <ul
      class="help-center"
      v-show="clickIndex == 5 || clickIndex == 6 || clickIndex == 7"
    >
      <div @click="tab(6)" :class="[clickIndex == 6 ? 'submenu-active' : '']">
        <router-link to="/zhuantiHuizong"><span>专题管理</span> </router-link>
      </div>

      <div @click="tab(7)" :class="[clickIndex == 7 ? 'submenu-active' : '']" style="padding-bottom: 15px;">
        <router-link to="/zhuantiLocation"
          ><span>专题位置管理</span>
        </router-link>
      </div>
    </ul>
  </div>

    <!-- </el-menu> -->
  </div>
</template>
<script>
export default {
  name: 'LeftMenu',
  data() {
    return {
      activeIndex: 'subjectList',
      clickIndex: 0,
      guideShow: [],
      routePath: '',
    }
  },
  created() {
    this.routePath = this.$route.path
  },
  mounted() {
    // this.activeIndex = this.$route.path
    if (!sessionStorage.getItem('clickIndex')) {
      this.clickIndex = 0
      this.setSessionItem('clickIndex', this.clickIndex)
    } else {
      this.clickIndex = parseInt(sessionStorage.getItem('clickIndex'))
    }
    this.guideShow = JSON.parse(sessionStorage.getItem('guideShow'))
    // if (JSON.parse(sessionStorage.getItem('guideShow5'))) {
    //   this.guideShow5 = true
    // }
    // if (JSON.parse(sessionStorage.getItem('guideShow8'))) {
    //   this.guideShow8 = true
    // }
    window.addEventListener('setItem', () => {
      this.guideShow = JSON.parse(sessionStorage.getItem('guideShow'))
      // this.guideShow5 = JSON.parse(sessionStorage.getItem('guideShow5'))
      // this.guideShow8 = JSON.parse(sessionStorage.getItem('guideShow8'))
      this.clickIndex = parseInt(sessionStorage.getItem('clickIndex'))
    })
  },
  methods: {
    tab(index) {
      this.clickIndex = index
      this.setSessionItem('clickIndex', this.clickIndex)
    },
    // 新手指引
    // guide(name) {
    //   // this.$router.push('/subjectList')
    //   this.$router.push({
    //     path: `/subjectList/${name}`,
    //   })
    //   this.setSessionItem('guideShow', true)
    // },
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        switch (val.name) {
          case 'subjectList':
            this.clickIndex = 0
            this.setSessionItem('clickIndex', this.clickIndex)
            break
          case 'createModule':
            this.clickIndex = 1
            this.setSessionItem('clickIndex', this.clickIndex)
            break
          case 'my':
            this.clickIndex = 2
            this.setSessionItem('clickIndex', this.clickIndex)
            break
          case 'dataCenter':
            this.clickIndex = 3
            this.setSessionItem('clickIndex', this.clickIndex)
            break
          case 'helpCenter':
            this.clickIndex = 4
            this.setSessionItem('clickIndex', this.clickIndex)
            break
          case 'zhuantiHuizong':
            this.clickIndex = 5
            this.setSessionItem('clickIndex', this.clickIndex)
            break
        }
      },
      // 深度观察监听
      deep: true,
    },
  },
}
</script>
<style lang="scss" scoped>
@import '@/assets/css/mixin.scss';
.left-menu {
  .el-menu-vertical {
    // width: 134px;
  }
  // .el-menu-item {
  //   img {
  //     width: 16px;
  //     height: 15px;
  //     margin-right: 6px;
  //   }
  // }
  .menu-item {
    height: 44px;
    line-height: 44px;
    padding: 0 0 0 26px;
    margin-right: 14px;
    // display: block;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    word-break: break-all;
    cursor: pointer;
    img {
      width: 18px;
      height: 18px;
      margin-right: 6px;
    }
  }
  .other {
    img {
      width: 16px;
      height: 15px;
    }
    .title {
      color: #969696;
    }
  }
  .help-center {
    padding: 0 0 0 52px;
    margin-top: -10px;
    div{
      margin: 15px 0px;
    }
    li {
      margin-bottom: 28px;
      color: #999999;
      &:hover {
        // color: #6065ec;
        @include font_color;
        cursor: pointer;
      }
    }
    a:hover {
      // color: #6065ec !important;
      @include font_color;
    }
  }
  .submenu-active {
    span {
      @include font_color;
    }
  }
  .menu-active {
    border-radius: 0 4px 4px 0px;
    border-left: 4px solid #6065ec;
    @include border-left-color;
    // background-color: rgba(41, 50, 252, 0.05);
    @include background_color2;
    span {
      // color: #6065ec !important;
      @include font_color;
    }
  }
}
</style>
<style>
.left-menu .el-menu {
  border-right: unset;
}
.left-menu .el-menu-item {
  height: 44px;
  line-height: 44px;
}

/* .left-menu .el-menu-item.is-active {
  border-radius: 0 4px 4px 0px;
  background: rgba(41, 50, 252, 0.05);
  border-left: 4px solid #6065ec;
} */
</style>
