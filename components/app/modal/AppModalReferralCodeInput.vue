<script setup lang="ts">
import { type AlertDialogEmits, type AlertDialogProps, AlertDialogRoot, useForwardPropsEmits } from 'radix-vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import z from 'zod'

defineProps<AlertDialogProps>()

const { fetcherReferralCode, referralCodeInput, referralCode, referralCodeInputOpen, toggleReferralCodeInputOpen, checkShouldShowReferralCodeInput } = useReferralCode()
checkShouldShowReferralCodeInput()
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(z.object({
    referralCode: z.string().length(8, 'Invalid referral code'),
  })),
  initialValues: {
    referralCode: referralCode.value,
  },
})
const fetchReferralCode = fetcherReferralCode()

const onSubmit = handleSubmit((_data) => {
  fetchReferralCode.execute()
})
function sanitizeUrl(newValue: string | number) {
  // replace referralCode?${} <- extraact only alphanumeric
  const regex = /referralCode=(\w+)/
  const match = String(newValue).match(regex)
  if (match)
    referralCodeInput.value = match[1]
}
</script>

<template>
  <AlertDialog v-model:open="referralCodeInputOpen">
    <AlertDialogContent class="max-w-sm overflow-hidden rounded-xl border-2 shadow-[0_1.15rem]">
      <AppCommonSpin :fetcher="fetchReferralCode">
        <AlertDialogHeader>
          <AlertDialogTitle class="flex flex-col items-start">
            <div
              class="text-outline text-dropshadow-sm text-left text-4xl font-bold uppercase tracking-wider text-primary-yellow"
            >
              referral
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription>
            <div class="flex w-full flex-col items-start gap-y-1 pt-2 text-primary">
              <div class="text-left">
                enter referral code if you have one
              </div>
              <div class="flex w-full flex-col items-center justify-center py-2">
                <FormField
                  v-slot="{ componentField }" name="referralCode" :validate-on-model-update="false"
                  :validate-on-blur="false"
                >
                  <FormControl>
                    <Input
                      v-model="referralCodeInput" placeholder="Enter referral code (optional)"
                      v-bind="componentField" @update:model-value="sanitizeUrl"
                    />
                  </FormControl>
                  <FormMessage class="mt-2" />
                </FormField>
              </div>
              <div class="flex w-full justify-between">
                <Button variant="ghost" class="px-1" @click="toggleReferralCodeInputOpen(false)">
                  <i class="i-mdi-arrow-left mr-1" />
                  Skip
                </Button>
                <Button variant="secondary" class="px-1" @click="onSubmit">
                  Submit
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
