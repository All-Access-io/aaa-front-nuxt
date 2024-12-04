<script setup lang="ts">
import { rewardTypeMap } from '~/lib/models/reward'

const props = defineProps<{
  reward: Api.Reward.Reward & {
    readyToClaim?: boolean
    criteria?: string
  }
  referrer?: string
  // imgUrl: string
  // exclusive: string
  // title: string
  // description: string
  // fanValue: number
  // criteria: string
//
  // readyToClaim?: boolean
  // pointType?: 'fan' | 'aaa'
  // isClaimed?: boolean
  // claimedDate?: string
}>()

const rewardTypeText = computed(() => {
  if (props.reward.RewardType === rewardTypeMap.Raffle)
    return 'raffle'
  else if (props.reward.RewardType === rewardTypeMap.Claim)
    return 'reward'
  else
    return 'reward'
})

const { hasClaimed } = useRewardState(props.reward)

const isLessAvailable = computed(() => props.reward.AvailableLimit <= 3 && !props.reward.IsClaimedFinish)
const isFullyClaimed = computed(() => props.reward.AvailableLimit <= 0 && !props.reward.IsClaimedFinish)

const limitText = computed(() => {
  if (isFullyClaimed.value)
    return ''
  if (!props.reward.Limit)
    return ''

  if (props.reward.RewardType === rewardTypeMap.Raffle) { return `${props.reward.Limit} LUCKY FAAANS` }
  else {
    if (isLessAvailable.value)
      return `ONLY ${props.reward.AvailableLimit} REMAINING!`
    return `FIRST ${props.reward.Limit} FAAANS`
  }
})

function handleNavigate() {
  if (props.reward.RewardType === rewardTypeMap.Raffle) {
    navigateTo({
      path: `/detail/reward/raffle/${props.reward.Id}`,
      query: {
        referrer: props.referrer,
      },
    })
  }
  else {
    navigateTo({
      path: `/detail/reward/claim/${props.reward.Id}`,
      query: {
        referrer: props.referrer,
      },
    })
  }
}
</script>

<template>
  <div v-if="reward"
    class="relative cursor-pointer rounded-lg border-2 border-primary px-3 py-2 transition-colors duration-150 hover:bg-muted/80"
    :class="{
      'mt-5 border-primary-yellow-foreground/50 bg-primary-yellow': reward?.readyToClaim,
      'bg-primary-green': reward.IsWin && reward.RewardType === rewardTypeMap.Raffle,
    }" @click="handleNavigate">
    <template v-if="!(reward.IsWin && reward.RewardType === rewardTypeMap.Raffle)">
      <div v-if="reward?.IsClaimedFinish" class="pointer-events-auto absolute inset-0 bg-gray-200 opacity-40" />
    </template>

    <div v-if="reward?.readyToClaim"
      class="absolute -top-5 right-4 rounded-t-lg bg-primary-yellow-foreground/50 px-2 py-1 text-1xs font-semibold uppercase">
      ready to claim!
    </div>
    <div class="flex gap-x-2">
      <img v-if="reward?.ImageBase64" class="mt-0.5 size-20 rounded-md" :src="reward?.ImageBase64">
      <div class="flex-1">
        <div class="flex w-full justify-between">
          <div class="flex items-center gap-x-1 text-1xs font-medium">
            <!-- <span v-if="reward.Tag?.(',').at(0)" class="uppercase">{{ reward.Tag?.split(',').at(0) }}</span> -->
            <template v-if="reward.RewardType === rewardTypeMap.Raffle">
              <AppCommonTag v-if="reward.IsWin" size="xs" class="font-bold" variants="white">
                winner
              </AppCommonTag>
              <AppCommonTag v-else-if="reward.IsClaimedFinish" status="claimed" size="xs" class="font-bold">
                joined
              </AppCommonTag>
            </template>
            <template v-else>
              <AppCommonTag v-if="reward.IsClaimedFinish" status="claimed" size="xs" class="font-bold">
                claimed
              </AppCommonTag>
              <AppCommonTag v-if="isFullyClaimed" variants="locked" size="xs" class="bg-gray-300">
                Fully Claimed!
              </AppCommonTag>
            </template>
            <AppCommonDateItem v-if="!reward.IsClaimedFinish" :start-date="reward.StartDate" :end-date="reward.EndDate"
              :type="rewardTypeText" inline class="!text-2xs" />
          </div>
          <div v-if="hasClaimed" class="text-1xs uppercase">
            <!-- 01 JUN 2024, 10:45 PM -->
            {{ $dayjs(reward?.ClaimedDate).format('DD MMM YYYY, HH:mm A') }}
          </div>
        </div>
        <div class="my-1 line-clamp-2 font-poppins text-lg font-medium leading-[1.3rem]">
          {{ reward.Title }}
        </div>
        <div v-if="!hasClaimed" class="text-1xs text-muted-foreground/80"
          :class="{ 'text-primary': reward?.readyToClaim }">
          {{ reward.Description }}
        </div>
      </div>
    </div>
    <div v-if="!reward?.IsClaimedFinish" class="mt-2 flex justify-between">
      <div class="text-xs font-medium uppercase" :class="{
          'text-red-500': isLessAvailable,
        }">
        {{ limitText }}
      </div>
      <AppAAACurrency :value="reward?.Point" />
    </div>
  </div>
</template>

<style></style>
