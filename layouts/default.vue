<script lang="ts" setup>

</script>

<template>
  <main class="flex min-h-screen flex-col">
    <AppHeader />
    <section class="relative flex flex-1 flex-col">
      <slot />
    </section>
    <!-- <AppFooter /> -->
    <AppMobileTabNav />
  </main>
</template>

<style>

</style>
