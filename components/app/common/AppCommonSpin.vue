<script setup lang="ts">
const props = defineProps<{
  show?: boolean
  fetcher?: ReturnType<typeof useFetch> | Array<ReturnType<typeof useFetch>>
}>()

const showSpin = computed(() => {
  if (props.fetcher) {
    if (Array.isArray(props.fetcher))
      return props.fetcher.some(f => f.status.value === 'pending')
    else
      return props.fetcher.status.value === 'pending'
  }
  return props.show
})
</script>

<template>
  <div class="relative size-full">
    <Transition>
      <div
        v-if="showSpin" v-bind="$attrs"
        class="absolute inset-0 z-50 flex select-none items-center justify-center bg-background/20 backdrop-blur-[1px]"
      >
        <i class="i-lucide-loader-circle !aspect-square size-10 animate-spin" />
      </div>
    </Transition>
    <slot />
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
