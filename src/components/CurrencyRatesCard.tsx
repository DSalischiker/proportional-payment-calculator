import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { RefreshCw, TrendingUp, AlertCircle } from 'lucide-react'
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
  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      minimumFractionDigits: 2
    }).format(amount)
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
    <Card className="w-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Exchange Rates
          </CardTitle>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRefresh}
            disabled={loading}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        <CardDescription>
          Current rates vs Argentine Peso (ARS)
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <div className="flex items-center gap-2 text-muted-foreground">
              <RefreshCw className="h-4 w-4 animate-spin" />
              <span>Loading rates...</span>
            </div>
          </div>
        ) : error ? (
          <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
            <AlertCircle className="h-4 w-4" />
            <span className="text-sm">Failed to load rates. Using fallback values.</span>
          </div>
        ) : rates ? (
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">USD</Badge>
                  <span className="text-sm font-medium">US Dollar</span>
                </div>
                <span className="font-semibold">
                  {formatCurrency(rates.USD)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">BRL</Badge>
                  <span className="text-sm font-medium">Brazilian Real</span>
                </div>
                <span className="font-semibold">
                  {formatCurrency(rates.BRL)}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="default">ARS</Badge>
                  <span className="text-sm font-medium">Argentine Peso</span>
                </div>
                <span className="font-semibold">
                  {formatCurrency(1)}
                </span>
              </div>
            </div>
            
            {lastUpdated && (
              <div className="text-xs text-muted-foreground text-center pt-2 border-t">
                Last updated: {formatDate(lastUpdated)}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-4 text-muted-foreground">
            No rates available
          </div>
        )}
      </CardContent>
    </Card>
  )
}
