<script setup lang="tsx">
const { data, status } = useApi<Api.Point.UserTierResponse>('/api/Point/GetUserTier')
const noTier = computed(() => data.value?.TierName === '-')
const bronzeTier = computed(() => data.value?.TierName === 'Bronze')
const silverTier = computed(() => data.value?.TierName === 'Silver')
const goldTier = computed(() => data.value?.TierName === 'Gold')

const barWidth = computed(() => {
  return (data.value?.Point / data.value?.TargetPoint) * 9 + 1
})
</script>

<template>
  <template v-if="status !== 'pending'">
    <div
      class="relative space-y-2 rounded-lg p-4 pt-5 shadow-[0_0_10px] shadow-primary-green" :class="{
        'bg-gradient-to-r from-[#fff1cf] to-primary-gold-light shadow-primary-gold': goldTier,
      }"
    >
      <div
        class="absolute left-[4%] top-0 z-20 rounded-b-lg bg-primary-green p-2 py-px text-xs font-semibold tracking-tighter"
        :class="{
          '!bg-primary-gold text-[#fff3b4]': goldTier,
        }"
      >
        {{ (noTier || bronzeTier) ? 'Level 1' : '' }}
        {{ silverTier ? 'Level 2' : '' }}
        {{ goldTier ? 'Level 3' : '' }}
      </div>
      <div v-if="noTier" class="absolute inset-0 z-10 h-[calc(100%-24px)] w-full bg-background/60" />
      <div class="flex items-center justify-between py-1">
        <div class="flex items-center gap-x-2">
          <div class="relative size-[28px] overflow-hidden rounded-full p-[2px]">
            <div
              class="absolute inset-0 -z-10 bg-gradient-to-tr from-[#fec77f] to-[#cea166]" :class="{
                'bg-gradient-to-tr from-[#efefef] to-[#b3b3b3]': silverTier,
                'bg-gradient-to-tr from-[#ffdf82] to-[#fec56a]': goldTier,
              }"
            />
            <div
              class="flex size-full items-center justify-center rounded-full bg-[#f7b25c] text-[0.7em] shadow-[inset_0_0_5px_2px_#b87525]"
              :class="{
                'bg-[#c1c1c1] text-[0.7em] shadow-[inset_0_0_5px_2px_#909090]': silverTier,
                'bg-[#fdd446] text-[0.7em] shadow-[inset_0_0_5px_2px_#f6b037]': goldTier,
              }"
            >
              {{ (noTier || bronzeTier) ? '🕹️' : '' }}
              {{ silverTier ? '🎮' : '' }}
              {{ goldTier ? '🏆' : '' }}
            </div>
          </div>
          <div class="font-bold" :class="{ 'text-primary-gold': goldTier }">
            {{ (noTier || bronzeTier) ? 'Bronze' : '' }}
            {{ silverTier ? 'Silver' : '' }}
            {{ goldTier ? 'Gold' : '' }}
          </div>
        </div>
      </div>
      <div class="flex h-[4px]">
        <div
          class="h-full basis-5 bg-primary-green" :class="{ '!bg-primary-gold': goldTier || silverTier }"
          :style="{ flex: barWidth }"
        />
        <div class="h-full bg-muted" :style="{ flex: 10 - barWidth }" />
      </div>
      <div class="flex items-center justify-between">
        <AppAAACurrency :value="data?.Point" :max-value="data?.TargetPoint" :hide-text="false">
          <template #icon>
            <AppAAALogoSvg :class="{ 'relative z-20': noTier }" />
          </template>
          <template #maxValue="{ value }">
            <span :class="{ 'relative z-20': noTier }">
              <span>{{ value }}&nbsp;</span>
              <span class="inline-block align-top text-[0.6em]">AAA</span>
            </span>
          </template>
        </AppAAACurrency>
        <div class="text-[0.6em] text-muted-foreground" :class="{ 'text-primary': goldTier }">
          {{ (noTier || bronzeTier || silverTier) ? 'Complete tasks to earn FAN!' : '' }}
          {{ goldTier ? 'You\'re an elite fan!' : '' }}
        </div>
      </div>
    </div>
  </template>
  <template v-else>
    <Skeleton class="h-[120px] w-[400px]" />
  </template>
</template>

<style>
</style>
