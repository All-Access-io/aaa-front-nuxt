<script setup lang="ts">
import { toast } from 'vue-sonner'

const { id } = useRoute().params as { id: string }
if (!id)
  navigateTo('/')

const { showEarnModal } = useEarnModal()

const { data, status } = useApi<Api.Task.OpenEndedQuestionResponse>(`/api/Quest/GetOpenEndedQuestion/${id}`, {
})

const model = reactive({
  answer: '',
})

async function handleSubmit() {
  try {
    if (!model.answer) {
      toast.error('Please enter your answer')
      return
    }

    const res = await api<Api.Task.CompleteOpenEndedTaskResponse>('/api/Quest/CompleteOpenEndedTask', {
      method: 'post',
      body: {
        questId: Number(id),
        questionId: data.value.Id,
        answer: model.answer,
      } as Api.Task.CompleteOpenEndedTaskParams,
      showGlobalLoading: true,
    })
    if (!res.IsSuccess) {
      toast.error(res.ErrorMessage!)
      if (res.Error === 'Wrong answer submitted.')
        navigateTo(`/detail/tasks/${id}`)

      return
    }
    if (res.PointsRewarded > 0)
      showEarnModal(res.PointsRewarded, 'task')

    navigateTo(`/detail/tasks/${id}`)
  }
  catch (e: any) {
    if (e.error && typeof e.error === 'string')
      toast.error(e.error)
  }
}
</script>

<template>
  <div class="flex min-h-screen flex-col bg-primary-yellow">
    <section class="container flex flex-1 flex-col justify-between">
      <div class="flex h-[7vh] items-end gap-x-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
      </div>
      <AppCommonSpin :show="status === 'pending'">
        <div v-if="data" class="flex h-auto flex-1 flex-col justify-center">
          <section>
            <div class="my-5 text-5xl font-bold">
              {{ data.Question }}
            </div>
          </section>
          <div class="flex flex-col gap-y-5">
            <Textarea
              v-model="model.answer" rows="8"
              placeholder="enter your answer here"
              class="resize-none border-2 border-primary font-medium focus-visible:ring-0"
            />
            <Button variant="primary" class="py-7 text-lg font-bold" @click="handleSubmit">
              submit
            </Button>
          </div>
        </div>
      </AppCommonSpin>
      <div class="flex h-[7vh] gap-x-8 self-end">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
        <img src="~/assets/images/plus-gg.png" class="size-8">
      </div>
    </section>
  </div>
</template>

<style></style>
