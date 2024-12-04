import en from '~/locales/en/index.json'
import ms from '~/locales/ms/index.json'
import zh from '~/locales/zh/index.json'

export default defineI18nConfig(() => ({
  legacy: false,
  fallbackLocale: 'en',
  messages: {
    en,
    ms,
    zh,
  },

  numberFormats: {

    en: {
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      short: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 2,
        useGrouping: false,
      },
      currency: {
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: 'USD',
      },
    },
    ms: {
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      short: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 2,
        useGrouping: false,
      },
      currency: {
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: 'EUR',
      },
    },
    zh: {
      decimal: {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      },
      short: {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      },
      percent: {
        style: 'percent',
        minimumFractionDigits: 2,
        useGrouping: false,
      },
      currency: {
        style: 'currency',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: 'EUR',
      },
    },
  },
  datetimeFormats: {
    en: {
      short: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      },
      rangeYear: {
        year: 'numeric',
      },
      rangeMonth: {
        month: '2-digit',
      },
      rangeDay: {
        day: '2-digit',
      },
      long: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
    },
    ms: {
      short: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
      long: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
      rangeYear: {
        year: 'numeric',
      },
      rangeMonth: {
        month: '2-digit',
      },
      rangeDay: {
        day: '2-digit',
      },
    },
    zh: {
      short: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      },
      long: {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
      rangeYear: {
        year: 'numeric',
      },
      rangeMonth: {
        month: '2-digit',
      },
      rangeDay: {
        day: '2-digit',
      },
    },
  },
}))
