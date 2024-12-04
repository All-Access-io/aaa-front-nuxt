<script setup lang="ts">
const { isHome, hideHeaderAndFooter } = useUiConfig()
const authStore = useAuthStore()
</script>

<template>
  <div class="sticky top-0 z-50 flex w-full flex-col bg-background" :class="{ hidden: hideHeaderAndFooter }">
    <header class="flex h-16 w-full items-center gap-4 px-4 md:px-6">
      <nav class="flex w-full items-center justify-between">
        <NuxtLink to="/">
          <AppLogo class="size-10" />
        </NuxtLink>
        <div v-if="isHome" class="flex flex-[1_0_30vw] justify-end">
          <div class="hidden flex-wrap items-center gap-4 md:flex">
            <NuxtLink to="https://x.com/allaccessio?s=21&t=r8JO62z2GO_9ZydqeqYXZA" external target="_blank">
              <img src="~/assets/images/Icon_X-alt.svg" class="size-5">
            </NuxtLink>
            <NuxtLink to="https://warpcast.com/allaccessio" external target="_blank">
              <img src="/images/wrap-cast.png" class="size-5">
            </NuxtLink>
            <NuxtLink to="https://mirror.xyz/0xF2C3d770EA4B3951445072C93c656B602BF5f5f4" external target="_blank">
              <img src="/images/mirro-xyz.png" class="size-5">
            </NuxtLink>
            <NuxtLink to="https://www.instagram.com/allaccessio?igsh=MWo5OGIxejF4bHZrMw==" external target="_blank">
              <img src="~/assets/images/Icon_IG-alt.svg" class="size-5">
            </NuxtLink>
            <NuxtLink to="https://www.linkedin.com/company/all-access-anonymous-aaa/" external target="_blank">
              <i class="i-mdi-linkedin mt-1 size-6" />
            </NuxtLink>
          </div>

          <NavigationMenu class="block md:hidden">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger><i class="i-lucide-square-arrow-out-up-right" /></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div class="flex w-16 grid-cols-1 flex-col items-center gap-y-4 p-2">
                    <NuxtLink to="https://x.com/allaccessio?s=21&t=r8JO62z2GO_9ZydqeqYXZA" external target="_blank">
                      <img src="~/assets/images/Icon_X-alt.svg" class="size-5">
                    </NuxtLink>
                    <NuxtLink to="https://warpcast.com/allaccessio" external target="_blank">
                      <img src="/images/wrap-cast.png" class="size-5">
                    </NuxtLink>
                    <NuxtLink
                      to="https://mirror.xyz/0xF2C3d770EA4B3951445072C93c656B602BF5f5f4" external
                      target="_blank"
                    >
                      <img src="/images/mirro-xyz.png" class="size-5">
                    </NuxtLink>
                    <NuxtLink
                      to="https://www.instagram.com/allaccessio?igsh=MWo5OGIxejF4bHZrMw==" external
                      target="_blank"
                    >
                      <img src="~/assets/images/Icon_IG-alt.svg" class="size-5">
                    </NuxtLink>
                    <NuxtLink to="https://www.linkedin.com/company/all-access-anonymous-aaa/" external target="_blank">
                      <i class="i-mdi-linkedin size-6" />
                    </NuxtLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div v-else class="flex items-center">
          <Button size="xs" variant="primary" class="hidden rounded-lg bg-primary-yellow text-xs">
            connect
          </Button>
          <NuxtLink to="/wallet">
            <Button variant="ghost" size="icon" class="-mr-0.2 px-8">
              <AppAAACurrency :value="authStore.userPoints" hide-text />
            </Button>
          </NuxtLink>
          <NuxtLink to="/scan">
            <Button variant="ghost" size="icon">
              <div class="i-custom-nav-scan size-[24px] translate-y-px" />
            </Button>
          </NuxtLink>
        </div>
      </nav>
    </header>
    <div class="h-px w-full bg-primary" />
  </div>
</template>

<style>
</style>
