import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip'
import { DollarSign, InfoIcon, Percent } from 'lucide-react'
import { useLocale } from '../contexts/LocaleContext'
import { type Currency } from './CurrencySelector'

interface CalculationResult {
  personAPayment: number
  personBPayment: number
  personAPercentage: number
  personBPercentage: number
}

interface PaymentResultCardProps {
  result: CalculationResult
  personAName: string
  personBName: string
  totalBill: string
  formatCurrency: (amount: number, currency?: Currency) => string
  formatPercentage: (percentage: number) => string
  getPaymentInAllCurrencies: (paymentAmount: number) => { 
    currency: Currency; 
    amount: number; 
    formatted: string; 
    flagSrc: string 
  }[]
}

export default function PaymentResultCard({
  result,
  personAName,
  personBName,
  totalBill,
  formatCurrency,
  formatPercentage,
  getPaymentInAllCurrencies
}: PaymentResultCardProps) {
  const { t } = useLocale()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          {t('breakdown.title')}
        </CardTitle>
        <CardDescription className="flex justify-start text-left">
          {t('breakdown.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{personAName}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-2xl font-bold">
                    {formatCurrency(result.personAPayment)}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="w-[200px]">
                      <div className="space-y-1">
                        <p className="font-semibold text-xs mb-2">{t('breakdown.paymentInOtherCurrencies')}</p>
                        {getPaymentInAllCurrencies(result.personAPayment).map(({ currency, formatted, flagSrc }) => (
                          <div key={currency} className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <img src={flagSrc} alt={`${currency} flag`} className="w-4 h-3 object-cover rounded-sm" />
                              <span className="font-medium">{currency}</span>
                            </div>
                            <span>{formatted}</span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Percent className="h-4 w-4" />
                  <span>
                    {formatPercentage(result.personAPercentage)} {t('breakdown.ofIncome')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="text-center p-4 bg-muted rounded-lg">
              <h3 className="font-semibold text-lg mb-2">{personBName}</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-2xl font-bold">
                    {formatCurrency(result.personBPayment)}
                  </span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <InfoIcon className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="w-[200px]">
                      <div className="space-y-1">
                        <p className="font-semibold text-xs mb-2">{t('breakdown.paymentInOtherCurrencies')}</p>
                        {getPaymentInAllCurrencies(result.personBPayment).map(({ currency, formatted, flagSrc }) => (
                          <div key={currency} className="flex justify-between items-center text-xs">
                            <div className="flex items-center gap-2">
                              <img src={flagSrc} alt={`${currency} flag`} className="w-4 h-3 object-cover rounded-sm" />
                              <span className="font-medium">{currency}</span>
                            </div>
                            <span>{formatted}</span>
                          </div>
                        ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center justify-center gap-2 text-muted-foreground">
                  <Percent className="h-4 w-4" />
                  <span>
                    {formatPercentage(result.personBPercentage)} {t('breakdown.ofIncome')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-accent rounded-lg">
          <h4 className="font-semibold mb-2">{t('breakdown.summary')}</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">{t('breakdown.totalBill')}</span>
              <p className="font-semibold">{formatCurrency(parseFloat(totalBill))}</p>
            </div>
            <div>
              <span className="text-muted-foreground">{personAName} {t('breakdown.pays')}</span>
              <p className="font-semibold">{formatCurrency(result.personAPayment)}</p>
            </div>
            <div>
              <span className="text-muted-foreground">{personBName} {t('breakdown.pays')}</span>
              <p className="font-semibold">{formatCurrency(result.personBPayment)}</p>
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {t('breakdown.samePercentage', { percentage: formatPercentage(result.personAPercentage) })}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
