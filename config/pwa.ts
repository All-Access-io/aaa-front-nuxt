import process from 'node:process'
import type { ModuleOptions } from '@vite-pwa/nuxt'
import { isDevelopment } from 'std-env'
import { appDescription, appName } from '../constants/index'
import { icons } from './icons.json'

const scope = '/'

// https://www.xiaolinboke.com/detail/374e236e-5f5a-4aae-914d-c07288d035a5
// https://www.jianshu.com/p/0a07bd528e08
export const pwa: ModuleOptions = {
  registerType: 'autoUpdate',
  disable: (isDevelopment && process.env.VITE_DEV_PWA !== 'true'),
  // srcDir: './service-worker',
  // filename: 'sw.ts',
  strategies: 'generateSW',
  scope,
  base: scope,
  manifest: {
    id: scope,
    scope,
    name: appName,
    short_name: appName,
    description: appDescription,
    theme_color: '#ffffff',
    icons,

    orientation: 'portrait',
    display_override: ['standalone', 'minimal-ui', 'window-controls-overlay'],
    categories: ['books', 'education', 'entertainment'],

    dir: 'ltr',
    lang: 'en',
    iarc_rating_id: 'E',
    prefer_related_applications: false,
  },
  workbox: {
    globPatterns: ['**/*.{js,css,html,txt,png,ico,svg,woff2}'],
    navigateFallbackDenylist: [/^\/api\//, /.*/],
    // navigateFallbackAllowlist: [/^\/$/],
    navigateFallback: '/',
    cleanupOutdatedCaches: true,
    runtimeCaching: [
      {
        urlPattern: ({ url, sameOrigin }) => sameOrigin && (url.pathname.startsWith('/api/') && !url.pathname.startsWith('/api/image')),
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'api-cache',
          expiration: {
            maxEntries: 1000,
            maxAgeSeconds: 60 * 60 * 24 * 1,
            purgeOnQuotaError: true,
          },
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
      {
        urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/api/image') || url.pathname.startsWith('/b/'),
        // 缓存方案
        //  value: 'CacheFirst' | 'CacheOnly' | 'NetworkFirst' | 'NetworkOnly' | 'StaleWhileRevalidate';
        handler: 'CacheFirst',
        options: {
          cacheName: 'res-cache', // 缓存组名
          // 资源过期时间-具体配置value请自行查找-
          expiration: {
            maxEntries: 5000,
            maxAgeSeconds: 60 * 60 * 24 * 7,
            // matchOptions?: CacheQueryOptions;
            purgeOnQuotaError: true,
          },
          // Configure which responses are considered cacheable.
          cacheableResponse: {
            statuses: [200], // 网络响应资源状态码为200进行缓存
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'google-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
        handler: 'CacheFirst',
        options: {
          cacheName: 'gstatic-fonts-cache',
          expiration: {
            maxEntries: 10,
            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
    ],
  },
  client: {
    installPrompt: false, // 安装提示
    periodicSyncForUpdates: 3600, // 定期同步更新资源
  },
  registerWebManifestInRouteRules: true,
  writePlugin: true,
  devOptions: {
    enabled: process.env.VITE_PLUGIN_PWA === 'true',
    navigateFallback: scope,
  },
}
