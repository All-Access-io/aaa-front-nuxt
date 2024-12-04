<script setup lang="ts">
const props = withDefaults(defineProps<{
  startDate?: string | Date | null
  endDate?: string | Date | null

  type?: 'task' | 'reward' | 'raffle'

  inline?: boolean
}>(), {
  type: 'task',
})
// ex: 2024-07-10T23:59:59
const { isExpired, countdownTimer, isComingSoon, isOnGoing, startDateString, endDateString, isComingSoonOneDay } = useStartEndDate({
  StartDate: props.startDate,
  EndDate: props.endDate,
})
const typeText = computed(() => {
  if (props.type === 'task')
    return 'task'
  else if (props.type === 'reward')
    return 'reward'
  else
    return ''
})

const timeText = computed(() => {
  if (isExpired.value)
    return 'expired'
  else if (isComingSoon.value)
    return 'coming soon'
  else if (isOnGoing.value)
    return 'ends in'
  else
    return ''
})

const text = computed(() => {
  let result = ''
  if (isExpired.value) {
    if (props.type === 'task')
      result = 'Task Expired'
    else if (props.type === 'reward')
      result = 'Reward Closed'
    else if (props.type === 'raffle')
      result = 'Raffle Expired'
  }
  else if (isComingSoon.value) {
    if (props.type === 'task') {
      result = `Task unlocks in ${countdownTimer.value}`
      if (props.inline)
        result = `Task unlocks in ${countdownTimer.value}`
    }
    else if (props.type === 'reward') {
      result = `Reward unlocks in ${countdownTimer.value}`
      if (props.inline)
        result = `Reward unlocks ${countdownTimer.value}`
    }
    else if (props.type === 'raffle') {
      result = `Raffle unlocks in ${countdownTimer.value}`
      if (props.inline)
        result = `Raffle unlocks ${countdownTimer.value}`
    }
  }
  else if (isOnGoing.value) {
    if (props.type === 'task')
      result = `Task Ends in ${countdownTimer.value}`
    else if (props.type === 'reward')
      // result = `Reward closes ${countdownTimer.value}`
      result = `closes in ${countdownTimer.value}`
    else if (props.type === 'raffle')
      result = `Raffle closes ${countdownTimer.value}`
    else
      result = `closes in ${countdownTimer.value}`
  }
  if (props.inline)
    result = result.split(' ').slice(1).join(' ')
  return result
})
</script>

<template>
  <template v-if="endDate">
    <div
      class="text-sm font-medium uppercase" :class="{
        'inline-block text-xs': props.inline,
        'mt-4 w-full text-center': !props.inline,
        'text-muted-foreground': isComingSoon,
        'text-red-500': isOnGoing || isComingSoonOneDay,
      }"
    >
      {{ text }}
    </div>
  </template>
</template>

<style></style>
