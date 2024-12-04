<script setup lang="ts">
const state = ref<'edit' | 'view'>('view')
const authStore = useAuthStore()
const initialValue = ref(authStore.userInfo.ReferralCode)

const error = ref('')
const success = ref('')
watch(success, () => {
  setTimeout(() => {
    success.value = ''
  }, 2000)
})

const updateReferralCodeFetch = useApi<Api.Common.Response>(`/api/User/UpdateReferralCode`, {
  method: 'post',
  immediate: false,
  watch: false,
  body: {
    ReferralCode: initialValue,
  },
})

async function handleEdit() {
  if (!initialValue.value) {
    error.value = 'Invalid referral code'
    return
  }
  error.value = ''
  await updateReferralCodeFetch.execute()
  if (updateReferralCodeFetch.data.value.IsSuccess) {
    success.value = 'success'
    state.value = 'view'
    authStore.getUserInfo()
  }
  else { error.value = updateReferralCodeFetch.data.value.ErrorMessage }
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-1.5">
    <Label for="referral-code" class="text-lg font-medium">My Referral Code</Label>
    <AppCommonSpin>
      <InputWithIcon
        id="referral-code" v-model="initialValue"
        class="w-full py-6 font-medium text-primary focus-visible:ring-0" :class="{ 'bg-muted': state === 'view' }"
        :readonly="state === 'view'"
      >
        <template #endIcon>
          <Button
            v-if="state === 'view'" variant="secondary"
            class="bg-primary-green font-montserrat text-xs font-semibold uppercase tracking-widest text-primary"
            size="xs" @click="state = 'edit'"
          >
            customise
          </Button>
          <Button
            v-else variant="primaryG"
            :loading="updateReferralCodeFetch.status.value === 'pending'"
            class="font-montserrat text-xs font-semibold uppercase tracking-widest text-primary" size="xs"
            @click="handleEdit()"
          >
            save
          </Button>
        </template>
      </InputWithIcon>
      <div v-if="!success" class="mt-1 text-right text-sm font-medium text-red-500">
        {{ error }}
      </div>
      <div v-if="success" class="mt-1 text-right text-sm text-primary-neon">
        Code changed!
      </div>
      <div v-if="state === 'view'" class="mt-2 flex items-start gap-x-2 rounded-md bg-muted px-4 py-2 text-primary/80">
        <i class="i-lucide-info !aspect-square w-8" />
        <div>Customising your referral code will make the current code invalid</div>
      </div>
    </AppCommonSpin>
  </div>
</template>

<style>
</style>
