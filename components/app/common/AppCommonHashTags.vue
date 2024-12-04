<script setup lang="ts">
import { isArray } from 'radash'

const props = defineProps<{
  hashTags: string | string[]
}>()
const tags = computed(() => {
  const _tags = isArray(props.hashTags) ? props.hashTags : [props.hashTags]
  // remove empty string
  return _tags.filter(tag => tag)
})
</script>

<template>
  <div class="flex items-center justify-between">
    <ScrollArea>
      <div class="flex gap-x-2">
        <div v-for="v in tags" :key="v" class="rounded-md border border-primary px-1 py-px font-poppins text-xs">
          {{ v }}
        </div>
      </div>
      <ScrollBar orientation="horizontal" class="h-1.5" />
    </ScrollArea>
    <Button variant="ghost" size="icon">
      <img src="~/assets/images/new-tab.png" class="size-4">
    </Button>
  </div>
</template>

<style>
</style>
