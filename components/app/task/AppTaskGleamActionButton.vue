<script setup lang="ts">
import { toast } from 'vue-sonner'

const props = defineProps<{
  questId: number
  gleamLink: string
}>()

const { data, execute } = useApi<Api.Task.CompleteSocialTaskResponse>(`/api/Quest/CompleteSocialTask`, {
  method: 'post',
  body: {
    questId: props.questId,
  },
  immediate: false,
  watch: false,
})
const { showEarnModal } = useEarnModal()
async function handleCompleteGleamTask(_event: GleamEvent) {
  await execute()
  if (data.value.IsSuccess) {
    showEarnModal(data.value.QuestPoint, 'task')
    navigateTo(`/detail/tasks/${props.questId}`)
  }
  else {
    toast.error(data.value.ErrorMessage)
  }
}

const gleamHook = useGleam({
  gleamLink: props.gleamLink,
  onEnteredTask(event: GleamEvent) {
    handleCompleteGleamTask(event)
  },
})

function handleGleam() {
  gleamHook.handleGleam()
}
</script>

<template>
  <Button @click="handleGleam()" variant="primaryG" class="mt-4 w-full font-bold">
    Complete this task
  </Button>
</template>

<style>
</style>
