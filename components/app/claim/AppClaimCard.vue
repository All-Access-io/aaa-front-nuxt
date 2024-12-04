<script setup lang="ts">
const props = defineProps<{
  reward: Api.Reward.DerivedReward
  referrer?: string
}>()

const rewardTypeText = computed(() => {
  if (props.reward.RewardType === rewardTypeMap.Raffle)
    return 'raffle'
  else if (props.reward.RewardType === rewardTypeMap.Claim)
    return 'reward'
  else
    return 'reward'
})

const { isExpired } = useStartEndDate(props.reward)
const { hasClaimed } = useRewardState(props.reward)
const isEnded = computed(() => isExpired.value && !props.reward.IsClaimedFinish)
const isFullyClaimed = computed(() => !isEnded.value && !props.reward.IsClaimedFinish && props.reward.AvailableLimit <= 0)

const claimedPercent = computed(() => {
  if (!props.reward)
    return 0

  return (props.reward.Limit - props.reward.AvailableLimit) / props.reward.Limit
})

const limitText = computed(() => {
  if (!props.reward.Limit)
    return ''

  if (props.reward.RewardType === rewardTypeMap.Raffle)
    return `${props.reward.Limit} LUCKY <br> FAAANS`
  else
    if (claimedPercent.value > 0.9)
      return `ONLY ${props.reward.AvailableLimit} <br> REMAINING!`

  return `FIRST ${props.reward.Limit} <br> FAAANS`
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
      path: `/detail/raffle/claim/${props.reward.Id}`,
      query: {
        referrer: props.referrer,
      },
    })
  }
}
</script>

<template>
  <div
    class="relative w-[320px] cursor-pointer overflow-hidden rounded-lg  border-2 border-primary transition-colors duration-150 hover:bg-muted/80"
    @click="handleNavigate"
  >
    <div v-if="isFullyClaimed || isEnded" class="pointer-events-none absolute inset-0 z-10 bg-gray-200/50" />

    <div class="h-[180px] w-full">
      <img class="size-full object-cover" :src="reward.ImageBase64" alt="claim">
    </div>
    <div class="p-4">
      <div class="flex flex-col gap-y-1">
        <div class="flex items-center gap-x-1 text-1xs font-semibold">
          {{ reward.Tag.at(0)?.replace('#', '') }}

          <template v-if="reward.RewardType === rewardTypeMap.Raffle">
            <AppCommonTag v-if="reward.IsWin" size="xs" class="font-bold" variants="green">
              winner
            </AppCommonTag>
            <AppCommonTag v-else-if="isExpired && !reward.IsClaimedFinish" status="muted" size="xs" class="font-bold">
              ended
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
          <AppCommonDateItem
            v-if="!hasClaimed" :start-date="reward.StartDate" :end-date="reward.EndDate"
            :type="rewardTypeText" inline class="!text-2xs"
          />
        </div>
        <!-- <AppCommonTaskCardTagList :tags="tags" :is-locked="isLocked"> -->
        <!-- <template #locked> -->
        <!-- <AppCommonDateItem :start-date="startDate" :end-date="endDate" type="task" inline /> -->
        <!-- </template> -->
        <!-- </AppCommonTaskCardTagList> -->
        <div class="line-clamp-3 pb-[2px] font-poppins text-2xl font-medium leading-[1.65rem]">
          {{ reward.Title }}
        </div>
        <div class="line-clamp-3 text-xs">
          {{ reward.Description }}
        </div>
      </div>
      <div class="mt-4 flex items-center justify-between">
        <template v-if="reward.RewardType === rewardTypeMap.Raffle && reward.IsClaimedFinish && reward.IsWin">
          <Button variant="primaryG" class="w-full">
            see my reward
          </Button>
        </template>
        <template v-if="reward.RewardType === rewardTypeMap.Raffle && reward.IsClaimedFinish && !reward.IsWin">
          <AppRaffleStatus :data="reward" :is-expired="isExpired" small />
        </template>
        <template v-else>
          <div v-if="isFullyClaimed || isEnded" class="text-xs font-medium uppercase leading-3 text-red-500">
            {{ isEnded ? 'reward closed' : 'all gone!' }}
          </div>
          <div v-else class="text-xs font-medium uppercase leading-3" v-html="limitText" />
          <AppAAACurrency v-if="!isFullyClaimed && !isEnded" :value="reward.Point" class="text-xs" />
        </template>
      </div>
    </div>
  </div>
</template>

<style>
</style>
