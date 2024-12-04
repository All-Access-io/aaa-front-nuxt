<script lang="ts" setup>
const [openInviteModal, toggleInviteModal] = useToggle()

const { copyReferralCode, referralCode } = useSelfReferralCode()
type TabsType = 'tasks' | 'rewards' | 'completed'

const appStore = useAppStore()
const authStore = useAuthStore()
const fetchTasks = useApi<Api.Common.ResponseList<Api.Task.Task>>('/api/Quest/GetIncompleteQuest', {
  method: 'post',
  body: {
    PageNumber: 1,
    PageSize: 5,
    sort: Sorting.ASC,
  },
})

const fetchCompleteTasksModel = reactive<Api.Common.PaginateParams>({
  PageNumber: 1,
  PageSize: 20,
  sort: Sorting.DESC,
})
const fetchCompleteTasks = useApi<Api.Common.ResponseList<Api.Task.Task>>('/api/Quest/GetCompleteQuest', {
  method: 'post',
  body: fetchCompleteTasksModel,
  watch: false,
  immediate: false,
})
const completeTasklastItemRef = ref<HTMLElement>()
const completeTasksInfiniteScroll = useInfiniteScroll<Api.Common.ResponseList<Api.Task.Task>>({
  lastItemRef: completeTasklastItemRef,
})
const fetchCompleteTasksQuery = useInfiniteQuery<Api.Common.ResponseList<Api.Task.Task>>({
  queryKey: ['completed-task-list', fetchCompleteTasksModel.PageNumber],
  ...completeTasksInfiniteScroll.infiniteQueryParams,
  queryFn: async ({ pageParam }) => {
    fetchCompleteTasksModel.PageNumber = pageParam as number
    await fetchCompleteTasks.execute()
    return fetchCompleteTasks.data.value
  },
})
completeTasksInfiniteScroll.setupObserver(fetchCompleteTasksQuery)

const fetchRewardsModel = reactive<Api.Common.PaginateParams>({
  PageNumber: 1,
  PageSize: 20,
  sort: Sorting.DESC,
})
const fetchRewards = useApi<Api.Common.ResponseList<Api.Reward.Reward>>('/api/Reward/GetRewards', {
  method: 'post',
  body: fetchRewardsModel,
  watch: false,
  immediate: false,
})
const rewardlastItemRef = ref<HTMLElement>()
const { setupObserver, infiniteQueryParams } = useInfiniteScroll<Api.Common.ResponseList<Api.Reward.Reward>>({
  lastItemRef: rewardlastItemRef,
})
const fetchRewardsQuery = useInfiniteQuery<Api.Common.ResponseList<Api.Reward.Reward>>({
  queryKey: ['profile-rewards-list', fetchRewardsModel.PageNumber],
  ...infiniteQueryParams,
  queryFn: async ({ pageParam }) => {
    fetchRewardsModel.PageNumber = pageParam as number
    await fetchRewards.execute()
    return fetchRewards.data.value
  },
})
setupObserver(fetchRewardsQuery)
</script>

<template>
  <div class="mb-10">
    <AppModalReferralCodeInput />
    <AppModalInvite v-model:open="openInviteModal" />
    <div class="flex w-full items-center justify-between bg-primary-green p-4">
      <div>
        <div class="font-bold">
          Earn AAA for every referral
        </div>
        <div class="flex items-center gap-x-2">
          Referral Code: {{ referralCode }}
          <div class="i-lucide-copy cursor-pointer text-[0.8em]" @click="copyReferralCode()" />
        </div>
      </div>
      <Button variant="primary" size="sm" class="rounded-lg" @click="toggleInviteModal">
        invite <i class="i-mdi-share-variant ml-1" />
      </Button>
    </div>
    <div class="container mx-auto mt-5 flex max-w-md flex-col gap-y-4">
      <AppProfileRankTierCard />

      <div class="mb-4 mt-6 flex w-full justify-between gap-y-4">
        <div v-if="authStore.userInfo.Email" class="flex items-center gap-x-1">
          <Avatar class="bg-primary text-sm uppercase text-background">
            {{ authStore.userInfo.Email?.substring(0, 2) }}
          </Avatar>
          <div class="flex flex-col">
            <div class="text-sm text-muted-foreground/90">
              Logged in as
            </div>
            <div class="w-[120px] truncate sm:w-[150px] md:w-auto">
              {{ authStore.userInfo?.Email }}
            </div>
          </div>
        </div>

        <NuxtLink to="/detail/profile">
          <Button variant="primary" size="sm" class="text-xs">
            account details
          </Button>
        </NuxtLink>
      </div>

      <div class="mt-2">
        <Tabs v-model="appStore.userProfileSelectedTab" default-value="tasks">
          <TabsList class="grid w-full grid-cols-3 bg-primary-yellow">
            <TabsTrigger value="tasks" class="data-[state=active]:bg-primary data-[state=active]:text-primary-yellow">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="rewards" class="data-[state=active]:bg-primary data-[state=active]:text-primary-yellow">
              Rewards
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              class="data-[state=active]:bg-primary data-[state=active]:text-primary-yellow"
            >
              Completed
            </TabsTrigger>
          </TabsList>
          <AppCommonSpin :fetcher="[fetchCompleteTasks, fetchTasks, fetchRewards]" class="min-h-[250px]">
            <TabsContent value="tasks" class="space-y-3">
              <AppProfileTaskCard v-for="v in fetchTasks.data.value?.Records" :key="v.Id" :task="v" />
              <Button variant="primaryY" class="w-full" @click="navigateTo('/user/earn')">
                Browse all tasks
              </Button>
            </TabsContent>

            <TabsContent value="rewards">
              <div class="space-y-3">
                <template v-for="page in fetchRewardsQuery.data?.value?.pages" :key="page.CurrentPage">
                  <template v-for="v in page.Records" :key="v.Id">
                    <AppClaimRewardItem :reward="v" referrer="/user/profile" />
                  </template>
                </template>
              </div>
              <div ref="rewardlastItemRef" class="h-px" />
              <AppCommonInfiniteScrollLastItem :query="fetchRewardsQuery">
                <template #loader>
                  <div />
                </template>
                <template #no-more>
                  <div />
                </template>
              </AppCommonInfiniteScrollLastItem>
              <div class="hidden w-full flex-col gap-y-4">
                <Button variant="primaryY">
                  Browse all Rewards
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="completed" class="space-y-3">
              <AppCommonEmpty :lists="fetchCompleteTasksQuery.data.value?.pages.at(0)?.Records">
                <div class="space-y-3">
                  <template v-for="page in fetchCompleteTasksQuery.data?.value?.pages" :key="page.CurrentPage">
                    <template v-for="v in page.Records" :key="v.Id">
                      <AppProfileCompletedItem :task="v" />
                    </template>
                  </template>
                </div>
                <div ref="completeTasklastItemRef" class="h-px" />
                <AppCommonInfiniteScrollLastItem :query="fetchCompleteTasksQuery">
                  <template #loader>
                    <div />
                  </template>
                  <template #no-more>
                    <div />
                  </template>
                </AppCommonInfiniteScrollLastItem>
              </AppCommonEmpty>
            </TabsContent>
          </AppCommonSpin>
        </Tabs>
      </div>
    </div>
  </div>
</template>

<style></style>
