<template>
  <div class="site-wrapper site-page--login">
    <div class="site-content__wrapper">
      <div class="site-content">
        <div class="brand-info">
          <h2 class="brand-info__text">
            VenusAdmin
          </h2>
          <p class="brand-info__intro">
            VenusAdmin基于Vue3、Element
            Plus构建开发，实现VenusFast后台管理前端功能，提供一套更优的前端解决方案。
          </p>
        </div>
        <div class="login-main">
          <h3 class="login-title">
            管理员登录
          </h3>
          <el-form
            ref="dataFormRef"
            :model="dataForm"
            :rules="dataRule"
            @keyup.enter="dataFormSubmit()"
          >
            <el-form-item prop="username">
              <el-input
                v-model="dataForm.username"
                placeholder="帐号"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="dataForm.password"
                type="password"
                placeholder="密码"
              />
            </el-form-item>
            <el-form-item prop="captcha">
              <el-row :gutter="20">
                <el-col :span="14">
                  <el-input
                    v-model="dataForm.captcha"
                    placeholder="验证码"
                  />
                </el-col>
                <el-col
                  :span="10"
                  class="login-captcha"
                >
                  <img
                    :src="captchaPath"
                    alt=""
                    @click="getCaptcha()"
                  >
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item>
              <el-button
                class="login-btn-submit"
                type="primary"
                @click="dataFormSubmit()"
              >
                登录
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { loginApi } from '@/api/login-api'
import { getUUID } from '@/utils'
import { proxy } from '@/utils/http'
import { useRouter } from 'vue-router'

import { reactive, ref } from 'vue'

const dataForm = reactive({
  username: '',
  password: '',
  uuid: '',
  captcha: ''
})
const dataRule = reactive({
  username: [{ required: true, message: '帐号不能为空', trigger: 'blur' }],
  password: [{ required: true, message: '密码不能为空', trigger: 'blur' }],
  captcha: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
})

const captchaPath = ref('')

const getCaptcha = () => {
  dataForm.uuid = getUUID()
  captchaPath.value = `${proxy}/captcha?uuid=${dataForm.uuid}`
}
getCaptcha()

const router = useRouter()
const dataFormRef = ref()
const dataFormSubmit = () => {
  dataFormRef.value.validate((valid) => {
    if (valid) {
      loginApi(dataForm).then((data) => {
        const { token } = data
        sessionStorage.setItem('token', token)

        router.replace({ name: 'home' })
      })
    }
  })
}
</script>

<style lang="scss" scoped>
.site-wrapper.site-page--login {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;

  &:before {
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background-image: url(@/assets/img/login-bg.png);
    background-size: cover;
  }

  .site-content__wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
    overflow-y: auto;
    background-color: transparent;
  }

  .site-content {
    min-height: 100%;
    padding: 30px 500px 30px 30px;
  }

  .brand-info {
    margin: 120px 100px 0 90px;
    color: #fff;
  }

  .brand-info__text {
    margin: 0 0 22px 0;
    font-size: 48px;
    font-weight: 400;
  }

  .brand-info__intro {
    margin: 10px 0;
    font-size: 16px;
    line-height: 1.58;
    opacity: 0.6;
  }

  .login-main {
    position: absolute;
    top: 0;
    right: 0;
    padding: 150px 60px 180px;
    width: 470px;
    min-height: 100%;
    background-color: #fff;
  }

  .login-title {
    font-size: 16px;
  }

  .login-captcha {
    overflow: hidden;

    > img {
      width: 100%;
      cursor: pointer;
    }
  }

  .login-btn-submit {
    width: 100%;
    margin-top: 38px;
  }
}
</style>
