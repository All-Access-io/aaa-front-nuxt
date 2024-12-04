<script setup lang="ts">
const props = defineProps<{
  data: Api.Reward.DerivedReward
  isExpired: boolean
  small?: boolean
}>()
const isJoined = computed(() => !props.isExpired && props.data.IsClaimedFinish && !props.data.IsWin)

const isExpiredAndNotJoined = computed(() =>
  props.isExpired && !isJoined.value,
)

const [showQRModal, toggleQRModal] = useToggle()
</script>

<template>
  <div
    v-if="data.IsWin || isJoined || isExpiredAndNotJoined"
    v-bind="$attrs"
    class="flex w-full items-center gap-x-2 rounded-md bg-primary-yellow p-2 py-4"
    :class="{ '!bg-primary-green': isExpiredAndNotJoined, '!py-2 text-sm': small }"
  >
    <template v-if="data.IsWin">
      <div class="text-3xl">
        👍
      </div>
      <div class="font-medium leading-tight">
        You're a winner! show your ticket QR at the event to get access.
      </div>
    </template>
    <template v-if="isExpiredAndNotJoined">
      <img src="~/assets/images/calendar-icon.png" class="size-8">
      <div class="font-medium leading-tight">
        The raffle has ended and the winners will be announced soon.
      </div>
    </template>
    <template v-if="isJoined">
      <div class="text-3xl">
        👍
      </div>
      <div class="font-medium leading-tight">
        You have joined the raffle
        {{
          data.ClaimedDate
            ? `on ${$dayjs(data.ClaimedDate).format('DD MMM YYYY, HH:mm A')}`
            : ''
        }}
        and are in the running to win!
      </div>
    </template>
  </div>

  <template v-if="data.IsWin">
    <Button variant="primary" class="flex w-full justify-between bg-primary-green font-bold" @click="toggleQRModal">
      <div>Show my ticket qr</div>
      <i class="i-mdi-qrcode" />
    </Button>
    <AppCommonShowQRModal v-model:open="showQRModal" :qr-code="data.WinQrCode?.QrCode || ''" />
  </template>
</template>

<style>
</style>
