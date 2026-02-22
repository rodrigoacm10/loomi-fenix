export const getCurrentPathname = (pathname: string) => {
  const splited = pathname.split('/')

  if (splited[1]?.length === 2) {
    return `/${splited.slice(2).join('/')}`
  }

  return pathname
}
