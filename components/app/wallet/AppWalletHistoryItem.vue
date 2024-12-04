<script setup lang="ts">
defineProps<{
  title: string
  description: string
  fanValue: number
  date: string
}>()
</script>

<template>
  <div class="flex items-center justify-between">
    <div>
      <div class="font-poppins font-medium">
        {{ title }}
      </div>
      <div class="text-1xs font-medium text-primary/40">
        {{ description }}
      </div>
    </div>
    <div class="flex flex-col items-end">
      <AppAAACurrency :value="fanValue" hide-logo show-sign />
      <div class="text-2xs">
        {{ date }}
      </div>
    </div>
  </div>
</template>

<style>
</style>
