<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

const props = defineProps<{
  imgUrl?: string | null
  imgClass?: HTMLAttributes['class']
  title: string
  description: string
  exclusive?: string

  startDate?: string | Date | null
  endDate?: string | Date | null
}>()

const { date } = useStartEndDate({
  EndDate: props.endDate,
  StartDate: props.startDate,
})
</script>

<template>
  <div class="pb-10">
    <AppMobilePageHeader>
      <template #leftText>
        <div class="font-semibold uppercase tracking-wider">
          <slot name="leftText" />
        </div>
      </template>
    </AppMobilePageHeader>
    <div class="mx-auto w-full max-w-md">
      <div v-if="imgUrl" class="relative -mb-24 min-h-20 w-full">
        <img class="object-fit size-full" :class="imgClass" :src="imgUrl">
      </div>
      <div
        class="relative h-full rounded-t-xl bg-gradient-to-b from-background/70 to-background to-10% backdrop-blur-sm"
      >
        <div v-if="exclusive" class="absolute left-4 top-0 rounded-b-md bg-primary-green px-2 py-px text-xs font-semibold">
          <slot name="exclusive">
            {{ exclusive }}
          </slot>
        </div>
        <!-- TODO: pending API -->
        <!-- <div class="absolute right-2 top-0 rounded-b-md px-2 py-px text-xs">
          <div class="py-2 hidden">
            REPEATS EVERY SUNDAY
          </div>
        </div> -->

        <div class="container flex flex-col gap-y-3 pb-5 pt-12">
          <div class="font-poppins text-4xl font-medium">
            {{ title }}
            <!-- NOTE: figma design has no date -->
            <!-- <div v-if="date" class="text-right font-montserrat text-sm font-normal text-muted-foreground">
              {{ date }}
            </div> -->
          </div>
          <div class="prose" v-html="description" />
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
:deep(.prose) {
  @apply leading-snug;
}

:deep(.prose p) {
  @apply mb-0;
}

.prose ul {
  @apply mt-0;
}

:deep(.prose ul > li) {
  @apply my-1 pl-0;
}

:deep(
    .prose
      :where(ul > li):not(
        :where([class~='not-prose'], [class~='not-prose'] *)
      )::marker
  ) {
  @apply text-primary;
}
</style>
