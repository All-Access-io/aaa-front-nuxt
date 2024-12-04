<script setup lang="ts">
const props = defineProps<{
  fanValue: number
  rank: number
  email: string
  id: number
}>()
const fanValue = computed(() => props.fanValue)
const { history: fanValueHistory } = useRefHistory(fanValue, {
  capacity: 2,
})
const hasIncreased = computed(() => {
  const current = fanValueHistory.value[0]?.snapshot
  const before = fanValueHistory.value[1]?.snapshot
  return current > before
})
const animateState = ref(false)
watch(hasIncreased, (value) => {
  if (value)
    animateState.value = true
})
watch(animateState, (value) => {
  if (value) {
    setTimeout(() => {
      animateState.value = false
    }, 5000)
  }
})
const authStore = useAuthStore()
</script>

<template>
  <div class="flex items-center gap-x-2 px-6 py-3" :class="{ 'animate-fade-yellow': animateState }">
    <div class="grid size-6 place-items-center rounded-full bg-primary-yellow-foreground text-xs text-background">
      {{ rank }}
    </div>
    <div class="flex-1 font-poppins font-medium">
      {{ email }} {{ authStore.userInfo.id === id ? '(you)' : '' }}
    </div>
    <AppAAACurrency :value="fanValue" class="text-xs" />
  </div>
</template>

<style>

</style>
