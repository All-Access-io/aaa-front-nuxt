<script setup lang="ts">
import { appName } from './constants'

useHead({
  title: appName,
})

</script>

<template>
  <div>
    <Sonner />
    <Toaster />

    <AppModalEarnedFan></AppModalEarnedFan>
    <AppModalClaimReward></AppModalClaimReward>
    <AppCommonLoadingIndicator />
    <NuxtLoadingIndicator :color="false" class="bg-primary" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.2s cubic-bezier(0, 0.72, 0.43, 1);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
