export default defineNuxtPlugin((nuxtApp) => {
  const path = computed(() => nuxtApp._route.fullPath)
  const history = useRefHistory(path, {
    capacity: 20,
  })
  // Expose to useNuxtApp().$api
  return {
    provide: {
      history,
    },
  }
})
