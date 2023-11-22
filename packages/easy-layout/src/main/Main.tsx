import { defineComponent } from 'vue'

export default defineComponent({
  name: 'EvMain',
  setup() {
    return () => {
      return <main class="ev-main">123</main>
    }
  }
})
