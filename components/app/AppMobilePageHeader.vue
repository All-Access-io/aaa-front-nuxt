<script lang="ts" setup>
import { useStorage } from '@vueuse/core'
const props = withDefaults(defineProps<{
  backToLastDifferentRoute?: boolean
  backRoute?: string
}>(), {
  backToLastDifferentRoute: false,
})

const authStore = useAuthStore()
authStore.getUserPoints()

const { referrer } = useRoute().query as { referrer?: string }
const referrerRef = useStorage('referrer', referrer)
function back() {
  if (referrerRef.value)
    navigateTo(referrerRef.value)
  else
    navigateTo('/')
}
</script>

<template>
  <div class="fixed top-0 z-50 block shadow-sm" v-bind="$attrs">
    <div
      class="relative flex h-[72px] w-screen items-center overflow-hidden border-b border-primary bg-background px-2 transition-colors duration-150 md:px-5">
      <slot name="left">
        <Button variant="ghost" class="px-2" @click="back()">
          <i class="i-mdi-arrow-left mr-1 text-[1em]" />
          <slot name="leftText" />
        </Button>
        <!-- side menu item -->
      </slot>
      <div class="flex-1" />
      <slot name="right">
        <NuxtLink to="/wallet">
          <Button variant="ghost" size="icon" class="-mr-1 px-8">
            <AppAAACurrency :value="authStore.userPoints" hide-text />
          </Button>
        </NuxtLink>
        <NuxtLink to="/scan" class="ml-1">
          <Button variant="ghost" size="icon">
            <div class="i-custom-nav-scan size-[24px] translate-y-px" />
          </Button>
        </NuxtLink>
      </slot>
    </div>
  </div>
  <div class="block h-[72px]" />
</template>

<style></style>
