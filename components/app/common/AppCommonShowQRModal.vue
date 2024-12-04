<script setup lang="ts">
import { useQRCode } from '@vueuse/integrations/useQRCode'

const props = defineProps<{
  qrCode?: string | null
}>()
const _qrCode = computed(() => props?.qrCode || '')
const qrCodeImg = useQRCode(_qrCode, {
  width: 240,
})
</script>

<template>
  <Dialog>
    <DialogContent class="flex aspect-square max-w-xs items-center justify-center overflow-hidden rounded-xl">
      <img :src="qrCodeImg" alt="qr-code">
    </DialogContent>
  </Dialog>
</template>

<style>
</style>
