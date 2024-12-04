<script setup lang="ts">
import { QrcodeStream } from 'vue-qrcode-reader'
import { toast } from 'vue-sonner'

const { back } = useBackRouter()
const { id } = useRoute().params as { id: string }
const questId = Number(id)
if (!questId)
  back()
const authStore = useAuthStore()
const cameraAccess = usePermission('camera')
const loading = ref(true)
const error = ref('')
const torchActive = ref(false)
const paused = ref(false)

const modalOpen = ref(false)
const scannedUrl = ref('')

function onError(err: { name: string, message: string }) {
  error.value = `[${err.name}]: `

  if (err.name === 'NotAllowedError')
    error.value += 'camera access is not permitted, please enable it in your browser sites settings'
  else if (err.name === 'NotFoundError')
    error.value += 'no camera on this device'
  else if (err.name === 'NotSupportedError')
    error.value += 'secure context required (HTTPS, localhost)'
  else if (err.name === 'NotReadableError')
    error.value += 'is the camera already in use?'
  else if (err.name === 'OverconstrainedError')
    error.value += 'installed cameras are not suitable'
  else if (err.name === 'StreamApiNotSupportedError')
    error.value += 'Stream API is not supported in this browser'
  else if (err.name === 'InsecureContextError')
    error.value += 'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  else
    error.value += err.message

  toast.error('Error scanning QR code', {
    description: error.value,
    closeButton: true,
  })
}

interface DetectionResult {
  rawValue: string
  format: string
}

const { showEarnModal } = useEarnModal()
const fetchScanQrCode = useApi<Api.Task.ScanQrCodeResponse>('/api/Quest/ScanQrCode', {
  immediate: false,
  method: 'post',
  body: {
    qrCode: scannedUrl,
    questId,
  },
  default: () => null,
  onResponse({ response }) {
    const res = response._data as any as Api.Task.ScanQrCodeResponse
    if (res.IsSuccess) {
      showEarnModal(res.QuestPoint, 'task', () => {
        paused.value = false
      })
      navigateTo(`/detail/tasks/${res.QuestId}`)
    }
    else {
      if (res.QuestId > 0) {
        navigateTo(`/detail/tasks/${res.QuestId}`)
      }
      else {
        toast.info(res?.Error || 'Invalid QR code')
        paused.value = false
      }
    }
  },
})
async function onDetect([detectedCode]: DetectionResult[]) {
  let detected = String(detectedCode.rawValue).trim()
  if (detected.startsWith('http')) {
    const regex = /.*?code=([\w\-].*)/
    const match = regex.exec(detected)
    if (match)
      detected = match[1]
  }

  // check if valid GUID code
  const GUID_REGEX = /^[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{4}-[a-z0-9]{12}$/i
  if (GUID_REGEX.test(detected) === false)
    return
  const url = detected
  scannedUrl.value = url
  paused.value = true
  // modalOpen.value = true
  try {
    await fetchScanQrCode.execute()
  }
  catch (err) {
    paused.value = false
  }
}

function handleCloseModal() {
  modalOpen.value = false
  setTimeout(() => {
    paused.value = false
  }, 5000)
}
function handleRetryModal() {
  modalOpen.value = false
  setTimeout(() => {
    paused.value = false
  }, 1000)
}

onMounted(async () => {
  await nextTick()
  if (cameraAccess.value) {
    // const stream = new QrcodeStream()
    // stream.start()
  }
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppMobilePageHeader>
      <template #left>
        <Button variant="ghost" class="px-2" @click="back()">
          <i class="i-mdi-arrow-left mr-1 text-[1em]" />
          <div class="font-semibold uppercase tracking-wider">
            back
          </div>
        </Button>
      </template>
      <template #right>
        <AppAAACurrency :value="authStore.userPoints" hide-text />
        <NuxtLink to="#" class="ml-2">
          <Button variant="ghost" size="icon">
            <div class="i-custom-nav-scan size-[24px] translate-y-px" />
          </Button>
        </NuxtLink>
      </template>
    </AppMobilePageHeader>
    <AppCommonSpin :fetcher="fetchScanQrCode" class="flex size-full flex-1 flex-col items-center justify-center">
      <div class="relative flex size-full flex-1 flex-col items-center justify-center bg-foreground/50">
        <div class="container flex max-w-md flex-col items-center justify-center gap-y-4">
          <div class="relative max-w-full p-5">
            <div class="overflow-hidden rounded-[12%]">
              <QrcodeStream
                :paused="paused" :torch="torchActive" class="aspect-square" @camera-on="loading = false"
                @detect="onDetect" @error="onError"
              >
                <Skeleton v-if="loading" class="size-full" />
              </QrcodeStream>
            </div>
            <img src="~/assets/images/qr-frame.png" class="absolute inset-0 w-full">
          </div>
          <div class="space-y-2 text-center">
            <div class="text-sm font-light text-background">
              Scan to earn tokens or unlock rewards
            </div>
            <!-- <div class="text-sm text-card-foreground underline">
              {{ scannedUrl }}
            </div> -->
          </div>
        </div>
        <AlertDialog v-model:open="modalOpen">
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogDescription>
                {{ scannedUrl }}
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel @click="handleRetryModal">
                Retry
              </AlertDialogCancel>
              <AlertDialogAction @click="handleCloseModal">
                Done
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </AppCommonSpin>
  </div>
</template>

<style>
</style>
