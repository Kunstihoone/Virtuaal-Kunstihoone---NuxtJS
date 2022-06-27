import qs from 'qs'
import { defaultLocale, flattenLocalization } from './localizations'

export const fetchStrapiApi = async (path, { params } = {}) => {
  const baseUrl = process.env.strapiUrl
  const queryParams = qs.stringify(params, { encode: true })

  console.log(`${baseUrl}${path}?${queryParams}`)
  try {
    const response = await fetch(`${baseUrl}${path}?${queryParams}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.error(error.response.data.error)
    throw error.response.data.error
  }
}

export const fetchSiteData = async () => {
  const getSiteData = await fetchStrapiApi(
    'api/organisation-info/' + process.env.organisationId,
  )

  const siteData = {
    ...getSiteData.data.attributes,
    localizations: flattenLocalization(getSiteData.data),
  }
  return siteData
}

export const fetchExhibitions = async ({ locale = defaultLocale } = {}) => {
  const exhibitions = await fetchStrapiApi('api/exhibitions', {
    params: {
      locale,
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
      },
    },
  })

  return exhibitions.data
}

export const fetchSingleExhibition = async ({
  params,
  locale = defaultLocale,
} = {}) => {
  const data = await fetchStrapiApi(`api/exhibitions/`, {
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
    data: data.data[0],
  }
}
