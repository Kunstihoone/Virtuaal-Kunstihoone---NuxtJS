import Vue from 'vue'

Vue.mixin({
  methods: {
    metaData(data) {
      if (data) {
        const siteTitle = this.$store.state.siteData.title
        const siteDescription = this.$store.state.siteData.description
        const siteUrl = this.$store.state.siteData.site_url

        let metaTitle = ''
        let metaDescription = null
        let ogImage = null

        if (data.acf && data.acf.meta_title) {
          metaTitle = data.acf.meta_title
        } else if (data.title && !this.$route.name.startsWith('index__')) {
          metaTitle = data.title + ' | ' + siteTitle
        } else {
          metaTitle = siteTitle
        }

        if (data.acf && data.acf.meta_description) {
          metaDescription = data.acf.meta_description
        } else if (data.excerpt) {
          metaDescription = data.excerpt
        } else if (this.$route.name !== 'index') {
          metaDescription = siteDescription
        }

        if (data.featured_image) {
          ogImage = data.featured_image.url
        } else {
          ogImage = '/og-image.png'
        }

        const metaData = {
          title: metaTitle,
          meta: [
            { property: 'og:url', content: siteUrl + this.$route.path },
            { property: 'og:title', content: metaTitle },
            { property: 'og:image', content: ogImage }
          ],
          link: [{ rel: 'canonical', href: siteUrl + this.$route.path }],
          htmlAttrs: {
            lang: 'en'
          }
        }

        if (metaDescription) {
          metaData.meta.push({
            hid: 'description',
            name: 'description',
            content: siteDescription
          })

          metaData.meta.push({
            property: 'og:description',
            content: metaDescription
          })
        }

        return metaData
      }
    }
  }
})
