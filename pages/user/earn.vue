<script setup lang="ts">
import { useStorage } from '@vueuse/core'

const referrerRef = useStorage('referrer', null)
referrerRef.value = null

const selectedTab = ref('today')
const model = reactive<Api.Task.GetQuestListParams>({
  tagFilter: '',
  titleFilter: '',
  isToday: false,
  PageNumber: 1,
  PageSize: 20,
  sort: Sorting.ASC,
})

const taskQuery = useInfiniteQuery<Api.Common.ResponseList<Api.Task.GetQuestListItem>>({
  queryKey: ['task-list', model.PageNumber, model.PageSize, model.tagFilter, model.titleFilter, model.isToday],
  initialPageParam: 1,
  getNextPageParam: (lastPage) => {
    if (!lastPage?.TotalPages || !lastPage?.CurrentPage)
      return 1
    if (lastPage.CurrentPage + 1 > lastPage.TotalPages)
      return undefined
    return lastPage.CurrentPage + 1
  },
  queryFn: async ({ pageParam }) => {
    model.PageNumber = pageParam as number
    const data = await api<Api.Common.ResponseList<Api.Task.GetQuestListItem>>('/api/Quest/GetQuestList', {
      showGlobalLoading: false,
      method: 'post',
      body: model,
    })
    return data
  },
})

watch(selectedTab, () => {
  switch (selectedTab.value) {
    case 'all':
      model.isToday = false
      model.tagFilter = ''
      break
    case 'today':
      model.isToday = true
      model.tagFilter = ''
      break
  }
  model.PageNumber = 1
  taskQuery.refetch()
})

const search = ref('')
const debouncedSearch = refDebounced(search, 500)
watch(debouncedSearch, () => {
  model.PageNumber = 1
  if (debouncedSearch.value)
    model.titleFilter = debouncedSearch.value
  else
    model.titleFilter = ''
  taskQuery.refetch()
})

const lastItemRef = ref<HTMLElement>()
onMounted(async () => {
  await nextTick()
  const observer = new IntersectionObserver((entries, observer) => {
    if (entries[0].isIntersecting && taskQuery.hasNextPage.value && !taskQuery.isFetching.value)
      taskQuery.fetchNextPage()
  })
  observer.observe(lastItemRef.value!)
})
</script>

<template>
  <div class="mx-auto w-full max-w-md">
    <div class="hidden w-full bg-primary-yellow py-7">
      <div class="container">
        <div class="flex justify-center gap-x-2">
          <AppEarnCheckInItem :day="1" is-today />
          <AppEarnCheckInItem :day="2" />
          <AppEarnCheckInItem :day="3" />
          <AppEarnCheckInItem :day="4" />
          <AppEarnCheckInItem :day="5" />
          <AppEarnCheckInItem :day="6" />
          <AppEarnCheckInItem :day="7" />
        </div>

        <div class="mt-4">
          <Button variant="primaryY" class="w-full rounded-t-none text-xs">
            check in today & get <span class="mx-1 -mt-[3px] inline-block text-xl">+</span>
            <AppAAACurrency :value="1" class="-mt-[3px]" />
          </Button>
        </div>
      </div>
    </div>

    <section class="container w-full flex-1 py-8">
      <section class="space-y-1">
        <div class="font-poppins text-3xl font-medium">
          Tasks
        </div>
      </section>

      <section>
        <Tabs v-model="selectedTab" default-value="all">
          <TabsList class="flex items-center justify-start overflow-x-auto bg-background pl-0 font-poppins">
            <TabsTrigger
              value="today"
              class="px-[8px] py-px text-sm data-[state=active]:bg-primary-green2 data-[state=active]:font-semibold data-[state=active]:text-primary"
            >
              Today
            </TabsTrigger>
            <TabsTrigger
              value="all"
              class="px-[8px] py-px text-sm data-[state=active]:bg-primary-green2 data-[state=active]:font-semibold data-[state=active]:text-primary"
            >
              See All
            </TabsTrigger>
          </TabsList>
          <InputWithIcon v-model="search" placeholder="Search" class="mb-2 w-full rounded-3xl">
            <template #startIcon>
              <i class="i-mdi-magnify" />
            </template>
          </InputWithIcon>
          <ScrollArea class="h-[calc(100vh-64px-84px-10px-184px)]">
            <div v-auto-animate class="space-y-3 pt-2">
              <template v-for="page in taskQuery.data?.value?.pages" :key="page.CurrentPage">
                <template v-for="v in page.Records" :key="v.Id">
                  <AppProfileCompletedItem v-if="v.QuestCompletionStatus === QuestStateEnum.Completed" :task="v" referrer="/user/earn" />
                  <AppProfileTaskCard v-else :task="v" referrer="/user/earn" />
                </template>
              </template>
            </div>
            <div ref="lastItemRef" class="h-px" />
            <AppCommonInfiniteScrollLastItem :query="taskQuery">
              <template #no-more>
                more tasks coming soon...
              </template>
            </AppCommonInfiniteScrollLastItem>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      </section>
    </section>
  </div>
</template>

<style>
</style>
