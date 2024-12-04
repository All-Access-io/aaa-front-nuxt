import type { UseFetchOptions } from 'nuxt/app'
import { toast } from 'vue-sonner'
import { defu } from 'defu'

interface CustomFetchOptions<T> extends UseFetchOptions<T> {
  showGlobalLoading?: boolean
  hideLoading?: boolean
}

function createDefaultsAction() {
  const { token, isLoggedIn, clearToken, logout } = useAuthStore()
  const defaults: UseFetchOptions<any> = {
    onRequest({ request, options, error }) {
      if (isLoggedIn) {
        const headers = options.headers ||= {}
        if (Array.isArray(headers))
          headers.push(['Authorization', `Bearer ${token}`])
        else if (headers instanceof Headers)
          headers.set('Authorization', `Bearer ${token}`)
        else
          headers.Authorization = `Bearer ${token}`
      }
    },
    onResponse({ response, error }) {
      if (response.status === 200) {
        const res = JSON.parse(JSON.stringify(response._data)) as Api.Common.ApiResponse<any>

        if (!res.IsSuccess) {
          if (res.Error === 'token_unauthorized' || res.Error === 'missing_required_header') {
            logout()
            clearToken()
            toast.error('Please login to continue')
            return
          }
        }

        res.Error = res.Error || ''
        res.ErrorMessage = res.ErrorMessage || ''
        res.Data = res.Data || {}
        res.Data.IsSuccess = res.IsSuccess
        res.Data.Error = res.Error
        res.Data.ErrorMessage = res.ErrorMessage

        res.Data.Records = res.Data?.Records || []
        response._data = res.Data
        // if (response._data?.isSuccess === false) {
        //   toast.error(response._data?.error, {
        //     closeButton: true,
        //   })
        //   throw new Error(response._data?.error || 'Unknown error')
        // }
      }
    },
    async onResponseError({ response, error }) {
      if (response.status === 401) {
        await navigateTo('/')
        clearToken()
        toast.error('Please login to continue')
      }
      else {
        toast.error(`HTTP Error ${response.status}`, {
          description: response._data?.ErrorMessage || response.statusText,
          closeButton: true,
        })
      }
    },
  }
  return defaults
}

const defaultsOptions = {
  showGlobalLoading: true,
  hideLoading: false,
  lazy: true,
} as CustomFetchOptions<any>

export function api<T>(url: Parameters<typeof $fetch>[0], options?: CustomFetchOptions<T>): ReturnType<typeof $fetch<T>> {
  const { toggleGlobalLoading } = useGlobalLoading()
  const { start, finish } = useLoadingIndicator()
  const defaults = createDefaultsAction()
  const params = defu(options, defaultsOptions)
  const fetch = useNuxtApp().$api
  // @ts-expect-error undefined
  return fetch(url, {
    ...params,
    onRequest(ctx) {
      if (params.showGlobalLoading)
        toggleGlobalLoading(true)
      else
        if (params.hideLoading !== true)
          start()
      // @ts-expect-error undefined
      defaults.onRequest(ctx)
      params.onRequest?.(ctx)
    },
    onResponse(ctx) {
      if (params.showGlobalLoading)
        toggleGlobalLoading(false)
      else
        finish()
      // @ts-expect-error undefined
      defaults.onResponse(ctx)
      params.onResponse?.(ctx)
    },
    onResponseError(ctx) {
      if (params.showGlobalLoading)
        toggleGlobalLoading(false)
      else
        finish()
      // @ts-expect-error undefined
      defaults.onResponseError(ctx)
      // @ts-expect-error this expression is not callable
      params.onResponseError?.()
    },
  })
}

// const a = await api<{ data: string }>('', {
//   showGlobalLoading: true,
// })

export function useApi<T>(
  url: Parameters<typeof useFetch>[0],
  options?: CustomFetchOptions<T>,
): ReturnType<typeof useFetch<T>> {
  const { toggleGlobalLoading } = useGlobalLoading()
  const { start, finish } = useLoadingIndicator()
  const defaults = createDefaultsAction()
  const params = defu(options, defaultsOptions)
  // @ts-expect-error no overload matches
  return useFetch(url, {
    ...params,
    onRequest(ctx) {
      if (params.showGlobalLoading)
        toggleGlobalLoading(true)
      else
        if (params.hideLoading !== true)
          start()
      // @ts-expect-error undefined
      defaults.onRequest(ctx)
      params.onRequest?.(ctx)
    },
    onResponse(ctx) {
      if (params.showGlobalLoading)
        toggleGlobalLoading(false)
      else
        finish()

      // @ts-expect-error undefined
      defaults.onResponse(ctx)
      params.onResponse?.(ctx)
    },
    onResponseError(ctx) {
      if (params.showGlobalLoading)
        toggleGlobalLoading(false)
      else
        finish()
      // @ts-expect-error undefined
      defaults.onResponseError(ctx)
      // @ts-expect-error this expression is not callable
      return params.onResponseError?.()
    },
    $fetch: useNuxtApp().$api,
  })
}
