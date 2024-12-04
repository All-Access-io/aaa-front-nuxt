<script lang="ts" setup>
import type { AlertVariants } from '../ui/alert'

const showAlert = ref(true)
const alertVariant = ref<AlertVariants>()
const title = ref('')
const description = ref('')
</script>

<template>
  <Alert v-if="showAlert" :variant="alertVariant as any as null">
    <AlertTitle>{{ title }}</AlertTitle>
    <AlertDescription>
      {{ description }}
    </AlertDescription>
  </Alert>
</template>

<style>

</style>
