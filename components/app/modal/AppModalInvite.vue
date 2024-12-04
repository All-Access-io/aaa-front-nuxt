<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)

const { copyReferralCode, referralCode, referralLink, referralMessage, copyLink, isSupported, shareLink } = useSelfReferralCode()
</script>

<template>
  <Dialog v-bind="forwarded">
    <DialogContent class="max-w-sm overflow-hidden rounded-xl border-2 shadow-[0_1.15rem]">
      <DialogHeader>
        <DialogTitle class="flex flex-col items-start">
          <div class="text-outline text-dropshadow-sm text-5xl font-bold uppercase tracking-wider text-primary-yellow">
            invite
          </div>
        </DialogTitle>
        <DialogDescription>
          <div class="flex h-full flex-col gap-y-4 pt-2">
            <div class="relative w-full max-w-sm items-center">
              <div
                class="flex h-10 w-full items-center whitespace-nowrap rounded-md border-2 border-primary-green px-2 pr-10 font-medium text-primary"
              >
                {{ referralCode }}
              </div>
              <Button
                class="absolute inset-y-0 end-0 flex items-center justify-center rounded-l-none border-2 border-l-0 border-primary-green bg-primary-green px-5 font-montserrat text-xs font-semibold uppercase tracking-widest text-primary hover:bg-primary-green"
                @click="copyReferralCode()"
              >
                <i class="i-custom-copy translate-y-1 text-lg" />
                Copy
              </Button>
            </div>
            <div class="flex items-center gap-x-4">
              <div class="font-semibold text-primary">
                or share via
              </div>
              <div class="flex gap-x-2">
                <!-- <Button class="size-8 rounded-full bg-primary text-lg text-background" size="icon">
                  <i class="i-mdi-telegram -translate-x-0.5" />
                </Button>
                <Button class="size-8 rounded-full bg-primary text-lg text-background" size="icon">
                  <i class="i-mdi-facebook-messenger" />
                </Button>
                <Button class="size-8 rounded-full bg-primary text-lg text-background" size="icon">
                  <i class="i-mdi-whatsapp" />
                </Button> -->
                <Button class="size-8 rounded-full bg-primary text-lg text-background" size="icon" @click="copyLink()">
                  <i class="i-mdi-link" />
                </Button>
                <Button class="size-8 rounded-full bg-primary text-lg text-background" size="icon" :disabled="!isSupported" @click="shareLink">
                  <i class="i-mdi-share" />
                </Button>
              </div>
            </div>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<style></style>
