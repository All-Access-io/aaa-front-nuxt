<script setup lang="ts">
const { data } = useApi<Api.Spin.GetSpinByIdResponse>(`/api/Spin/GetLatestActiveSpin`, {
  default: () => null,
})
const id = computed(() => data.value?.Id)
const point = computed(() => data.value?.Point)
</script>

<template>
  <div
    style="background-size: 500px 420px; background-repeat: no-repeat;"
    class="relative flex h-[390px] w-[320px] flex-col justify-between overflow-hidden rounded-lg border-2 border-primary bg-[url('/images/roulette-banner.png')] bg-[position:50%_-150%] p-4"
  >
    <div class="absolute inset-0 -z-10 bg-black" />
    <div class="flex flex-col items-center justify-center gap-y-2">
      <div class="text-center font-poppins text-[54px] font-bold leading-[2.6rem] text-primary-green">
        REWARD
        ROULETTE
      </div>
      <!-- <AppCommonAvatarsList text="HAVE WON REWARDS!" class="text-background" /> -->
    </div>
    <Button
      :disabled="!id"
      class="flex w-full justify-between bg-primary-green text-xs font-bold text-primary hover:bg-primary-green hover:text-primary disabled:cursor-default disabled:opacity-100"
      variant="primary" @click="navigateTo('/detail/reward/roulette?referrer=/user/claim')"
    >
      <template v-if="id">
        <span>play now</span>
        <AppAAACurrency :value="point" />
      </template>
      <template v-else>
        <span>
          coming soon
        </span>
      </template>
    </Button>
  </div>
</template>

<style>
</style>
