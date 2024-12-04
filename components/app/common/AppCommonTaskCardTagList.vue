<script setup lang="ts">
const props = defineProps<{
  tags: string[] | null

  isComingSoon?: boolean
  isLocked?: boolean
}>()

const _tags = computed(() => {
  if (!props.tags)
    return []
  const pTags = props.tags
  // sort exclusive tags first
  return pTags.filter(v => v)
})
</script>

<template>
  <div class="flex items-center gap-x-1">
    <template v-if="isLocked">
      <template v-if="_tags.at(0)">
        <AppCommonTaskCardTag :key="_tags.at(0)" :tag="_tags.at(0)!" hide-tag />
      </template>
      <AppCommonTag status="locked" size="xs" />
      <slot name="locked" />
    </template>
    <template v-else>
      <AppCommonTaskCardTag v-if="isComingSoon" tag="comming soon" hide-tag />
      <AppCommonTaskCardTag v-for="tag in _tags" :key="tag" :tag="tag" hide-tag />
      <slot></slot>
    </template>
  </div>
</template>

<style>
</style>
