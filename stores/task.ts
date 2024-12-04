import { acceptHMRUpdate, defineStore } from 'pinia'

export const useTaskStore = defineStore('task', () => {
  const videoTaskDetailsLink = ref<string>('')
  function setVideoTaskDetailsLinks(value: string) {
    videoTaskDetailsLink.value = value
  }
  function handleNavigateMcq(task: Api.Task.QuestResponse) {
    if (task.DetailLink)
      setVideoTaskDetailsLinks(task.DetailLink)
    navigateTo(`/detail/tasks/quiz/${task.QuestType}-${task.Id}`)
  }

  return {
    videoTaskDetailsLink,
    handleNavigateMcq,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
