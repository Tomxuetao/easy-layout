import { defineComponent, SlotsType } from 'vue'

export default defineComponent({
  name: 'EvMain',

  slots: Object as SlotsType<{
    router: any;
  }>,

  setup(_, { slots }) {
    const { router } = slots
    return () => {
      return <main class="ev-main">{router?.()}</main>
    }
  }
})
