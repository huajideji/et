<template>
  <div class="login">
    <div class="logo">
      <img src="@/assets/images/logo-white.png" alt="" />
    </div>

    <div class="form">
      <p><img src="../../assets/images/login-config.png" alt="" /> EasyTopic</p>

      <div class="input">
        <input type="text" v-model="username" readonly="readonly" />
        <img src="../../assets/images/user.png" alt="" />
        <div></div>
      </div>

      <el-button type="primary" @click="login">登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
    }
  },
  async mounted() {
    const res = await this.$api.reqGetUserLoginInfo()
    if (res) {
      this.username = res.user_info.realname
    }
  },
  methods: {
    login() {
      // const res = await this.$api.reqGetUserLoginInfo()
      // if (res) {
        let obj = {
          data:'雅雅',
          startTime:new Date().getTime(),
          expires:8*60*60*1000
        }
        localStorage.setItem('ET_User_Info2.0',JSON.stringify(obj));
      // }
      // this.$router.push({ path: '/subjectList' })
      this.$router.push({ path: '/subjectList' })
    },
  },
}
</script>

<style lang="less" scoped>
.login {
  height: 100%;
  background-image: url('../../assets/images/login-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .logo {
    position: absolute;
    top: 70px;
    left: 160px;
    img {
      width: 149px;
      height: 71px;
      object-fit: cover;
    }
  }
  .form {
    display: flex;
    flex-direction: column;
    width: 380px;
    padding-bottom: 10px;
    p {
      width: 100%;
      color: white;
      font-size: 42px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        margin-right: 22px;
        width: 37px;
        height: 35px;
        object-fit: cover;
      }
    }
    .input {
      height: 64px;
      position: relative;
      margin-top: 40px;
      input {
        width: 100%;
        height: 64px;
        font-size: 20px;
        border-radius: 100px;
        padding-left: 81px;
        color: #999999;
        cursor: not-allowed;
      }
      img {
        position: absolute;
        width: 23px;
        height: 23px;
        left: 36px;
        top: 20px;
      }
      div {
        position: absolute;
        height: 23px;
        width: 1px;
        background-color: #f2f2f2;
        left: 70px;
        top: 20px;
      }
    }

    .el-button {
      width: 100%;
      font-size: 20px;
      height: 64px;
      border-radius: 100px;
      margin-top: 38px;
      background-color: #01d1bf;
      border: none;
    }
  }
}
</style>

