import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { RefreshCw, TrendingUp, AlertCircle, ChevronDown } from 'lucide-react'
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
  const [isCollapsed, setIsCollapsed] = useState(false)

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
    <Card className="w-full transition-all duration-200">
      <CardHeader className={`${isCollapsed ? 'pb-0' : 'pb-3'} transition-all duration-200`}>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5" />
            Exchange Rates
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onRefresh}
              disabled={loading}
              className="h-8 w-8 p-0"
              title="Refresh exchange rates"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="h-8 w-8 p-0 transition-transform duration-200"
              title={isCollapsed ? "Expand exchange rates" : "Collapse exchange rates"}
            >
              <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`} />
            </Button>
          </div>
        </div>
        <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-10 opacity-100'}`}>
          <CardDescription className="flex justify-start">
            Current rates vs Argentine Peso (ARS)
          </CardDescription>
        </div>
      </CardHeader>
      
      <div className={`transition-all duration-300 overflow-hidden ${isCollapsed ? 'max-h-0 opacity-0' : 'max-h-[500px] opacity-100'}`}>
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
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg transition-colors hover:bg-muted/80">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">USD</Badge>
                    <span className="text-sm font-medium">US Dollar</span>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(rates.USD)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg transition-colors hover:bg-muted/80">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">BRL</Badge>
                    <span className="text-sm font-medium">Brazilian Real</span>
                  </div>
                  <span className="font-semibold">
                    {formatCurrency(rates.BRL)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-primary/10 rounded-lg transition-colors hover:bg-primary/15">
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
                <div className="text-left text-xs text-muted-foreground pt-2 border-t">
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
      </div>
    </Card>
  )
}
