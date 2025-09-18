import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { History, Trash2, RefreshCw, TrendingUp, Calculator, Clock } from 'lucide-react'
import { useCalculationHistory } from '../hooks/useCalculationHistory'
import { useLocale } from '../contexts/LocaleContext'
import { type CalculationRecord } from '../services/calculationService'
import { format } from 'date-fns'

export default function CalculationHistoryCard() {
  const { calculations, stats, loading, error, removeCalculation, refreshCalculations } = useCalculationHistory()
  const { t } = useLocale()

  const formatCurrency = (amount: number, currency: string): string => {
    const currencyMap = {
      ARS: { code: 'ARS', symbol: '$' },
      USD: { code: 'USD', symbol: '$' },
      EUR: { code: 'EUR', symbol: '€' },
      BRL: { code: 'BRL', symbol: 'R$' },
      CLP: { code: 'CLP', symbol: '$' },
      UYU: { code: 'UYU', symbol: '$U' }
    }
    
    const currencyInfo = currencyMap[currency as keyof typeof currencyMap] || { code: currency, symbol: currency }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyInfo.code,
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'MMM dd, yyyy HH:mm')
  }

  const handleDelete = async (id: string) => {
    if (confirm(t('history.confirmDelete'))) {
      try {
        await removeCalculation(id)
      } catch (err) {
        console.error('Failed to delete calculation:', err)
      }
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {t('history.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin" />
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            {t('history.title')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-sm">{error}</p>
          <Button onClick={refreshCalculations} variant="outline" className="mt-2">
            <RefreshCw className="h-4 w-4 mr-2" />
            {t('history.retry')}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <History className="h-5 w-5" />
              {t('history.title')}
            </CardTitle>
            <CardDescription>
              {t('history.description')}
            </CardDescription>
          </div>
          <Button onClick={refreshCalculations} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Statistics */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
              <Calculator className="h-4 w-4 text-muted-foreground" />
              <div>
                <p className="text-sm text-left font-medium">{stats.totalCalculations}</p>
                <p className="text-xs text-muted-foreground">{t('history.stats.total')}</p>
              </div>
            </div>
            {stats.mostUsedCurrency && (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-left font-medium">{stats.mostUsedCurrency}</p>
                  <p className="text-xs text-muted-foreground">{t('history.stats.mostUsed')}</p>
                </div>
              </div>
            )}
            {stats.lastCalculationDate && (
              <div className="flex items-center text-left gap-2 p-3 bg-muted/50 rounded-lg">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">{formatDate(stats.lastCalculationDate)}</p>
                  <p className="text-xs text-muted-foreground">{t('history.stats.lastCalculation')}</p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Calculations List */}
        {calculations.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <History className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>{t('history.empty')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {calculations.map((calculation) => (
              <CalculationItem
                key={calculation.id}
                calculation={calculation}
                onDelete={() => handleDelete(calculation.id)}
                formatCurrency={formatCurrency}
                formatDate={formatDate}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface CalculationItemProps {
  calculation: CalculationRecord
  onDelete: () => void
  formatCurrency: (amount: number, currency: string) => string
  formatDate: (dateString: string) => string
}

function CalculationItem({ calculation, onDelete, formatCurrency, formatDate }: CalculationItemProps) {
  const { t } = useLocale()

  return (
    <div className="border rounded-lg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-sm">
            {calculation.person_a_name} & {calculation.person_b_name}
          </h4>
          <Badge variant="secondary" className="text-xs">
            {calculation.bill_currency}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            {formatDate(calculation.created_at)}
          </span>
          <Button
            onClick={onDelete}
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('history.totalBill')}:</span>
            <span className="font-medium">
              {formatCurrency(calculation.total_bill, calculation.bill_currency)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{calculation.person_a_name}:</span>
            <span>{formatCurrency(calculation.person_a_payment, calculation.bill_currency)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{calculation.person_b_name}:</span>
            <span>{formatCurrency(calculation.person_b_payment, calculation.bill_currency)}</span>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t('history.incomePercentages')}:</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{calculation.person_a_name}:</span>
            <span>{calculation.person_a_percentage.toFixed(2)}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">{calculation.person_b_name}:</span>
            <span>{calculation.person_b_percentage.toFixed(2)}%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
