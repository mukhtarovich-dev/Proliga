// src/app/sitemap.js

// Make sure this URL is your actual production domain
// eslint-disable-next-line no-undef
const URL = process.env.NEXT_PUBLIC_URL || '' // Fallback just in case

export default async function sitemap() {
  const locales = ['uz'] // Add other locales like 'en', 'ru' if you have them

  // Base static pages - assuming your default locale (e.g., if NEXT_PUBLIC_URL is just proliga.uz without locale)
  // might be handled by Next.js i18n routing without a prefix, or it might be one of the locales.
  // For this example, let's list common pages.
  // If your default locale (e.g. 'uz') is served from the root path ('/'),
  // ensure you don't double-add it when iterating locales.
  const staticPagePaths = [
    '/', // Root page
    '/about-us',
    '/championships',
    '/prizes',
    '/packages',
    '/regulation',
    '/user-agreement',
    '/auth',
    '/offline', // If you have a dedicated offline page
    // Add any other important static pages
  ]

  const sitemapEntries = []

  // Add non-localized versions first (or your default locale if it has no prefix)
  staticPagePaths.forEach((path) => {
    sitemapEntries.push({
      url: `${URL}${path}`,
      lastModified: new Date().toISOString(),
      changeFrequency: path === '/' ? 'daily' : 'monthly', // Example frequencies
      priority: path === '/' ? 1.0 : 0.8, // Example priorities
    })
  })

  // Add localized versions for all specified locales
  locales.forEach((locale) => {
    staticPagePaths.forEach((path) => {
      // Avoid double-adding the root if already added (e.g. if '/' is meant for the default locale)
      // This check ensures we don't add both '/' and '/uz' if '/' is meant to be 'uz' already.
      // However, if '/' is a separate page from '/uz/', then this logic is fine.
      // For typical Next.js i18n, if 'uz' is a locale, its root is '/uz'.
      // If 'uz' is also your default locale and you don't want a prefix for it, Next.js handles this.
      // We are assuming here '/' is distinct or a general fallback, and '/uz/*' are specific.

      const localizedPath = path === '/' ? `/${locale}` : `/${locale}${path}`

      // Simple check to prevent adding /uz if / was already added and meant to be uz.
      // This depends heavily on your i18n strategy.
      // A safer bet for distinct entries:
      if (path === '/') {
        // Only add the locale root
        sitemapEntries.push({
          url: `${URL}/${locale}`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'daily',
          priority: 1.0,
        })
      } else {
        // Add other localized pages
        sitemapEntries.push({
          url: `${URL}${localizedPath}`,
          lastModified: new Date().toISOString(),
          changeFrequency: 'monthly',
          priority: 0.8,
        })
      }
    })
  })

  // Example for dynamic routes (e.g., championship details)
  // You would fetch these IDs from your database or API
  // const exampleChampionshipIds = ['champ1', 'champ2', 'champ3'];
  // exampleChampionshipIds.forEach(id => {
  //   sitemapEntries.push({
  //     url: `${URL}/play/some-league/${id}`, // Adjust path as needed
  //     lastModified: new Date().toISOString(),
  //     changeFrequency: 'weekly',
  //   });
  //   locales.forEach(locale => {
  //     sitemapEntries.push({
  //       url: `${URL}/${locale}/play/some-league/${id}`, // Adjust path as needed
  //       lastModified: new Date().toISOString(),
  //       changeFrequency: 'weekly',
  //     });
  //   });
  // });

  // Ensure unique URLs, as the logic above might create duplicates depending on i18n setup for default locale
  const uniqueEntries = Array.from(
    new Map(sitemapEntries.map((entry) => [entry.url, entry])).values()
  )

  return uniqueEntries
}
