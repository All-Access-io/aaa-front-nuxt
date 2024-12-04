<script setup lang="ts">
import { toast } from 'vue-sonner'

const { id } = useRoute().params as { id: string }
if (!id)
  navigateTo('/')

const authStore = useAuthStore()
const { showClaimRewardModal } = useClaimRewardModal()
const { data, execute } = useApi<Api.Reward.DerivedReward>(`/api/Reward/${id}`, {
  showGlobalLoading: true,
  default: () => null,
  transform: transformRewardResponse,
})
const { isExpired, isComingSoon, isOnGoing } = useStartEndDate(data)

const exclusive = computed(() => {
  if (data.value?.Tag) {
    let exclusive = data.value.Tag.find(tag => tag.toLocaleLowerCase().includes('exclusive'))
    if (exclusive) {
      exclusive = exclusive.replace('#', '')
      exclusive = exclusive.replace('Exclusive', '')
      if (exclusive.toLocaleLowerCase().includes('gg'))
        return 'GG FAN EXCLUSIVE'

      return `${exclusive} EXCLUSIVE`
    }
    return undefined
  }
  else { return undefined }
})

const fetchClaim = useApi<Api.Common.Response>('/api/Reward/ClaimReward', {
  method: 'post',
  body: {
    rewardId: Number(id),
  } as Api.Reward.ClaimRewardParams,
  immediate: false,
  watch: false,
})

const [showConfirmClaimModal, toggleConfirmClaimModal] = useToggle()
async function handleClaim() {
  toggleConfirmClaimModal(false)
  await fetchClaim.execute()
  if (fetchClaim.data.value.IsSuccess) {
    showClaimRewardModal(data.value.Point, data.value, {
      type: 'raffle',
    })
    authStore.getUserPoints()
    execute()
  }
  else {
    if (fetchClaim.data.value.Error) {
      toast.error(fetchClaim.data.value.ErrorMessage, {
        closeButton: true,
      })
    }
    else {
      toast.error(fetchClaim.error.value || 'Failed to join the raffle, please try again later', {
        closeButton: true,
      })
    }
  }
}
</script>

<template>
  <div>
    <AppModalRaffleConfirm v-model:open="showConfirmClaimModal" :reward="data" @submit="handleClaim" />

    <AppPageDetails
      v-if="data" :exclusive="exclusive" :title="data.Title" :img-url="data.ImageBase64"
      :start-date="data.StartDate" :end-date="data.EndDate" :description="data.Description"
    >
      <template #leftText>
        <div class="flex items-center gap-x-2 font-semibold uppercase tracking-wider">
          Reward
          <AppCommonTag v-if="data.IsClaimedFinish && !data.IsWin" status="joined" class="bg-primary-yellow font-semibold">
            joined
          </AppCommonTag>
          <AppCommonTag v-if="isExpired && !data.IsWin" variants="muted">
            ended
          </AppCommonTag>
          <AppCommonTag v-if="data.IsWin" variants="green">
            winner
          </AppCommonTag>
        </div>
      </template>
      <div>
        <div class="mb-2 font-poppins text-2xl font-medium">
          Raffle Details
        </div>
        <div class="space-y-2">
          <div v-if="data?.EndDate" class="flex items-center gap-x-1">
            <i class="i-mdi-clock-outline" />
            <div class="text-xs">
              Raffle Closes: {{ $dayjs(data?.EndDate).format('DD MMM YYYY, HH:mm A') }}
            </div>
          </div>
          <div v-if="data?.DetailDescription" class="flex items-center gap-x-1">
            <i class="i-mdi-calendar" />
            <div class="text-xs">
              {{ data?.DetailDescription }}
            </div>
          </div>
        </div>
      </div>
      <!-- <template v-if="data.Tag">
        <AppCommonHashTags :hash-tags="data.Tag.map(tag => `#${tag}`)" />
      </template> -->
      <AppCommonStatus :fan-value="data.Point" hide-sign>
        Raffle ticket cost
      </AppCommonStatus>
      <div class="mt-4 space-y-2">
        <template v-if="isOnGoing">
          <template v-if="!data.IsClaimedFinish">
            <Button
              :loading="fetchClaim.status.value === 'pending'" variant="primaryY" class="w-full font-bold"
              @click="toggleConfirmClaimModal(true)"
            >
              join the raffle
            </Button>
          </template>
        </template>
        <!-- <AppCommonAvatarsList v-if="!isOnGoing" text="ALREADY JOINED THE RAFFLE" /> -->
        <AppRaffleStatus :data="data" :is-expired="isExpired" />
        <AppCommonDateItem :end-date="data.EndDate" type="raffle" :start-date="data.StartDate" />
      </div>
    </AppPageDetails>
  </div>
</template>

<style></style>
