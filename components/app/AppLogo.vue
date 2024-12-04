<script setup lang="ts">
const { isHome } = useUiConfig()
</script>

<template>
  <h1 class="group flex w-36 items-center transition-transform duration-150 ease-in-out">
    <img v-if="isHome" src="~/assets/images/logo_full.png" class="size-full object-contain">
    <img v-else src="~/assets/images/logo.svg" class="">
  </h1>
</template>

<style></style>
