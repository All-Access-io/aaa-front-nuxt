<script setup lang="ts">
import type { AlertDialogProps } from 'radix-vue'

defineProps<AlertDialogProps & {
  reward: Api.Reward.Reward
}>()
defineEmits<{
  (e: 'submit'): void
}>()

const open = defineModel<boolean>('open', {
  default: false,
})
</script>

<template>
  <AlertDialog v-model:open="open">
    <AlertDialogContent class="max-w-sm overflow-hidden rounded-xl border-2 shadow-[0_1.15rem]">
      <AlertDialogHeader>
        <AlertDialogTitle class="flex justify-between">
          <div
            class="text-outline text-dropshadow-sm text-left text-4xl font-bold uppercase tracking-wider text-primary-yellow"
          >
            join raffle
          </div>
          <div class="cursor-pointer" @click="open = false">
            <i class="i-mdi-close" />
          </div>
        </AlertDialogTitle>
        <AlertDialogDescription v-if="reward">
          <div class="flex w-full flex-col gap-y-1 pt-2 text-primary">
            <div class="flex gap-x-2 rounded-lg border border-primary px-3 py-2 text-left">
              <img
                v-if="reward?.ImageBase64" class="mt-0.5 size-20 rounded-md"
                :class="{ 'size-[2.4rem]': reward?.IsClaimedFinish }" :src="reward?.ImageBase64"
              >
              <div>
                <div class="text-1xs font-medium uppercase">
                  {{ reward.Tag?.at(0)?.replace('#', '') }}
                </div>
                <div class="my-1 line-clamp-2 font-poppins text-lg font-medium leading-[1.3rem]">
                  {{ reward.Title }}
                </div>
                <div v-if="!reward.IsClaimedFinish" class="line-clamp-5 text-1xs text-muted-foreground/80">
                  {{ reward.Description }}
                </div>
              </div>
            </div>
            <AppCommonStatus
              v-if="!reward.IsClaimedFinish" :fan-value="reward.Point" hide-sign
              class="w-full border-none"
            >
              <span class="font-semibold">raffle ticket cost</span>
            </AppCommonStatus>
            <div class="flex w-full flex-col gap-y-2">
              <Button variant="primaryY" @click="$emit('submit')">
                confirm
              </Button>
              <Button variant="primary-ghost" class="border-0 drop-shadow-none" @click="open = false">
                <i class="i-mdi-arrow-left mr-1" />
                back
              </Button>
            </div>
          </div>
        </AlertDialogDescription>
      </AlertDialogHeader>
    </AlertDialogContent>
  </AlertDialog>
</template>

<style></style>
