<script setup lang="ts">
import { toast } from 'vue-sonner'

const router = useRouter()
const { data, status } = useApi<Api.Spin.GetSpinByIdResponse>(`/api/Spin/GetLatestActiveSpin`, {
  showGlobalLoading: true,
  onResponseError() {
    toast.error('Spin activity is not available currently')
    router.back()
  },
  default: () => null,
})

const id = computed(() => data.value?.Id)
watchOnce(data, () => {
  if (!id.value) {
    toast.error('Spin activity is not available currently')
    router.back()
  }
})

const rouletteLiveWinRef = ref()
const fetchSpinWheel = useApi<Api.Spin.SpinWheelResponse>(`/api/Spin/SpinWheel`, {
  method: 'post',
  immediate: false,
  watch: false,
  query: {
    spinId: id,
  },
})

const authStore = useAuthStore()
const [isPlaying, toggleIsPlaying] = useToggle(false)
const [hasWonReward, toggleHasWonReward] = useToggle(false)
const { breakpoints } = useUiConfig()
const isMobile = breakpoints.smallerOrEqual('md')
const isSmMobile = breakpoints.smallerOrEqual('sm')
const [showPrize, toggleShowPrize] = useToggle()

const mySlotMachine = ref()
const speed = ref(1)
const width = computed(() => isMobile ? '95vw' : '80vw')
const height = computed(() => {
  if (isSmMobile.value)
    return '360px'
  else
    return '400px'
})
watch(isMobile, () => {
  mySlotMachine.value?.init()
})

function getPrizeImgIndexById(id: number) {
  if (!data.value || !data.value.Prizes)
    return 0
  const index = data.value.Prizes.findIndex(v => v.Id === id)
  if (index < 0)
    return 0
  return index
}

const prizeImgs = computed(() => {
  if (!data.value || !data.value.Prizes)
    return []

  const imgs = data.value.Prizes.map(v => v.Image)

  if (isSmMobile.value) {
    return imgs.map(v => ({
      imgs: [{
        src: v,
        width: '74.766vw',
        height: '350px',
      }],
    }))
  }

  return imgs.map(v => ({
    imgs: [{
      src: v,
      width: '320px',
      height: '400px',
    }],
  }))
})
watch(prizeImgs, () => {
  if (prizeImgs.value.length > 0)
    resetSlotMachine()
}, {
  flush: 'post',
})

function resetSlotMachine() {
  setTimeout(() => {
    speed.value = 1
    mySlotMachine.value?.init()
    mySlotMachine.value?.play()
  }, 1000)
}

async function handlePlay() {
  if (authStore.userPoints < data.value?.Point) {
    toast.error('Insufficient points left.')
    return
  }
  if (isPlaying.value)
    return
  toggleIsPlaying(true)
  toggleHasWonReward(false)
  authStore.getUserPoints()
  speed.value = 15
  mySlotMachine.value?.init()
  mySlotMachine.value?.play()
  await fetchSpinWheel.execute()
  if (fetchSpinWheel.data.value?.IsSuccess && fetchSpinWheel.data.value?.IsWin && fetchSpinWheel.data.value?.Id !== null && fetchSpinWheel.data.value?.Image !== null) {
    setTimeout(() => {
      toggleHasWonReward(true)
      mySlotMachine.value?.stop(getPrizeImgIndexById(fetchSpinWheel.data.value.Id))
    }, 4500)
  }
  else {
    setTimeout(() => {
      if (fetchSpinWheel.data.value?.Error)
        toast.error(fetchSpinWheel.data.value.ErrorMessage)
      else if (fetchSpinWheel.data.value?.IsWin === false)
        toast.info('You did not win any prize, please try again')
      else
        toast.error('Something went wrong, please try again later')
      toggleIsPlaying(false)
      toggleHasWonReward(false)
      mySlotMachine.value?.stop(-1)
      resetSlotMachine()
    }, 4500)
  }
}

function handleShowPrize() {
  if (!hasWonReward.value)
    return
  setTimeout(() => {
    toggleShowPrize(true)
    toggleIsPlaying(false)
  }, 200)
}

function handleClaimPrize() {
  toast.success('You have claimed this reward successfully')
  toggleShowPrize(false)
  rouletteLiveWinRef.value?.fetchData()
  resetSlotMachine()
}
</script>

