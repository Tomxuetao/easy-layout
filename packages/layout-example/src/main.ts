import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import router from '@/router'
import 'layout-vue3/lib/index.css'

import IconSvg from '@/components/index'

createApp(App).use(router).use(IconSvg).mount('#app')
