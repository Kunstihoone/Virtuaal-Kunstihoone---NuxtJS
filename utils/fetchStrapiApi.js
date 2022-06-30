import qs from 'qs'
import { defaultLocale, flattenLocalization } from './localizations'

export const fetchStrapiApi = async (path, { params } = {}) => {
  const baseUrl = process.env.strapiUrl
  const queryParams = qs.stringify(params, { encode: true })
  try {
    const response = await fetch(`${baseUrl}${path}?${queryParams}`)
    const data = await response.json()
    return data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error.response.data.error)
    throw error.response.data.error
  }
}

export const fetchSiteData = async () => {
  const getSiteData = await fetchStrapiApi(
    'api/public-organisation-info/' + process.env.organisationId,
  )

  const siteData = {
    ...getSiteData.data.attributes,
    localizations: flattenLocalization(getSiteData.data),
  }
  return siteData
}

export const fetchExhibitions = async () => {
  const exhibitions = await fetchStrapiApi('api/exhibitions', {
    params: {
      locale: defaultLocale,
      filters: {
        organisation: {
          id: {
            $eq: process.env.organisationId,
          },
        },
      },
      populate: {
        homeView: {
          fields: ['slug'],
        },
        featuredImage: {
          populate: 'file',
        },
        localizations: {
          fields: ['title', 'impressum', 'locale'],
        },
      },
    },
  })

  return exhibitions.data.map((exhibition) => ({
    ...exhibition.attributes,
    localizations: flattenLocalization(exhibition),
  }))
}

export const fetchSingleExhibition = async ({
  params,
  locale = defaultLocale,
} = {}) => {
  const response = await fetchStrapiApi(`api/exhibitions/`, {
    params: {
      locale,
      filters: {
        slug: {
          $eq: params.exhibition,
        },
        organisation: {
          id: {
            $eq: process.env.organisationId,
          },
        },
      },
      populate: {
        homeView: {
          fields: ['slug'],
        },
        featuredImage: {
          populate: 'file',
        },
      },
    },
  })

  return {
    data: response.data[0],
  }
}

export const fetchSingleView = async ({ slug } = {}) => {
  const response = await fetchStrapiApi('api/views', {
    params: {
      locale: defaultLocale,
      filters: {
        slug: {
          $eq: slug,
        },
        organisation: {
          id: {
            $eq: process.env.organisationId,
          },
        },
      },
      populate: {
        // exhibition: {
        //   populate: 'homeView',
        // },
        buttons: {
          populate: {
            fields: ['slug', 'title'],
            view: {
              populate: {
                parent: {
                  fields: ['slug'],
                },
                featuredImage: {
                  populate: 'file',
                },
              },
            },
          },
        },
        label: {
          populate: 'file',
        },
        featuredImage: {
          populate: 'file',
        },
        backgroundAudio: {
          populate: 'file',
        },
        audioGuide: {
          populate: 'file',
        },
        overlaySlides: {
          populate: ['media.file', 'media.localizations'],
        },
        localizations: {
          fields: [
            'audioGuideTitle',
            'externalLink',
            'externalLinkLabel',
            'locale',
          ],
          populate: {
            label: {
              populate: {
                file: '*',
              },
            },
            audioGuide: {
              populate: {
                file: '*',
              },
            },
          },
        },
      },
    },
  })

  const data = {
    ...response.data[0].attributes,
    localizations: flattenLocalization(response.data[0]),
  }

  return {
    data,
  }
}
export const fetchOverlayData = async ({ slug } = {}) => {
  const response = await fetchStrapiApi('api/views', {
    params: {
      locale: defaultLocale,
      filters: {
        slug: {
          $eq: slug,
        },
        organisation: {
          id: {
            $eq: process.env.organisationId,
          },
        },
      },
      populate: {
        label: {
          populate: 'file',
        },
        audioGuide: {
          populate: 'file',
        },
        overlaySlides: {
          populate: ['media.file', 'media.localizations'],
        },
        localizations: {
          fields: [
            'audioGuideTitle',
            'externalLink',
            'externalLinkLabel',
            'locale',
          ],
          populate: {
            label: {
              populate: {
                file: '*',
              },
            },
            audioGuide: {
              populate: {
                file: '*',
              },
            },
          },
        },
      },
    },
  })

  const data = {
    ...response.data[0].attributes,
    localizations: flattenLocalization(response.data[0]),
  }
  return {
    data,
  }
}