<template>
  <div>
    <AppMobilePageHeader>
      <template #leftText>
        <div class="font-semibold uppercase tracking-wider">
          <slot name="leftText">
            REWARD ROULETTE
          </slot>
        </div>
      </template>
    </AppMobilePageHeader>

    <AlertDialog v-model:open="showPrize">
      <AlertDialogContent
        class="w-fit rounded-xl border border-primary-green2 bg-primary p-0 drop-shadow-[0_0_50px_#AAFF82]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div class="relative flex h-[480px] w-[384px] flex-col items-center justify-end">
              <img
                v-if="fetchSpinWheel.data.value.Image" :src="fetchSpinWheel.data.value.Image"
                class="absolute inset-0 -z-10 size-full object-cover"
              >
              <Button
                variant="primaryG" class="my-8 w-4/5 min-w-20 rounded-2xl font-bold" size="lg"
                @click="handleClaimPrize"
              >
                Claim now
              </Button>
            </div>
          </AlertDialogTitle>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>

    <div>
      <div
        class="relative z-10 flex size-full min-h-[calc(100vh-72px)] w-full flex-col items-center justify-between gap-y-4 bg-[url('/images/roulette-bg.png')] bg-cover bg-center pb-10 md:pb-20"
      >
        <AppRouletteLiveWin ref="rouletteLiveWinRef" :is-playing="isPlaying" />

        <template v-if="data?.Prizes">
          <SlotMachine
            ref="mySlotMachine" :width="width" :height="height" :blocks="[
            ]" :slots="[
              { speed },
            ]" :prizes="prizeImgs" :default-config="{
              mode: 'horizontal',
              colSpacing: '20px',
              decelerationTime: 5000,
            }" @end="handleShowPrize"
          />
        </template>
        <div
          class="absolute top-1/2 -z-50 aspect-[320/400] w-3/5 -translate-y-1/2 bg-[radial-gradient(circle,_rgba(255,57,235,1)_0%,_rgba(148,187,233,0)_71%)]"
        />

        <div
          class=" hidden w-[320px] flex-col justify-between overflow-hidden rounded-lg border-2 border-primary p-4 py-7
          shadow-[0_0_240px_50px_#FF39EB]"
          style="background: linear-gradient(to bottom, rgba(0,0,0,1), rgba(0,0,0,0)), url('/images/roulette-card.png') center/cover;"
        >
          <div class="flex flex-col items-center justify-center gap-y-2">
            <div class="text-center font-poppins text-[54px] font-bold leading-[2.6rem] text-primary-green">
              1,000 FAN
            </div>
            <div class="flex items-center justify-center text-xs font-medium text-background">
              <div class="flex origin-left scale-75 -space-x-3">
                <Avatar size="xs">
                  <AvatarImage src="/images/avatar1.png" />
                </Avatar>
                <Avatar size="xs">
                  <AvatarImage src="/images/avatar2.png" />
                </Avatar>
                <Avatar size="xs">
                  <AvatarImage src="/images/avatar3.png" />
                </Avatar>
                <div
                  class="flex aspect-square size-full items-center justify-center rounded-full bg-primary-yellow p-[1.2px] text-primary"
                >
                  <span class="text-1xs">+150</span>
                </div>
              </div>
              <div>HAVE WON REWARDS!</div>
            </div>
            <AppRockLogo
              class="-mb-[20px] -mt-[50px] size-[400px] drop-shadow-[0_240px_240px_#FFF4B0]"
              style="-webkit-filter: drop-shadow(0 1px 34px rgb(255,244,176)); filter: drop-shadow(0 1px 34px rgb(255,244,176));"
            />
          </div>
        </div>

        <div class="group relative aspect-square rounded-full hover:cursor-pointer" @click="handlePlay">
          <div
            class="absolute inset-0 z-0 w-full translate-y-2 rounded-full bg-[#3139FF] shadow-[inset_0_0_5px_2px_#E6FFE795]"
          />
          <!-- eslint-disable tailwindcss/no-contradicting-classname -->
          <template v-if="!isPlaying && status !== 'pending'">
            <div
              class="relative flex aspect-square size-[120px] flex-col items-center justify-center rounded-full border-2 border-[#DBFFEE] bg-gradient-to-bl from-[#f7fff7] from-10% via-[#88FF8D] to-[#00E8AE] p-2 shadow-[0_0_24px_2px_#62f79d] transition-transform duration-200 group-hover:translate-y-2"
            >
              <!-- <AppAAALogo
                class="mb-1 size-5"
              /> -->
              <i class="i-custom-aaa-logo mb-1 size-5" />
              <div class="font-kannit neon-text-shadow text-center font-bold leading-4">
                {{ data?.Point }} TO<br>
                PLAY
              </div>
              <div class="text-xs font-semibold drop-shadow-[0_1px_2px_0_#AAFF82]">
                Tap here!
              </div>
              <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_d_10369_10251)">
                  <path
                    d="M19 9.26795C20.3333 10.0377 20.3333 11.9622 19 12.732L7 19.6603C5.66667 20.4301 4 19.4678 4 17.9282L4 4.0718C4 2.5322 5.66667 1.56994 7 2.33975L19 9.26795Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <filter
                    id="filter0_d_10369_10251" x="0" y="0.0683594" width="24" height="25.8633"
                    filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"
                  >
                    <feFlood flood-opacity="0" result="BackgroundImageFix" />
                    <feColorMatrix
                      in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                      result="hardAlpha"
                    />
                    <feOffset dy="2" />
                    <feGaussianBlur stdDeviation="2" />
                    <feComposite in2="hardAlpha" operator="out" />
                    <feColorMatrix type="matrix" values="0 0 0 0 0.160682 0 0 0 0 0.502132 0 0 0 0 0 0 0 0 0.4 0" />
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10369_10251" />
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10369_10251" result="shape" />
                  </filter>
                </defs>
              </svg>
            </div>
          </template>
          <template v-else>
            <div
              class="relative flex aspect-square size-[120px] flex-col items-center justify-center rounded-full border-2 border-[#DBFFEE] bg-gradient-to-bl from-[#f7fff7] from-10% via-[#88FF8D] to-[#00E8AE] p-2 shadow-[0_0_24px_2px_#62f79d] transition-transform duration-200 group-hover:translate-y-2"
            >
              <i class="i-lucide-loader-circle !aspect-square size-10 animate-spin" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.neon-text-shadow {
  filter: drop-shadow(0px 2px 0px #6cffca) drop-shadow(0px 2px 6px #01a66b);
}
</style>
