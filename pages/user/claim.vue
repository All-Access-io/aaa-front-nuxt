<script setup lang="ts">
const selectedTab = ref('all')

const fetchFeaturedRewards = useApi<Api.Common.ResponseList<Api.Reward.DerivedReward>>('/api/Reward/GetRewards', {
  method: 'post',
  key: 'featured-rewards',
  transform: (data) => {
    data.Records.map(transformRewardResponse)
    return data
  },
  body: {
    PageNumber: 1,
    PageSize: 100,
    sort: Sorting.DESC,
    tagFilter: 'featured',
  } as Api.Reward.RewardListParams,
})

const fetchRewardsModel = reactive<Api.Reward.RewardListParams>({
  PageNumber: 1,
  PageSize: 2,
  sort: Sorting.DESC,
  titleFilter: '',
  tagFilter: '',
  isClaimed: false,
})
const fetchRewards = useApi<Api.Common.ResponseList<Api.Reward.DerivedReward>>('/api/Reward/GetRewards', {
  method: 'post',
  key: 'rewards-list',
  body: fetchRewardsModel,
  transform: (data) => {
    data.Records.map(transformRewardResponse)
    return data
  },
  watch: false,
  immediate: false,
})
const rewardlastItemRef = ref<HTMLElement>()
const { setupObserver, infiniteQueryParams } = useInfiniteScroll<Api.Common.ResponseList<Api.Reward.DerivedReward>>({
  lastItemRef: rewardlastItemRef,
})
const fetchRewardsQuery = useInfiniteQuery<Api.Common.ResponseList<Api.Reward.DerivedReward>>({
  queryKey: ['rewards-list', fetchRewardsModel.PageNumber],
  ...infiniteQueryParams,
  queryFn: async ({ pageParam }) => {
    fetchRewardsModel.PageNumber = pageParam as number
    await fetchRewards.execute()
    return fetchRewards.data.value
  },
})
setupObserver(fetchRewardsQuery)

const search = ref('')
const debouncedSearch = refDebounced(search, 500)
watch(debouncedSearch, () => {
  fetchRewardsModel.PageNumber = 1
  if (debouncedSearch.value)
    fetchRewardsModel.titleFilter = debouncedSearch.value
  else
    fetchRewardsModel.titleFilter = ''
  fetchRewardsQuery.refetch()
})

watch(selectedTab, () => {
  fetchRewardsModel.PageNumber = 1
  fetchRewardsModel.isClaimed = false
  switch (selectedTab.value) {
    case 'all':
      fetchRewardsModel.tagFilter = ''
      break
    case 'claimed':
      fetchRewardsModel.isClaimed = true
      break
    default:
      fetchRewardsModel.tagFilter = selectedTab.value
      break
  }
  fetchRewardsQuery.refetch()
})
</script>

<template>
  <div class="container max-w-lg py-8">
    <section class="space-y-1">
      <div class="relative min-w-fit font-poppins text-[54px] font-bold leading-[0.9]">
        <div class="text-outline text-background drop-shadow-[0px_2px_0px_hsl(var(--primary))]">
          FEATURED <br>
          <span class="text-primary-yellow">REWARDS</span> <br>
        </div>
      </div>
      <div class="leading-tight">
        Money-cant-buy experiences for the hardest-of-hardcore FAAANS.
      </div>
    </section>

    <section>
      <ScrollArea class-name="w-full whitespace-nowrap rounded-md">
        <div class="flex w-full justify-center gap-x-4 py-4">
          <!-- <AppClaimRouletteCard /> -->
          <AppCommonSpin :fetcher="fetchFeaturedRewards">
            <template v-if="fetchFeaturedRewards.data.value?.Records">
              <AppClaimCard v-for="v in fetchFeaturedRewards.data.value.Records" :key="v.Id" :reward="v"
                referrer="/user/claim" />
            </template>
          </AppCommonSpin>
        </div>
        <ScrollBar orientation="horizontal" class="opacity-0 md:opacity-100" />
      </ScrollArea>
    </section>

    <section>
      <div class="font-poppins text-3xl font-medium">
        All Rewards
      </div>
      <Tabs v-model="selectedTab" default-value="all">
        <TabsList class="w-full justify-start bg-background font-poppins">
          <TabsTrigger value="all"
            class="px-1.5 py-px text-sm data-[state=active]:bg-primary-green2 data-[state=active]:font-semibold data-[state=active]:text-primary">
            All
          </TabsTrigger>
          <TabsTrigger value="tobi"
            class="px-1.5 py-px text-sm data-[state=active]:bg-primary-green2 data-[state=active]:font-semibold data-[state=active]:text-primary">
            Tobi + Brent
          </TabsTrigger>
          <TabsTrigger value="experiences"
            class="px-1.5 py-px text-sm data-[state=active]:bg-primary-green2 data-[state=active]:font-semibold data-[state=active]:text-primary">
            Experiences
          </TabsTrigger>
          <TabsTrigger value="merch"
            class="px-1.5 py-px text-sm data-[state=active]:bg-primary-green2 data-[state=active]:font-semibold data-[state=active]:text-primary">
            Merch
          </TabsTrigger>
          <TabsTrigger value="claimed"
            class="data-[state=active]:text-medium group ml-auto justify-self-end px-1.5 py-px text-sm data-[state=active]:font-semibold data-[state=active]:text-primary">
            <div class="rounded-md bg-primary-yellow px-1 py-0.5 font-normal">
              Claimed
            </div>
          </TabsTrigger>
        </TabsList>
        <InputWithIcon v-model="search" placeholder="Search" class="w-full rounded-3xl">
          <template #startIcon>
            <i class="i-mdi-magnify" />
          </template>
        </InputWithIcon>
        <ScrollArea class="mt-2 h-[calc(100vh-64px-150px-84px-10px)]">
          <div v-if="fetchRewardsQuery.data?.value?.pages" v-auto-animate class="space-y-3">
            <template v-for="page in fetchRewardsQuery.data?.value?.pages" :key="page?.CurrentPage">
              <template v-for="v in page.Records" :key="v.Id">
                <AppClaimRewardItem :reward="v" referrer="/user/claim" />
              </template>
            </template>
          </div>
          <!-- <AppCommonEmpty :lists="filteredTasks">
            <AppCommonSpin :fetcher="fetchRewards">
              <div v-auto-animate class="space-y-3 pt-2">
                <template v-for="v in filteredTasks" :key="v.id">
                  <AppClaimRewardItem :reward="v" />
                </template>
              </div>
            </AppCommonSpin>
            <template #empty>
              <div />
            </template>
          </AppCommonEmpty> -->
          <div ref="rewardlastItemRef" class="h-px" />
          <AppCommonInfiniteScrollLastItem :query="fetchRewardsQuery">
            <template #no-more>
              <div class="mt-2 w-full text-center text-base font-semibold uppercase tracking-widest">
                more rewards coming soon...
              </div>
            </template>
          </AppCommonInfiniteScrollLastItem>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Tabs>
    </section>
  </div>
</template>

<style>
</style>
