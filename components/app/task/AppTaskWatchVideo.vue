<script setup lang="ts">
defineProps<{
  url: string
}>()
// example url: https://www.youtube.com/embed/cKfWdiL5oUw?si=E77YL0FtK696a4KA
const { breakpoints } = useUiConfig()
const dimensions = computed(() => {
  if (breakpoints.smallerOrEqual('sm')) {
    return {
      width: '400px',
      height: '225px',
    }
  }
  else if (breakpoints.smallerOrEqual('md')) {
    return {
      width: '720px',
      height: '405px',
    }
  }
  else {
    return {
      width: '1280px',
      height: '720px',
    }
  }
})
</script>

<template>
  <Dialog>
    <DialogTrigger>
      <div class="flex cursor-pointer items-center gap-x-2 rounded-md border border-primary bg-background p-2 hover:bg-muted/50" v-bind="$attrs">
        <div class="flex size-[48px] items-center justify-center rounded-md bg-red-500 text-4xl text-white">
          <i class="i-material-symbols-play-arrow-rounded" />
        </div>
        <div class="">
          <div class="text-left font-poppins text-xl font-medium">
            Watch this video for clues.
          </div>
          <div class="text-1xs text-muted-foreground">
            The answers to the questions can be found in this video.
          </div>
        </div>
      </div>
    </DialogTrigger>
    <DialogContent class="flex aspect-[16/9] items-center justify-center p-1">
      <div v-html="url" />
      <!-- <iframe -->
      <!-- :width="dimensions.width" :height="dimensions.height" :src="url" title="YouTube video player" -->
      <!-- frameborder="0" -->
      <!-- allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" -->
      <!-- referrerpolicy="strict-origin-when-cross-origin" allowfullscreen -->
      <!-- /> -->
    </DialogContent>
  </Dialog>
</template>

<style>
</style>
