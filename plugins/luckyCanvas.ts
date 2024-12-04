import LuckyCanvas from '@lucky-canvas/vue'

export default defineNuxtPlugin(() => {
  const nuxtApp = useNuxtApp()
  nuxtApp.vueApp.use(LuckyCanvas)
})
