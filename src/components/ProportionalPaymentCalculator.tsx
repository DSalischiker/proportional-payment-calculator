import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button'
import { Calculator, DollarSign, Percent, User } from 'lucide-react'
import { useCurrencyRates } from '../hooks/useCurrencyRates'
import CurrencyRatesCard from './CurrencyRatesCard'
import CurrencySelector, { type Currency } from './CurrencySelector'

interface CalculationResult {
  personAPayment: number
  personBPayment: number
  personAPercentage: number
  personBPercentage: number
}

export default function ProportionalPaymentCalculator() {
  const [personAIncome, setPersonAIncome] = useState<string>('')
  const [personBIncome, setPersonBIncome] = useState<string>('')
  const [totalBill, setTotalBill] = useState<string>('')
  const [personACurrency, setPersonACurrency] = useState<Currency>('ARS')
  const [personBCurrency, setPersonBCurrency] = useState<Currency>('ARS')
  const [billCurrency, setBillCurrency] = useState<Currency>('ARS')
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [errors, setErrors] = useState<string[]>([])

  // Currency rates hook
  const { rates, loading: ratesLoading, error: ratesError, lastUpdated, refetch } = useCurrencyRates()

  // Currency conversion helper
  const convertToARS = (amount: number, fromCurrency: Currency): number => {
    if (!rates || fromCurrency === 'ARS') return amount
    return amount * rates[fromCurrency]
  }

  const convertFromARS = (amount: number, toCurrency: Currency): number => {
    if (!rates || toCurrency === 'ARS') return amount
    return amount / rates[toCurrency]
  }

  const validateInputs = (): boolean => {
    const newErrors: string[] = []
    
    const incomeA = parseFloat(personAIncome)
    const incomeB = parseFloat(personBIncome)
    const bill = parseFloat(totalBill)
    
    if (!personAIncome || isNaN(incomeA) || incomeA <= 0) {
      newErrors.push('Person A income must be a positive number')
    }
    
    if (!personBIncome || isNaN(incomeB) || incomeB <= 0) {
      newErrors.push('Person B income must be a positive number')
    }
    
    if (!totalBill || isNaN(bill) || bill <= 0) {
      newErrors.push('Total bill must be a positive number')
    }

    if (!rates && !ratesLoading) {
      newErrors.push('Currency rates not available. Please try refreshing.')
    }
    
    setErrors(newErrors)
    return newErrors.length === 0
  }

  const calculatePayments = () => {
    if (!validateInputs() || !rates) return
    
    const incomeA = parseFloat(personAIncome)
    const incomeB = parseFloat(personBIncome)
    const bill = parseFloat(totalBill)
    
    // Convert all amounts to ARS for calculation
    const incomeA_ARS = convertToARS(incomeA, personACurrency)
    const incomeB_ARS = convertToARS(incomeB, personBCurrency)
    const bill_ARS = convertToARS(bill, billCurrency)
    
    const totalIncome_ARS = incomeA_ARS + incomeB_ARS
    
    // Calculate proportional payments in ARS
    const personAPayment_ARS = bill_ARS * (incomeA_ARS / totalIncome_ARS)
    const personBPayment_ARS = bill_ARS * (incomeB_ARS / totalIncome_ARS)
    
    // Convert payments back to bill currency for display
    const personAPayment = convertFromARS(personAPayment_ARS, billCurrency)
    const personBPayment = convertFromARS(personBPayment_ARS, billCurrency)
    
    // Calculate percentages of income
    const personAPercentage = (personAPayment_ARS / incomeA_ARS) * 100
    const personBPercentage = (personBPayment_ARS / incomeB_ARS) * 100
    
    setResult({
      personAPayment,
      personBPayment,
      personAPercentage,
      personBPercentage
    })
  }

  const resetCalculator = () => {
    setPersonAIncome('')
    setPersonBIncome('')
    setTotalBill('')
    setPersonACurrency('ARS')
    setPersonBCurrency('ARS')
    setBillCurrency('ARS')
    setResult(null)
    setErrors([])
  }

  const formatCurrency = (amount: number, currency: Currency = billCurrency): string => {
    const currencyMap = {
      ARS: { code: 'ARS', symbol: '$' },
      USD: { code: 'USD', symbol: '$' },
      EUR: { code: 'EUR', symbol: '€' },
      BRL: { code: 'BRL', symbol: 'R$' },
      CLP: { code: 'CLP', symbol: '$' },
      UYU: { code: 'UYU', symbol: '$U' }
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyMap[currency].code,
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (percentage: number): string => {
    return `${percentage.toFixed(2)}%`
  }

  return (
    <div className="space-y-6">
      {/* Currency Rates Card */}
      <CurrencyRatesCard
        rates={rates}
        loading={ratesLoading}
        error={ratesError}
        lastUpdated={lastUpdated}
        onRefresh={refetch}
      />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Payment Calculator
          </CardTitle>
          <CardDescription className="flex justify-start">
            Calculate how to split bills proportionally based on income differences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="personA" className="flex items-center gap-2">
								<User className='h-4 w-4' />
								Person A Income
							</Label>
              <div className="flex gap-2">
                <Input
                  id="personA"
                  type="number"
                  placeholder="Enter Person A's income"
                  value={personAIncome}
                  onChange={(e: any) => setPersonAIncome(e.target.value)}
                  min="0"
                  step="0.01"
                  className="flex-1"
                />
                <CurrencySelector 
                  value={personACurrency} 
                  onChange={setPersonACurrency}
                  disabled={ratesLoading}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="personB" className="flex items-center gap-2">
								<User className='h-4 w-4' />
								Person B Income
							</Label>
              <div className="flex gap-2">
                <Input
                  id="personB"
                  type="number"
                  placeholder="Enter Person B's income"
                  value={personBIncome}
                  onChange={(e: any) => setPersonBIncome(e.target.value)}
                  min="0"
                  step="0.01"
                  className="flex-1"
                />
                <CurrencySelector 
                  value={personBCurrency} 
                  onChange={setPersonBCurrency}
                  disabled={ratesLoading}
                />
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="totalBill" className="flex items-center gap-2">
							<DollarSign className='h-4 w-4' />
							Total Bill Amount
						</Label>
            <div className="flex gap-2">
              <Input
                id="totalBill"
                type="number"
                placeholder="Enter total bill amount"
                value={totalBill}
                onChange={(e: any) => setTotalBill(e.target.value)}
                min="0"
                step="0.01"
                className="flex-1"
              />
              <CurrencySelector 
                value={billCurrency} 
                onChange={setBillCurrency}
                disabled={ratesLoading}
              />
            </div>
          </div>

          {errors.length > 0 && (
            <div className="space-y-1">
              {errors.map((error, index) => (
                <p key={index} className="text-sm text-destructive">
                  {error}
                </p>
              ))}
            </div>
          )}

          <div className="flex gap-2">
            <Button 
              onClick={calculatePayments} 
              className="flex-1"
              disabled={ratesLoading || !rates}
            >
              {ratesLoading ? 'Loading rates...' : 'Calculate Payments'}
            </Button>
            <Button onClick={resetCalculator} variant="outline">
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Payment Breakdown
            </CardTitle>
            <CardDescription className="flex justify-start text-left">
              Fair split based on proportional income
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Person A</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-2xl font-bold">
                        {formatCurrency(result.personAPayment)}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span>
                        {formatPercentage(result.personAPercentage)} of income
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <h3 className="font-semibold text-lg mb-2">Person B</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-2xl font-bold">
                        {formatCurrency(result.personBPayment)}
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Percent className="h-4 w-4" />
                      <span>
                        {formatPercentage(result.personBPercentage)} of income
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-accent rounded-lg">
              <h4 className="font-semibold mb-2">Summary</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Total Bill:</span>
                  <p className="font-semibold">{formatCurrency(parseFloat(totalBill))}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Person A Pays:</span>
                  <p className="font-semibold">{formatCurrency(result.personAPayment)}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Person B Pays:</span>
                  <p className="font-semibold">{formatCurrency(result.personBPayment)}</p>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Both people pay the same percentage ({formatPercentage(result.personAPercentage)}) of their respective incomes.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
