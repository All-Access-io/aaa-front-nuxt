import { useStorage as useVStorage } from '@vueuse/core'
import { toast } from 'vue-sonner'

function _useReferralCode() {
  const referralCode = useVStorage('referralCode', '')
  const referralCodeInput = ref('')
  const [referralCodeInputOpen, toggleReferralCodeInputOpen] = useToggle()
  const appStore = useAppStore()
  const route = useRoute()
  function setReferralCode() {
    if (route.path === '/') {
      const code = route.query.referralCode
      if (code)
        referralCode.value = String(code)
    }
  }
  setReferralCode()

  const fetcherReferralCode = () => useApi(() => `/api/User/LinkReferral/${referralCodeInput.value}`, {
    immediate: false,
    watch: false,
    default: () => null,
    method: 'GET',
    onResponse() {
      appStore.setEnteredReferralCode(true)
      toggleReferralCodeInputOpen(false)
      toast.success('Referral code linked successfully')
    },
  })

  function checkShouldShowReferralCodeInput() {
    if (appStore.hasShownReferralCodeInput)
      return
    if (appStore.isRegister && !appStore.hasEnteredReferralCode) {
      toggleReferralCodeInputOpen(true)
      appStore.setHasShownReferralCodeInput(true)
    }
  }
  watchOnce(referralCodeInputOpen, () => {
    referralCodeInput.value = referralCode.value
  })

  return {
    referralCode,
    referralCodeInput,

    referralCodeInputOpen,
    toggleReferralCodeInputOpen,
    checkShouldShowReferralCodeInput,

    fetcherReferralCode,
  }
}

export const useReferralCode = createSharedComposable(_useReferralCode)

function _useSelfReferralCode() {
  const { referralCode } = useAuthStore()
  const referralLink = computed(() => {
    return `${window.location.origin}/?referralCode=${referralCode}`
  })
  const referralMessage = computed(() => {
    return `Register your AAA account and earn points! ${referralLink.value}`
  })

  const { copy, copied } = useClipboard({ legacy: true, source: referralCode })
  const { copy: copyLink, copied: copiedLink } = useClipboard({ legacy: true, source: referralLink })
  const { copy: copyMessage, copied: copiedMessage } = useClipboard({ legacy: true, source: referralMessage })
  const { share, isSupported } = useShare()
  function shareLink() {
    if (isSupported.value) {
      share({
        title: 'Register your AAA account and earn points!',
        text: referralMessage.value,
        url: referralLink.value,
      })
    }
  }
  watchEffect(() => {
    if (copied.value)
      toast.success('Referral Code copied to clipboard')
    if (copiedLink.value || copiedMessage.value)
      toast.success('Referral Link copied to clipboard')
  })

  return {
    referralCode,
    copyReferralCode: copy,

    referralLink,
    referralMessage,
    copyLink,
    copyMessage,

    shareLink,
    isSupported,
  }
}

export const useSelfReferralCode = createSharedComposable(_useSelfReferralCode)
