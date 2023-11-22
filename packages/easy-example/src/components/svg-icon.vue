<template>
  <svg
    :class="getClassName"
    :width="width"
    :height="height"
    aria-hidden="true"
  >
    <use :xlink:href="getName" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  className: {
    type: String
  },
  width: {
    type: String
  },
  height: {
    type: String
  }
})

const getName = computed(() => {
  return `#icon-${props.name}`
})

const getClassName = computed(() => {
  return [
    'icon-svg',
    `icon-svg__${props.name}`,
    props.className && /\S/.test(props.className) ? `${props.className}` : ''
  ]
})
</script>

<style>
.icon-svg {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
}
</style>
