<script setup lang="ts">
import { taskTypeMap } from '@/lib/models/task'

const { id } = useRoute().params as { id: string }
if (!id)
  navigateTo('/')

const { data, refresh } = useApi<Api.Task.QuestResponse>(`/api/Quest/${id}`, {
  showGlobalLoading: true,
  default: () => null,
})

const preRequisiteQuestFetch = useApi<Api.Task.QuestResponse>(() => `/api/Quest/${data.value?.PreRequisiteQuest?.Id}`, {
  showGlobalLoading: true,
  immediate: false,
  watch: false,
  default: () => null,
  retry: false,

})
watch(data, () => {
  if (data.value?.PreRequisiteQuest)
    preRequisiteQuestFetch.execute()
})

const { isExpired, isComingSoon, isActive } = useQuestAvailability(data)
const { isFailed, isIncomplete, isCompleted, isPending } = useQuestState(data)
const taskStore = useTaskStore()
function handleNavigateMcq() {
  taskStore.handleNavigateMcq(data.value)
}
</script>

<template>
  <div>
    <AppPageDetails
      v-if="data" :title="data.Title" :img-url="data.QuestImage" :start-date="data.StartDate"
      :end-date="data.EndDate" :description="data.Description" :exclusive="data?.Tag?.at(1)?.replace('#', '')"
    >
      <template #leftText>
        <div class="font-semibold uppercase tracking-wider">
          Task
        </div>
      </template>

      <AppTaskWatchVideo v-if="data.QuestType === QuestTypeEnum.Mcq && data.DetailLink" :url="data.DetailLink" />

      <AppTaskDownloadTemplatesButton
        v-if="data.QuestType === QuestTypeEnum.MediaTask && data.DetailLink"
        :url="data.DetailLink"
      />
      <template v-if="data.Tag">
        <AppCommonHashTags :hash-tags="data.Tag" />
      </template>
      <AppCommonStatus
        :fan-value="data.Points" :is-completed="isCompleted" :is-fail="isFailed"
        :points-get="data.PointsGet"
      />

      <template v-if="isComingSoon || isExpired">
        <Button variant="primary" class="mt-4 w-full text-center font-bold" disabled>
          {{ isExpired ? 'Task Expired' : '' }}
          {{ isComingSoon ? 'task coming soon' : '' }}
        </Button>
      </template>
      <template v-if="isIncomplete && isActive && !data.PreRequisiteQuest">
        <Button
          v-if="data.QuestType === taskTypeMap.Mcq" variant="primary"
          class="mt-4 w-full bg-primary-green font-bold" @click="handleNavigateMcq()"
        >
          take the quiz
        </Button>
        <Button
          v-else-if="data.QuestType === taskTypeMap.OpenEnded" variant="primary"
          class="mt-4 w-full bg-primary-green font-bold"
          @click="navigateTo(`/detail/tasks/open-ended/${data.QuestType}-${id}?reward=${data?.Points}`)"
        >
          take the quiz
        </Button>
        <Button
          v-else-if="data.QuestType === QuestTypeEnum.PollTask" variant="primary"
          class="mt-4 w-full bg-primary-green text-center font-bold"
          @click="navigateTo(`/detail/tasks/quiz/poll/${data.QuestType}-${id}`)"
        >
          Take Poll
        </Button>
        <template v-else-if="data.QuestType === taskTypeMap.Referral">
          <AppTaskReferAction />
        </template>
        <template v-else-if="data.QuestType === QuestTypeEnum.SocialTask">
          <AppTaskGleamActionButton :quest-id="data.Id" :gleam-link="data.DetailLink!" />
        </template>
        <template v-else-if="data.QuestType === QuestTypeEnum.MediaTask || data.QuestType === QuestTypeEnum.ProfileTask"">
          <AppTaskShareLinkAction :quest-id="data.Id" :task="data" @submit="refresh" />
        </template>
        <template v-else-if="data.QuestType === QuestTypeEnum.EventTask">
          <AppTaskRegisterEventAction :quest-id="data.Id" :task="data" @submit="refresh"></AppTaskRegisterEventAction>
        </template>
        <Button
          v-else variant="primary" class="mt-4 w-full justify-between bg-primary-green font-bold"
          @click="navigateTo(`/detail/scan/${data.Id}`)"
        >
          <div>open qr scanner</div>
          <i class="i-custom-nav-scan mt-1" />
        </Button>
      </template>

      <template v-if="isPending">
        <template v-if="data.QuestType === QuestTypeEnum.MediaTask || data.QuestType === QuestTypeEnum.ProfileTask">
          <AppTaskShareLinkAction :quest-id="data.Id" :task="data" @submit="refresh" />
        </template>
      </template>

      <template v-if="data.PreRequisiteQuest">
        <AppCommonSpin :fetcher="preRequisiteQuestFetch">
          <div class="mt-2">
            <div class="text-center">
              Please complete the pre-requisite task below before taking this task.
            </div>
            <AppProfileTaskCard v-if="preRequisiteQuestFetch.data" :task="preRequisiteQuestFetch.data.value" />
          </div>
        </AppCommonSpin>
      </template>

      <AppCommonDateItem :end-date="data.EndDate" type="task" :start-date="data.StartDate" />
    </AppPageDetails>
  </div>
</template>

<style></style>
