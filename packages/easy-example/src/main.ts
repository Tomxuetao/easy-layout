import { createApp } from 'vue'
import App from './App.vue'
import 'normalize.css'
import 'easy-layout/lib/index.css'

import IconSvg from '@/components/index'

createApp(App).use(IconSvg).mount('#app')
