<script setup lang="ts">
import { ref } from 'vue'

import ImgBg from '@/assets/img/img-bg.webp'
import SvgIcon from '@/components/svg-icon.vue'

import { Layout as EvLayout } from 'layout-vue3'

const menuList = [
  {
    id: '1',
    text: '菜单1',
    icon: '1',
    url: '/apply-detail',
    isMenu: true,
    children: []
  },
  {
    id: '2',
    text: '菜单2',
    icon: '2',
    url: '',
    isMenu: true,
    children: [
      {
        id: '2-1',
        text: '菜单3',
        icon: '2',
        url: '/apply-detail',
        isMenu: true,
        children: []
      },
      {
        id: '2-2',
        text: '菜单4',
        icon: '2',
        url: '/apply-detail2',
        isMenu: true,
        children: []
      },
      {
        id: '2-3',
        text: '菜单5',
        icon: '1',
        url: '/auth-list',
        isMenu: true,
        children: []
      }
    ]
  },
  {
    id: '3',
    text: '菜单6',
    icon: '3',
    url: '',
    isMenu: true,
    children: [
      {
        id: '3-1',
        text: '菜单7',
        icon: '3',
        url: '/auth-list',
        isMenu: true,
        children: []
      },
      {
        id: '3-2',
        text: '菜单8',
        icon: '4',
        url: '/auth-list',
        isMenu: true,
        children: []
      },
      {
        id: '3-3',
        text: '菜单9',
        icon: '4',
        url: '/auth-list',
        isMenu: true,
        children: []
      }
    ]
  }
]

const collapse = ref(false)

const toggleCollapse = () => {
  collapse.value = !collapse.value
}

const navMode = ref('header')

setTimeout(() => {
  navMode.value = 'aside'
}, 10000)
const activeId = ref('1')
</script>

<template>
  <ev-layout
    class="layout-wrap"
    :img-bg="ImgBg"
    :show-crumb="true"
    :nav-mode="navMode"
    :collapse="collapse"
    :menu-list="menuList"
    :model-value="activeId"
  >
    <template #logo>
      <div class="logo-wrap">
        <img class="logo-img" src="@/assets/img/img-logo.webp" alt="" />
        <div class="logo-text">数字管理子平台</div>
      </div>
    </template>
    <template #fold>
      <div class="fold-wrap" @click="toggleCollapse()">
        <img
          :class="['fold-img', collapse ? 'img-fold' : 'img-open']"
          src="@/assets/img/img-fold.webp"
          alt=""
        />
      </div>
    </template>
    <template #router>
      <router-view />
    </template>
    <template #menuIcon="menu">
      <svg-icon v-model="menu.icon" class="menu-svg" />
    </template>
  </ev-layout>
</template>

<style scoped lang="scss">
:root {
  --ev-primary-color: #ffffff;
}

.layout-wrap {
  .logo-wrap {
    cursor: pointer;
    display: flex;
    align-items: center;

    .logo-img {
      width: 40px;
      height: 40px;
      object-fit: contain;
    }

    .logo-text {
      font-size: 22px;
      color: #1c365e;
      margin-left: 8px;
    }
  }

  .menu-svg {
    width: 24px;
    height: 24px;
    font-size: 24px;
  }

  .menu-text {
    margin-left: 12px;
  }

  .fold-wrap {
    width: 32px;
    height: 32px;
    display: flex;
    cursor: pointer;
    border-radius: 4px;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;

    .fold-img {
      width: 16px;
      height: 16px;
      object-fit: contain;
    }

    @keyframes fold-rotate {
      0% {
        transform: rotate(0deg);
      }

      100% {
        transform: rotate(180deg);
      }
    }

    .img-fold {
      transform: rotate(180deg);
      animation: fold-rotate 0.5s ease-out;
    }

    .img-open {
      transform: rotate(0deg);
      animation: fold-rotate 0.5s ease-out;
    }
  }
}
</style>
