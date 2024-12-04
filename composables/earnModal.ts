export type EarnModalType = 'default' | 'task' | 'perfect' | 'voting' | 'submitted'
export interface EarnModalOptions {
  perfectBonusValue?: number
}
function _useEarnModal() {
  const [open, toggleOpen] = useToggle(false)
  const _type = ref<EarnModalType>('default')
  const fanValue = ref(2500)
  const _perfectBonusValue = ref(200)
  const authStore = useAuthStore()

  function toWallet() {
    navigateTo('/wallet/explore')
    setTimeout(() => toggleOpen(false), 700)
  }
  function toEarn() {
    navigateTo('/user/earn')
    setTimeout(() => toggleOpen(false), 700)
  }
  function toRewards() {
    navigateTo('/user/profile')
    setTimeout(() => toggleOpen(false), 700)
  }
  return {
    open,
    type: computed(() => _type.value),
    toggleOpen,
    fanValue,
    toWallet,
    toEarn,
    toRewards,
    perfectBonusValue: computed(() => _perfectBonusValue.value),
    showEarnModal(value: number, type?: EarnModalType, onClose?: () => void, opts: EarnModalOptions = {}) {
      authStore.getUserPoints() // refresh user points
      const route = useRoute()
      const currentRoute = route.name
      const reactiveRoute = computed(() => route.name)
      fanValue.value = value

      if (opts.perfectBonusValue)
        _perfectBonusValue.value = opts.perfectBonusValue
      if (type)
        _type.value = type
      toggleOpen(true)
      watchOnce(open, () => {
        if (currentRoute !== reactiveRoute.value) // skip if route changed
          return
        if (onClose)
          onClose()
      })
    },
  }
}

export const useEarnModal = createSharedComposable(_useEarnModal)
