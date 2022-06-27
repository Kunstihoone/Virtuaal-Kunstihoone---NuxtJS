require('dotenv').config()

export default {
  target: process.env.TARGET ? process.env.TARGET : 'static',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    strapiUrl: process.env.STRAPI_URL || 'http://localhost:1337',
    organisationId: process.env.ORGANISATION_ID,
  },
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
      {
        name: 'robots',
        content: process.env.TARGET === 'server' ? 'noindex' : 'index',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicons/favicon.ico' },
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png',
      },
      {
        rel: 'mask-icon',
        href: '/favicons/safari-pinned-tab.svg',
        color: '#1f1f1f',
      },
      { rel: 'preconnect', href: process.env.BASE_URL },
      { rel: 'manifest', href: '/manifest.json' },
    ],
  },
  loading: { color: '#fff' },
  css: ['assets/styles/reset.css'],
  plugins: [
    '~/plugins/components.js',
    '~/mixins/MixinMetaData.js',
    {
      src: '~/plugins/lazysizes.js',
      ssr: false,
    },
    {
      src: '~plugins/i18n.js',
    },
  ],
  buildModules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/google-analytics',
  ],
  googleAnalytics: {
    id: 'UA-154575282-2',
  },
  modules: [
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: {
          useCookie: false,
          onlyOnRoot: true,
        },
        locales: [
          { code: 'et', iso: 'est', name: 'ET', full_name: 'Eesti keeles' },
          {
            code: 'evk',
            iso: 'est',
            name: 'EVK',
            full_name: 'Eesti viipekeel',
          },
          { code: 'ru', iso: 'rus', name: 'RU', full_name: 'По Pусски' },
          { code: 'en', iso: 'eng', name: 'EN', full_name: 'In English' },
        ],
        defaultLocale: 'et',
        vueI18n: {
          fallbackLocale: 'et',
          messages: {
            en: require('./static/translations/strings-en.json'),
            et: require('./static/translations/strings-et.json'),
            evk: require('./static/translations/strings-et.json'),
            ru: require('./static/translations/strings-ru.json'),
          },
        },
        parsePages: false,
        pages: {
          '_exhibition/index': {
            et: '/:exhibition',
            evk: '/:exhibition',
            en: '/:exhibition',
            ru: '/:exhibition',
          },
          '_exhibition/_parent/index': {
            et: '/:exhibition/:parent',
            evk: '/:exhibition/:parent',
            en: '/:exhibition/:parent',
            ru: '/:exhibition/:parent',
          },
          '_exhibition/_parent/_child': {
            et: '/:exhibition/:parent/:child',
            evk: '/:exhibition/:parent/:child',
            en: '/:exhibition/:parent/:child',
            ru: '/:exhibition/:parent/:child',
          },
        },
      },
    ],
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite',
  ],
  styleResources: {
    scss: ['./assets/styles/main.scss'],
  },
  build: {
    loaders: {
      vue: {
        compiler: require('vue-template-babel-compiler'),
      },
    },
  },
  // router: {
  //   prefetchLinks: false,
  //   trailingSlash: true,
  // },
}
