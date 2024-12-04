<script setup lang="ts">
const { open, fanValue, type, toWallet, toEarn, toRewards, perfectBonusValue } = useEarnModal()

const format = useFormat().currency

const isTypeTaskVotingOrPerfect = computed(() => ['task', 'voting', 'perfect'].includes(type.value))

const titleText = computed(() => {
  if (type.value === 'perfect')
    return 'perfect <br> score'
  else if (type.value === 'voting')
    return 'voting <br> completed'
  else if (type.value === 'submitted')
    return 'task <br> submitted'
  else
    return 'task <br> completed'
})

const statusText = computed(() => {
  if (['task', 'voting', 'perfect'].includes(type.value))
    return 'EARNED'
  else if (type.value === 'submitted')
    return 'Pending...'
  else
    return 'EARNED'
})
</script>

<template>
  <Dialog v-model:open="open">
    <DialogContent v-if="type === 'default'" class="h-screen bg-primary-green">
      <DialogHeader class="overflow-y-auto pb-5 pt-10 short:pt-5 xshort:pt-2">
        <DialogTitle class="flex flex-col items-center">
          <div class="flex flex-col items-center">
            <AppAAALogo class="size-[320px] drop-shadow-sm short:size-[200px] xshort:size-[150px]" />
            <div
              class="min-w-[300px] text-center font-poppins text-[60px] font-bold leading-[0.9] tracking-tight md:text-[80px] short:text-[60px]"
            >
              <div class="text-main-style">
                WELCOME <br> BONUS!
              </div>
            </div>
            <div class="my-4">
              <AppAAACurrency
                :value="fanValue" is-earned show-sign class="text-[1.5rem]" same-text-size
                logo-class="text-[1.2em] -mt-1"
              />
            </div>
          </div>
        </DialogTitle>
        <DialogDescription class="size-full">
          <div class="mt-5 flex flex-col items-center gap-y-4 xshort:mt-0">
            <Button
              variant="primary" size="lg" class="w-full max-w-md rounded-xl font-bold md:px-10 md:text-lg"
              @click="toWallet"
            >
              explore my fan wallet
            </Button>
            <Button variant="primaryG" class="w-full max-w-md rounded-xl font-bold md:px-10 md:text-lg" @click="toEarn">
              earn more aaa
            </Button>
            <Button
              variant="primaryG" class="w-full max-w-md rounded-xl font-bold md:px-10 md:text-lg"
              @click="toRewards"
            >
              browse rewards
            </Button>
            <div class="absolute top-0 -z-10 w-full short:-translate-y-24 xshort:-translate-y-40">
              <img src="/images/welcome-earned-bg.png" class="size-full object-cover">
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
    <DialogContent v-else class="h-screen bg-primary-green">
      <DialogHeader class="overflow-y-auto pt-10 short:pt-5 xshort:pt-2">
        <DialogTitle class="flex flex-col items-center">
          <div>
            <div
              class="min-w-[300px] scale-[90%] text-center font-poppins text-[60px] font-bold leading-[0.9] tracking-tight sm:scale-90 md:scale-100"
            >
              <img
                v-if="isTypeTaskVotingOrPerfect" src="~/assets/images/stamp-tick-white.png"
                class="inline-block size-[1.4em]"
              >
              <div class="text-main-style uppercase" v-html="titleText" />
            </div>
            <div class="mt-1 flex flex-col items-center justify-center gap-x-1 text-2xl font-semibold text-primary">
              <div class="flex items-center gap-x-1">
                <AppAAALogo class="size-[0.9em]" /> {{ format(fanValue) }} AAA&nbsp;{{ statusText }}
              </div>
              <div v-if="type === 'perfect'" class="mt-2 rounded-md bg-[#FFDB00] px-2 py-1.5 text-sm font-semibold">
                +{{ perfectBonusValue }} PERFECT BONUS!
              </div>
              <div
                v-if="type === 'submitted'"
                class="mx-5 mt-2 flex w-full items-center justify-between gap-x-2 rounded-md bg-background px-3 py-4"
              >
                <div class="text-2xl">
                  👍
                </div>
                <div class="text-left text-sm font-medium">
                  Points will be credited once we've verified your submission.
                </div>
              </div>
            </div>
          </div>
        </DialogTitle>
        <DialogDescription class="h-full">
          <div class="flex h-full flex-col items-center justify-between">
            <div v-if="type === 'submitted'" class="relative">
              <img src="~/assets/images/hands-up.png" class="my-5 size-[320px] translate-x-5">
            </div>
            <AppRockLogo v-else class="size-[320px] drop-shadow-[0_20px_20px_hsl(var(--primary-yellow))]" />
            <Button
              variant="primaryY" size="lg" class="mb-10 rounded-xl font-bold md:px-10 md:text-lg"
              @click="toWallet"
            >
              explore my fan wallet
            </Button>
            <div class="absolute bottom-0 -z-10 w-full short:translate-y-24 xshort:translate-y-64">
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
