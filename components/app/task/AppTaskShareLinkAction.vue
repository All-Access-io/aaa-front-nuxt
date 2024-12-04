<script setup lang="ts">
import { z } from 'zod'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { toast } from 'vue-sonner'

const props = defineProps<{
  questId: number
  task: Api.Task.QuestResponse
}>()

const emits = defineEmits<{
  (e: 'submit'): void
}>()

const { isPending, isIncomplete } = useQuestState(props.task)
const schema = z.object({
  link: z.string().url(),
})
const form = useForm({
  validationSchema: toTypedSchema(schema),
})

const fetchCompleteMediaTask = useAsyncData(async () => {
  const res = await api<Api.Task.CompleteMediaTaskResponse>('/api/Quest/CompleteMediaTask', {
    method: 'post',
    body: {
      questId: props.questId,
      link: form.values.link,
    } as Api.Task.CompleteMediaTaskParams,
  })
  return res
}, {
  lazy: true,
  immediate: false,
})

const { showEarnModal } = useEarnModal()
async function handleSubmit(_values: Record<string, any>) {
  await fetchCompleteMediaTask.execute()
  if (fetchCompleteMediaTask.data.value?.IsSuccess) {
    showEarnModal(fetchCompleteMediaTask.data.value.QuestPoint, 'submitted')
    emits('submit')
  }
  else {
    if (fetchCompleteMediaTask.data.value?.Error) {
      toast.error(fetchCompleteMediaTask.data.value.ErrorMessage)
    }
    else {
      toast.error(fetchCompleteMediaTask.error || 'Failed to complete the task, please try again later', {
        closeButton: true,
      })
    }
  }
}
</script>

<template>
  <div v-if="isIncomplete" class="mt-4">
    <div class="font-poppins text-xl font-medium">
      Share us a link to your {{ task?.QuestType === QuestTypeEnum.ProfileTask ? 'profile' : 'post' }} url.
    </div>
    <AutoForm
      :form="form" :schema="schema" class="mt-2" :field-config="{
        link: {
          hideLabel: true,
        },
      }" @submit="handleSubmit"
    >
      <Button
        type="submit" variant="primaryG" class="mt-4 w-full bg-primary-green font-bold"
        :loading="fetchCompleteMediaTask.status.value === 'pending'"
      >
        Submit
      </Button>
    </AutoForm>
  </div>
  <div v-else-if="isPending">
    <div class="mt-4 flex w-full items-center justify-between gap-x-2 rounded-md bg-primary-yellow px-3 py-4">
      <div class="text-2xl">
        👍
      </div>
      <div class="text-left text-sm font-medium">
        Points will be credited once we've verified your submission.
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(p[role='alert']) {
  text-align: right;
}
</style>
