import { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { RefreshCw, TrendingUp, AlertCircle, ChevronDown } from 'lucide-react'
import { useLocale } from '../contexts/LocaleContext'
import { CURRENCY_OPTIONS, type Currency } from './CurrencySelector'
import type { CurrencyRates } from '../hooks/useCurrencyRates'

interface CurrencyRatesCardProps {
  rates: CurrencyRates | null
  loading: boolean
  error: string | null
  lastUpdated: string | null
  onRefresh: () => void
}

export default function CurrencyRatesCard({ 
  rates, 
  loading, 
  error, 
  lastUpdated, 
  onRefresh 
}: CurrencyRatesCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)
  const [baseCurrency, setBaseCurrency] = useState<Currency>('ARS')
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const { t } = useLocale()
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currencies: Currency[] = ['USD', 'EUR', 'BRL', 'CLP', 'UYU', 'ARS']

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const getCurrencyFlag = (currency: string): string => {
    const flagMap: Record<string, string> = {
      USD: '/us.png',
      EUR: '/ue.png', 
      BRL: '/brazil.png',
      CLP: '/chile.png',
      UYU: '/uruguay.png',
      ARS: '/arg.png'
    }
    return flagMap[currency] || '/arg.png' // Default to ARS flag if currency not found
  }

  const CurrencyFlag = ({ currency }: { currency: string }) => {
    const flagSrc = getCurrencyFlag(currency)
    
    return (
      <img 
        src={flagSrc} 
        alt={`${currency} flag`} 
        className="w-4 h-4 object-cover rounded-sm"
      />
    )
  }

  const getCurrencySymbol = (currency: Currency): string => {
    const option = CURRENCY_OPTIONS.find(opt => opt.code === currency)
    return option?.symbol || currency
  }

  const formatCurrency = (amount: number, currency: Currency = baseCurrency): string => {
    const symbol = getCurrencySymbol(currency)
    const formattedAmount = amount.toLocaleString('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 2 
    })
    
    // Return HTML structure with smaller symbol
    return `<span class="text-xs opacity-75">${symbol}</span><span class="text-sm">${formattedAmount}</span>`
  }

  const convertCurrency = (amount: number, fromCurrency: Currency, toCurrency: Currency): number => {
    if (!rates || fromCurrency === toCurrency) return amount
    
    // Convert everything to ARS first (our base rate)
    let amountInARS = amount
    if (fromCurrency !== 'ARS') {
      amountInARS = amount * (rates[fromCurrency as keyof CurrencyRates] || 1)
    }
    
    // Then convert from ARS to target currency
    if (toCurrency === 'ARS') {
      return amountInARS
    }
    
    const targetRate = rates[toCurrency as keyof CurrencyRates] || 1
    return amountInARS / targetRate
  }

  const getDisplayRate = (currency: Currency): number => {
    if (currency === baseCurrency) return 1
    if (!rates) return 0
    
    if (baseCurrency === 'ARS') {
      return rates[currency as keyof CurrencyRates] || 0
    }
    
    return convertCurrency(1, currency, baseCurrency)
  }

  const getCurrencyName = (currency: Currency): string => {
    return t(`currency.${currency.toLowerCase()}`)
  }

  const getSortedCurrencies = (): Currency[] => {
    return [baseCurrency, ...currencies.filter(c => c !== baseCurrency)]
  }

  const formatDate = (dateString: string): string => {
    try {
      return new Date(dateString).toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return 'Unknown'
    }
  }

  return (
    <Card className="w-full transition-all duration-200">
      <CardHeader className={`${isCollapsed ? 'pb-0' : 'pb-3'} transition-all duration-200`}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            {t('exchangeRates.title')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRefresh}
              disabled={loading}
              className="h-8 w-8 p-0"
              title={t('exchangeRates.refresh')}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0 transition-transform duration-200"
              title={isCollapsed ? t('exchangeRates.expand') : t('exchangeRates.collapse')}
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
            </Button>
          </div>
        </div>
        <div className={`transition-all duration-300 ${isCollapsed ? 'max-h-0 opacity-0 overflow-hidden' : 'max-h-20 opacity-100'}`}>
          <CardDescription className="flex justify-between items-center relative">
            <div className="flex items-center text-left gap-1">
              <span>{t('exchangeRates.description', { baseCurrency: getCurrencyName(baseCurrency) })}</span>
              <div className="relative" ref={dropdownRef}>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    console.log('Dropdown clicked, current state:', dropdownOpen)
                    setDropdownOpen(!dropdownOpen)
                  }}
                  className="h-5 w-5 p-0 hover:bg-muted"
                >
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : 'rotate-0'}`} />
                </Button>
                {dropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-1 rounded-md shadow-lg z-[100] min-w-[120px] max-h-48 overflow-auto"
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #ccc',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    }}
                  >
                    {currencies.map((currency) => (
                      <button
                        key={currency}
                        onClick={() => {
                          console.log('Currency selected:', currency)
                          setBaseCurrency(currency)
                          setDropdownOpen(false)
                        }}
                        className="w-full text-left px-3 py-2 text-sm transition-colors first:rounded-t-md last:rounded-b-md hover:bg-gray-100"
                        style={{
                          backgroundColor: currency === baseCurrency ? '#f3f4f6' : 'transparent',
                          color: '#374151'
                        }}
                      >
                        {currency}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </CardDescription>
        </div>
      </CardHeader>
      
      <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
        <CardContent className="pt-0">
          {loading ? (
            <div className="flex items-center justify-center py-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>{t('exchangeRates.loading')}</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span className="text-sm">{t('exchangeRates.error')}</span>
            </div>
          ) : rates ? (
            <div className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {getSortedCurrencies().map((currency) => {
                  const isBaseCurrency = currency === baseCurrency
                  const displayRate = getDisplayRate(currency)
                  
                  return (
                    <div 
                      key={currency}
                      className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                        isBaseCurrency 
                          ? 'bg-primary/10 hover:bg-primary/15' 
                          : 'bg-muted hover:bg-muted/80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Badge 
                          variant={isBaseCurrency ? "default" : "secondary"} 
                          className="flex items-center gap-1" 
                          title={getCurrencyName(currency)}
                        >
                          <CurrencyFlag currency={currency} />
                          <span className="hidden sm:inline">{currency}</span>
                        </Badge>
                        <span className="text-sm font-medium hidden md:inline">
                          {getCurrencyName(currency)}
                        </span>
                      </div>
                      <span 
                        className="font-semibold"
                        dangerouslySetInnerHTML={{ __html: formatCurrency(displayRate, baseCurrency) }}
                      />
                    </div>
                  )
                })}
              </div>
              
              {lastUpdated && (
                <div className="text-left text-xs text-muted-foreground pt-2 border-t">
                  {t('exchangeRates.lastUpdated')}: {formatDate(lastUpdated)}
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 text-muted-foreground">
              {t('exchangeRates.noRates')}
            </div>
          )}
        </CardContent>
      </div>
    </Card>
  )
}
