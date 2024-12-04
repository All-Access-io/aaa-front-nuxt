<script setup lang="ts">
const { copyReferralCode, referralCode, shareLink } = useSelfReferralCode()
</script>

<template>
  <div class="flex items-center justify-between rounded-lg bg-primary-green p-4">
    <div class="">
      <div class="text-xl font-bold">
        Refer now!
      </div>
      <div class="flex items-center gap-x-2 text-sm">
        Referral Code: {{ referralCode }}
        <div class="i-lucide-copy cursor-pointer text-[0.8em]" @click="copyReferralCode()" />
      </div>
    </div>
    <Button variant="primary" size="sm" class="rounded-lg" @click="shareLink">
      invite <i class="i-mdi-share-variant ml-1" />
    </Button>
  </div>
</template>

<style>
</style>
