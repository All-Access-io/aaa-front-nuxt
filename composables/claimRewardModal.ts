import defu from 'defu'

export interface ClaimRewardModalOptions {
  type: 'raffle' | 'claim'
  onClose?: () => void
}

const defaultOptions: ClaimRewardModalOptions = {
  type: 'claim',
}

function _useClaimRewardModal() {
  const [open, toggleOpen] = useToggle(false)
  const _points = ref(2500)
  const _reward = ref<Api.Reward.Reward>()
  const _type = ref<ClaimRewardModalOptions['type']>('claim')
  const authStore = useAuthStore()

  function toRewards() {
    navigateTo('/user/claim')
    setTimeout(() => toggleOpen(false), 700)
  }
  return {
    open,
    toggleOpen,
    points: _points,
    reward: _reward,
    type: _type,
    toRewards,
    showClaimRewardModal(points: number, reward: Api.Reward.Reward, _opts?: ClaimRewardModalOptions) {
      const opts = defu(_opts, defaultOptions)

      authStore.getUserPoints() // refresh user points
      const route = useRoute()
      const currentRoute = route.name
      const reactiveRoute = computed(() => route.name)
      _points.value = points
      reward = JSON.parse(JSON.stringify(reward))
      if (reward && !reward.IsClaimedFinish)
        reward.IsClaimedFinish = true

      _reward.value = reward
      _type.value = opts.type

      toggleOpen(true)
      watchOnce(open, () => {
        if (currentRoute !== reactiveRoute.value) // skip if route changed
          return
        if (opts?.onClose)
          opts.onClose()
      })
    },
  }
}

export const useClaimRewardModal = createSharedComposable(_useClaimRewardModal)
