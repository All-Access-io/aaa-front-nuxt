<script setup lang="ts">
defineProps<{
  query: ReturnType<typeof useInfiniteQuery>
}>()
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <template v-if="query.isFetching.value">
      <slot name="loader">
        <AppCommonSpin class="mt-3 min-h-5" show />
      </slot>
    </template>
    <template v-if="!query.hasNextPage.value && !query.isFetching.value">
      <slot name="no-more-outer">
        <div class="mt-3 w-full text-center text-sm uppercase tracking-widest text-muted-foreground">
          <slot name="no-more">
            no more items...
          </slot>
        </div>
      </slot>
    </template>
  </div>
</template>

<style>
</style>
