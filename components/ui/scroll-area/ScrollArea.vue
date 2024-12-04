<script setup lang="ts">
import { type HTMLAttributes, computed } from 'vue'
import {
  ScrollAreaCorner,
  ScrollAreaRoot,
  type ScrollAreaRootProps,
  ScrollAreaViewport,
} from 'radix-vue'
import ScrollBar from './ScrollBar.vue'
import { cn } from '@/lib/utils'

const props = defineProps<ScrollAreaRootProps & { class?: HTMLAttributes['class'], snapX?: boolean }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props

  return delegated
})

const scrollAreaViewportRef = ref()
defineExpose({ scrollAreaViewportRef })
</script>

<template>
  <ScrollAreaRoot v-bind="delegatedProps" :class="cn('relative overflow-hidden', props.class)">
    <ScrollAreaViewport ref="scrollAreaViewportRef" class="size-full rounded-[inherit]" :class="snapX ? 'snap-x' : ''">
      <slot />
    </ScrollAreaViewport>
    <ScrollBar />
    <ScrollAreaCorner />
  </ScrollAreaRoot>
</template>
