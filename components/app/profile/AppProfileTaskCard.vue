<script setup lang="ts">
const props = defineProps<{
  task: Api.Task.Task;
  referrer?: string;
}>();
const { date, isComingSoonOneDay } = useStartEndDate(props.task);
const { isComingSoon } = useQuestAvailability(props.task);
const { isPending, isFailed } = useQuestState(props.task);
</script>

<template>
  <div
    v-if="task"
    class="relative cursor-pointer rounded-lg border-2 border-primary px-3 py-2 transition-colors duration-150 hover:bg-muted/80"
    :class="{
      'bg-muted/20': isComingSoon,
    }"
    @click="
      navigateTo({
        path: `/detail/tasks/${task.Id}#gleam`,
        query: {
          referrer: props.referrer,
        },
      })
    "
  >
    <div
      v-if="isComingSoon"
      class="absolute inset-0 z-10 size-full bg-muted/40"
    />
    <div class="flex gap-x-2">
      <img
        v-if="task?.QuestImage"
        class="mt-0.5 size-10 rounded-md"
        :src="task.QuestImage"
      />
      <div>
        <AppCommonTaskCardTagList
          v-if="task.Tag"
          :tags="task.Tag"
          :is-locked="isComingSoon"
        >
          <template #locked>
            <AppCommonDateItem
              v-if="isComingSoonOneDay"
              :start-date="task.StartDate"
              :end-date="task.EndDate"
              type="task"
              inline
              class="!text-2xs"
            />
          </template>
          <AppCommonTag v-if="isPending" variants="completed" size="xs">
            submitted
          </AppCommonTag>
          <AppCommonTag v-if="isFailed" variants="failed" size="xs">
            failed
          </AppCommonTag>
        </AppCommonTaskCardTagList>
        <div
          class="my-1 line-clamp-2 font-poppins text-lg font-medium leading-[1.3rem]"
          :class="{
            'text-muted-foreground': isComingSoon,
          }"
        >
          {{ task.Title }}
        </div>
        <div
          class="prose line-clamp-3 font-montserrat text-1xs text-muted-foreground/80"
          v-html="task.Description"
        />
      </div>
    </div>
    <div class="mt-4 flex items-center justify-between">
      <AppAAACurrency
        :value="task.Points"
        show-plus
        :class="{ 'text-muted-foreground': isComingSoon }"
      />
      <template v-if="task.Recurring">
        <div v-if="!isFailed" class="text-1xs uppercase">
          {{ getRecurringText(task.Recurring, task.RecurringDay) }}
        </div>
        <div v-if="isFailed" class="text-1xs uppercase text-red-500">
          {{ getRecurringFailedText(task.Recurring, task.RecurringDay) }}
        </div>
      </template>
      <template v-else>
        <div v-if="date" class="text-1xs uppercase">
          {{ date }}
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
:deep(.prose a) {
  @apply text-inherit underline;
}

:deep(.prose ul > li) {
  @apply my-px pl-0;
}
</style>
