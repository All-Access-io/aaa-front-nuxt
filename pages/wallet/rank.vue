<script setup lang="tsx">
import { useToast } from '~/components/ui/toast/use-toast'

const toast = useToast()

const pageSize = 50

const fetchRankTier = useApi<Api.Point.UserTierResponse>('/api/Point/GetUserTier')
const tierIdMap = {
  '-': null,
  'Bronze': 1,
  'Silver': 2,
  'Gold': 3,
}

const fetchLeaderboard = useApi<Api.Common.ResponseList<Api.Point.LeaderboardItem>>('/api/Point/GetLeaderboard', {
  method: 'post',
  watch: [fetchRankTier.data],
  body: {
    // tierId: tierIdMap[fetchRankTier.data.value?.TierName] || null,
    tierId: null,
    PageNumber: 1,
    PageSize: pageSize,
    sort: Sorting.DESC,
  } as Api.Point.LeaderboardParams,
  hideLoading: true,
})
useIntervalFn(() => {
  fetchLeaderboard.execute()
}, 20000)

const fetchRankDifference = useApi<Api.Point.RankDifference>('/api/Point/GetRankDifference', {
})
const isRankIncreased = computed(() => fetchRankDifference.data.value?.Difference > 0)

const appStore = useAppStore()
onMounted(() => {
  if (!appStore.isRegister)
    return
  if (appStore.shownRankMessage)
    return

  const { dismiss } = toast.toast({
    description: (
      <div class="flex w-full items-center gap-x-2">
        <div class="text-2xl">
          👆
        </div>
        <div class="font-medium">
          Complete tasks and earn FAN to be part of this weeks leaderboard!
        </div>
      </div>
    ),
    duration: Infinity,
    viewPortClass: 'bottom-0 p-0 left-1/2 -translate-x-1/2 top-auto',
    class: 'rounded-none bg-primary-yellow p-3',
  })
  appStore.setShownRankMessage(true)
  onUnmounted(() => {
    dismiss()
  })
})
</script>

<template>
  <div>
    <div class="container">
      <div class="flex w-full pt-6">
        <div class="rounded-l-lg border border-primary bg-primary-yellow/60 p-2 px-3 pr-5">
          <div class="font-poppins text-1xs font-medium">
            Time Left
          </div>
          <div class="flex items-center whitespace-nowrap font-semibold text-primary-yellow-foreground">
            <i class="i-custom-clock translate-y-[2.5px]" /> {{ fetchRankDifference.data.value?.DaysLeft || '-' }} days
          </div>
        </div>
        <div
          class="flex flex-1 shrink-0 items-center justify-between gap-x-2 border-y border-primary px-3 py-2" :class="{
            'bg-muted': !fetchRankDifference.data.value?.CurrentRank,
            'bg-primary-green': !!fetchRankDifference.data.value?.CurrentRank,
          }"
        >
          <div>
            <div class="font-poppins text-1xs font-medium">
              Today
            </div>
            <div
              v-if="!fetchRankDifference.data.value?.CurrentRank"
              class="whitespace-nowrap font-semibold text-muted-foreground"
            >
              Join Now
            </div>
            <div v-else class="flex items-center justify-evenly whitespace-nowrap font-semibold text-[#298000]">
              <span class="text-primary">{{ fetchRankDifference.data.value?.CurrentRank }}</span>

              <div class="ml-2 flex items-center" :class="{ 'text-[#298000]': isRankIncreased, 'text-red-500': !isRankIncreased }">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" :class="{ 'rotate-180 text-red-500': !isRankIncreased, 'text-[#298000]': isRankIncreased }">
                  <path
                    d="M3.33325 5.66699L3.33325 8.66699L7.99992 5.33366L12.6666 8.66699L12.6666 5.66699L7.99992 2.33366L3.33325 5.66699Z"
                    fill="currentColor"
                  />
                  <path
                    d="M3.33325 10.333L3.33325 13.333L7.99992 9.99967L12.6666 13.333L12.6666 10.333L7.99992 6.99967L3.33325 10.333Z"
                    fill="currentColor"
                  />
                </svg>
                {{ fetchRankDifference.data.value?.Difference }} spots
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            class="flex items-center gap-x-1 border border-primary bg-primary-green text-1xs font-bold uppercase tracking-wide" size="xs"
            @click="navigateTo('/user/earn')"
          >
            <span>earn</span>
            <AppAAALogoSvg class="-mt-px text-[1.2em]" />
          </Button>
        </div>
        <div class="w-fit rounded-r-lg border border-primary bg-primary-yellow-foreground p-2">
          <div class="grid place-items-center">
            <div class="font-poppins text-1xs font-medium">
              Prizes
            </div>
            <div>💎</div>
          </div>
        </div>
      </div>
    </div>

    <ScrollArea class="h-[calc(100vh-248px-78px-84px)] py-4">
      <AppCommonEmpty :lists="fetchLeaderboard.data.value?.Records">
        <AppCommonSpin :show="fetchLeaderboard.data.value?.Records === null">
          <div v-auto-animate>
            <AppWalletRankItem
              v-for="v in fetchLeaderboard.data.value?.Records" :id="v.UserId" :key="v.UserId" :rank="v.Rank"
              :email="v.DisplayName" :fan-value="v.Points"
            />
          </div>
        </AppCommonSpin>
      </AppCommonEmpty>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>

    <div class="fixed bottom-0 left-0" />
  </div>
</template>
