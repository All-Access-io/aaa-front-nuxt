<script setup lang="ts">
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'
import { toast } from 'vue-sonner'
import { SsoProvider } from '~/composables/authStore'
import { SIGN_UP_BONUS_POINTS } from '~/lib/models'

const imagesLogo = [
  '/images/index/marquee.png',
  '/images/index/token2049.png',
  '/images/index/spartan-labs.png',
  '/images/index/all-access.png',
]

useReferralCode() // save referral code from query params for later use
const authStore = useAuthStore()
const appStore = useAppStore()
const [emailVerificationOpen, toggleEmailVerificationOpen] = useToggle()
const { showEarnModal } = useEarnModal()
const loginModel = reactive({
  email: '',
  code: '',
  ssoProvider: SsoProvider.Email,
  oAuthToken: '',
  oAuthVerifier: '',

  verificationCode: '',
  userId: '',
})
const formSchema = toTypedSchema(z.object({
  email: z.string().email(),
}))
const { handleSubmit } = useForm({
  validationSchema: formSchema,
})

const { status, execute: fetchLogin } = useAsyncData(async () => {
  const body: Api.Auth.LoginParams = {
    ssoProvider: loginModel.ssoProvider,
    email: loginModel.email,

    oAuthToken: loginModel.oAuthToken,
    oAuthVerifier: loginModel.oAuthVerifier,
    code: loginModel.code,
  }
  if (body.ssoProvider === 0) {
    return api<Api.Auth.User>('/api/User/Login', {
      method: 'post',
      body,
      onResponse({ response }) {
        if (response.ok) {
          const res = response._data as Api.Auth.LoginEmailResponse
          if (res.Error && res.ErrorMessage) {
            toast.error(res.ErrorMessage)
            return
          }
          toggleEmailVerificationOpen()
          loginModel.userId = res.UserId
        }
      },
    })
  }
  // sso provider
  return useNuxtApp().$api<Api.Auth.User>('/api/User/Login', {
    method: 'post',
    body,
    onResponse({ response }) {
      if (response.ok) {
        const res = response._data as Api.Auth.LoginEmailResponse
        if (res.Error && res.ErrorMessage) {
          toast.error(res.ErrorMessage)
          return
        }
        appStore.setIsRegister(res.IsRegister)
        if (res.IsRegister)
          showEarnModal(SIGN_UP_BONUS_POINTS, 'default')
        loginModel.userId = res.UserId
      }
    },
  })
}, {
  lazy: true,
  immediate: false,
})

const socialAuth = useNuxtApp().$socialAuth
async function handleSSOLogin(provider: SsoProvider) {
  const ssoProviders = {
    [SsoProvider.Email]: '',
    [SsoProvider.Facebook]: 'facebook',
    [SsoProvider.Instagram]: 'instagram',
    [SsoProvider.X]: 'x',
    [SsoProvider.Google]: 'google',
  }
  try {
    loginModel.ssoProvider = provider
    const res = await socialAuth.authenticate(ssoProviders[provider]) as Api.Auth.CommonSSOResponse
    loginModel.code = res.code
    await fetchLogin()
  }
  catch (err) {
    console.error(err)
  }
}

const onSubmit = handleSubmit((data) => {
  loginModel.email = data.email
  fetchLogin()
})

const { status: statusVerify, execute: fetchVerify } = useAsyncData(async () => {
  if (!loginModel.verificationCode || !loginModel.userId)
    return
  const body: Api.Auth.VerifyEmailParams = {
    verificationCode: Number(loginModel.verificationCode),
    userId: Number(loginModel.userId),
  }
  return api('/api/User/Verify', {
    method: 'post',
    body,
    onResponse({ response }) {
      if (!response.ok)
        return
      const res = response._data as Api.Auth.VerifyEmailResponse
      if (res.IsSuccess) {
        appStore.setIsRegister(res.IsRegister)
        authStore.login(res).then((success) => {
          if (success) {
            toggleEmailVerificationOpen(false)
            if (appStore.isRegister)
              showEarnModal(SIGN_UP_BONUS_POINTS, 'default')
            navigateTo('/user/profile')
          }
          else {
            toast.error('Failed to login. Please try again.')
          }
        })
      }
      else {
        toast.error('Invalid verification code. Please try again.')
      }
    },
  })
}, {
  lazy: true,
  immediate: false,
})
function handleVerification(code: string) {
  loginModel.verificationCode = code
  fetchVerify()
}

