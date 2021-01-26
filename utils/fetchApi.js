export default async function fetchApi({ path, params }) {
  const baseUrl = process.env.baseUrl
  const queryParams = params ? new URLSearchParams(params) : ''

  const data = await fetch(`${baseUrl}${path}?${queryParams}`).then((res) => {
    if (!res.ok) {
      return null
    }
    return res.json()
  })

  return data
}
