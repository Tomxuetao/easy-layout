<template>
  <component :is="loadSvgIcon(svgName)"></component>
</template>

<script setup lang="ts">
const svgName = defineModel({
  type: String,
  default: ''
})

const svgRecords = import.meta.glob(['../assets/icons/svg/*'], {
  eager: true,
  import: 'default',
  query: '?component'
})

const loadSvgIcon = (name: string) =>
  svgRecords[`../assets/icons/svg/icon-${name}.svg`] ||
  svgRecords['../assets/icons/svg/icon-0.svg']
</script>

<style>
.icon-svg {
  width: 1em;
  height: 1em;
  overflow: hidden;
  fill: currentColor;
}
</style>
