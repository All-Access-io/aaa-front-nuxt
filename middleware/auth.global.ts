export default defineNuxtRouteMiddleware(async (to, from) => {
  const { isLoggedIn, initUserInfo } = useAuthStore()
  await initUserInfo()
  if (!isLoggedIn && to.path !== '/')
    return navigateTo('/')

  if (isLoggedIn && to.path === '/')
    return navigateTo('/user/profile')
})
