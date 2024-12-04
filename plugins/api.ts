export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiBase,
  })
  // Expose to useNuxtApp().$api
  return {
    provide: {
      api,
    },
  }
})
