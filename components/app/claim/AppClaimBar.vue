<script setup lang="ts">
const props = defineProps<{
  limit: number
  availableLimit: number
}>()

const claimedPercent = computed(() => {
  return (props.limit - props.availableLimit) / props.limit
})
</script>

<template>
  <div class="relative my-3 flex w-full flex-col gap-y-2">
    <div class="flex h-1">
      <div class="h-full shrink-0 bg-primary-yellow" :style="{ width: `${(limit - availableLimit) / limit * 100}%` }" />
      <div class="h-full flex-1 bg-muted" />
    </div>
    <div class="flex items-center justify-between">
      <div class="text-xs font-semibold">
        {{ limit - availableLimit }} / {{ limit }} Claimed
      </div>
      <div v-if="claimedPercent >= 1" class="text-1xs text-red-500">
        All gone!
      </div>
      <div v-else-if="claimedPercent > 0.8" class="text-1xs text-red-500">
        Almost gone!
      </div>
    </div>
  </div>
</template>

<style>
</style>
