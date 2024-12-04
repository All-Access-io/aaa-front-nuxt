import process from 'node:process'
import ms from 'ms'
import { isDevelopment } from 'std-env'
import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@nuxt/eslint',
    '@pinia/nuxt',
    '@pinia-plugin-persistedstate/nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    'dayjs-nuxt',
    '@nuxtjs/google-fonts',
    '@hebilicious/vue-query-nuxt',
    '@nuxtjs/i18n',
    '@formkit/auto-animate/nuxt',
  ],

  imports: {
    dirs: [
      './lib/models',
      './lib',
    ],
  },

  vueQuery: {
    queryClientOptions: {
      defaultOptions: {
        queries: {
          retry: 0,
          staleTime: 20,
          refetchOnWindowFocus: false,
        },
      },
    },
  },

  dayjs: {
    locales: ['en'],
    plugins: ['relativeTime', 'duration'],
  },

  experimental: {
    // when using generate, payload js assets included in sw precache manifest
    // but missing on offline, disabling extraction it until fixed
    payloadExtraction: false,
    renderJsonPayloads: true,
    typedPages: true,
  },

  runtimeConfig: {
    public: {
      apiBase: '/api',
    },
  },
  // https://stackoverflow.com/questions/74570188/how-do-i-set-proxy-in-nuxt3
  // nitro: {
  //   devProxy: {
  //     '/api': {
  //       target: process.env.API_BASE_URL,
  //       changeOrigin: true,
  //       prependPath: true,
  //     },
  //   },
  // },
  routeRules: {
    '/api/**': { proxy: `${process.env.API_BASE_URL}/api/**` },
  },

  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'zh', iso: 'zh-CN', name: '中文' },
      { code: 'ms', iso: 'ms-MY', name: 'Bahasa Malaysia' },
    ],
    // lazy: true,
    strategy: 'no_prefix',
    detectBrowserLanguage: false,
    // langDir: 'locales',
    defaultLocale: 'en',
    vueI18n: './config/i18n.config.ts',
  },

  // vueQuery: {
  //   queryClientOptions: {
  //     defaultOptions: {
  //       queries: {
  //         retry: 0,
  //         staleTime: ms('1h'),
  //       },
  //     },
  //   },
  // },

  googleFonts: {
    families: {
      Poppins: ['400', '500', '600', '700'],
      Montserrat: ['300', '400', '500', '600', '700', '800'],
      Kanit: ['500', '600'],
    },
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },

  css: [
    'assets/css/index.css',
  ],

  ssr: false,
  spaLoadingTemplate: 'spa-loading-template.html',

  tailwindcss: {
    configPath: 'tailwind.config.ts',
    editorSupport: true,
  },

  colorMode: {
    classSuffix: '',
    preference: 'light',
  },

  nitro: {
    esbuild: {
      options: {
        target: 'esnext',
      },
    },
    prerender: {
      crawlLinks: false,
      routes: ['/'],
      ignore: ['/hi'],
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },

  devtools: {
    enabled: false,
  },

  build: {
    transpile: [
      'trpc-nuxt',
      'buffer',
    ],
  },

  eslint: {
    config: {
      standalone: false,
    },
  },
})
