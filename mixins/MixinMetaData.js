import Vue from 'vue'

Vue.mixin({
  methods: {
    metaData(data) {
      const siteTitle = this.$store.state.siteData.title
      const siteDescription = this.$store.state.siteData.description
      const siteUrl = process.env.siteUrl

      let metaTitle = ''
      let metaDescription = null
      let ogImage = null

      if (data && data.title && !this.$route.name.startsWith('index__')) {
        metaTitle = data.title + ' | ' + siteTitle
      } else {
        metaTitle = siteTitle
      }

      // @TODO: Consider adding metaDescription for views
      // if (data && data.acf && data.acf.meta_description) {
      //   metaDescription = data.acf.meta_description
      // } else if (data && data.excerpt) {
      //   metaDescription = data.excerpt
      // } else {
      //   metaDescription = siteDescription
      // }

      metaDescription = siteDescription

      if (
        data?.featuredImage.data?.attributes.file.data.attributes &&
        !this.$route.name.startsWith('index__')
      ) {
        ogImage = {
          url: data.featuredImage.data.attributes.file.data.attributes.url,
          width: data.featuredImage.data.attributes.file.data.attributes.width,
          height:
            data.featuredImage.data.attributes.file.data.attributes.height,
        }
      } else {
        ogImage = {
          url: '/og-image.png',
          width: 1200,
          height: 1260,
        }
      }

      const metaData = {
        title: metaTitle,
        meta: [
          {
            hid: 'og:url',
            property: 'og:url',
            content: siteUrl + this.$route.path,
          },
          { hid: 'og:title', property: 'og:title', content: metaTitle },
          { hid: 'og:image', property: 'og:image', content: ogImage.url },
          {
            hid: 'og:image:width',
            property: 'og:image:width',
            content: ogImage.width,
          },
          {
            hid: 'og:image:height',
            property: 'og:image:height',
            content: ogImage.height,
          },
        ],
        link: [
          {
            hid: 'canonical',
            rel: 'canonical',
            href: siteUrl + this.$route.path,
          },
        ],
      }

      if (metaDescription) {
        metaData.meta.push({
          hid: 'description',
          name: 'description',
          content: siteDescription,
        })

        metaData.meta.push({
          hid: 'og:description',
          property: 'og:description',
          content: metaDescription,
        })
      }

      return metaData
    },
  },
})
