<script setup lang="ts">
const props = defineProps<{
  pollSumarry: Api.Task.PollSummary[]
}>()

defineEmits<{
  (e: 'nextQuestion'): void
}>()

const percentages = computed(() => {
  return props.pollSumarry.map(v => v.VotePercentage)
})

const percentagesWithHighest = computed(() => {
  const highest = percentages.value.reduce((a, b) => a > b ? a : b)
  return percentages.value.map(v => ({
    value: v,
    isHighest: v === highest,
  }))
})
</script>

<template>
  <div class="my-5 flex flex-col items-start gap-y-3">
    <template v-for="v in percentagesWithHighest" :key="v.value">
      <div
        class="flex h-[68px] min-w-[3.5rem] items-center justify-start rounded-md bg-background p-4 font-poppins text-lg font-semibold tracking-wide text-primary"
        :class="{
          'bg-primary text-primary-yellow': v.isHighest,
        }"
        :style=" { width: `${v.value}%` }"
      >
        {{ v.value }}%
      </div>
    </template>
    <Button variant="primary" class="mt-4 w-full text-center font-bold" @click="$emit('nextQuestion')">
      Next Question
    </Button>
  </div>
</template>

<style>
</style>
