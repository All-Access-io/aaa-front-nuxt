export default defineNuxtRouteMiddleware(async (to, from) => {
  // TODO not working
  // debugger
  const navigatedFrom = from?.path
  if (!navigatedFrom)
    return
  const appStore = useAppStore()
  if (!from.path.includes('wallet'))
    appStore.setNavigatedFrom(navigatedFrom)
})
