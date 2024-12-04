<script setup lang="ts">
const props = defineProps<{
  // status?: 'completed' | 'failed'
  isCompleted?: boolean
  isFail?: boolean
  fanValue: number
  pointsGet?: number

  hideSign?: boolean
}>()

const status = computed(() => {
  if (props.isCompleted === undefined)
    return ''

  if (props.isFail)
    return 'failed'

  if (props.isCompleted)
    return 'completed'
  else
    return ''
})

const points = computed(() => {
  if (props.pointsGet)
    return props.pointsGet
  else
    return props.fanValue
})
</script>

<template>
  <div class="flex items-center justify-between border-y border-primary p-2">
    <template v-if="status === 'completed'">
      <AppCommonTag status="completed" />
      <div class="flex items-center justify-center gap-x-1">
        <AppAAACurrency :value="points" is-earned />
      </div>
    </template>
    <template v-else-if="status === 'failed'">
      <AppCommonTag status="failed" />
      <div class="text-xs font-semibold uppercase text-primary-error">
        you have failed this task
      </div>
    </template>
    <template v-else>
      <div class=" text-xs font-medium uppercase">
        <slot>
          COMPLETION REWARD
        </slot>
      </div>
      <div>
        <AppAAACurrency :value="points" :show-sign="!hideSign" />
      </div>
    </template>
  </div>
</template>

<style>
</style>
