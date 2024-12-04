<script setup lang="ts">
import { toast } from 'vue-sonner'

const { id, questType } = useRoute().params as { id: string, questType: string }
if (!id || !questType)
  navigateTo('/')

const { showEarnModal } = useEarnModal()
const model = ref<Api.Task.McqQuestionParams>({
  questId: Number(id),
  questionIds: [],
  questType: Number(questType),
})

const { data, status } = useApi<Api.Task.McqQuestionResponse>(`/api/Quest/GetMcqQuestion`, {
  method: 'post',
  body: model,
})

async function handleAnswer(answerId: number) {
  try {
    const res = await api<Api.Task.AnswerMcqQuestionResponse>('/api/Quest/AnswerMcqQuestion', {
      method: 'post',
      body: {
        questId: Number(id),
        questionId: data.value.Id,
        answerId,
      } as Api.Task.AnswerMcqQuestionParams,
      showGlobalLoading: true,
    })
    // if (!res.isSuccess)
    //   toast.error(res.error!)

    if (data.value.IsLastQuestion) {
      const point = await api<Api.Task.GetMcqTotalPointByUserResponse>(`/api/Quest/GetMcqTotalPointByUser/${data.value.QuestId}`)
      if (!point.IsSuccess) {
        toast.error(point.ErrorMessage)
        return
      }
      if (res.AdditionalPoint) {
        showEarnModal(point.TotalPoints - res.AdditionalPoint, 'perfect', () => { }, {
          perfectBonusValue: res.AdditionalPoint,
        })
      }
      else {
        showEarnModal(point.TotalPoints, 'task')
      }
      navigateTo(`/detail/tasks/${id}`)
    }
    else {
      // go to next question
      model.value.questionIds.push(data.value.Id)
    }
  }
  catch (e: any) {
    if (e.error && typeof e.error === 'string')
      toast.error(e.error)
  }
}

// const theme = computed()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-primary-yellow">
    <section class="container flex flex-1 flex-col">
      <AppTaskWatchVideo url="https://www.youtube.com/embed/K4TOrB7at0Y?si=9X73EgJ26AQw4m7W" class="mt-10" />
      <div class="flex flex-col">
        <div class="flex h-auto flex-1 flex-col items-center justify-center">
          <AppCommonSpin :show="status === 'pending'" class="overflow-hidden rounded-lg bg-inherit">
            <template v-if="data">
              <section>
                <div class="my-5 text-5xl font-bold">
                  {{ data.Question }}
                </div>
                <div class="my-3">
                  Choose the correct answer
                </div>
              </section>
              <div :key="data.Id" class="flex flex-col gap-y-5">
                <Button
                  v-for="v in data.Answers" :key="v.Id" variant="quiz" class="justify-start py-7 text-xl"
                  @click="handleAnswer(v.Id)"
                >
                  {{ v.Answer }}
                </Button>
              </div>
            </template>
          </AppCommonSpin>
        </div>
      </div>
    </section>
  </div>
</template>
