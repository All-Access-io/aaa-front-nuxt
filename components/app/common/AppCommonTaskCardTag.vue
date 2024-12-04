<script setup lang="ts">
const props = defineProps<{
  tag: string
  hideTag?: boolean
}>()

const isExclusive = computed(() => {
  return props.tag.toLocaleLowerCase().includes('exclusive')
})

const _tag = computed(() => {
  let propsTag = props.tag
  if (props.hideTag)
    propsTag = props.tag.replace('#', '')
  if (isExclusive.value) {
    propsTag = propsTag.replace('Exclusive', '')
    propsTag = `${propsTag} Exclusive`
  }

  return propsTag
})
</script>

<template>
  <template v-if="isExclusive">
    <div class="text-1xs font-medium uppercase">
      {{ _tag }}
    </div>
  </template>
  <template v-else>
    <AppCommonTag :status="tag.replace('#', '').toLowerCase()" size="xs">
      {{ _tag }}
    </AppCommonTag>
  </template>
</template>

<style>
</style>
