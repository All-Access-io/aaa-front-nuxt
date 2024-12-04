<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { useVModel } from '@vueuse/core'
import { cn } from '@/lib/utils'

const props = defineProps<{
  defaultValue?: string | number
  modelValue?: string | number
  class?: HTMLAttributes['class']
}>()

const emits = defineEmits<{
  (e: 'update:modelValue', payload: string | number): void
}>()

const modelValue = useVModel(props, 'modelValue', emits, {
  passive: true,
  defaultValue: props.defaultValue,
})
</script>

<template>
  <div class="relative w-full">
    <div v-if="$slots.startIcon" class="absolute left-3 top-1/2 -translate-y-1/2">
      <div class="flex items-center">
        <slot name="startIcon" />
      </div>
    </div>
    <input
      v-bind="$attrs"
      v-model="modelValue" :class="cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        $slots.startIcon ? 'pl-9' : '',
        $slots.endIcon ? 'pr-8' : '',
        props.class)"
    >
    <div v-if="$slots.endIcon" class="absolute right-3 top-1/2 -translate-y-1/2">
      <slot name="endIcon" />
    </div>
  </div>
</template>
