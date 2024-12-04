<script setup lang="ts">
import type { HTMLAttributes } from 'vue'

interface Props {
  value: number
  hideLogo?: boolean
  hideText?: boolean
  maxValue?: number
  showSign?: boolean
  showPlus?: boolean
  showMinus?: boolean
  isEarned?: boolean
  sameTextSize?: boolean
  logoClass?: HTMLAttributes['class']
}
const props = withDefaults(defineProps<Props>(), {
  value: 0,
  hideText: true,
})

const format = useFormat().currency

const valueCount = computed(() => {
  if (props.showSign) {
    const isPositive = props.value > 0
    return `${isPositive ? '+' : '-'}${format(Math.abs(props.value))}`
  }

  return `${props.showPlus ? '+' : ''}${props.showMinus ? '-' : ''}${format(props.value)}`
})
</script>

<template>
  <template v-if="maxValue">
    <div class="flex items-center gap-x-1 text-sm">
      <slot name="icon">
        <svg class="inline-block" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask
            id="mask0_10248_1433" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="12"
            height="13"
          >
            <circle cx="6" cy="6.86963" r="6" fill="white" />
          </mask>
          <g mask="url(#mask0_10248_1433)">
            <circle cx="6" cy="6.86963" r="6" fill="url(#paint0_radial_10248_1433)" />
            <path
              d="M10.3741 0.869629H1.62576C0.7278 0.869629 0 1.59755 0 2.49551V11.2439C0 12.1418 0.7278 12.8696 1.62576 12.8696H10.3741C11.2721 12.8696 12 12.1418 12 11.2439V2.49551C12 1.59755 11.2721 0.869629 10.3741 0.869629ZM3.81324 10.7384C2.87532 10.7463 2.12568 10.0082 2.12112 9.07247C2.11668 8.15531 2.86308 7.40795 3.78672 7.40507C4.7124 7.40219 5.46132 8.14019 5.4648 9.05855C5.46828 9.98615 4.7364 10.7306 3.81324 10.7384ZM8.22732 10.7384C7.2894 10.7463 6.53976 10.0082 6.53508 9.07247V9.06443C6.53508 8.76719 6.61428 8.48831 6.7524 8.24687C6.7908 8.17967 6.83376 8.11535 6.88092 8.05451C7.068 7.77443 7.40508 7.26959 7.51548 7.10243C7.79136 6.68507 7.7442 6.33479 7.09812 6.33479H5.92392L5.92332 6.33263C5.03124 6.29087 4.33248 5.57207 4.32816 4.66871C4.3236 3.75155 5.07012 3.00431 5.99376 3.00143C6.6924 2.99915 7.29024 3.41927 7.54296 4.02023L9.702 8.32019H9.70188C9.81408 8.54219 9.8778 8.79275 9.87888 9.05855C9.88236 9.98615 9.15036 10.7306 8.22732 10.7384Z"
              fill="black"
            />
            <path
              d="M10.3741 0.869629H1.62576C0.7278 0.869629 0 1.59755 0 2.49551V11.2439C0 12.1418 0.7278 12.8696 1.62576 12.8696H10.3741C11.2721 12.8696 12 12.1418 12 11.2439V2.49551C12 1.59755 11.2721 0.869629 10.3741 0.869629ZM3.81324 10.7384C2.87532 10.7463 2.12568 10.0082 2.12112 9.07247C2.11668 8.15531 2.86308 7.40795 3.78672 7.40507C4.7124 7.40219 5.46132 8.14019 5.4648 9.05855C5.46828 9.98615 4.7364 10.7306 3.81324 10.7384ZM8.22732 10.7384C7.2894 10.7463 6.53976 10.0082 6.53508 9.07247V9.06443C6.53508 8.76719 6.61428 8.48831 6.7524 8.24687C6.7908 8.17967 6.83376 8.11535 6.88092 8.05451C7.068 7.77443 7.40508 7.26959 7.51548 7.10243C7.79136 6.68507 7.7442 6.33479 7.09812 6.33479H5.92392L5.92332 6.33263C5.03124 6.29087 4.33248 5.57207 4.32816 4.66871C4.3236 3.75155 5.07012 3.00431 5.99376 3.00143C6.6924 2.99915 7.29024 3.41927 7.54296 4.02023L9.702 8.32019H9.70188C9.81408 8.54219 9.8778 8.79275 9.87888 9.05855C9.88236 9.98615 9.15036 10.7306 8.22732 10.7384Z"
              fill="url(#paint1_angular_10248_1433)" fill-opacity="0.2"
            />
          </g>
          <defs>
            <radialGradient
              id="paint0_radial_10248_1433" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
              gradientTransform="translate(6 6.86963) rotate(139.629) scale(11.2443 13.5992)"
            >
              <stop stop-color="white" />
              <stop offset="1" stop-color="#CECECE" />
            </radialGradient>
            <radialGradient
              id="paint1_angular_10248_1433" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
              gradientTransform="translate(6 6.86963) rotate(-47.7263) scale(1.48661)"
            >
              <stop stop-color="white" />
              <stop offset="0.422631" stop-color="white" stop-opacity="0" />
              <stop offset="1" stop-color="white" />
            </radialGradient>
          </defs>
        </svg>
      </slot>
      <span class="font-semibold">{{ format(value) }}</span>
      <span class="font-semibold">
        /
        <slot name="maxValue" :value="format(maxValue)">
          {{ format(maxValue) }}
          <span class="inline-block align-top text-[0.6em]">AAA</span>
        </slot>
      </span>
    </div>
  </template>
  <template v-else>
    <div class="flex items-center text-sm font-semibold" v-bind="$attrs">
      <svg
        v-if="!hideLogo" class="mr-1 inline-block size-[1.1em]" :class="logoClass" viewBox="0 0 12 13" fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_10248_1433" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="12"
          height="13"
        >
          <circle cx="6" cy="6.86963" r="6" fill="white" />
        </mask>
        <g mask="url(#mask0_10248_1433)">
          <circle cx="6" cy="6.86963" r="6" fill="url(#paint0_radial_10248_1433)" />
          <path
            d="M10.3741 0.869629H1.62576C0.7278 0.869629 0 1.59755 0 2.49551V11.2439C0 12.1418 0.7278 12.8696 1.62576 12.8696H10.3741C11.2721 12.8696 12 12.1418 12 11.2439V2.49551C12 1.59755 11.2721 0.869629 10.3741 0.869629ZM3.81324 10.7384C2.87532 10.7463 2.12568 10.0082 2.12112 9.07247C2.11668 8.15531 2.86308 7.40795 3.78672 7.40507C4.7124 7.40219 5.46132 8.14019 5.4648 9.05855C5.46828 9.98615 4.7364 10.7306 3.81324 10.7384ZM8.22732 10.7384C7.2894 10.7463 6.53976 10.0082 6.53508 9.07247V9.06443C6.53508 8.76719 6.61428 8.48831 6.7524 8.24687C6.7908 8.17967 6.83376 8.11535 6.88092 8.05451C7.068 7.77443 7.40508 7.26959 7.51548 7.10243C7.79136 6.68507 7.7442 6.33479 7.09812 6.33479H5.92392L5.92332 6.33263C5.03124 6.29087 4.33248 5.57207 4.32816 4.66871C4.3236 3.75155 5.07012 3.00431 5.99376 3.00143C6.6924 2.99915 7.29024 3.41927 7.54296 4.02023L9.702 8.32019H9.70188C9.81408 8.54219 9.8778 8.79275 9.87888 9.05855C9.88236 9.98615 9.15036 10.7306 8.22732 10.7384Z"
            fill="black"
          />
          <path
            d="M10.3741 0.869629H1.62576C0.7278 0.869629 0 1.59755 0 2.49551V11.2439C0 12.1418 0.7278 12.8696 1.62576 12.8696H10.3741C11.2721 12.8696 12 12.1418 12 11.2439V2.49551C12 1.59755 11.2721 0.869629 10.3741 0.869629ZM3.81324 10.7384C2.87532 10.7463 2.12568 10.0082 2.12112 9.07247C2.11668 8.15531 2.86308 7.40795 3.78672 7.40507C4.7124 7.40219 5.46132 8.14019 5.4648 9.05855C5.46828 9.98615 4.7364 10.7306 3.81324 10.7384ZM8.22732 10.7384C7.2894 10.7463 6.53976 10.0082 6.53508 9.07247V9.06443C6.53508 8.76719 6.61428 8.48831 6.7524 8.24687C6.7908 8.17967 6.83376 8.11535 6.88092 8.05451C7.068 7.77443 7.40508 7.26959 7.51548 7.10243C7.79136 6.68507 7.7442 6.33479 7.09812 6.33479H5.92392L5.92332 6.33263C5.03124 6.29087 4.33248 5.57207 4.32816 4.66871C4.3236 3.75155 5.07012 3.00431 5.99376 3.00143C6.6924 2.99915 7.29024 3.41927 7.54296 4.02023L9.702 8.32019H9.70188C9.81408 8.54219 9.8778 8.79275 9.87888 9.05855C9.88236 9.98615 9.15036 10.7306 8.22732 10.7384Z"
            fill="url(#paint1_angular_10248_1433)" fill-opacity="0.2"
          />
        </g>
        <defs>
          <radialGradient
            id="paint0_radial_10248_1433" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(6 6.86963) rotate(139.629) scale(11.2443 13.5992)"
          >
            <stop stop-color="white" />
            <stop offset="1" stop-color="#CECECE" />
          </radialGradient>
          <radialGradient
            id="paint1_angular_10248_1433" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(6 6.86963) rotate(-47.7263) scale(1.48661)"
          >
            <stop stop-color="white" />
            <stop offset="0.422631" stop-color="white" stop-opacity="0" />
            <stop offset="1" stop-color="white" />
          </radialGradient>
        </defs>
      </svg>
      <span>
        {{ valueCount }}
        <span
          v-if="!hideText" class="inline-block align-top text-[0.6em] font-bold"
          :class="{ 'text-[1em] font-semibold': sameTextSize }"
        >AAA</span>
        <span
          v-if="isEarned" class="inline-block align-top text-[0.6em] font-bold"
          :class="{ 'text-[1em] font-semibold': sameTextSize }"
        >&nbsp;EARNED</span>
      </span>
    </div>
  </template>
</template>

<style>
</style>
