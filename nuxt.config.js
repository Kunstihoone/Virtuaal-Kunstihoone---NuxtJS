require('dotenv').config()
import axios from 'axios'

// const baseURL = 'http://kunstihoone-videogiid.test/wp-json/www-api/v1/'

var request = axios.create({
  baseURL: process.env.BASE_URL
})

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      },
      { name: 'robots', content: 'noindex' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [{ rel: 'manifest', href: 'manifest.json' }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['assets/styles/reset.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    '~/plugins/components.js',
    '~/mixins/MixinMetaData.js',
    '~/plugins/i18n',
    {
      src: '~/plugins/lazysizes.js',
      ssr: false
    }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    [
      'nuxt-i18n',
      {
        detectBrowserLanguage: false,
        locales: [
          { code: 'et', iso: 'eng', name: 'ET', full_name: 'Eesti keeles' },
          {
            code: 'evk',
            iso: 'evk',
            name: 'EVK',
            full_name: 'Eesti viipekeel'
          },
          { code: 'ru', iso: 'rus', name: 'RU', full_name: 'По Pусски' },
          { code: 'en', iso: 'est', name: 'EN', full_name: 'In English' }
        ],
        defaultLocale: 'et',
        vueI18n: {
          fallbackLocale: 'et',
          messages: {
            en: require('./static/translations/strings-en.json'),
            et: require('./static/translations/strings-et.json'),
            evk: require('./static/translations/strings-et.json'),
            ru: require('./static/translations/strings-ru.json')
          }
        },
        parsePages: false,
        pages: {
          '_exhibition/index': {
            et: '/:exhibition',
            en: '/:exhibition',
            ru: '/:exhibition'
          },
          '_exhibition/_parent/index': {
            et: '/:exhibition/:parent',
            en: '/:exhibition/:parent',
            ru: '/:exhibition/:parent'
          },
          '_exhibition/_parent/_child': {
            et: '/:exhibition/:parent/:child',
            en: '/:exhibition/:parent/:child',
            ru: '/:exhibition/:parent/:child'
          }
        }
      }
    ],
    '@nuxtjs/axios',
    '@nuxtjs/style-resources',
    '@nuxtjs/svg-sprite'
  ],
  styleResources: {
    scss: ['./assets/styles/main.scss']
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: process.env.BASE_URL
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  generate: {
    interval: 100,
    routes: function() {
      return request.get('post-types/virtual-exhibitions').then((res) => {
        return res.data.map((route) => {
          const slug = route.slug
          const parentSlug = route.parent_slug

          return parentSlug ? `${parentSlug}/${slug}` : slug
        })
      })
    }
  }
}
