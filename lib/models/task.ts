export const taskTypeMap = {
  Mcq: 0,
  ScanQr: 1,
  OpenEnded: 2,
  SocialTask: 3,

  // TODO: to be confirmed
  Referral: 50,
}

export enum QuestStateEnum {
  All = 0,
  Incomplete = 1,
  Completed = 2,
  Pending = 3,
  Failed = 4,
}

export enum QuestAvailabilityEnum {
  Expired = 0,
  Active = 1,
  ComingSoon = 2,
}

export function useQuestState(task: Api.Task.Task | Ref<Api.Task.Task> | Api.Task.QuestResponse | Ref<Api.Task.QuestResponse>) {
  function _getQuestState(task: Api.Task.Task | Ref<Api.Task.Task> | Api.Task.QuestResponse | Ref<Api.Task.QuestResponse>) {
    if (isRef(task))
      return task.value?.QuestCompletionStatus
    return task?.QuestCompletionStatus
  }

  return {
    isIncomplete: computed(() => _getQuestState(task) === QuestStateEnum.Incomplete),
    isCompleted: computed(() => _getQuestState(task) === QuestStateEnum.Completed),
    isPending: computed(() => _getQuestState(task) === QuestStateEnum.Pending),
    isFailed: computed(() => _getQuestState(task) === QuestStateEnum.Failed),
  }
}

export function useQuestAvailability(task: Api.Task.Task | Ref<Api.Task.Task> | Api.Task.QuestResponse | Ref<Api.Task.QuestResponse>) {
  function _getQuestAvailability(task: Api.Task.Task | Ref<Api.Task.Task> | Api.Task.QuestResponse | Ref<Api.Task.QuestResponse>) {
    if (isRef(task))
      return task.value?.QuestAvailability
    return task?.QuestAvailability
  }

  return {
    isExpired: computed(() => _getQuestAvailability(task) === QuestAvailabilityEnum.Expired),
    isActive: computed(() => _getQuestAvailability(task) === QuestAvailabilityEnum.Active),
    isComingSoon: computed(() => _getQuestAvailability(task) === QuestAvailabilityEnum.ComingSoon),
  }
}
