<template>
  <div class="login-container">
    <div
      ref="loginWrapper"
      class="login-bg-wrapper"
    >
      <img :src="$isMobile ? ImageMobileBg1 : ImageBg1" />
    </div>
    <div class="flex form-wrapper">
      <div class="left"></div>
      <div class="right">
        <div class="my-width flex-sub flex justify-center align-center">
          <div class="title margin-left" style="color: deepskyblue">Welcome to DocSync</div>
        </div>
        <el-form :model="form" class="form-container">
          <div class="item-wrapper">
            <el-input
              v-model="form.username"
              placeholder="Please enter username/email"
              prefix-icon="el-icon-user"
              clearable
            />
          </div>
          <div class="item-wrapper margin-top-lg">
            <el-input
              v-model="form.password"
              placeholder="Please enter password"
              type="password"
              clearable
              prefix-icon="el-icon-lock"
            />
          </div>
          <div class="flex-sub"></div>
          <div class="margin-top-lg">
            <el-button
              style="color: #0f0f10"
              class="login"
              @click="login"
            >
              Login
            </el-button>
          </div>
          <div class="margin-top-rg">
            <el-button
              type="info"
              style="color: #0f0f10"
              class="login"
              @click="register"
            >
              Register
            </el-button>
          </div>
        </el-form>
        <div class="my-width flex-sub margin-top">
          <div class="flex justify-between">
            <el-checkbox v-model="autoLogin" style="color: #ffffff">Auto Login</el-checkbox>
            <el-link
              :underline="false"
              style="color: #ffffff"
              @click="forget"
            >Forgot Password?</el-link>
          </div>
        </div>
      </div>
    </div>
    <div class="login-footer-wrapper">
      <PageFooter />
    </div>
  </div>
</template>

<script>
import ImageBg1 from '@/assets/img_login_bg_01.png'
import ImageMobileBg1 from '@/assets/img_login_mobile_bg_01.jpg'
import PageFooter from '@/layouts/footer'
import VawVerify from 'vaw-verify'
import 'vaw-verify/lib/vaw-verify.css'
import qs from 'qs'
const data = {}
export default {
  name: 'Login',
  components: { PageFooter, VawVerify },
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      ImageBg1,
      ImageMobileBg1,
      redirect: '',
      autoLogin: false,
      verifyState: false,
      defaultTheme: this.$layoutStore.state.theme
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.$layoutStore.changeTheme('light')
  },
  destroyed() {
    this.$layoutStore.changeTheme(this.defaultTheme)
  },
  methods: {
    login() {
      if (!this.form.username) {
        this.$errorMsg('Please enter username')
        return
      }
      if (!this.form.password) {
        this.$errorMsg('Please enter password')
        return
      }
      this.$axios.post(
        '/user/login',
        qs.stringify(this.form)
      )
        .then((res) => {
          data.userName = res.data.username
          data.userId = res.data.user_id
          data.token = res.data.authorization
          data.avatar = res.data.avatar
          if (res.data.result === 2) {
            this.$store
              .dispatch('user/saveUserInfo', data)
              .then((_) => {
                this.$router.push({ path: this.redirect || '/index/main' })
              })
          } else {
            this.$message.error(res.data.message)
          }
        })
        .catch((error) => {
          this.$errorMsg(error.message || 'Login failed, unknown error')
        })
    },
    onVerifySuccess() {
      this.verifyState = true
    },
    register() {
      this.$router.push('/register')
    },
    forget() {
      this.$router.push('/forget')
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .login-bg-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .logo-wrapper {
    & img {
      width: 50px;
    }
    & img::after {
      content: "Welcome to DocSync";
    }
  }
  .login-footer-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    ::v-deep {
      .el-card {
        background-color: transparent;
      }
    }
  }
  .form-wrapper {
    position: absolute;
    top: 18.5%;
    left: 0;
    right: 0;
    bottom: 15.8%;
    @media screen and (max-width: 768px) {
      .left {
        display: none;
      }
      .right {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 80%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #070707;
          text-shadow: 0 0 0.2em #41b883, -0 -0 0.2em #41b883;
        }
        .form-container {
          width: 80%;
          min-height: 60%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 768px) and (max-width: 992px) {
      .left {
        display: none;
      }
      .right {
        display: flex;
        width: 100%;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          text-align: center;
          font-size: 20px;
          font-weight: bold;
          color: #000000;
        }
        .form-container {
          width: 50%;
          height: 70%;
          margin-bottom: 10%;
          text-align: center;
          background: rgba(183, 183, 183, 0.2);
          padding: 5%;
          border-radius: 5px;
          border: 2px solid #fff;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          .item-wrapper {
            width: 100%;
          }
          .login {
            width: 100%;
          }
        }
      }
    }
    @media screen and (min-width: 992px) {
      .left {
        display: block;
        flex: 1;
      }
      .right {
        margin-left: 10%;
        flex: 1;
        display: flex;
        justify-content: center;
        flex-direction: column;
        .my-width {
          width: 48%;
        }
        .title {
          display: block;
          font-size: 28px;
          font-weight: bold;
          color: #d9d9d9;
        }
        .item-wrapper {
          width: 48%;
        }
        .login {
          width: 48%;
        }
      }
    }
  }
}
</style>
