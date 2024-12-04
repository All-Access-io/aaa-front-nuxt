<script setup lang="ts">
import { cn } from '@/lib/utils'

const props = defineProps<{
  day: number
  isToday?: boolean
  hasCheckedIn?: boolean
  doneCheckIn?: boolean
}>()

const plusCount = computed(() => {
  if (props.day === 7)
    return 5
  return Math.ceil(props.day / 2)
})
</script>

<template>
  <div v-if="day !== 7" class="flex flex-col items-center justify-center gap-y-1">
    <div
      class="relative flex flex-col items-center justify-center gap-y-1 rounded-md border bg-background px-2 py-1.5"
      :class="cn(
        'bg-background/50 border-background',
        isToday && 'box-shadow-md bg-background border-primary/10',
      )"
    >
      <div v-if="hasCheckedIn" class="absolute inset-0 border border-background">
        <div class="flex size-full flex-col items-center justify-center gap-y-1 bg-primary-yellow-foreground">
          <div
            class="flex size-6 items-center justify-center rounded-full bg-background text-primary-yellow-foreground"
          >
            <i class="i-lucide-check text-primary-yellow-foreground" />
          </div>
          <span class="text-1xs text-background">Done!</span>
        </div>
      </div>
      <div
        class="text-xs font-semibold" :class="cn(
          isToday && 'text-primary-yellow-foreground',
        )"
      >
        +{{ plusCount }}
      </div>
      <AppAAALogoSvg class="size-[24px]" />
    </div>
    <div
      v-if="!doneCheckIn" class="text-2xs" :class="cn(
        'text-primary/50',
        isToday && 'font-semibold text-primary',
      )"
    >
      {{ isToday ? 'Today' : `Day ${day}` }}
    </div>
  </div>
  <div v-else class="flex flex-col items-center justify-center gap-y-1">
    <div
      class="relative flex flex-col items-center justify-center gap-y-1 rounded-md border border-primary-yellow-foreground bg-background pb-1.5"
      :class="cn(
        'bg-background/50 border-background/80',
        isToday && 'box-shadow-md bg-background',
      )"
    >
      <div v-if="hasCheckedIn" class="absolute inset-0 border border-background">
        <div class="flex size-full flex-col items-center justify-center gap-y-1 bg-primary-yellow-foreground">
          <div
            class="flex size-6 items-center justify-center rounded-full bg-background text-primary-yellow-foreground"
          >
            <i class="i-lucide-check text-primary-yellow-foreground" />
          </div>
          <span class="text-1xs text-background">Done!</span>
        </div>
      </div>

      <div
        class="w-full bg-primary-yellow-foreground px-8 py-[0.1rem] text-xs font-semibold text-background" :class="cn(
          isToday && 'text-primary-yellow-foreground',
        )"
      >
        +{{ plusCount }}
      </div>
      <div class="-space-x-4">
        <AppAAALogoSvg class="size-[24px]" />
        <AppAAALogoSvg class="size-[24px]" />
        <AppAAALogoSvg class="size-[24px]" />
        <AppAAALogoSvg class="size-[24px]" />
        <AppAAALogoSvg class="size-[24px]" />
      </div>
    </div>
    <div
      v-if="!doneCheckIn" class="text-2xs" :class="cn(
        'text-primary/50',
        isToday && 'font-semibold text-primary',
      )"
    >
      {{ isToday ? 'today' : `Day ${day}` }}
    </div>
  </div>
</template>

<style>
</style>
