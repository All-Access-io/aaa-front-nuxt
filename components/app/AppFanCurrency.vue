<script setup lang="ts">
interface Props {
  value: number
  hideLogo?: boolean
  maxValue?: number
  showSign?: boolean
  showPlus?: boolean
  showMinus?: boolean
  isEarned?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  value: 0,
})

const format = useFormat().currency

const valueCount = computed(() => {
  if (props.showSign) {
    const isPositive = props.value > 0
    return `${isPositive ? '+' : '-'}${format(Math.abs(props.value))}`
  }

  return `${props.showPlus ? '+' : ''}${props.showMinus ? '-' : ''}${format(props.value)}`
})
</script>

<template>
  <template v-if="maxValue">
    <div class="text-sm">
      <slot name="icon">
        <AppRockLogo />
      </slot>
      <span class="font-semibold">{{ format(value) }}</span>
      <span class="font-semibold">
        /
        <slot name="maxValue" :value="format(maxValue)">
          {{ format(maxValue) }}
          <span class="inline-block align-top text-[0.6em]">FAN</span>
        </slot>
      </span>
    </div>
  </template>
  <template v-else>
    <div class="text-sm font-semibold">
      <AppRockLogo v-if="!hideLogo" />
      <span>
        {{ valueCount }}
        <span class="inline-block align-top text-[0.6em] font-bold">FAN</span>
        <span v-if="isEarned" class="inline-block align-top text-[0.6em] font-bold">&nbsp;EARNED</span>
      </span>
    </div>
  </template>
</template>

<style>
</style>
