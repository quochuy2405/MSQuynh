import { default as vi } from '@/public/locales/vi/common'
import { default as en } from '@/public/locales/en/common'
const getLanguage = (locale: string) => {
  return locale == 'vi' ? vi : en
}
const changeLanguage = (locales: string, router: any) => {
  switch (locales) {
    case 'vi': {
      router.push('/', '/', { locale: 'en' })
      break
    }
    case 'en': {
      router.push('/', '/', { locale: 'vi' })
      break
    }
  }
}
export { getLanguage, changeLanguage }
