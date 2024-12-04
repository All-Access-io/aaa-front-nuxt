import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'

export function useUiConfig() {
  const breakpoints = useBreakpoints(breakpointsTailwind)
  const isMobile = breakpoints.smallerOrEqual('sm')
  const isTablet = breakpoints.between('sm', 'md')
  const isDesktop = breakpoints.greater('sm')

  const router = useRouter()
  const route = useRoute()
  const isHome = computed(() => router.currentRoute.value.path === '/')

  // const hideHeaderAndFooterRoutes: Array<typeof route.name> = ['tasks', 'tasks-quiz']
  const hideHeaderAndFooter = computed(() => {
    return route.path.includes('/detail')
  })

  return {
    breakpoints,
    isMobile,
    isTablet,
    isDesktop,

    isHome,
    hideHeaderAndFooter,
  }
}
