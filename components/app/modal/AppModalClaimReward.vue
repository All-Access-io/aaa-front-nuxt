<script setup lang="ts">
const { points, reward, toggleOpen, toRewards, open, type } = useClaimRewardModal()

const countDown = ref(5)
const interval = ref<ReturnType<typeof setInterval>>()

watch(open, () => {
  if (open.value) {
    clearInterval(interval.value)
    countDown.value = 5
    interval.value = setInterval(() => {
      countDown.value -= 1
      if (countDown.value <= 0)
        toggleOpen(false)
    }, 1000)
  }
  else {
    countDown.value = 5
    clearInterval(interval.value)
  }
})

const format = useFormat().currency

const titleText = computed(() => {
  if (type.value === 'raffle')
    return 'raffle <br> joined!'
  return 'reward <br> claimed!'
})

const statusText = computed(() => {
  return 'Spent'
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent class="h-screen bg-primary-green">
      <DialogHeader class="overflow-y-auto pt-10 short:pt-5 xshort:pt-2">
        <DialogTitle class="flex flex-col items-center">
          <div>
            <div
              class="min-w-[300px] scale-[90%] text-center font-poppins text-[60px] font-bold leading-[0.9] tracking-tight sm:scale-90 md:scale-100"
            >
              <div class="text-main-style uppercase" v-html="titleText" />
            </div>
            <div class="mt-1 flex flex-col items-center justify-center gap-x-1 text-2xl font-semibold text-primary">
              <div class="my-4 flex items-center gap-x-1">
                <AppAAALogo class="size-[0.9em]" /> {{ format(points) }} $AAA&nbsp;{{ statusText }}
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogDescription class="h-full">
          <div class="flex h-full flex-col items-center">
            <template v-if="reward">
              <AppClaimCard :reward="reward!" class="pointer-events-none my-5 bg-background text-left text-primary" />
            </template>

            <div class="flex flex-col gap-y-4">
              <Button
                v-if="reward?.RewardType !== rewardTypeMap.Raffle"
                variant="primaryY" size="lg" class="rounded-xl font-bold md:px-10 md:text-lg"
                @click="toggleOpen(false)"
              >
                USE NOW
              </Button>
              <Button variant="primaryG" size="lg" class="rounded-xl font-bold md:px-10 md:text-lg" @click="toRewards">
                BROWSE MORE REWARDS
              </Button>
            </div>

            <div class="mt-10 text-center text-lg  font-bold tracking-wider text-primary">
              BACK TO REWARDS IN {{ countDown }}s...
            </div>
            <div class="absolute bottom-0 -z-10 w-full opacity-50 short:translate-y-24 xshort:translate-y-64">
              <img src="/images/rock-bg.png" class="size-full object-cover">
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<style>
</style>
