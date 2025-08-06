// eslint-disable-next-line no-undef
export const staticPath = process.env.NEXT_PUBLIC_STATIC_URL

export function getUrl(path) {
  if (
    path?.startsWith('http://') ||
    path?.startsWith('https://') ||
    path?.startsWith('//')
  ) {
    return path
  }

  return `${staticPath}${path?.startsWith('/') ? '' : '/'}${path}`
}
