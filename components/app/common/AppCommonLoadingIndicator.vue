<script setup lang="ts">
const { globalLoading } = useGlobalLoading()
</script>

<template>
  <div v-if="globalLoading" class="absolute inset-0 z-[100] flex h-screen w-screen items-center justify-center">
    <!-- <AppCommonSpin show="" /> -->
  </div>
</template>

<style>
</style>
