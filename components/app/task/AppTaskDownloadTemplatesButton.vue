<script setup lang="ts">
defineProps<{
  url: string
}>()
// const files = [
  // 'ALESSO24 GOING TO ALESSO T1.jpg',
  // 'ALESSO24 GOING TO ALESSO T2.jpg',
  // 'ALESSO24 GOING TO ALESSO T3.jpg',
  // 'ALESSO24 GOING TO ALESSO T4.jpg',
  // 'ALESSO24 GOING TO ALESSO T5.jpg',
// ]
//
// function handleDownload() {
  // const a = document.createElement('a')
  // a.style.display = 'none'
  // document.body.appendChild(a)
  // for (const file of files) {
    // a.setAttribute('href', `data:application/octet-stream,${encodeURIComponent(`/images/templates/${file}`)}`)
    // a.setAttribute('download', file)
    // a.click()
  // }
  // document.body.removeChild(a)
// }
</script>

<template>
  <NuxtLink :to="url" external target="_blank">
    <Button variant="primary" class="mb-4 w-full justify-between font-bold">
      download templates
      <i class="i-custom-templates" />
    </Button>
  </NuxtLink>
</template>

<style>
</style>
