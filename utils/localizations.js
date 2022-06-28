export const defaultLocale = 'et'

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
      localizations: null,
    }
    // @TODO Find a more elegant way to do this
    processLocalizations[defaultLocale].localizations &&
      delete processLocalizations[defaultLocale].localizations
    processLocalizations[defaultLocale].overlaySlides &&
      delete processLocalizations[defaultLocale].overlaySlides
    processLocalizations.evk = {
      id: data?.id,
      ...data?.attributes,
    }
    processLocalizations.evk.localizations &&
      delete processLocalizations.evk.localizations
    processLocalizations.evk.overlaySlides &&
      delete processLocalizations.evk.overlaySlides
  }

  return processLocalizations
}
