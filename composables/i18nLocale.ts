import 'dayjs/locale/zh'
import 'dayjs/locale/ms'
import 'dayjs/locale/en'

export const useI18nLocale = createSharedComposable(() => {
  const dayjs = useDayjs()
  const i18n = useI18n()

  const localeStore = useAppStore()
  i18n.setLocale(localeStore.locale)
  const locale = computed<string>(() => {
    if (!i18n)
      return 'en'

    return unref(i18n.locale)
  })

  const setLocale = (locale: string) => {
    if (!i18n)
      return

    localeStore.toggleLocale(locale)
    i18n.setLocale(locale)
  }

  watch(locale, () => {
    dayjs.locale(locale.value)
  }, {
    immediate: true,
  })

  return {
    locale,
    setLocale,
  }
})
