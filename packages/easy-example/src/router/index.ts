import {createRouter,
  RouteRecordRaw,
  RouteLocation,
  createWebHistory} from 'vue-router'

const devRoutes: RouteRecordRaw[] = [
  {
    path: '/auth-list',
    name: 'auth-list',
    meta: { title: '用户权限' },
    component: () => import('@/views/modules/auth-list.vue')
  },
  {
    path: '/user-detail',
    name: 'user-detail',
    meta: { title: '用户审核' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/user-detail.vue')
  },
  {
    path: '/apply-detail',
    name: 'apply-detail',
    meta: { title: '实验申请审核' },
    props: (route) => ({ ...route.query }),
    component: () => import('@/views/modules/apply-detail.vue')
  }
]

const routes = [
  {
    path: '/',
    name: 'main-dynamic',
    meta: { title: '动态路由' },
    component: () => import('@/views/layout/index.vue'),
    children: devRoutes,
    beforeEnter: async ({ name }: RouteLocation) =>
      name !== 'main-dynamic' ? true : { replace: true, name: 'auth-list' }
  }
]

const router = createRouter({
  routes: routes,
  history: createWebHistory('/'),
  scrollBehavior: () => ({ top: 0 })
})

export default router
