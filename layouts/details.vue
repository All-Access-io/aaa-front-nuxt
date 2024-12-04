<script lang="ts" setup>

</script>

<template>
  <main class="flex min-h-screen flex-col">
    <AppHeader />
    <section class="flex-1 relative flex flex-col">
      <slot />
    </section>
    <!-- <AppFooter /> -->
    <AppMobileTabNav />
  </main>
</template>

<style>

</style>
