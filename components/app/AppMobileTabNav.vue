<script lang="ts" setup>
const { isHome, hideHeaderAndFooter } = useUiConfig()
</script>

<template>
  <div v-if="!isHome && !hideHeaderAndFooter" class="h-[84px]" />
  <div
    v-if="!isHome && !hideHeaderAndFooter"
    class="fixed bottom-0 z-50 w-screen overflow-hidden bg-foreground shadow-2xl backdrop-blur-md"
  >
    <div class="grid grid-cols-5">
      <NuxtLink to="/user/profile" class="nav-link-btn group">
        <Button
          variant="ghost"
          class="flex h-auto w-full flex-col gap-y-1 p-5 text-xs transition-colors duration-200 hover:bg-foreground hover:text-primary-yellow"
        >
          <div class="relative size-[24px]">
            <img
              src="~/assets/images/nav-profile-2.png"
              class="absolute inset-0 size-[24px] opacity-100 transition-opacity duration-200 group-hover:opacity-0 group-[.router-link-active]:opacity-0"
            >
            <img
              src="~/assets/images/nav-profile-2-activated.png"
              class="absolute inset-0 size-[24px] opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-[.router-link-active]:opacity-100"
            >
          </div>
          Profile
        </Button>
      </NuxtLink>
      <NuxtLink to="/user/earn" class="nav-link-btn group">
        <Button
          variant="ghost"
          class="flex h-auto w-full flex-col gap-y-1 p-5 text-xs transition-colors duration-200 hover:bg-foreground hover:text-primary-yellow"
        >
          <AppAAALogo
            class="size-[24px] opacity-50 transition-opacity duration-200 group-hover:opacity-80 group-[.router-link-active]:opacity-100"
            style="-webkit-filter:drop-shadow(0px 0px 4px #fff); filter: drop-shadow(0px 0px 4px #fff);"
          />
          Earn
        </Button>
      </NuxtLink>
      <NuxtLink to="/user/claim" class="nav-link-btn group">
        <Button
          variant="ghost"
          class="flex h-auto w-full flex-col gap-y-1 p-5 text-xs transition-colors duration-200 hover:bg-foreground hover:text-primary-yellow"
        >
          <div class="relative size-[24px]">
            <img
              src="~/assets/images/nav-claim.png"
              class="absolute inset-0 size-[24px] opacity-100 transition-opacity duration-200 group-hover:opacity-0 group-[.router-link-active]:opacity-0"
            >
            <img
              src="~/assets/images/nav-claim-activated.png"
              class="absolute inset-0 size-[24px] opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-[.router-link-active]:opacity-100"
            >
          </div>
          Claim
        </Button>
      </NuxtLink>
      <!-- <NuxtLink to="/user/events" class="nav-link-btn"> -->
      <Button
        variant="ghost" disabled
        class="flex h-auto w-full flex-col gap-y-1 p-5 text-xs text-muted-foreground hover:bg-foreground hover:text-primary-yellow"
      >
        <div class="i-custom-nav-events size-[24px]" />
        Events
      </Button>
      <!-- </NuxtLink> -->
      <NuxtLink to="/wallet" class="nav-link-btn group">
        <Button
          variant="ghost"
          class="flex h-auto w-full flex-col gap-y-1 p-5 text-xs transition-colors duration-200 hover:bg-foreground hover:text-primary-yellow"
        >
          <div class="relative size-[24px]">
            <img
              src="~/assets/images/nav-wallet.png"
              class="absolute inset-0 size-[24px] opacity-100 transition-opacity duration-200 group-hover:opacity-0 group-[.router-link-active]:opacity-0"
            >
            <img
              src="~/assets/images/nav-wallet-activated.png"
              class="absolute inset-0 size-[24px] opacity-0 transition-opacity duration-200 group-hover:opacity-80 group-[.router-link-active]:opacity-100"
            >
          </div>
          Wallet
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<style></style>
