<script setup lang="ts">
import { toast } from 'vue-sonner'

const { questType, id } = useRoute().params as { id: string, questType: string }
if (!id)
  navigateTo('/')

const { showEarnModal } = useEarnModal()
const model = ref<Api.Task.McqQuestionParams>({
  questId: Number(id),
  questionIds: [],
  questType: Number(questType),
})
const mcqQuestionFetcher = useApi<Api.Task.McqQuestionResponse>(`/api/Quest/GetMcqQuestion`, {
  method: 'post',
  body: model,
})

const [showPollPercentage, toggleShowPollPercentageState] = useToggle(false)
const answerBody = reactive<Api.Task.AnswerMcqQuestionParams>({
  questId: Number(id),
  questionId: -1,
  answerId: -1,
})
const answerPollQuestionFetcher = useApi<Api.Task.AnswerPollQuestionResponse>('/api/Quest/AnswerPollQuestion', {
  method: 'post',
  body: answerBody,
  watch: false,
  immediate: false,
})
const pollSummary = computed(() => {
  if (answerPollQuestionFetcher.data.value?.PollSummary)
    return answerPollQuestionFetcher.data.value.PollSummary
  return []
})
async function handleAnswer(answerId: number) {
  try {
    answerBody.questionId = mcqQuestionFetcher.data.value.Id
    answerBody.answerId = answerId
    await answerPollQuestionFetcher.execute()
    toggleShowPollPercentageState(true)
    // if (!res.isSuccess)
    //   toast.error(res.error!)
  }
  catch (e: any) {
    if (e.error && typeof e.error === 'string')
      toast.error(e.error)
  }
}

async function handleNextQuestion() {
  toggleShowPollPercentageState(false)
  if (mcqQuestionFetcher.data.value.IsLastQuestion) {
    const point = await api<Api.Task.GetMcqTotalPointByUserResponse>(`/api/Quest/GetMcqTotalPointByUser/${mcqQuestionFetcher.data.value.QuestId}`)
    if (!point.IsSuccess) {
      toast.error(point.ErrorMessage)
      return
    }
    if (answerPollQuestionFetcher.data.value.AdditionalPoint) {
      showEarnModal(point.TotalPoints - answerPollQuestionFetcher.data.value.AdditionalPoint, 'perfect', () => {}, {
        perfectBonusValue: answerPollQuestionFetcher.data.value.AdditionalPoint,
      })
    } else {
      showEarnModal(point.TotalPoints, 'task')
    }
    navigateTo(`/detail/tasks/${id}`)
  }
  else {
    // go to next question
    model.value.questionIds.push(mcqQuestionFetcher.data.value.Id)
  }
}
// const theme = computed()
</script>

<template>
  <div class="flex min-h-screen flex-col bg-primary-yellow">
    <section class="container flex flex-1 flex-col">
      <div class="flex flex-1 flex-col">
        <div class="flex h-auto flex-1 flex-col items-center justify-center">
          <AppCommonSpin
            :fetcher="[mcqQuestionFetcher, answerPollQuestionFetcher]"
            class="overflow-hidden rounded-lg bg-inherit"
          >
            <template v-if="mcqQuestionFetcher.data.value">
              <section>
                <div class="my-5 text-5xl font-bold">
                  {{ mcqQuestionFetcher.data.value.Question }}
                </div>
                <div class="my-3">
                  Cast your votes now!
                </div>
              </section>
              <template v-if="!showPollPercentage">
                <div :key="mcqQuestionFetcher.data.value.Id" class="flex flex-col gap-y-5">
                  <Button
                    v-for="v in mcqQuestionFetcher.data.value.Answers" :key="v.Id" variant="quiz"
                    class="justify-start overflow-y-hidden overflow-x-scroll whitespace-nowrap py-7 text-xl"
                    @click="handleAnswer(v.Id)"
                  >
                    {{ v.Answer }}
                  </Button>
                </div>
              </template>
              <template v-else>
                <AppTaskPollPercentage :poll-sumarry="pollSummary" @next-question="handleNextQuestion()" />
              </template>
            </template>
          </AppCommonSpin>
        </div>
      </div>
    </section>
  </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
