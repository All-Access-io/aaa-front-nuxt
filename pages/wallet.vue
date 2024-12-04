<script setup lang="ts">
definePageMeta({
  layout: 'wallet',
  redirect: '/wallet/explore',
})
const route = useRoute()
const notExploreRoute = computed(() => route.path !== '/wallet/explore')

const authStore = useAuthStore()
authStore.getUserPoints()
</script>

<template>
  <div class="relative mx-auto w-full max-w-md">
    <div
      class="absolute left-1/2 -z-10 h-[340px] w-full max-w-md -translate-x-1/2" :class="[
        notExploreRoute && '-translate-y-[100px]',
      ]"
    >
      <img src="/images/wallet-bg.png" class="size-full object-cover object-bottom">
    </div>
    <div class="relative w-full">
      <div class="container">
        <div
          class="text-background transition-all duration-100" :class="[
            !notExploreRoute && 'flex flex-col items-center justify-center gap-y-1 pt-20',
            notExploreRoute && 'flex flex-wrap items-center justify-center pt-20',
          ]"
        >
          <svg
            :class="[
              !notExploreRoute && '-m-[70px] size-[250px]',
              notExploreRoute && '-m-[20px] size-[100px]',
            ]" viewBox="0 0 95 94" fill="none" xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_d_10329_29981)">
              <g clip-path="url(#clip0_10329_29981)">
                <rect x="27.5" y="27" width="40" height="40" rx="19.3333" fill="white" />
                <path
                  d="M62.0804 27H32.9192C29.926 27 27.5 29.4264 27.5 32.4196V61.5808C27.5 64.574 29.926 67 32.9192 67H62.0804C65.0736 67 67.5 64.574 67.5 61.5808V32.4196C67.5 29.4264 65.0736 27 62.0804 27ZM40.2108 59.896C37.0844 59.9224 34.5856 57.462 34.5704 54.3428C34.5556 51.2856 37.0436 48.7944 40.1224 48.7848C43.208 48.7752 45.7044 51.2352 45.716 54.2964C45.7276 57.3884 43.288 59.87 40.2108 59.896ZM54.9244 59.896C51.798 59.9224 49.2992 57.462 49.2836 54.3428V54.316C49.2836 53.3252 49.5476 52.3956 50.008 51.5908C50.136 51.3668 50.2792 51.1524 50.4364 50.9496C51.06 50.016 52.1836 48.3332 52.5516 47.776C53.4712 46.3848 53.314 45.2172 51.1604 45.2172H47.2464L47.2444 45.21C44.2708 45.0708 41.9416 42.6748 41.9272 39.6636C41.912 36.6064 44.4004 34.1156 47.4792 34.106C49.808 34.0984 51.8008 35.4988 52.6432 37.502L59.84 51.8352H59.8396C60.2136 52.5752 60.426 53.4104 60.4296 54.2964C60.4412 57.3884 58.0012 59.87 54.9244 59.896Z"
                  fill="black"
                />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_10329_29981" x="0.833332" y="0.333332" width="93.3333" height="93.3333"
                filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="13.3333" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 0.860759 0 0 0 0 0 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_10329_29981" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_10329_29981" result="shape" />
              </filter>
              <clipPath id="clip0_10329_29981">
                <rect x="27.5" y="27" width="40" height="40" rx="19.3333" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <!-- <AppAAALogo class="drop-shadow-[0_0_20px_#FFDB00]" :class="[
              !notExploreRoute && 'size-[100px]',
              notExploreRoute && 'mr-2 size-7',
            ]" /> -->
          <span class="text-5xl font-medium">{{ useFormat().currency(authStore.userPoints) }}</span>
          <span v-if="notExploreRoute" class="h-0 basis-full" />
          <span class="uppercase tracking-widest">total AAA</span>
        </div>
        <div class="mt-3 flex w-full justify-evenly rounded-md bg-background p-3 shadow-md">
          <NuxtLink
            to="/wallet/rank"
            class="block cursor-pointer rounded-md aria-[current=page]:bg-primary-yellow hover:bg-primary-yellow/30"
          >
            <div class="grid grid-rows-2 place-items-center px-2 py-1">
              <i class="i-custom-rank" />
              <div class="font-poppins text-1xs font-medium">
                Rank
              </div>
            </div>
          </NuxtLink>
          <NuxtLink
            to="/wallet/explore"
            class="block cursor-pointer rounded-md aria-[current=page]:bg-primary-yellow hover:bg-primary-yellow/30"
          >
            <div class="grid grid-rows-2 place-items-center px-2 py-1">
              <i class="i-custom-explore" />
              <div class="font-poppins text-1xs font-medium">
                Explore
              </div>
            </div>
          </NuxtLink>
          <div
            class="pointer-events-none block cursor-pointer rounded-md opacity-50 aria-[current=page]:bg-primary-yellow"
          >
            <div class="grid grid-rows-2 place-items-center px-2 py-1">
              <i class="i-custom-receive" />
              <div class="font-poppins text-1xs font-medium">
                Receive
              </div>
            </div>
          </div>
          <div
            class="pointer-events-none block cursor-pointer rounded-md opacity-50 aria-[current=page]:bg-primary-yellow"
          >
            <div class="grid grid-rows-2 place-items-center px-2 py-1">
              <i class="i-custom-send" />
              <div class="font-poppins text-1xs font-medium">
                Send
              </div>
            </div>
          </div>
          <!-- <NuxtLink
            to="/wallet/history"
            class="block cursor-pointer rounded-md aria-[current=page]:bg-primary-yellow hover:bg-primary-yellow/30"
          > -->
          <div class="grid grid-rows-2 place-items-center px-2 py-1 opacity-50">
            <i class="i-custom-history" />
            <div class="font-poppins text-1xs font-medium">
              History
            </div>
          </div>
          <!-- </NuxtLink> -->
        </div>
      </div>
    </div>
    <NuxtPage />
  </div>
</template>

<style></style>
