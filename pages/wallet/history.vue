<script setup lang="ts">
definePageMeta({
})
</script>

<template>
  <div class="min-w-screen container">
    <div class=" mt-6 flex flex-col">
      <div class="flex flex-col gap-y-3">
        <span class="text-2xs">02 JUN 2024</span>
        <AppWalletHistoryItem
          title="FREE 1 Can of Beer" description="IT's THE SHIP FESTIVAL 2024" :fan-value="-250"
          date="02 JUN 2024, 2:29 PM"
        />
        <AppWalletHistoryItem
          title="+ Referral Bonus!" description="AAA EXCLUSIVE" :fan-value="250"
          date="02 JUN 2024, 11:11 AM "
        />
        <Separator class="mb-2" />
        <span class="text-2xs">01 JUN 2024</span>
        <AppWalletHistoryItem
          title="Referral Code Used" description="Referral Code : ABCD1234" :fan-value="250"
          date="01 JUN 2024, 10:45 PM "
        />
        <AppWalletHistoryItem
          title="Sign up for All-Access" description="AAA EXCLUSIVE" :fan-value="2500"
          date="01 JUN 2024, 10:45 PM "
        />
        <Separator />
      </div>
    </div>
  </div>
</template>

<style></style>
