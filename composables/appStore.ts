import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const locale = ref<string>('en')
  function toggleLocale(newLocale: string) {
    locale.value = newLocale
  }

  const userProfileSelectedTab = ref<string>('tasks')

  const shownExploreMessage = ref<boolean>(false)
  const shownRankMessage = ref<boolean>(false)

  const isRegister = ref<boolean>(false)
  const hasEnteredReferralCode = ref<boolean>(false)
  const hasShownReferralCodeInput = ref<boolean>(false)

  const navigatedFrom = ref<string>('')
  function setNavigatedFrom(value: string) {
    navigatedFrom.value = value
  }

  function resetState() {
    shownExploreMessage.value = false
    shownRankMessage.value = false
    isRegister.value = false
    hasEnteredReferralCode.value = false
    hasShownReferralCodeInput.value = false
  }
  return {
    locale,
    toggleLocale,

    userProfileSelectedTab,

    shownExploreMessage,
    setShownExploreMessage(value: boolean) {
      shownExploreMessage.value = value
    },
    shownRankMessage,
    setShownRankMessage(value: boolean) {
      shownRankMessage.value = value
    },
    resetState,

    isRegister,
    setIsRegister(value: boolean) {
      isRegister.value = value
    },
    hasEnteredReferralCode,
    setEnteredReferralCode(value: boolean) {
      hasEnteredReferralCode.value = value
    },
    hasShownReferralCodeInput,
    setHasShownReferralCodeInput(value: boolean) {
      hasShownReferralCodeInput.value = value
    },

    navigatedFrom,
    setNavigatedFrom,
  }
}, {
  persist: {
    storage: persistedState.localStorage,
  },
})
if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot))