const { status: statusResend, execute: fetchResend } = useAsyncData(async () => {
  return useNuxtApp().$api(`/api/User/ResendVerification/${Number(loginModel.userId)}`, {
    onResponse(res) {
      if (res.response?._data?.IsSuccess)
        toast.success('New verification code has been sent to your email')
    },
  })
}, {
  lazy: true,
  immediate: false,
})
const verificationModalLoading = computed(() => statusResend.value === 'pending' || statusVerify.value === 'pending')
</script>

<template>
  <div class="flex size-full flex-col overflow-x-hidden">
    <AppModalEmailVerification
      v-model:open="emailVerificationOpen" :loading="verificationModalLoading"
      @submit="handleVerification" @resend="fetchResend"
    />

    <section class="mx-auto -mb-[4.8rem] max-w-lg">
      <img class="max-w-full" src="/images/index/tobi-bg.png">
    </section>

    <section class="relative flex h-screen min-h-[500px] w-full flex-1 flex-col items-center gap-y-8">
      <!-- <div
        class="relative min-w-[430px] scale-90 text-center font-poppins text-[80px] font-bold leading-[0.9] tracking-tight md:scale-100 short:translate-y-5 short:scale-[80%]"
      >
        <div class="text-outline2 text-background drop-shadow-[0px_3px_0px_hsl(var(--primary))]">
          <span class="text-primary-yellow">PERFORM</span> <br>
          TASKS, <br>
          <span class="text-primary-yellow">EARN</span> AAA <br>
          & <span class="text-primary-yellow">CLAIM</span> <br>
          REWARDS
        </div>
      </div> -->

      <div class="relative mb-20 mt-5 min-h-[252px] w-full">
        <div class="w-full overflow-hidden">
          <div class="absolute inset-0 w-full translate-x-20">
            <div class="flex w-full items-center justify-center">
              <div
                class="relative flex h-[252px] w-[222px] shrink-0 translate-y-2 -rotate-[8deg] flex-col rounded-lg border-2 border-primary bg-background"
              >
                <!-- <div class="absolute -top-14 right-10 text-white">
                  <div class="flex items-center gap-x-2">
                    <div class="text-right text-sm font-medium leading-4">
                      LIMITED <br>
                      MERCH
                    </div>
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.5061 21.0729C17.1737 21.514 16.5467 21.6021 16.1056 21.2698L8.91792 15.8534C8.47684 15.521 8.38872 14.894 8.72109 14.453C9.05347 14.0119 9.68047 13.9238 10.1215 14.2562L16.5106 19.0707L21.3252 12.6816C21.6575 12.2405 22.2845 12.1524 22.7256 12.4848C23.1667 12.8171 23.2548 13.4441 22.9224 13.8852L17.5061 21.0729ZM0.510399 0.977012C4.39594 0.113967 7.40304 0.141359 9.73745 0.959056C12.111 1.79045 13.6715 3.39712 14.721 5.429C15.7529 7.42664 16.3003 9.85098 16.6891 12.3834C16.8846 13.6567 17.043 14.9803 17.1989 16.3116C17.3555 17.6482 17.5094 18.9922 17.6977 20.3319L15.7172 20.6103C15.5249 19.2425 15.368 17.8719 15.2125 16.5442C15.0564 15.211 14.9017 13.9204 14.7123 12.6869C14.3313 10.2056 13.8217 8.04591 12.9441 6.34685C12.0842 4.68203 10.8827 3.47938 9.07627 2.84661C7.23071 2.20014 4.63987 2.10853 0.944063 2.92943L0.510399 0.977012Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div> -->
                <div class="h-[125px] w-full overflow-hidden rounded-t-lg">
                  <img src="/images/index/tobi-card-1.png" class="object-bottom">
                </div>
                <div class="flex flex-1 flex-col p-[11px]">
                  <div class="mb-1 flex items-center gap-x-1 text-2xs font-medium">
                    TOBI + BRENT
                  </div>
                  <h2 class="line-clamp-3 font-poppins text-xl font-medium leading-[1.65rem]">
                    Signed Poster
                  </h2>
                  <div class="line-clamp-3 flex-1" />
                  <div class="flex items-center gap-x-2">
                    <div class="text-2xs font-medium uppercase leading-3">
                      10 LUCKY WINNERS
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="relative flex h-[277px] w-[222px] shrink-0 -translate-x-20 flex-col rounded-lg border-2 border-primary bg-background"
              >
                <!-- <div class="absolute -top-10 left-5">
                  <div class="flex items-center gap-x-2 text-white">
                    <div class="text-right text-sm font-medium leading-4">
                      FREE <br>
                      INVITES
                    </div>
                    <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M17.5061 21.0729C17.1737 21.514 16.5467 21.6021 16.1056 21.2698L8.91792 15.8534C8.47684 15.521 8.38872 14.894 8.72109 14.453C9.05347 14.0119 9.68047 13.9238 10.1215 14.2562L16.5106 19.0707L21.3252 12.6816C21.6575 12.2405 22.2845 12.1524 22.7256 12.4848C23.1667 12.8171 23.2548 13.4441 22.9224 13.8852L17.5061 21.0729ZM0.510399 0.977012C4.39594 0.113967 7.40304 0.141359 9.73745 0.959056C12.111 1.79045 13.6715 3.39712 14.721 5.429C15.7529 7.42664 16.3003 9.85098 16.6891 12.3834C16.8846 13.6567 17.043 14.9803 17.1989 16.3116C17.3555 17.6482 17.5094 18.9922 17.6977 20.3319L15.7172 20.6103C15.5249 19.2425 15.368 17.8719 15.2125 16.5442C15.0564 15.211 14.9017 13.9204 14.7123 12.6869C14.3313 10.2056 13.8217 8.04591 12.9441 6.34685C12.0842 4.68203 10.8827 3.47938 9.07627 2.84661C7.23071 2.20014 4.63987 2.10853 0.944063 2.92943L0.510399 0.977012Z"
                        fill="currentColor" />
                    </svg>
                  </div>
                </div> -->
                <div class="h-[125px] w-full overflow-hidden rounded-t">
                  <img src="/images/index/tobi-card-2.png" class="object-bottom">
                </div>
                <div class="flex flex-1 flex-col p-[11px]">
                  <div class="mb-1 flex items-center gap-x-1 text-2xs font-medium">
                    TOBI + BRENT
                  </div>
                  <h2 class="line-clamp-3 font-poppins text-xl font-medium  leading-[1.65rem]">
                    FREE Invitation to Marquee Club
                  </h2>
                  <div class="line-clamp-3 flex-1" />
                  <div class="flex items-center gap-x-2">
                    <div class="text-2xs font-medium uppercase leading-3">
                      FIRST 100 <br>FAAANS
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="relative flex h-[285px] w-[222px] shrink-0 -translate-x-40 translate-y-1 rotate-[8deg] flex-col rounded-lg border-2 border-primary bg-background"
              >
                <!-- <div class="absolute -top-10 left-5">
                  <div class="flex items-center gap-x-2 text-white">
                    <div class="text-right text-sm font-medium leading-4">
                      UNIQUE <br>
                      EXPERIENCES
                    </div>
                    <svg
                      class="rotate-12" width="24" height="22" viewBox="0 0 24 22" fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.5061 21.0729C17.1737 21.514 16.5467 21.6021 16.1056 21.2698L8.91792 15.8534C8.47684 15.521 8.38872 14.894 8.72109 14.453C9.05347 14.0119 9.68047 13.9238 10.1215 14.2562L16.5106 19.0707L21.3252 12.6816C21.6575 12.2405 22.2845 12.1524 22.7256 12.4848C23.1667 12.8171 23.2548 13.4441 22.9224 13.8852L17.5061 21.0729ZM0.510399 0.977012C4.39594 0.113967 7.40304 0.141359 9.73745 0.959056C12.111 1.79045 13.6715 3.39712 14.721 5.429C15.7529 7.42664 16.3003 9.85098 16.6891 12.3834C16.8846 13.6567 17.043 14.9803 17.1989 16.3116C17.3555 17.6482 17.5094 18.9922 17.6977 20.3319L15.7172 20.6103C15.5249 19.2425 15.368 17.8719 15.2125 16.5442C15.0564 15.211 14.9017 13.9204 14.7123 12.6869C14.3313 10.2056 13.8217 8.04591 12.9441 6.34685C12.0842 4.68203 10.8827 3.47938 9.07627 2.84661C7.23071 2.20014 4.63987 2.10853 0.944063 2.92943L0.510399 0.977012Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                </div> -->
                <div class="h-[125px] w-full overflow-hidden rounded-t">
                  <img src="/images/index/tobi-card-3.png" class="object-center">
                </div>
                <div class="flex flex-1 flex-col p-[11px]">
                  <div class="mb-1 flex items-center gap-x-1 text-2xs font-medium">
                    TOBI + BRENT
                  </div>
                  <h2 class="font-poppins text-xl font-medium  leading-[1.65rem]">
                    Dillon Francis Meet & Greet
                  </h2>
                  <div class="line-clamp-3 flex-1" />
                  <div class="flex items-center gap-x-2">
                    <div class="text-2xs font-medium uppercase leading-3">
                      10 LUCKY WINNER!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="-my-5 flex flex-col items-center gap-x-2">
        <div class="flex items-center gap-x-2 font-poppins text-2xl">
          <svg width="14" height="21" viewBox="0 0 14 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 0.771851C3.13 0.771851 0 3.90185 0 7.77185C0 13.0219 7 20.7719 7 20.7719C7 20.7719 14 13.0219 14 7.77185C14 3.90185 10.87 0.771851 7 0.771851ZM7 10.2719C6.33696 10.2719 5.70107 10.0085 5.23223 9.53962C4.76339 9.07078 4.5 8.43489 4.5 7.77185C4.5 7.10881 4.76339 6.47292 5.23223 6.00408C5.70107 5.53524 6.33696 5.27185 7 5.27185C7.66304 5.27185 8.29893 5.53524 8.76777 6.00408C9.23661 6.47292 9.5 7.10881 9.5 7.77185C9.5 8.43489 9.23661 9.07078 8.76777 9.53962C8.29893 10.0085 7.66304 10.2719 7 10.2719Z"
              fill="#FF0000"
            />
          </svg>
          <span><span class="font-semibold">MARQUEE</span> Singapore</span>
        </div>
        <div class="mt-1 font-poppins font-medium">
          17 SEPT • 9PM TIL LATE
        </div>
        <!-- <AppAAACurrency :value="SIGN_UP_BONUS_POINTS" same-text-size class="!text-[1.5rem]" :hide-text="false" /> -->
        <!-- <span class="-translate-y-[0.45px] text-2xl font-semibold">Sign up bonus!</span> -->
      </div>
      <div class="container flex w-full flex-col items-center justify-center gap-y-4 md:px-4">
        <div class="flex w-full max-w-lg flex-col items-center gap-y-3 rounded-xl bg-primary-yellow p-4">
          <div class="mb-3 flex flex-col text-center">
            <div class="text-xl font-semibold">
              Signup for the ticket raffle to
            </div>
            <div>
              Web3 with Tobi & Brent Featuring Dillon Francis and more
            </div>
          </div>

          <FormField v-slot="{ componentField }" name="email">
            <FormControl>
              <Input
                placeholder="Enter your email to begin" class="bg-background/50 text-center"
                v-bind="componentField"
              />
            </FormControl>
            <FormMessage class="-my-2" />
          </FormField>
          <Button variant="primaryY" class="self-stretch" :loading="status === 'pending'" @click="onSubmit">
            verify now
          </Button>
        </div>
        <div class=" hidden flex-col items-center justify-center gap-y-2">
          <div>or sign up with</div>
          <div class="flex items-center justify-evenly gap-x-4">
            <Button
              disabled variant="primaryY" class="size-12 p-[0.6rem]"
              @click="handleSSOLogin(SsoProvider.Facebook)"
            >
              <img src="~/assets/images/Icon_FB.svg" class="max-w-full">
            </Button>
            <Button
              disabled variant="primaryY" class="size-12 p-[0.6rem]"
              @click="handleSSOLogin(SsoProvider.Instagram)"
            >
              <img src="~/assets/images/Icon_IG-alt.svg" class="max-w-full">
            </Button>
            <Button disabled variant="primaryY" class="size-12 p-[0.6rem]" @click="handleSSOLogin(SsoProvider.X)">
              <img src="~/assets/images/Icon_X-alt.svg" class="max-w-full">
            </Button>
            <Button disabled variant="primaryY" class="size-12 p-[0.6rem]" @click="handleSSOLogin(SsoProvider.Google)">
              <img src="~/assets/images/Icon_Google.svg" class="max-w-full">
            </Button>
          </div>
        </div>
      </div>
    </section>

    <div class="mb-16 mt-20 w-full overflow-hidden">
      <div class="group relative inline-flex w-full flex-nowrap overflow-x-hidden">
        <div
          class="flex animate-infinite-scroll items-center justify-center group-hover:paused [&_img]:max-w-none [&_li]:mx-8"
        >
          <li v-for="v in imagesLogo" :key="v" class="list-none">
            <img :src="v" class="h-[60px] object-contain object-center">
          </li>
        </div>
        <div
          class="flex animate-infinite-scroll items-center justify-center group-hover:paused [&_img]:max-w-none [&_li]:mx-8"
        >
          <li v-for="v in imagesLogo" :key="v" class="list-none">
            <img :src="v" class="h-[60px] object-contain object-center">
          </li>
        </div>
        <div
          class="flex animate-infinite-scroll items-center justify-center group-hover:paused [&_img]:max-w-none [&_li]:mx-8"
        >
          <li v-for="v in imagesLogo" :key="v" class="list-none">
            <img :src="v" class="h-[60px] object-contain object-center">
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
