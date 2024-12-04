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

const [registeredLink, toggleRegisteredLink] = useToggle(false)

const { data, execute } = useApi<Api.Task.CompleteSocialTaskResponse>(`/api/Quest/CompleteSocialTask`, {
  method: 'post',
  body: {
    questId: props.questId,
  },
  immediate: false,
  watch: false,
})
const { showEarnModal } = useEarnModal()

function handleSubmit() {
  const func = !registeredLink.value ? handleRegisterEvent : handleCompleteTask
  func()
}

function handleRegisterEvent() {
  toggleRegisteredLink(true)
  if (!props.task.DetailLink) {
    toast.error('Something went wrong, please try again later')
    return
  }
  window.open(props.task.DetailLink, '_blank')
}
async function handleCompleteTask() {
  await execute()
  if (data.value.IsSuccess) {
    showEarnModal(data.value.QuestPoint, 'task')
    navigateTo(`/detail/tasks/${props.questId}`)
    emits('submit')
  }
  else {
    toast.error(data.value.ErrorMessage)
  }
}
</script>

<template>
  <Button variant="primaryG" class="mt-4 w-full font-bold" @click="handleSubmit()">
    {{ !registeredLink ? 'register for event' : 'yes I\'ve registered' }}
  </Button>
</template>

<style scoped>
</style>
