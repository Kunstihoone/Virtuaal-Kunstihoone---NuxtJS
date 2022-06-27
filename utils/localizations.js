const defaultLocale = 'et'

export const flattenLocalization = (data) => {
  const processLocalizations = data?.attributes?.localizations.data?.reduce(
    (acc, cur) => {
      return {
        ...acc,
        [cur.attributes.locale]: { id: cur.id, ...cur.attributes },
      }
    },
    {},
  )

  if (processLocalizations) {
    processLocalizations[defaultLocale] = {
      id: data?.id,
      ...data?.attributes,
    }
    processLocalizations.evk = {
      id: data?.id,
      ...data?.attributes,
    }
  }

  return processLocalizations
}
