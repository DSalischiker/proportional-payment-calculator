import { useState } from 'react'
import { useCurrencyRates } from '../hooks/useCurrencyRates'
import { useCalculationHistory } from '../hooks/useCalculationHistory'
import { useAuth } from '../contexts/AuthContext'
import CurrencyRatesCard from './CurrencyRatesCard'
import PaymentCalculatorCard, { type PaymentCalculatorData } from './PaymentCalculatorCard'
import PaymentResultCard from './PaymentResultCard'
import { type Currency } from './CurrencySelector'

interface CalculationResult {
  personAPayment: number
  personBPayment: number
  personAPercentage: number
  personBPercentage: number
}

export default function ProportionalPaymentCalculator() {
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [lastCalculationData, setLastCalculationData] = useState<PaymentCalculatorData | null>(null)

  // Hooks
  const { rates, loading: ratesLoading, error: ratesError, lastUpdated, refetch } = useCurrencyRates()
  const { addCalculation } = useCalculationHistory()
  const { user } = useAuth()

  // Currency conversion helper
  const convertToARS = (amount: number, fromCurrency: Currency): number => {
    if (!rates || fromCurrency === 'ARS') return amount
    return amount * rates[fromCurrency]
  }

  const convertFromARS = (amount: number, toCurrency: Currency): number => {
    if (!rates || toCurrency === 'ARS') return amount
    return amount / rates[toCurrency]
  }

  const calculatePayments = async (data: PaymentCalculatorData) => {
    if (!rates) return
    
    setLastCalculationData(data)
    
    const incomeA = parseFloat(data.personAIncome)
    const incomeB = parseFloat(data.personBIncome)
    const bill = parseFloat(data.totalBill)
    
    // Convert all amounts to ARS for calculation
    const incomeA_ARS = convertToARS(incomeA, data.personACurrency)
    const incomeB_ARS = convertToARS(incomeB, data.personBCurrency)
    const bill_ARS = convertToARS(bill, data.billCurrency)
    
    const totalIncome_ARS = incomeA_ARS + incomeB_ARS
    
    // Calculate proportional payments in ARS
    const personAPayment_ARS = bill_ARS * (incomeA_ARS / totalIncome_ARS)
    const personBPayment_ARS = bill_ARS * (incomeB_ARS / totalIncome_ARS)
    
    // Convert payments back to bill currency for display
    const personAPayment = convertFromARS(personAPayment_ARS, data.billCurrency)
    const personBPayment = convertFromARS(personBPayment_ARS, data.billCurrency)
    
    // Calculate percentages of income
    const personAPercentage = (personAPayment_ARS / incomeA_ARS) * 100
    const personBPercentage = (personBPayment_ARS / incomeB_ARS) * 100
    
    const calculationResult = {
      personAPayment,
      personBPayment,
      personAPercentage,
      personBPercentage
    }
    
    setResult(calculationResult)
    
    // Save to history if user is authenticated
    if (user) {
      try {
        await addCalculation({
          calculationData: data,
          result: calculationResult
        })
      } catch (error) {
        console.error('Failed to save calculation:', error)
        // Don't block the UI if saving fails
      }
    }
  }

  const resetCalculator = () => {
    setResult(null)
    setLastCalculationData(null)
  }

  const formatCurrency = (amount: number, currency?: Currency): string => {
    const actualCurrency = currency || (lastCalculationData?.billCurrency ?? 'ARS')
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
      currency: currencyMap[actualCurrency].code,
      minimumFractionDigits: 2
    }).format(amount)
  }

  const formatPercentage = (percentage: number): string => {
    return `${percentage.toFixed(2)}%`
  }

  // Helper function to convert payment amount to different currencies
  const getPaymentInAllCurrencies = (paymentAmount: number): { currency: Currency; amount: number; formatted: string; flagSrc: string }[] => {
    if (!rates || !lastCalculationData) return []
    
    const billCurrency = lastCalculationData.billCurrency
    const currencies: Currency[] = ['ARS', 'USD', 'EUR', 'BRL', 'CLP', 'UYU']
    
    // Currency to flag mapping
    const currencyFlags: Record<Currency, string> = {
      'ARS': '/arg.png',
      'USD': '/us.png', 
      'EUR': '/ue.png',
      'BRL': '/brazil.png',
      'CLP': '/chile.png',
      'UYU': '/uruguay.png'
    }
    
    return currencies
      .filter(currency => currency !== billCurrency) // Exclude the bill currency
      .map(currency => {
        // Convert from bill currency to ARS, then to target currency
        const paymentInARS = convertToARS(paymentAmount, billCurrency)
        const convertedAmount = convertFromARS(paymentInARS, currency)
        
        return {
          currency,
          amount: convertedAmount,
          formatted: formatCurrency(convertedAmount, currency),
          flagSrc: currencyFlags[currency]
        }
      })
  }

  return (
    <div className="space-y-6">
      <PaymentCalculatorCard
        onCalculate={calculatePayments}
        onReset={resetCalculator}
      />

      {result && lastCalculationData && (
        <PaymentResultCard
          result={result}
          personAName={lastCalculationData.personAName}
          personBName={lastCalculationData.personBName}
          totalBill={lastCalculationData.totalBill}
          formatCurrency={formatCurrency}
          formatPercentage={formatPercentage}
          getPaymentInAllCurrencies={getPaymentInAllCurrencies}
        />
      )}

      {/* Currency Rates Card */}
      <CurrencyRatesCard
        rates={rates}
        loading={ratesLoading}
        error={ratesError}
        lastUpdated={lastUpdated}
        onRefresh={refetch}
      />
    </div>
  )
}
