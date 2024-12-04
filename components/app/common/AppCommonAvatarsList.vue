<script setup lang="ts">
defineProps<{
  text: string
}>()
</script>

<template>
  <div class="flex items-center justify-center text-xs font-medium">
    <div class="flex origin-left scale-75 -space-x-3">
      <Avatar size="xs">
        <AvatarImage src="/images/avatar1.png" />
      </Avatar>
      <Avatar size="xs">
        <AvatarImage src="/images/avatar2.png" />
      </Avatar>
      <Avatar size="xs">
        <AvatarImage src="/images/avatar3.png" />
      </Avatar>
      <div
        class="flex aspect-square size-full items-center justify-center rounded-full bg-primary-yellow p-[1.2px] text-primary"
      >
        <span class="text-1xs">+150</span>
      </div>
    </div>
    <div>{{ text }}</div>
  </div>
</template>

<style>
</style>
