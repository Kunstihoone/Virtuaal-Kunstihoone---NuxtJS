export default function({ app, store }) {
  // beforeLanguageSwitch called right before setting a new locale
  app.i18n.beforeLanguageSwitch = (oldLocale, newLocale) => {
    store.commit('SetExhibitions', null)
    store.dispatch('getSiteData', newLocale)

    if (newLocale === 'evk') {
      store.commit('SetAudiGuideState', true)
    }
  }
}
