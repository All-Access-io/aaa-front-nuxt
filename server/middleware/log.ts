export default defineEventHandler((event) => {
  const url = getRequestURL(event)
  if (url.toString().includes('favicon.ico'))
    return

  // eslint-disable-next-line no-console
  console.log(`[NITRO] ${new Date().toISOString()} | ${getResponseStatus(event)} | ${getRequestIP(event)} | ${getMethod(event)} ${getRequestPath(event)}`)
})
