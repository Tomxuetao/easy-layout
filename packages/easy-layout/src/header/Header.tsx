import { SlotsType, defineComponent } from 'vue'

export default defineComponent({
  name: 'EvHeader',

  slots: Object as SlotsType<{
    logo: any;
  }>,

  setup(props, { slots }) {
    const { logo } = slots

    return () => {
      return (
        <header class="ev-header">
          <div class="header-left">{logo?.()}</div>
          <div class="header-center"></div>
          <div class="header-right"></div>
        </header>
      )
    }
  }
})
