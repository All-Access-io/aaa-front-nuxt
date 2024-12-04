<script setup lang="ts">
import { DialogRoot, type DialogRootEmits, type DialogRootProps, useForwardPropsEmits } from 'radix-vue'

const props = defineProps<DialogRootProps>()
const emits = defineEmits<DialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

<template>
  <Dialog v-bind="forwarded">
    <DialogContent class="max-w-sm overflow-hidden rounded-xl border-2 shadow-[0_1.15rem]">
      <DialogHeader>
        <DialogTitle class="flex flex-col items-start">
          <div class="text-outline text-dropshadow-sm text-5xl font-bold uppercase tracking-wider text-primary-yellow">
            connect
          </div>
        </DialogTitle>
        <DialogDescription>
          <div class="flex h-full flex-col items-start gap-y-1 pt-2 text-primary">
            <div>Connect to a wallet on the Viction network</div>
            <Button class="space-x-2" variant="ghost">
              <Skeleton class="size-7" />
              <span class="text-lg font-semibold">Metamask</span>
            </Button>
            <Button class="space-x-2" variant="ghost">
              <Skeleton class="size-7" />
              <span class="text-lg font-semibold">Binance</span>
            </Button>
            <Button class="space-x-2" variant="ghost">
              <Skeleton class="size-7" />
              <span class="text-lg font-semibold">Rabby Wallet</span>
            </Button>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  </Dialog>
</template>

<style></style>
