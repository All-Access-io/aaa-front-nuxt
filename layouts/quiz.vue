<script setup lang="ts">

</script>

<template>
  <div class="flex min-h-screen flex-col bg-primary-green2">
    <section class="container flex flex-1 flex-col justify-between">
      <div class="flex h-[7vh] items-end gap-x-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
      </div>
      <div class="flex flex-1 flex-col">
        <slot />
      </div>
      <div class="flex h-[7vh] gap-x-8 self-end">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
      </div>
    </section>
  </div>
</template>

<style>
</style>
