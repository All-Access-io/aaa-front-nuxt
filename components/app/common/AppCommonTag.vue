<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { type VariantProps, cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

type TagVariant = VariantProps<typeof tagVariants>
const props = defineProps<{
  status?: TagVariant['status'] | string
  size?: TagVariant['size']
  class?: HTMLAttributes['class']
  variants?: TagVariant['status'] | string
}>()
const _status = computed(() => {
  if (props?.variants)
    return props.variants

  if (props.status && !['completed', 'failed', 'claimed', 'required', 'locked'].includes(props.status))
    return 'default'
  return props.status
})

const tagVariants = cva(
  'inline-flex items-center justify-center text-xs font-medium uppercase',
  {
    variants: {
      status: {
        completed: 'bg-primary-green',
        failed: 'bg-primary-error text-background',
        joined: 'bg-primary-yellow text-primary',
        claimed: 'bg-primary-yellow font-semibold text-primary',
        required: 'font-base bg-primary-neon/15 text-primary-neon',
        default: 'bg-muted text-primary',
        locked: 'bg-muted font-bold text-primary',
        muted: 'bg-muted font-bold text-muted-foreground',
        green: 'bg-primary-green font-bold text-primary',
        white: 'bg-background font-bold text-primary',
      },
      size: {
        default: 'rounded-sm px-2 py-1',
        xs: 'rounded-sm px-1 py-0.5 text-2xs',
        sm: 'rounded-md px-1.5 py-0.5 text-1xs',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10',
      },
    },
    defaultVariants: {
      status: 'completed',
      size: 'default',
    },
  },
)
</script>

<template>
  <!-- @vue-expect-error -->
  <div :class="cn(tagVariants({ status: _status, size }), props.class)" v-bind="$attrs">
    <slot>
      {{ status }}
    </slot>
  </div>
  <div v-if="status === 'locked'" class="-ml-1 text-1xs">
    <i class="i-mdi-lock text-primary" />
  </div>
</template>

<style>
</style>
