import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { translations } from '../locales/translations'

export type Locale = 'en' | 'es'

interface LocaleContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string>) => string
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined)

interface LocaleProviderProps {
  children: ReactNode
}

export function LocaleProvider({ children }: LocaleProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    const savedLocale = localStorage.getItem('locale') as Locale
    return savedLocale && ['en', 'es'].includes(savedLocale) ? savedLocale : 'es'
  })

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string, params?: Record<string, string>): string => {
    let translation: string = translations[locale][key as keyof typeof translations[typeof locale]] || key
    
    if (params && typeof translation === 'string') {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        translation = translation.replace(`{${paramKey}}`, paramValue)
      })
    }
    
    return translation
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  )
}

export function useLocale() {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}
