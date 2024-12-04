<script setup lang="ts">
const props = defineProps<{
  isPlaying?: boolean
}>()

const { data, status, execute } = useApi<Api.Spin.GetTopTenLiveSpinHistoryResponse>(`/api/Spin/GetTopTenLiveSpinHistory`, {
  immediate: false,
  watch: false,
  default: () => null,
})
execute()

setInterval(fetchData, 20000)
function fetchData() {
  if (props.isPlaying)
    return
  execute()
}

const prizeList = computed(() => {
  if (!data.value)
    return []
  return data.value.Records.filter(v => v.PrizeImage)
})
defineExpose({ fetchData })
</script>

<template>
  <AppCommonSpin :show="status === 'pending'">
    <div class="flex w-full justify-center overflow-hidden p-2">
      <div class="flex gap-x-1 font-poppins text-lg font-bold uppercase text-background">
        <div class="mt-[2px] inline-block size-2 rounded-full bg-primary-green" />
        <div class="leading-4">
          Live <br> wins
        </div>
      </div>
      <div
        v-if="data?.Records"
        class="scrollbar-thumb-rounded-full flex items-center gap-x-2 overflow-x-auto scrollbar-thin scrollbar-track-background/40 scrollbar-thumb-background/80"
      >
        <div v-for="(v, index) in prizeList" :key="index" class="flex max-w-[82px] flex-col items-center gap-y-1">
          <img v-if="v.PrizeImage" :src="v.PrizeImage" :alt="v.PrizeName" class="aspect-[64/80]">
          <div v-else class="aspect-[64/80] min-w-[64px] rounded-md bg-gray-500/80 md:min-w-[82px]" />
          <!-- <div
            class="flex shrink-0 flex-col items-center rounded-md border border-primary-green px-2 py-1"
            style="background: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)), url('/images/roulette-card.png') center/cover;"
          >
            <div class="font-poppins text-2xs font-semibold uppercase text-primary-green">
              1,000 FAN
            </div>
            <AppRockLogo class="my-2 size-[36px]" />
          </div> -->
          <div class="flex w-16 items-center gap-x-1">
            <!-- <Avatar class="size-3" /> -->
            <span class="truncate text-xs text-background">{{ v.UserEmail }}</span>
          </div>
        </div>
      </div>
    </div>
  </AppCommonSpin>
</template>

<style>
</style>
