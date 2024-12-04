export function useBackRouter(specificRoute?: string) {
  const currentRoute = useRoute()
  let navigatedFrom = useNuxtApp().$history.history.value.at(0)?.snapshot
  if (currentRoute.fullPath === navigatedFrom)
    navigatedFrom = useNuxtApp().$history.history.value.at(1)?.snapshot

  return {
    back() {
      if (specificRoute)
        navigateTo(specificRoute)
      if (navigatedFrom)
        navigateTo(navigatedFrom)
      else
        navigateTo('/')
    },
  }
}
