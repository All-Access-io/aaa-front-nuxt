<script setup lang="ts">
defineProps<{
  loading?: boolean
}>()
const emits = defineEmits<{
  submit: [code: string]
  cancel: []
  resend: []
}>()
const model = reactive({
  code: [],
})
const open = defineModel<boolean>('open', {
  default: false,
})

function handleComplete() {
  if (model.code.length !== 4)
    return
  emits('submit', model.code.join(''))
}
onKeyStroke('Enter', (e) => {
  e.preventDefault()
  handleComplete()
})

function handleCancel() {
  model.code.length = 0
  open.value = false
  emits('cancel')
}

function handleResend() {
  emits('resend')
  model.code.length = 0
}
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent class="max-w-sm overflow-hidden rounded-xl border-2 shadow-[0_1.15rem]">
      <AppCommonSpin :show="loading">
        <AlertDialogHeader>
          <AlertDialogTitle class="flex flex-col items-start">
            <div
              class="text-outline text-dropshadow-sm text-left text-4xl font-bold uppercase tracking-wider text-primary-yellow"
            >
              verify email
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div class="flex w-full flex-col items-start gap-y-1 pt-2 text-primary">
              <div class="text-left">
                ENTER the code sent to your email. <br> Please check spam folder.
              </div>
              <div class="flex w-full items-center justify-center py-4">
                <PinInput id="pin-input" v-model="model.code" placeholder="○" @complete="handleComplete">
                  <PinInputGroup class="space-x-4">
                    <PinInputInput v-for="(id, index) in 4" :key="id" :index="index" class="border" />
                  </PinInputGroup>
                </PinInput>
              </div>
              <div class="flex w-full justify-between">
                <Button variant="ghost" class="px-1" @click="handleCancel">
                  <i class="i-mdi-arrow-left mr-1" />
                  Change email
                </Button>
                <Button variant="link" class="px-1" @click="handleResend">
                  Resend code
                </Button>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AppCommonSpin>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style></style>
