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
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
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
        locales: [
          { code: 'en', name: 'EN' },
          { code: 'et', name: 'ET' },
          { code: 'ru', name: 'RU' }
        ],
        defaultLocale: 'et',
        vueI18n: {
          fallbackLocale: 'et',
          messages: {
            et: {
              details: 'Detailid',
              info: 'Info',
              enter: 'Sisene',
              audio_guide: 'Audiogiid',
              digital_guide: 'Digigiid'
            },
            en: {
              details: 'Details',
              info: 'Info',
              enter: 'Enter',
              audio_guide: 'Audio guide',
              digital_guide: 'Digital Guide'
            },
            ru: {
              details: 'Детали',
              info: 'Информация',
              enter: 'Войти',
              audio_guide: 'Аудио гид',
              digital_guide: 'Цифровой гид'
            }
          }
        },
        parsePages: false,
        pages: {
          '_parent/index': {
            et: '/:parent',
            en: '/:parent',
            ru: '/:parent'
          },
          '_parent/_child': {
            et: '/:parent/:child',
            en: '/:parent/:child',
            ru: '/:parent/:child'
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
