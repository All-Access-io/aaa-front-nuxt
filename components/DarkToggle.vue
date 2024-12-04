<script setup lang="ts">
const color = useColorMode()

function toggleDark() {
  color.preference = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <Button size="icon" variant="secondary" class="p-2" @click="toggleDark">
    <div class="i-carbon-sun dark:i-carbon-moon" />
  </Button>
</template>
