<script setup lang="ts">
import { cn } from '@/lib/utils'

defineProps<{
  isLive?: boolean
  date: string
  title: string
  description: string
  isEnded?: boolean
  isFree?: boolean
  isOnline?: boolean
}>()
</script>

<template>
  <div
    :class="cn(
      'flex justify-between gap-x-4 rounded-lg border border-primary p-2',
      isEnded && 'border-muted-foreground/50 bg-muted',
    )"
  >
    <div class="flex flex-col gap-y-1">
      <div class="flex items-center">
        <div v-if="isLive" class="relative pl-[5px] pr-1 text-1xs font-semibold text-primary-neon">
          <div class="absolute left-0 top-1/2 size-1 -translate-y-1/2 rounded-full bg-primary-neon" />
          LIVE
        </div>
        <span class="text-1xs font-semibold">{{ date }}</span>
      </div>
      <div class="font-poppins text-xl font-medium leading-5">
        {{ title }}
      </div>
      <div class="pb-1 text-xs leading-tight text-muted-foreground">
        {{ description }}
      </div>
      <div class="flex items-center gap-x-2">
        <div v-if="isEnded" class="w-fit rounded-md bg-primary-green p-1 text-2xs font-bold">
          ENDED
        </div>
        <div v-if="isFree" class="w-fit rounded-md bg-primary-neon/15 p-1 text-2xs font-bold text-primary-neon">
          FREE
        </div>
        <div v-if="isOnline" class="w-fit rounded-md bg-primary-neon/15 p-1 text-2xs font-bold text-primary-neon">
          ONLINE
        </div>
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
            class="-ml-3 flex aspect-square size-full items-center justify-center rounded-full bg-primary-yellow p-[1.2px]"
          >
            <span class="text-1xs">+150</span>
          </div>
        </div>
      </div>
    </div>
    <div class="size-[80px] shrink-0 overflow-hidden rounded-2xl">
      <img src="/images/events.png" class="size-full object-cover">
    </div>
  </div>
</template>

<style>
</style>
