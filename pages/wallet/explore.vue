<script setup lang="tsx">
import { useToast } from '~/components/ui/toast/use-toast'

const appStore = useAppStore()
const toast = useToast()
onMounted(() => {
  if (!appStore.isRegister)
    return
  if (appStore.shownExploreMessage)
    return
  const { dismiss } = toast.toast({
    description: (
      <div class="flex w-full items-center gap-x-2">
        <img src="/images/stamp-tick-white-green.png" class="size-8"></img>
        <div class="font-medium">
          FAN wallet created! You’re now a member!
        </div>
      </div>
    ),
    duration: 2000,
    viewPortClass: 'p-0 left-1/2 -translate-x-1/2',
    class: 'rounded-none bg-primary-green p-3 border-primary-green',
  })
  appStore.setShownExploreMessage(true)
  onUnmounted(() => {
    dismiss()
  })
})
</script>

<template>
  <div class="container pb-5">
    <div class="mt-8 flex flex-col gap-y-2">
      <!-- <div class="flex items-center gap-x-4 border border-primary-yellow p-4">
        <div class="flex items-center justify-center rounded-md bg-primary-yellow p-2">
          <i class="i-custom-wallet" />
        </div>
        <div>
          <div class="font-poppins text-lg font-medium">
            Connect Wallet
          </div>
          <div class="text-xs text-muted-foreground">
            Receive your $AAA airdrops in your external wallet
          </div>
        </div>
      </div> -->
      <div class="flex items-center gap-x-4 rounded-md border bg-muted p-4">
        <div class="flex items-center justify-center rounded-md bg-muted-foreground/20 p-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M28 9.70667V6.66667C28 5.2 26.8 4 25.3333 4H6.66667C5.95942 4 5.28115 4.28095 4.78105 4.78105C4.28095 5.28115 4 5.95942 4 6.66667V25.3333C4 26.0406 4.28095 26.7189 4.78105 27.219C5.28115 27.719 5.95942 28 6.66667 28H25.3333C26.8 28 28 26.8 28 25.3333V22.2933C28.403 22.0607 28.7382 21.7265 28.9721 21.3242C29.206 20.9219 29.3305 20.4654 29.3333 20V12C29.3305 11.5346 29.206 11.0781 28.9721 10.6758C28.7382 10.2735 28.403 9.93935 28 9.70667ZM26.6667 12V20H17.3333V12H26.6667ZM6.66667 25.3333V6.66667H25.3333V9.33333H17.3333C15.8667 9.33333 14.6667 10.5333 14.6667 12V20C14.6667 21.4667 15.8667 22.6667 17.3333 22.6667H25.3333V25.3333H6.66667Z"
              fill="#EAECEE" />
            <path
              d="M21.3335 18C22.4381 18 23.3335 17.1046 23.3335 16C23.3335 14.8954 22.4381 14 21.3335 14C20.2289 14 19.3335 14.8954 19.3335 16C19.3335 17.1046 20.2289 18 21.3335 18Z"
              fill="#EAECEE" />
          </svg>
        </div>
        <div>
          <div class="font-poppins text-lg font-medium text-muted-foreground">
            Connect Wallet
          </div>
          <div class="text-xs text-muted-foreground">
            Receive your $AAA airdrops in your external wallet
          </div>
        </div>
      </div>

      <div class="flex items-center gap-x-4 rounded-md border bg-muted p-4">
        <div class="flex items-center justify-center rounded-md bg-muted-foreground/20 p-2">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 24C4 25.1 3.1 26 2 26C0.9 26 0 25.1 0 24C0 22.9 0.9 22 2 22C3.1 22 4 22.9 4 24ZM8 16C6.9 16 6 16.9 6 18C6 19.1 6.9 20 8 20C9.1 20 10 19.1 10 18C10 16.9 9.1 16 8 16ZM8 22C6.9 22 6 22.9 6 24C6 25.1 6.9 26 8 26C9.1 26 10 25.1 10 24C10 22.9 9.1 22 8 22Z"
              fill="#EAECEE" />
            <path
              d="M16 24C16 25.1 15.1 26 14 26C12.9 26 12 25.1 12 24C12 22.9 12.9 22 14 22C15.1 22 16 22.9 16 24ZM14 16C12.9 16 12 16.9 12 18C12 19.1 12.9 20 14 20C15.1 20 16 19.1 16 18C16 16.9 15.1 16 14 16ZM14 10C12.9 10 12 10.9 12 12C12 13.1 12.9 14 14 14C15.1 14 16 13.1 16 12C16 10.9 15.1 10 14 10ZM20 22C18.9 22 18 22.9 18 24C18 25.1 18.9 26 20 26C21.1 26 22 25.1 22 24C22 22.9 21.1 22 20 22Z"
              fill="#EAECEE" />
            <path
              d="M4 24C4 25.1 3.1 26 2 26C0.9 26 0 25.1 0 24C0 22.9 0.9 22 2 22C3.1 22 4 22.9 4 24ZM8 16C6.9 16 6 16.9 6 18C6 19.1 6.9 20 8 20C9.1 20 10 19.1 10 18C10 16.9 9.1 16 8 16ZM8 22C6.9 22 6 22.9 6 24C6 25.1 6.9 26 8 26C9.1 26 10 25.1 10 24C10 22.9 9.1 22 8 22Z"
              stroke="#EAECEE" />
            <path
              d="M16 24C16 25.1 15.1 26 14 26C12.9 26 12 25.1 12 24C12 22.9 12.9 22 14 22C15.1 22 16 22.9 16 24ZM14 16C12.9 16 12 16.9 12 18C12 19.1 12.9 20 14 20C15.1 20 16 19.1 16 18C16 16.9 15.1 16 14 16ZM14 10C12.9 10 12 10.9 12 12C12 13.1 12.9 14 14 14C15.1 14 16 13.1 16 12C16 10.9 15.1 10 14 10ZM20 22C18.9 22 18 22.9 18 24C18 25.1 18.9 26 20 26C21.1 26 22 25.1 22 24C22 22.9 21.1 22 20 22Z"
              stroke="#EAECEE" />
            <path d="M14 6L16 8.00016L18 6L18 20L22 20L22 6L24 8.00016L26 6L20 -0.000158834L14 6Z" fill="#EAECEE" />
          </svg>
        </div>
        <div>
          <div class="font-poppins text-lg font-medium text-muted-foreground">
            Stake FAN
          </div>
          <div class="text-xs text-muted-foreground">
            Stake 2000 FANDOM and earn rewards
          </div>
        </div>
      </div>

      <div class="flex items-center gap-x-4 rounded-md border bg-muted p-4">
        <div class="flex items-center justify-center rounded-md bg-muted-foreground/20 p-2">
          <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 0C5.824 0 0 5.824 0 13C0 20.176 5.824 26 13 26C20.176 26 26 20.176 26 13C26 5.824 20.176 0 13 0ZM13 23.4C7.267 23.4 2.6 18.733 2.6 13C2.6 7.267 7.267 2.6 13 2.6C18.733 2.6 23.4 7.267 23.4 13C23.4 18.733 18.733 23.4 13 23.4ZM13.403 11.882C11.102 11.297 10.361 10.66 10.361 9.711C10.361 8.619 11.388 7.852 13.091 7.852C14.885 7.852 15.561 8.71 15.613 9.984H17.836C17.771 8.242 16.705 6.643 14.599 6.123V3.9H11.57V6.097C9.607 6.513 8.034 7.787 8.034 9.75C8.034 12.077 9.971 13.247 12.792 13.923C15.327 14.521 15.834 15.418 15.834 16.354C15.834 17.043 15.327 18.161 13.104 18.161C11.024 18.161 10.205 17.225 10.088 16.029H7.852C7.982 18.239 9.62 19.487 11.57 19.89V22.1H14.612V19.929C16.588 19.552 18.148 18.421 18.161 16.328C18.148 13.468 15.691 12.48 13.403 11.882Z"
              fill="#EAECEE" />
          </svg>
        </div>
        <div>
          <div class="font-poppins text-lg font-medium text-muted-foreground">
            Buy $AAA Tokens
          </div>
          <div class="text-xs text-muted-foreground">
            Token Pre-sale coming soon!
          </div>
        </div>
      </div>
    </div>

    <NuxtLink to="/user/profile">
      <Button variant="primaryY" class="mt-10 w-full rounded-xl font-bold" size="lg">
        earn more AAA
      </Button>
    </NuxtLink>
  </div>
</template>

<style>
</style>
