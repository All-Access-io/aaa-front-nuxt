import { useStorage as useVStorage } from '@vueuse/core'
import { tryit } from 'radash'

export enum SsoProvider {
  Email = 0,
  Facebook = 1,
  Google = 2,
  X = 3,
  Instagram = 4,
}

export const useAuthStore = defineStore('auth', () => {
  const token = useVStorage('token', '')
  const _userId = useVStorage('userId', -1)
  const hasInited = ref(false)
  const isLoggedIn = computed(() => !!token.value && token !== null)
  const appStore = useAppStore()

  const userInfo = reactive<Api.Auth.User>({
    Id: -1,
    ReferralCode: '',
    Email: '',
    UserName: '',
    FullName: '',
    FirstName: '',
    LastName: '',
    SsoProvider: 0,
    RoleId: -1,
    WalletAddress: '',
    ProfileCompleted: false,
    IsVerify: true,
  })

  const userPoints = ref(0)
  async function getUserPoints() {
    const [error, data] = await tryit(api<Api.Auth.UserPointResponse>)(`/api/Point/GetUserPoint`)
    if (!error) {
      userPoints.value = data.Points
      return true
    }
    console.error(error)
    return false
  }

  async function getUserInfo() {
    const [error, data] = await tryit(api<Api.Auth.User>)(`/api/User/GetUserInfo`)
    if (!error) {
      _userId.value = data.Id
      Object.assign(userInfo, data)
      return true
    }
    console.error(error)
    return false
  }

  async function initUserInfo() {
    if (hasInited.value)
      return
    if (isLoggedIn.value) {
      const pass = await getUserInfo()
      if (pass) {
        hasInited.value = true
        getUserPoints()
      }
      else { logout(false) }
    }
  }

  async function logout(redirect?: boolean) {
    token.value = null
    userInfo.Id = -1
    appStore.resetState()
    redirect && navigateTo('/')
  }

  return {
    token,
    isLoggedIn,
    userInfo,

    async login(res: Api.Auth.VerifyEmailResponse) {
      if (!res.AccessToken)
        return
      token.value = res.AccessToken
      return getUserInfo()
    },
    initUserInfo,
    logout,
    getUserInfo,
    clearToken() {
      logout()
    },

    referralCode: computed(() => userInfo.ReferralCode),

    userPoints,
    getUserPoints,
  }
})
