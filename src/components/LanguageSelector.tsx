import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
import { Globe } from 'lucide-react'
import { useLocale, type Locale } from '../contexts/LocaleContext'

const LANGUAGE_OPTIONS = [
  { code: 'en' as Locale, name: 'English', nativeName: 'English' },
  { code: 'es' as Locale, name: 'Español', nativeName: 'Español' }
]

interface LanguageSelectorProps {
  className?: string
}

export default function LanguageSelector({ className }: LanguageSelectorProps) {
  const { locale, setLocale } = useLocale()

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Globe className="h-4 w-4 text-muted-foreground" />
      <Select value={locale} onValueChange={setLocale}>
        <SelectTrigger className="w-[140px] text-muted-foreground">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {LANGUAGE_OPTIONS.map((option) => (
            <SelectItem key={option.code} value={option.code}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{option.nativeName}</span>
                <span className="text-muted-foreground text-sm">
                  ({option.code.toUpperCase()})
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
