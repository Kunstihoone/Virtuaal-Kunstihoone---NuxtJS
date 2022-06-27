export const fetchStrapiApi = async (path, { params } = {}) => {
  const baseUrl = process.env.strapiUrl
  const queryParams = params ? new URLSearchParams(params) : ''

  const data = await fetch(`${baseUrl}${path}?${queryParams}`).then((res) => {
    if (!res.ok) {
      return null
    }
    return res.json()
  })

  return data
}
