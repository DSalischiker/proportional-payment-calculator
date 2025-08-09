import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export type Currency = 'ARS' | 'USD' | 'EUR' | 'BRL' | 'CLP' | 'UYU'

export interface CurrencyOption {
  code: Currency
  name: string
  symbol: string
}

export const CURRENCY_OPTIONS: CurrencyOption[] = [
  { code: 'ARS', name: 'Argentine Peso', symbol: '$' },
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'CLP', name: 'Chilean Peso', symbol: '$' },
  { code: 'UYU', name: 'Uruguayan Peso', symbol: '$U' }
]

interface CurrencySelectorProps {
  value: Currency
  onChange: (currency: Currency) => void
  disabled?: boolean
}

export default function CurrencySelector({ value, onChange, disabled }: CurrencySelectorProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[100px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {CURRENCY_OPTIONS.map((option) => (
          <SelectItem key={option.code} value={option.code}>
            <div className="flex items-center gap-2">
              <span className="font-mono font-semibold">{option.code}</span>
              <span className="text-muted-foreground text-sm">({option.symbol})</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
