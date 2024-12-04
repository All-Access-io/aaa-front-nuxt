<script setup lang="ts">
import { toast } from 'vue-sonner'

const { id } = useRoute().params as { id: string }
if (!id)
  navigateTo('/')

const authStore = useAuthStore()
const { showClaimRewardModal } = useClaimRewardModal()
const { data, execute } = useApi<Api.Reward.Reward>(`/api/Reward/${id}`, {
  showGlobalLoading: true,
  default: () => null,
})

const { isExpired, isOnGoing, isComingSoon } = useStartEndDate(data)

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
    showClaimRewardModal(data.value.Point, data.value)
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
      toast.error(fetchClaim.error.value || 'Failed to claim reward, please try again later', {
        closeButton: true,
      })
    }
  }
}

const canClaim = computed(() => authStore.userPoints > data.value?.Point)
const { hasClaimed } = useRewardState(data)
// const [showQRModal, toggleQRModal] = useToggle()
</script>

<template>
  <div>
    <AppModalClaimConfirm v-model:open="showConfirmClaimModal" :reward="data" @submit="handleClaim" />

    <AppPageDetails
      v-if="data" :title="data.Title" :img-url="data.ImageBase64" :start-date="data.StartDate"
      :end-date="data.EndDate" :description="data.Description" :exclusive="data?.Tag?.at(0)?.replace('#', '')"
    >
      <template #leftText>
        <div class="flex items-center gap-x-2 font-semibold uppercase tracking-wider">
          Reward
          <AppCommonTag v-if="data.IsClaimedFinish" status="completed" class="font-semibold">
            claimed
          </AppCommonTag>
          <AppCommonTag v-else-if="isExpired" variants="locked" class="font-semibold">
            Ended
          </AppCommonTag>
        </div>
      </template>
      <div>
        <div class="mb-2 font-poppins text-2xl font-medium">
          Reward Details
        </div>
        <div class="flex items-center gap-x-1 text-sm">
          <i class="i-ic-outline-location-on text-[1em]" />
          {{ data.DetailDescription }}
          <NuxtLink
            v-if="data.DetailLink" class="cursor-pointer text-blue-500 underline" external target="_blank"
            :to="data.DetailLink"
          >
            See upcoming events
          </NuxtLink>
        </div>
      </div>

      <template v-if="data.Tag">
        <AppCommonHashTags :hash-tags="data.Tag.map(tag => `${tag}`)" />
      </template>
      <AppCommonStatus v-if="!data.IsClaimedFinish" :fan-value="data.Point" hide-sign>
        <span class="font-semibold">get this reward for</span>
      </AppCommonStatus>

      <template v-if="isOnGoing">
        <AppClaimBar v-if="!data.IsClaimedFinish" :limit="data.Limit" :available-limit="data.AvailableLimit" />
        <div class="mt-4 ">
          <template v-if="!data.IsClaimedFinish">
            <Button
              :loading="fetchClaim.status.value === 'pending'" variant="primaryY" class="w-full font-bold"
              :disabled="!canClaim" @click="toggleConfirmClaimModal(true)"
            >
              claim now
            </Button>
          </template>
          <template v-if="hasClaimed">
            <div class="flex flex-col items-center gap-y-3 rounded-md bg-primary-yellow p-2 py-4">
              <div class="flex w-full items-center gap-x-2">
                <div class="text-3xl">
                  👍
                </div>
                <div class="font-medium leading-tight">
                  You have claimed this reward, show this screen to redeem your prize.
                </div>
              </div>
              <!-- <Button variant="primary" class="flex w-full justify-between bg-primary-green font-bold" @click="toggleQRModal">
                <div>Show qr to redeem</div>
                <i class="i-mdi-qrcode" />
              </Button> -->
              <!-- <AppCommonShowQRModal v-model:open="showQRModal" :qr-code="data.qrCode" /> -->
            </div>
          </template>
        </div>
      </template>

      <AppCommonDateItem :end-date="data.EndDate" type="reward" :start-date="data.StartDate" />
    </AppPageDetails>
  </div>
</template>

<style></style>
